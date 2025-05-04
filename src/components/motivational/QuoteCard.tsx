
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
    <Card className="h-full border border-mentora-teal/20 shadow-md bg-white dark:bg-gray-800">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="text-4xl text-mentora-teal font-serif mb-2">"</div>
        <p className="flex-grow text-lg italic mb-4">{quote.quote}</p>
        <footer className="text-right text-mentora-subtext font-medium">
          — {quote.author}
        </footer>
      </CardContent>
    </Card>
  );
};

export default QuoteCard;
