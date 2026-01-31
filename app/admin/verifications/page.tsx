'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ProfessionalRegistration } from '@/types/professional';

interface ReviewPageProps {
  params: { id: string };
}

export default function AdminReviewPage({ params }: ReviewPageProps) {
  const router = useRouter();
  const [application, setApplication] = useState<ProfessionalRegistration | null>(null);
  const [loading, setLoading] = useState(true);
  const [checklist, setChecklist] = useState({
    licenseValid: false,
    documentAuthentic: false,
    expiryDateValid: false,
    nameMatches: false,
    emailVerified: false,
  });
  const [notes, setNotes] = useState('');
  const [decision, setDecision] = useState<'approve' | 'reject' | 'request_info' | null>(null);
  const [reason, setReason] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchApplication();
  }, [params.id]);

  const fetchApplication = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/professional/verify?id=${params.id}`);
      const data = await response.json();
      
      if (data.success) {
        setApplication(data.application);
        setChecklist({
          licenseValid: false,
          documentAuthentic: false,
          expiryDateValid: new Date(data.application.credentials.expiryDate) > new Date(),
          nameMatches: false,
          emailVerified: data.application.verification.emailVerified,
        });
      }
    } catch (error) {
      console.error('Failed to fetch application:', error);
      alert('Failed to load application');
    } finally {
      setLoading(false);
    }
  };

  const toggleChecklist = (field: keyof typeof checklist) => {
    setChecklist({ ...checklist, [field]: !checklist[field] });
  };

  const handleSubmit = async () => {
    if (!decision) {
      alert('Please make a decision');
      return;
    }

    if (decision === 'reject' && !reason) {
      alert('Please provide a reason for rejection');
      return;
    }

    const allChecked = Object.values(checklist).every((val) => val === true);
    if (decision === 'approve' && !allChecked) {
      if (!confirm('Not all checks are complete. Approve anyway?')) {
        return;
      }
    }

    setSubmitting(true);

    try {
      const response = await fetch('/api/professional/verify', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          applicationId: params.id,
          status: decision === 'approve' ? 'approved' : decision === 'reject' ? 'rejected' : 'info_needed',
          reviewedBy: 'admin', // Replace with actual admin ID from session
          reason: reason || notes,
        }),
      });

      if (response.ok) {
        alert('Application reviewed successfully');
        router.push('/admin/verifications');
      } else {
        alert('Failed to submit review');
      }
    } catch (error) {
      console.error('Review submission error:', error);
      alert('An error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const isExpiringSoon = (date: string | Date) => {
    const expiryDate = new Date(date);
    const daysUntilExpiry = Math.ceil((expiryDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry < 90;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading application...</p>
        </div>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-xl">Application not found</p>
          <button
            onClick={() => router.push('/admin/verifications')}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg"
          >
            Back to List
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <button
              onClick={() => router.push('/admin/verifications')}
              className="text-blue-600 hover:text-blue-700 mb-2 flex items-center gap-2"
            >
              ← Back to Applications
            </button>
            <h1 className="text-3xl font-bold text-gray-900">
              Review Application
            </h1>
            <p className="text-gray-600">
              {application.personalInfo.fullName} - {application.personalInfo.title}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Application ID</p>
            <p className="text-lg font-mono text-gray-900">{application.id}</p>
            <p className="text-xs text-gray-500 mt-1">
              Submitted: {formatDate(application.submittedAt)}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">
                  1
                </span>
                Personal Information
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Full Name</p>
                  <p className="font-medium text-gray-900">{application.personalInfo.fullName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Title</p>
                  <p className="font-medium text-gray-900">{application.personalInfo.title}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Specialization</p>
                  <p className="font-medium text-gray-900">{application.personalInfo.specialization}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Location</p>
                  <p className="font-medium text-gray-900">
                    {application.personalInfo.location.city}, {application.personalInfo.location.country}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Experience</p>
                  <p className="font-medium text-gray-900">{application.personalInfo.yearsExperience} years</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Languages</p>
                  <p className="font-medium text-gray-900">{application.personalInfo.languages.join(', ')}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-600">Bio</p>
                  <p className="font-medium text-gray-900">{application.personalInfo.bio}</p>
                </div>
              </div>
            </div>

            {/* Medical Credentials */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">
                  2
                </span>
                Medical Credentials
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">License Number</p>
                    <p className="font-medium text-gray-900 font-mono">{application.credentials.licenseNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Issuing Authority</p>
                    <p className="font-medium text-gray-900">{application.credentials.issuingAuthority}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Issue Date</p>
                    <p className="font-medium text-gray-900">{formatDate(application.credentials.issueDate)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Expiry Date</p>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-gray-900">{formatDate(application.credentials.expiryDate)}</p>
                      {isExpiringSoon(application.credentials.expiryDate) && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">
                          Expiring Soon
                        </span>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Jurisdiction</p>
                    <p className="font-medium text-gray-900">{application.credentials.jurisdiction}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Institution</p>
                    <p className="font-medium text-gray-900">{application.credentials.institution}</p>
                  </div>
                </div>

                {/* Documents */}
                <div>
                  <p className="text-sm text-gray-600 mb-2">License Document</p>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    📄 View Document
                  </button>
                </div>

                {application.credentials.certifications?.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Additional Certifications</p>
                    <div className="space-y-2">
                      {application.credentials.certifications.map((cert: { name: string; issuedBy: string }, idx: number) => (
                        <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                          <p className="font-medium text-gray-900">{cert.name}</p>
                          <p className="text-sm text-gray-600">Issued by: {cert.issuedBy}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Practice Details */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Practice Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Consultation Fee</p>
                  <p className="font-medium text-gray-900 text-lg">${application.practice.consultationFee}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Response Time</p>
                  <p className="font-medium text-gray-900">{application.practice.responseTime}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-600 mb-2">Consultation Types</p>
                  <div className="flex gap-2">
                    {application.practice.consultationTypes.map((type: string) => (
                      <span key={type} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-600 mb-2">Areas of Expertise</p>
                  <div className="flex flex-wrap gap-2">
                    {application.practice.expertise.map((exp: string) => (
                      <span key={exp} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Review Panel */}
          <div className="space-y-6">
            {/* Verification Checklist */}
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Verification Checklist</h3>
              <div className="space-y-3">
                {Object.entries(checklist).map(([key, value]) => (
                  <label
                    key={key}
                    className="flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer hover:bg-gray-50"
                  >
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={() => toggleChecklist(key as keyof typeof checklist)}
                      className="w-5 h-5 text-blue-600 rounded"
                    />
                    <span className="text-sm text-gray-700">
                      {key
                        .replace(/([A-Z])/g, ' $1')
                        .replace(/^./, (str) => str.toUpperCase())}
                    </span>
                  </label>
                ))}
              </div>

              {/* Notes */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reviewer Notes
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add notes about this application..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Decision */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Decision <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  <button
                    onClick={() => setDecision('approve')}
                    className={`w-full px-4 py-3 border-2 rounded-lg font-medium transition-colors ${
                      decision === 'approve'
                        ? 'border-green-600 bg-green-50 text-green-900'
                        : 'border-gray-300 text-gray-700 hover:border-green-300'
                    }`}
                  >
                    ✓ Approve
                  </button>
                  <button
                    onClick={() => setDecision('reject')}
                    className={`w-full px-4 py-3 border-2 rounded-lg font-medium transition-colors ${
                      decision === 'reject'
                        ? 'border-red-600 bg-red-50 text-red-900'
                        : 'border-gray-300 text-gray-700 hover:border-red-300'
                    }`}
                  >
                    ✗ Reject
                  </button>
                  <button
                    onClick={() => setDecision('request_info')}
                    className={`w-full px-4 py-3 border-2 rounded-lg font-medium transition-colors ${
                      decision === 'request_info'
                        ? 'border-orange-600 bg-orange-50 text-orange-900'
                        : 'border-gray-300 text-gray-700 hover:border-orange-300'
                    }`}
                  >
                    ⚠ Request More Info
                  </button>
                </div>
              </div>

              {/* Reason (for rejection) */}
              {decision === 'reject' && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reason for Rejection <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Provide a clear reason for rejection..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={submitting || !decision}
                className={`w-full mt-6 px-6 py-3 rounded-lg font-medium transition-colors ${
                  submitting || !decision
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {submitting ? 'Submitting...' : 'Submit Review'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}