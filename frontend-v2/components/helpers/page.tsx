'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { DonationForm } from '@/components/helpers/donation-form';
import { RankCards } from '@/components/helpers/rank-cards';
import { Leaderboard } from '@/components/helpers/leaderboard';
import { ImpactDashboard } from '@/components/helpers/impact-dashboard';
import { Testimonials } from '@/components/helpers/testimonials';
import { Donation, Helper, ImpactStats, Testimonial, HELPER_RANKS } from '@/types/ubuntu-helpers';

export default function UbuntuHelpersPage() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [latestDonation, setLatestDonation] = useState<Donation | null>(null);

  // Mock data - replace with actual API calls
  const [impactStats] = useState<ImpactStats>({
    totalRaised: 125840,
    helpersCount: 1247,
    communitiesHelped: 45,
    livesImpacted: 12584,
  });

  const [helpers] = useState<Helper[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      totalDonated: 2500,
      rank: 'CHAMPION',
      donationCount: 12,
      joinedAt: new Date('2024-01-15'),
    },
    {
      id: '2',
      name: 'Michael Chen',
      totalDonated: 1800,
      rank: 'LEGACY',
      donationCount: 8,
      joinedAt: new Date('2024-02-20'),
    },
    {
      id: '3',
      name: 'Emma Davis',
      totalDonated: 1200,
      rank: 'LEGACY',
      donationCount: 15,
      joinedAt: new Date('2024-01-10'),
    },
    // Add more mock helpers...
  ]);

  const [testimonials] = useState<Testimonial[]>([
    {
      id: '1',
      name: 'Amina Okafor',
      location: 'Lagos, Nigeria',
      story:
        'Thanks to Ubuntu Helpers, our community clinic received essential medical supplies. We can now treat patients who previously had no access to healthcare.',
      date: new Date('2024-11-15'),
    },
    {
      id: '2',
      name: 'Dr. James Mutua',
      location: 'Nairobi, Kenya',
      story:
        'The telemedicine equipment donated through this platform has allowed us to connect rural patients with specialist doctors. Lives are being saved every day.',
      date: new Date('2024-10-20'),
    },
    {
      id: '3',
      name: 'Grace Nkomo',
      location: 'Harare, Zimbabwe',
      story:
        'As a community health worker, the training and resources provided through donor support have empowered me to serve over 200 families in our village.',
      date: new Date('2024-09-05'),
    },
  ]);

  const handleDonationSuccess = (donation: Donation) => {
    setLatestDonation(donation);
    setShowSuccessModal(true);

    // Trigger confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#3B82F6', '#8B5CF6', '#EC4899', '#10B981'],
    });

    // Additional confetti burst
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
      });
    }, 200);
  };

  const handleDonationError = (error: string) => {
    alert(`Error: ${error}`);
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white py-20 px-4 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Ubuntu Helpers
            </h1>
            <p className="text-xl md:text-2xl mb-4 font-light">
              "I am because we are"
            </p>
            <p className="text-lg md:text-xl mb-8 text-blue-100">
              Join our global community of compassionate individuals sponsoring healthcare
              for underserved communities across Africa. Together, we embody the spirit of Ubuntu -
              our shared humanity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#donate"
                className="px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-all transform hover:scale-105 shadow-xl"
              >
                Become a Helper
              </a>
              <a
                href="#leaderboard"
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-blue-600 transition-all"
              >
                View Leaderboard
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Ubuntu Philosophy */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            The Spirit of Ubuntu
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Ubuntu is an ancient African philosophy that recognizes our interconnectedness.
            It teaches us that a person is a person through other people - we are all connected,
            and what affects one affects us all.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            When you become an Ubuntu Helper, you're not just donating money. You're affirming
            our shared humanity and ensuring that healthcare, a basic human right, reaches
            those who need it most.
          </p>
        </div>
      </section>

      {/* Rank Cards */}
      <RankCards />

      {/* Impact Dashboard */}
      <ImpactDashboard stats={impactStats} />

      {/* Donation Section */}
      <section id="donate" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Make Your Contribution
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose your donation amount and payment method. Every contribution brings us
              closer to universal healthcare access.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <DonationForm
              onSuccess={handleDonationSuccess}
              onError={handleDonationError}
            />
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <Testimonials testimonials={testimonials} />

      {/* Leaderboard */}
      <section id="leaderboard" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <Leaderboard helpers={helpers} />
        </div>
      </section>

      {/* Transparency Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Complete Transparency
            </h2>
            <p className="text-lg text-gray-600">
              All donations are recorded on the Stellar blockchain for full transparency and
              accountability.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-3xl">🔗</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Blockchain Verified</h3>
                <p className="text-gray-600">Every transaction is permanent and auditable</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 bg-blue-50 rounded-lg text-center">
                <p className="text-sm text-gray-600 mb-1">Transparency</p>
                <p className="text-2xl font-bold text-blue-600">100%</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg text-center">
                <p className="text-sm text-gray-600 mb-1">Funds Delivered</p>
                <p className="text-2xl font-bold text-green-600">100%</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg text-center">
                <p className="text-sm text-gray-600 mb-1">Admin Costs</p>
                <p className="text-2xl font-bold text-purple-600">0%</p>
              </div>
            </div>

            <div className="text-center">
              <a
                href="https://stellar.expert/explorer/public"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
              >
                <span>View All Transactions</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Success Modal */}
      {showSuccessModal && latestDonation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-scale-in">
            <button
              onClick={closeSuccessModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-5xl">✓</span>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Thank You, Ubuntu {HELPER_RANKS[latestDonation.rank].name.split(' ')[1]}!
              </h3>

              <p className="text-gray-600 mb-6">
                Your ${latestDonation.amount} donation has been successfully processed.
              </p>

              <div className="p-4 bg-blue-50 rounded-lg mb-6">
                <p className="text-sm text-gray-600 mb-1">Transaction Hash</p>
                <p className="text-xs font-mono text-gray-900 break-all">
                  {latestDonation.txHash}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={closeSuccessModal}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-purple-700"
                >
                  Done
                </button>
                <button
                  onClick={() => {
                    // Share functionality
                    alert('Share on social media!');
                  }}
                  className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-200"
                >
                  Share 🎉
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Add to global CSS:
/*
@keyframes scale-in {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.animate-scale-in {
  animation: scale-in 0.3s ease-out;
}
*/