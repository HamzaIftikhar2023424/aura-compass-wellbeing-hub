
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { motivationalService } from '@/services/api';
import { Card, CardContent } from "@/components/ui/card";

interface Quote {
  id: number;
  quote: string;
  author: string;
}

const DailyQuote = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['daily-quote'],
    queryFn: motivationalService.getDailyQuote
  });
  
  const quote = data?.data as Quote | undefined;

  return (
    <Card className="bg-gradient-to-r from-mentora-teal/10 via-mentora-teal/5 to-transparent border-mentora-teal/20 shadow-md">
      <CardContent className="p-8">
        <h2 className="text-xl font-semibold mb-6">Quote of the Day</h2>
        
        {isLoading ? (
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mt-6"></div>
          </div>
        ) : quote ? (
          <div className="space-y-4">
            <p className="text-2xl font-light italic leading-relaxed">"{quote.quote}"</p>
            <p className="text-right text-lg font-medium text-mentora-teal">— {quote.author}</p>
          </div>
        ) : (
          <p>Failed to load today's quote. Please try again later.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default DailyQuote;
