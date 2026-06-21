import React, { useState, useEffect, useMemo } from 'react';

import { Pagination } from "@/components/ui/pagination";

/**
 * Client-side pagination is used as a stopgap — the healers list is loaded
 * entirely from in-memory data. When a real API is introduced, replace
 * this with server-side pagination by fetching only the current page's data
 * from the backend and passing page/limit query parameters.
 */
const ITEMS_PER_PAGE = 9;

interface Healer {
  id: string;
  name: string;
  specialization: string;
  location?: string;
  rating?: number;
}

interface HealersDirectoryProps {
  initialHealers?: Healer[];
}

export const HealersDirectory: React.FC<HealersDirectoryProps> = ({
  initialHealers = []
}) => {
  const [healers] = useState<Healer[]>(initialHealers);
  const [searchInput, setSearchInput] = useState<string>('');
  const [debouncedSearch, setDebouncedSearch] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchInput);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchInput]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch]);

  const filteredHealers = useMemo(() => {
    const query = debouncedSearch.trim().toLowerCase();

    if (!query) return healers;

    return healers.filter((healer) => {
      const matchName = healer.name?.toLowerCase().includes(query);
      const matchSpecialization = healer.specialization?.toLowerCase().includes(query);

      return matchName || matchSpecialization;
    });
  }, [debouncedSearch, healers]);

  const totalPages = Math.ceil(filteredHealers.length / ITEMS_PER_PAGE);
  const safePage = totalPages === 0 ? 1 : Math.min(currentPage, totalPages);

  const paginatedHealers = useMemo(() => {
    const startIndex = (safePage - 1) * ITEMS_PER_PAGE;
    return filteredHealers.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredHealers, safePage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const section = document.querySelector("[data-healers-section]");
    section?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Healers Directory</h2>
        <p className="text-sm text-gray-500">
          Find and verify practitioners by name or medical specialization.
        </p>
      </div>

      <div className="relative">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search healers by name or specialization (e.g., Cardiology)..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
        {searchInput && (
          <button
            onClick={() => setSearchInput('')}
            className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 text-sm"
          >
            Clear
          </button>
        )}
      </div>

      <div data-healers-section className="grid gap-4 md:grid-cols-2">
        {paginatedHealers.length > 0 ? (
          paginatedHealers.map((healer) => (
            <div
              key={healer.id}
              className="p-4 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 bg-white"
            >
              <h3 className="font-semibold text-lg text-gray-900">{healer.name}</h3>
              <p className="text-sm font-medium text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">
                {healer.specialization}
              </p>
              {healer.location && (
                <p className="text-xs text-gray-400 mt-2">📍 {healer.location}</p>
              )}
            </div>
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-gray-500 border border-dashed border-gray-200 rounded-xl">
            No healers found matching &ldquo;{debouncedSearch}&rdquo;
          </div>
        )}
      </div>

      {filteredHealers.length > 0 && (
        <Pagination
          currentPage={safePage}
          totalPages={totalPages}
          totalItems={filteredHealers.length}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={handlePageChange}
          label="healers"
        />
      )}
    </div>
  );
};
