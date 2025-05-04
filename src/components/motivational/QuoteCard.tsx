
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
    <Card className="h-full border border-mentora-teal/20 shadow-md bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px] group overflow-hidden">
      <CardContent className="p-6 flex flex-col h-full relative overflow-hidden">
        <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-gradient-to-br from-mentora-teal/10 to-mentora-orange/10 filter blur-xl group-hover:blur-lg transition-all duration-500"></div>
        <div className="absolute top-[-20px] left-[-10px] text-7xl text-mentora-teal/10 dark:text-mentora-teal/5 font-serif transform rotate-12 animate-pulse-gentle">"</div>
        <div className="text-4xl text-mentora-teal font-serif mb-2 animate-fade-in">"</div>
        <p className="flex-grow text-lg italic mb-4 animate-fade-in delay-100 relative z-10">{quote.quote}</p>
        <footer className="text-right text-mentora-subtext font-medium animate-fade-in delay-200 relative z-10">
          — {quote.author}
        </footer>
        <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-mentora-orange/10 to-transparent rounded-tl-3xl"></div>
      </CardContent>
    </Card>
  );
};

export default QuoteCard;
