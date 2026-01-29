import React, { useState, useEffect } from 'react';
import { Search, MapPin, Loader2 } from 'lucide-react';

interface SearchBarProps {
  onSearch: (city: string) => void;
  onLocationClick: () => void;
  loading?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onLocationClick, loading }) => {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 1000); // 1s debounce

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (debouncedQuery && debouncedQuery.length > 2) {
      onSearch(debouncedQuery);
    }
  }, [debouncedQuery, onSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto mb-8">
      <form onSubmit={handleSubmit} className="relative group">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search city..."
          className="w-full h-12 pl-12 pr-12 text-white bg-white/10 backdrop-blur-md border border-white/20 rounded-full outline-none focus:bg-white/20 transition-all shadow-lg placeholder-white/60"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 w-5 h-5 pointer-events-none" />
        
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {loading && <Loader2 className="w-5 h-5 text-white/70 animate-spin" />}
            <button
                type="button"
                onClick={onLocationClick}
                className="p-2 hover:bg-white/20 rounded-full transition-colors text-white/80"
                title="Use current location"
            >
                <MapPin className="w-5 h-5" />
            </button>
        </div>
      </form>
    </div>
  );
};
