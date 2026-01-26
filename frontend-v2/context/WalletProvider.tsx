'use client';

import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import {
  Horizon,
  TransactionBuilder,
  Operation,
  Networks,
  Asset,
  Memo,
  BASE_FEE
} from '@stellar/stellar-sdk';
import { ISupportedWallet } from "@creit.tech/stellar-wallets-kit";
import { kit } from '@/lib/stellar-wallet-kit';

const Server = Horizon.Server;

export interface Balance {
  balance: string;
  asset_type: string;
  asset_code?: string;
  asset_issuer?: string;
}

export interface PaymentOptions {
  to: string;
  amount: string;
  asset?: 'XLM' | { code: string; issuer: string };
  memo?: string;
  secret?: string;
}

interface WalletContextState {
  connected: boolean;
  publicKey?: string;
  walletName?: string;
  balances: Balance[];
  connect: () => Promise<void>;
  disconnect: () => void;
  refreshBalances: () => Promise<void>;
  sendPayment?: (opts: PaymentOptions) => Promise<Horizon.HorizonApi.SubmitTransactionResponse>;
}


interface WalletConfigContextState {
  horizonUrl: string;
  network: string;
}


interface WalletProviderProps {
  children: ReactNode;
  horizonUrl?: string;
  network?: string;
}

const WalletContext = createContext<WalletContextState | undefined>(undefined);
const WalletConfigContext = createContext<WalletConfigContextState | undefined>(undefined);

