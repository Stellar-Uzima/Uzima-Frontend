'use client';

import React, { useState } from 'react';
import { HELPER_RANKS, getRankByAmount, convertUSDToXLM } from '@/types/ubuntu-helpers';

interface DonationFormProps {
  onSuccess: (donation: any) => void;
  onError: (error: string) => void;
}

const PRESET_AMOUNTS = [10, 25, 50, 100, 500];
const XLM_RATE = 0.10; // 1 XLM = $0.10

export function DonationForm({ onSuccess, onError }: DonationFormProps) {
  const [amount, setAmount] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [donorName, setDonorName] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [currency, setCurrency] = useState<'XLM' | 'USDT'>('XLM');
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePresetClick = (presetAmount: number) => {
    setAmount(presetAmount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 10 && numValue <= 10000) {
      setAmount(numValue);
    }
  };

  const connectWallet = async () => {
    // Mock wallet connection - replace with actual Stellar wallet integration
    try {
      // For Freighter wallet integration:
      // const isFreighterAvailable = await window.freighter?.isConnected();
      // const publicKey = await window.freighter?.getPublicKey();
      
      // Mock for now
      const mockPublicKey = 'GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
      setWalletAddress(mockPublicKey);
      setIsConnected(true);
    } catch (error) {
      onError('Failed to connect wallet. Please install Freighter wallet.');
    }
  };

  const handleDonate = async () => {
    if (amount < 10) {
      onError('Minimum donation is $10');
      return;
    }

    if (amount > 10000) {
      onError('Maximum donation is $10,000');
      return;
    }

    if (currency === 'XLM' && !isConnected) {
      onError('Please connect your wallet first');
      return;
    }

    setIsProcessing(true);

    try {
      // Calculate XLM amount if needed
      const xlmAmount = currency === 'XLM' ? convertUSDToXLM(amount, XLM_RATE) : 0;

      // Mock Stellar transaction - replace with actual implementation
      // const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
      // const transaction = await buildTransaction(walletAddress, xlmAmount);
      // const result = await window.freighter.signAndSubmit(transaction);

      // Mock transaction hash
      const mockTxHash = `TX${Date.now()}${Math.random().toString(36).substring(7)}`;

      const donation = {
        id: `DON-${Date.now()}`,
        donorName: donorName || 'Anonymous',
        amount,
        currency,
        rank: getRankByAmount(amount),
        message: message || undefined,
        txHash: mockTxHash,
        createdAt: new Date(),
      };

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      onSuccess(donation);
    } catch (error) {
      console.error('Donation error:', error);
      onError('Transaction failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const currentRank = getRankByAmount(amount);
  const rankInfo = HELPER_RANKS[currentRank];
  const xlmAmount = convertUSDToXLM(amount, XLM_RATE);

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Make a Donation</h3>

      {/* Currency Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setCurrency('XLM')}
          className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
            currency === 'XLM'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <span className="block text-sm">Pay with</span>
          <span className="block text-lg font-bold">XLM (Stellar)</span>
        </button>
        <button
          onClick={() => setCurrency('USDT')}
          className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
            currency === 'USDT'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <span className="block text-sm">Pay with</span>
          <span className="block text-lg font-bold">USDT</span>
        </button>
      </div>

      {/* Wallet Connection (XLM only) */}
      {currency === 'XLM' && !isConnected && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800 mb-3">
            Connect your Stellar wallet to continue
          </p>
          <button
            onClick={connectWallet}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            Connect Wallet
          </button>
        </div>
      )}

      {/* Wallet Address Display */}
      {currency === 'XLM' && isConnected && (
        <div className="mb-6 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-xs text-green-700 mb-1">Connected Wallet</p>
          <p className="text-sm font-mono text-green-900 truncate">{walletAddress}</p>
        </div>
      )}

      {/* Amount Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Select Amount (USD)
        </label>
        <div className="grid grid-cols-3 gap-3 mb-3">
          {PRESET_AMOUNTS.map((preset) => (
            <button
              key={preset}
              onClick={() => handlePresetClick(preset)}
              className={`py-3 px-4 rounded-lg font-medium transition-colors ${
                amount === preset && !customAmount
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              ${preset}
            </button>
          ))}
        </div>
        <input
          type="number"
          placeholder="Custom amount ($10 - $10,000)"
          value={customAmount}
          onChange={(e) => handleCustomAmountChange(e.target.value)}
          min={10}
          max={10000}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Amount Display */}
      <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-2 border-blue-200">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600">Your donation</p>
            <p className="text-3xl font-bold text-gray-900">${amount.toFixed(2)}</p>
            {currency === 'XLM' && (
              <p className="text-sm text-gray-600 mt-1">
                ≈ {xlmAmount.toFixed(2)} XLM
              </p>
            )}
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">You'll become</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-2xl">{rankInfo.icon}</span>
              <span className="font-bold text-gray-900">{rankInfo.name}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Donor Name */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Your Name (Optional)
        </label>
        <input
          type="text"
          placeholder="Anonymous"
          value={donorName}
          onChange={(e) => setDonorName(e.target.value)}
          maxLength={50}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Message */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Message (Optional)
        </label>
        <textarea
          placeholder="Share why you're supporting this cause..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={200}
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
        <p className="text-xs text-gray-500 mt-1">{message.length}/200 characters</p>
      </div>

      {/* Donate Button */}
      <button
        onClick={handleDonate}
        disabled={isProcessing || (currency === 'XLM' && !isConnected)}
        className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition-colors ${
          isProcessing || (currency === 'XLM' && !isConnected)
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
        }`}
      >
        {isProcessing ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Processing...
          </span>
        ) : (
          `Donate $${amount.toFixed(2)}`
        )}
      </button>

      {/* Security Info */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <p className="text-xs text-gray-600 text-center">
          🔒 Secure transaction via Stellar blockchain
        </p>
      </div>
    </div>
  );
}