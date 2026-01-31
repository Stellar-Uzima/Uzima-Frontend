'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ProfessionalRegistration } from '@/types/professional';

const STATUS_BADGES = {
  pending: { color: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
  under_review: { color: 'bg-blue-100 text-blue-800', label: 'Under Review' },
  approved: { color: 'bg-green-100 text-green-800', label: 'Approved' },
  rejected: { color: 'bg-red-100 text-red-800', label: 'Rejected' },
  info_needed: { color: 'bg-orange-100 text-orange-800', label: 'Info Needed' },
};

export default function AdminVerificationsPage() {
  const [applications, setApplications] = useState<ProfessionalRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'status'>('date');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      // Replace with actual API call
      const response = await fetch('/api/admin/applications');
      const data = await response.json();
      setApplications(data.applications || []);
    } catch (error) {
      console.error('Failed to fetch applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredApplications = applications.filter((app) => {
    if (filter === 'all') return true;
    return app.status === filter;
  });

  const sortedApplications = [...filteredApplications].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime();
    }
    return a.status.localeCompare(b.status);
  });

  const toggleSelection = (id: string) => {
    const newSelection = new Set(selectedIds);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    setSelectedIds(newSelection);
  };

  const selectAll = () => {
    if (selectedIds.size === sortedApplications.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(sortedApplications.map((app) => app.id!)));
    }
  };

  const bulkAction = async (action: 'approve' | 'reject') => {
    if (selectedIds.size === 0) {
      alert('Please select applications first');
      return;
    }

    if (!confirm(`Are you sure you want to ${action} ${selectedIds.size} application(s)?`)) {
      return;
    }

    try {
      const promises = Array.from(selectedIds).map((id) =>
        fetch('/api/professional/verify', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            applicationId: id,
            status: action === 'approve' ? 'approved' : 'rejected',
            reviewedBy: 'admin', // Replace with actual admin ID
          }),
        })
      );

      await Promise.all(promises);
      setSelectedIds(new Set());
      fetchApplications();
      alert(`Successfully ${action}ed ${selectedIds.size} application(s)`);
    } catch (error) {
      console.error('Bulk action failed:', error);
      alert('Failed to perform bulk action');
    }
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Professional Verifications
          </h1>
          <p className="text-gray-600">
            Review and manage healthcare professional applications
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          {Object.entries(STATUS_BADGES).map(([status, config]) => {
            const count = applications.filter((app) => app.status === status).length;
            return (
              <div key={status} className="bg-white rounded-lg shadow p-5">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm text-gray-600">{config.label}</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${config.color}`}>
                    {count}
                  </span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{count}</p>
              </div>
            );
          })}
        </div>

        {/* Filters and Actions */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-wrap gap-4 justify-between items-center">
            <div className="flex gap-2">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Applications</option>
                <option value="pending">Pending</option>
                <option value="under_review">Under Review</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="info_needed">Info Needed</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'date' | 'status')}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="date">Sort by Date</option>
                <option value="status">Sort by Status</option>
              </select>
            </div>

            <div className="flex gap-2">
              {selectedIds.size > 0 && (
                <>
                  <button
                    onClick={() => bulkAction('approve')}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    ✓ Approve Selected ({selectedIds.size})
                  </button>
                  <button
                    onClick={() => bulkAction('reject')}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    ✗ Reject Selected ({selectedIds.size})
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedIds.size === sortedApplications.length && sortedApplications.length > 0}
                      onChange={selectAll}
                      className="rounded border-gray-300"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submitted
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {sortedApplications.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                      No applications found
                    </td>
                  </tr>
                ) : (
                  sortedApplications.map((app) => (
                    <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedIds.has(app.id!)}
                          onChange={() => toggleSelection(app.id!)}
                          className="rounded border-gray-300"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">
                          {app.personalInfo.fullName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {app.verification.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {app.personalInfo.title}
                        <div className="text-xs text-gray-500">
                          {app.personalInfo.specialization}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {formatDate(app.submittedAt)}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            STATUS_BADGES[app.status].color
                          }`}
                        >
                          {STATUS_BADGES[app.status].label}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <Link
                          href={`/admin/verifications/${app.id}`}
                          className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                          Review →
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}