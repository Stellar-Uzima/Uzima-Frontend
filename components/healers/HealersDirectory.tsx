import React, { useState, useEffect, useMemo } from 'react';

// Mock interface based on issue description parameters
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
  // 1. State Management
  const [healers] = useState<Healer[]>(initialHealers);
  const [searchInput, setSearchInput] = useState<string>('');
  const [debouncedSearch, setDebouncedSearch] = useState<string>('');

  // 2. Debounce Logic Engine (300ms Window)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchInput);
    }, 300);

    // Clear timeout if user types again before 300ms elapses
    return () => {
      clearTimeout(handler);
    };
  }, [searchInput]);

  // 3. Dynamic Filter Calculation (Memoized for Performance)
  const filteredHealers = useMemo(() => {
    const query = debouncedSearch.trim().toLowerCase();
    
    if (!query) return healers;

    return healers.filter((healer) => {
      const matchName = healer.name?.toLowerCase().includes(query);
      const matchSpecialization = healer.specialization?.toLowerCase().includes(query);
      
      return matchName || matchSpecialization;
    });
  }, [debouncedSearch, healers]);

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Search Header Section */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Healers Directory</h2>
        <p className="text-sm text-gray-500">
          Find and verify practitioners by name or medical specialization.
        </p>
      </div>

      {/* Search Input Box */}
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

      {/* Directory List Layout */}
      <div className="grid gap-4 md:grid-cols-2">
        {filteredHealers.length > 0 ? (
          filteredHealers.map((healer) => (
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
            No healers found matching "{debouncedSearch}"
          </div>
        )}
      </div>
    </div>
  );
};