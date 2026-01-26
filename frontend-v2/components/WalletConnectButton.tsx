'use client';

import { useState, useEffect } from 'react';
import { useWallet } from '@/context/WalletProvider';

const WalletIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
  </svg>
);

const LoaderIcon = () => (
  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

interface WalletConnectButtonProps {
  theme?: 'light' | 'dark';
}

export default function WalletConnectButton({ theme = 'light' }: WalletConnectButtonProps) {
  const { connected, connect, disconnect, walletName } = useWallet();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const replaceModalContent = () => {
      const modalElements = document.querySelectorAll('[class*="swk"], [class*="modal"]');
      modalElements.forEach(modal => {
        const walker = document.createTreeWalker(
          modal,
          NodeFilter.SHOW_TEXT
        );
        
        const textNodes = [];
        let node;
        while (node = walker.nextNode()) {
          textNodes.push(node);
        }
        
        textNodes.forEach(textNode => {
          const text = textNode.textContent || '';
          if (text.includes('Learn more') || 
              text.includes('What is a Wallet') || 
              text.includes('What is Stellar') ||
              text.includes('Wallets are used to send') ||
              text.includes('Stellar is a decentralized')) {
            const parent = textNode.parentElement;
            if (parent) {
              parent.style.display = 'none';
            }
          }
        });

        if (!modal.querySelector('.custom-stellar-message')) {
          const customMessage = document.createElement('div');
          customMessage.className = 'custom-stellar-message';
          customMessage.innerHTML = `
            <div style="
              padding: 16px;
              margin: 16px 0;
              background: var(--background, #fff);
              color: var(--foreground, #000);
              border-radius: 8px;
              font-size: 14px;
              line-height: 1.5;
              border: 1px solid rgba(156, 163, 175, 0.3);
            ">
              ✨ The Stellar SDK has been integrated into this template. Use the reusable Connect Wallet button component in any project to connect to Freighter, Albedo, Lobstr, and other popular Stellar wallets.
            </div>
          `;
          modal.appendChild(customMessage);
        }
      });
    };

    const observer = new MutationObserver(() => {
      setTimeout(replaceModalContent, 100);
    });

    observer.observe(document.body, { 
      childList: true, 
      subtree: true 
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      if (connected) {
        await disconnect();
      } else {
        await connect();
      }
    } catch (error) {
      console.error('Wallet operation failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getButtonText = () => {
    if (isLoading) return connected ? 'Disconnecting...' : 'Connecting...';
    if (connected) return `Disconnect ${walletName}`;
    return 'Connect Wallet';
  };

  const getIcon = () => {
    if (isLoading) return <LoaderIcon />;
    return <WalletIcon />;
  };

  return (
    <button 
      onClick={handleClick}
      disabled={isLoading}
      className={` bg-[oklch(0.65_0.15_175)] py-2  hover:bg-[oklch(0.55_0.15_175)] text-white rounded-full px-6 ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
    >
      <span className="flex items-center gap-2">
        {getIcon()}
        {getButtonText()}
      </span>
    </button>
  );
}