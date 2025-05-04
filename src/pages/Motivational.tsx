
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { motivationalService } from '@/services/api';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Bell } from 'lucide-react';
import QuoteCard from '@/components/motivational/QuoteCard';
import DailyQuote from '@/components/motivational/DailyQuote';
import BreathingExercise from '@/components/motivational/BreathingExercise';

interface Quote {
  id: number;
  quote: string;
  author: string;
}

const Motivational = () => {
  const { data: quotesData, isLoading: isLoadingQuotes } = useQuery({
    queryKey: ['motivational-quotes'],
    queryFn: motivationalService.getQuotes
  });
  
  const quotes = quotesData?.data || [];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Motivational Content</h1>
        <p className="text-mentora-subtext">
          Daily inspiration to support your mental wellness journey
        </p>
      </div>
      
      {/* Daily Quote Section */}
      <div className="mb-12">
        <DailyQuote />
      </div>
      
      {/* Quote Carousel */}
      <div className="mb-12">
        <div className="flex items-center mb-6">
          <Bell className="mr-2 h-5 w-5 text-mentora-teal" />
          <h2 className="text-2xl font-semibold">Inspirational Quotes</h2>
        </div>
        
        {isLoadingQuotes ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6 h-40"></CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Carousel className="w-full">
            <CarouselContent>
              {quotes.map((quote: Quote) => (
                <CarouselItem key={quote.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                  <QuoteCard quote={quote} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-6">
              <CarouselPrevious className="relative mr-2 translate-y-0" />
              <CarouselNext className="relative ml-2 translate-y-0" />
            </div>
          </Carousel>
        )}
      </div>
      
      {/* Breathing Exercise */}
      <div className="mb-12">
        <BreathingExercise />
      </div>
      
      {/* Wellness Tips */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-6">Today's Wellness Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-mentora-teal/10 border-none shadow-sm">
            <CardContent className="p-6">
              <h3 className="font-medium text-lg mb-2">Stay Hydrated</h3>
              <p>Drinking enough water can improve your mood and cognitive function. Aim for 8 glasses a day.</p>
            </CardContent>
          </Card>
          <Card className="bg-mentora-orange/10 border-none shadow-sm">
            <CardContent className="p-6">
              <h3 className="font-medium text-lg mb-2">Take Movement Breaks</h3>
              <p>Regular short walks or stretches can boost your energy and focus. Try to move for 5 minutes every hour.</p>
            </CardContent>
          </Card>
          <Card className="bg-mentora-cream border-none shadow-sm">
            <CardContent className="p-6">
              <h3 className="font-medium text-lg mb-2">Practice Gratitude</h3>
              <p>Take a moment to write down three things you're grateful for today. This simple practice can shift your mindset.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Motivational;
