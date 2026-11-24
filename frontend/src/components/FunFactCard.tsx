import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Calendar, ExternalLink, BookOpen } from 'lucide-react';
import { apiRequest } from '../api/client';

interface FunFact {
  factDate: string;
  title: string;
  summary: string;
  wikipediaUrl: string;
  imageUrl: string | null;
}

export const FunFactCard: React.FC = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['todays-fact'],
    queryFn: async (): Promise<FunFact> => {
      return apiRequest<FunFact>('/facts/today');
    },
    staleTime: 1000 * 60 * 60, // Cache for 1 hour
    retry: 3,
  });

  if (isLoading) {
    return (
      <div className="bg-surface-container-low border hairline rounded-none p-6 animate-pulse">
        <div className="h-5 w-3/4 bg-stone-300 rounded-none mb-3"></div>
        <div className="h-4 w-full bg-stone-300 rounded-none mb-2"></div>
        <div className="h-4 w-5/6 bg-stone-300 rounded-none mb-4"></div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="bg-surface-container-low border hairline rounded-none p-6 text-center text-on-surface-variant">
        <BookOpen size={24} className="mx-auto mb-2" />
        <p>Unable to load today's food fact. Please try again later.</p>
      </div>
    );
  }

  // Format date as "24 OCT" per design.md
  const formattedDate = (() => {
    const date = new Date(data.factDate);
    const day = date.getUTCDate();
    const month = date.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' });
    return `${day.toString().padStart(2, '0')} ${month}`;
  })();

  return (
    <div className="bg-surface-container-low border hairline rounded-none p-6 shadow-sm">
      {/* Date tag - from design.md */}
      <div className="flex items-center gap-2 mb-4">
        <div className="inline-flex items-center gap-1 px-3 py-1 text-xs font-bold uppercase tracking-widest bg-surface-dim text-on-surface-variant rounded-none">
          <Calendar size={14} />
          <span>{formattedDate}</span>
        </div>
      </div>

      {/* Title - serif display font */}
      <h3 className="text-xl font-display font-medium text-on-surface mb-3">
        {data.title}
      </h3>

      {/* Summary - body font */}
      <p className="text-on-surface-variant leading-relaxed mb-4">
        {data.summary}
      </p>

      {/* Wikipedia link - from design.md carousel/rotation indicators pattern */}
      {data.wikipediaUrl && (
        <a
          href={data.wikipediaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm text-primary hover:text-secondary transition-colors font-medium"
        >
          Read on Wikipedia
          <ExternalLink size={14} />
        </a>
      )}

      {/* Optional image */}
      {data.imageUrl && (
        <div className="mt-4">
          <img
            src={data.imageUrl}
            alt={data.title}
            className="w-full rounded-none object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
      )}
    </div>
  );
};