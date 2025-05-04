
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface QuoteProps {
  quote: {
    id: number;
    quote: string;
    author: string;
  };
}

const QuoteCard: React.FC<QuoteProps> = ({ quote }) => {
  return (
    <Card className="h-full border border-mentora-teal/20 shadow-md bg-white dark:bg-gray-800 transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px]">
      <CardContent className="p-6 flex flex-col h-full relative overflow-hidden">
        <div className="absolute top-[-20px] left-[-10px] text-7xl text-mentora-teal/10 dark:text-mentora-teal/5 font-serif transform rotate-12 animate-pulse-gentle">"</div>
        <div className="text-4xl text-mentora-teal font-serif mb-2 animate-fade-in">"</div>
        <p className="flex-grow text-lg italic mb-4 animate-fade-in delay-100">{quote.quote}</p>
        <footer className="text-right text-mentora-subtext font-medium animate-fade-in delay-200">
          — {quote.author}
        </footer>
      </CardContent>
    </Card>
  );
};

export default QuoteCard;
