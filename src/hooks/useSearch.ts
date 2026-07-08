'use client';

import { useState, useEffect } from 'react';
import { searchAll, groupResultsByType, SearchResult } from '@/lib/search';

interface UseSearchResult {
  results: SearchResult[];
  grouped: ReturnType<typeof groupResultsByType>;
  isSearching: boolean;
  hasQuery: boolean;
}

export function useSearch(query: string, debounceMs = 300): UseSearchResult {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const trimmed = query.trim();

    if (!trimmed) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    const timer = setTimeout(() => {
      setResults(searchAll(trimmed));
      setIsSearching(false);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [query, debounceMs]);

  return {
    results,
    grouped: groupResultsByType(results),
    isSearching,
    hasQuery: query.trim().length > 0,
  };
}
