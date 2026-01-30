import {
  StellarWalletsKit,
  FREIGHTER_ID,
  FreighterModule,
  AlbedoModule,
  LobstrModule,
  xBullModule,
  HanaModule,
  WalletNetwork,
  ISupportedWallet,
} from "@creit.tech/stellar-wallets-kit";

const INJECTED_WALLETS: string[] = ["freighter","albedo","lobstr"];

let kitInstance: StellarWalletsKit | null = null;

export const getKit = (): StellarWalletsKit => {
  if (typeof window === 'undefined') {
    return {} as StellarWalletsKit;
  }
  
  if (!kitInstance) {
    const modules: any[] = [];
    const walletList = Array.isArray(INJECTED_WALLETS) ? INJECTED_WALLETS : ['freighter', 'albedo', 'lobstr'];

    if (walletList.includes('freighter')) modules.push(new FreighterModule());
    if (walletList.includes('albedo')) modules.push(new AlbedoModule());
    if (walletList.includes('lobstr')) modules.push(new LobstrModule());
    if (walletList.includes('xbull')) modules.push(new xBullModule());
    if (walletList.includes('hana')) modules.push(new HanaModule());

    kitInstance = new StellarWalletsKit({
      network: WalletNetwork.TESTNET,
      selectedWalletId: FREIGHTER_ID,
      modules: modules.length > 0 ? modules : [new FreighterModule(), new AlbedoModule(), new LobstrModule()],
    });
  }
  
  return kitInstance;
};

export const kit = () => getKit();

interface signTransactionProps {
  unsignedTransaction: string;
  address: string;
}

export const signTransaction = async ({
  unsignedTransaction,
  address,
}: signTransactionProps): Promise<string> => {
  const { signedTxXdr } = await getKit().signTransaction(unsignedTransaction, {
    address,
  });

  return signedTxXdr;
};