export function WalletProvider({
  children,
  horizonUrl = 'https://horizon-testnet.stellar.org',
  network = Networks.TESTNET
}: WalletProviderProps) {
  const [connected, setConnected] = useState(false);
  const [publicKey, setPublicKey] = useState<string>();
  const [walletName, setWalletName] = useState<string>();
  const [balances, setBalances] = useState<Balance[]>([]);
  const [server] = useState(() => new Server(horizonUrl));

 
  const connect = useCallback(async () => {
    try {
      // Get fresh kit instance (handles dynamic options)
      const currentKit = kit();

      await currentKit.openModal({
        modalTitle: "Connect to your favorite wallet",
        onWalletSelected: async (option: ISupportedWallet) => {
          currentKit.setWallet(option.id);

          const { address } = await currentKit.getAddress();
          const { name } = option;

          setPublicKey(address);
          setWalletName(name);
          setConnected(true);

          // Save connection to localStorage for persistence
          if (typeof window !== 'undefined') {
            localStorage.setItem('stellar_wallet_connected', 'true');
            localStorage.setItem('stellar_wallet_id', option.id);
            localStorage.setItem('stellar_wallet_address', address);
            localStorage.setItem('stellar_wallet_name', name);
          }

          // Load balances
          try {
            const account = await server.accounts().accountId(address).call();
            setBalances(account.balances);
          } catch (error: unknown) {
            if (error && typeof error === 'object' && 'response' in error && (error as { response?: { status?: number } }).response?.status === 404) {
              console.log(`Account ${address} not found. Fund it with XLM.`);
              setBalances([]);
            } else {
              console.error('Failed to load balances:', error);
              setBalances([]);
            }
          }
        },
      });
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      throw error;
    }
  }, [server]);

  /**
   * Disconnect wallet and clear state
   */
  const disconnect = useCallback(async () => {
    try {
      await kit().disconnect();
      setConnected(false);
      setPublicKey(undefined);
      setWalletName(undefined);
      setBalances([]);

      // Clear localStorage on disconnect
      if (typeof window !== 'undefined') {
        localStorage.removeItem('stellar_wallet_connected');
        localStorage.removeItem('stellar_wallet_id');
        localStorage.removeItem('stellar_wallet_address');
        localStorage.removeItem('stellar_wallet_name');
      }
    } catch (error) {
      console.error('Failed to disconnect wallet:', error);
    }
  }, []);

  /**
   * Refresh balances for the connected wallet
   */
  const refreshBalances = useCallback(async () => {
    if (!publicKey) return;

    try {
      const account = await server.accounts().accountId(publicKey).call();
      setBalances(account.balances);
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'response' in error && (error as { response?: { status?: number } }).response?.status === 404) {
        console.log(`Account ${publicKey} not found on testnet. Fund it with XLM to activate it.`);
        setBalances([]);
      } else {
        console.error('Failed to load balances:', error);
        setBalances([]);
      }
    }
  }, [publicKey, server]);

  /**
   * Send a payment transaction
   */
  const sendPayment = useCallback(async (opts: PaymentOptions): Promise<Horizon.HorizonApi.SubmitTransactionResponse> => {
    if (!publicKey || !connected) {
      throw new Error('Wallet not connected');
    }

    try {
      const account = await server.loadAccount(publicKey);
      const asset = opts.asset === 'XLM' || !opts.asset
        ? Asset.native()
        : new Asset(opts.asset.code, opts.asset.issuer);

      const txBuilder = new TransactionBuilder(account, {
        fee: BASE_FEE,
        networkPassphrase: network,
      }).addOperation(
        Operation.payment({
          destination: opts.to,
          asset,
          amount: opts.amount,
        })
      );

      if (opts.memo) {
        txBuilder.addMemo(Memo.text(opts.memo));
      }

      const transaction = txBuilder.setTimeout(30).build();

      let signedTxXdr: string;
      if (opts.secret) {
        // DEV-ONLY: Sign with secret key
        const { Keypair } = await import('@stellar/stellar-sdk');
        const keypair = Keypair.fromSecret(opts.secret);
        transaction.sign(keypair);
        signedTxXdr = transaction.toXDR();
      } else {
        // Sign with wallet
        const { signTransaction } = await import('@/lib/stellar-wallet-kit');
        signedTxXdr = await signTransaction({
          unsignedTransaction: transaction.toXDR(),
          address: publicKey,
        });
      }

      const signedTransaction = TransactionBuilder.fromXDR(signedTxXdr, network);
      const result = await server.submitTransaction(signedTransaction);

      await refreshBalances();
      return result;
    } catch (error) {
      console.error('Payment failed:', error);
      throw error;
    }
  }, [publicKey, connected, server, network, refreshBalances]);

  // Auto-reconnect wallet on mount if previously connected
  useEffect(() => {
    const autoReconnect = async () => {
      if (typeof window === 'undefined') return;

      const wasConnected = localStorage.getItem('stellar_wallet_connected');
      const savedWalletId = localStorage.getItem('stellar_wallet_id');
      const savedAddress = localStorage.getItem('stellar_wallet_address');
      const savedName = localStorage.getItem('stellar_wallet_name');

      if (wasConnected === 'true' && savedWalletId && savedAddress) {
        try {
          const currentKit = kit();
          currentKit.setWallet(savedWalletId);
          const { address } = await currentKit.getAddress();

          if (address === savedAddress) {
            setPublicKey(address);
            setWalletName(savedName || 'Unknown');
            setConnected(true);

            try {
              const account = await server.accounts().accountId(address).call();
              setBalances(account.balances);
            } catch (error: unknown) {
              if (error && typeof error === 'object' && 'response' in error && (error as { response?: { status?: number } }).response?.status === 404) {
                console.log(`Account ${address} not found. Fund it to activate.`);
                setBalances([]);
              } else {
                setBalances([]);
              }
            }
          }
        } catch {
          console.log('Auto-reconnect failed');
          if (typeof window !== 'undefined') {
            localStorage.removeItem('stellar_wallet_connected');
            localStorage.removeItem('stellar_wallet_id');
            localStorage.removeItem('stellar_wallet_address');
            localStorage.removeItem('stellar_wallet_name');
          }
        }
      }
    };

    autoReconnect();
  }, [server]);

  const walletValue: WalletContextState = {
    connected,
    publicKey,
    walletName,
    balances,
    connect,
    disconnect,
    refreshBalances,
    sendPayment: connected ? sendPayment : undefined,
  };

  const configValue: WalletConfigContextState = {
    horizonUrl,
    network,
  };

  return (
    <WalletConfigContext.Provider value={configValue}>
      <WalletContext.Provider value={walletValue}>
        {children}
      </WalletContext.Provider>
    </WalletConfigContext.Provider>
  );
}

export function useWallet(): WalletContextState {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}


export function useWalletConfig(): WalletConfigContextState | undefined {
  return useContext(WalletConfigContext);
}
