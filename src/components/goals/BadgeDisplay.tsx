
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { format, parseISO } from 'date-fns';
import { Award, Book, TrendingUp, Heart } from 'lucide-react';

interface BadgeProps {
  badge: {
    id: number;
    name: string;
    description: string;
    dateEarned: string;
    iconName: string;
  };
}

const BadgeDisplay: React.FC<BadgeProps> = ({ badge }) => {
  const renderIcon = () => {
    switch (badge.iconName) {
      case 'book':
        return <Book className="h-8 w-8 text-mentora-teal" />;
      case 'trending-up':
        return <TrendingUp className="h-8 w-8 text-mentora-orange" />;
      case 'heart':
        return <Heart className="h-8 w-8 text-pink-500" />;
      default:
        return <Award className="h-8 w-8 text-mentora-teal" />;
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card className="border border-mentora-teal/20 hover:border-mentora-teal transition-colors cursor-help">
            <CardContent className="p-4 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-mentora-cream flex items-center justify-center mb-3">
                {renderIcon()}
              </div>
              <h4 className="font-medium mb-1">{badge.name}</h4>
              <p className="text-xs text-mentora-subtext">
                Earned on {format(parseISO(badge.dateEarned), 'MMMM d, yyyy')}
              </p>
            </CardContent>
          </Card>
        </TooltipTrigger>
        <TooltipContent>
          <p>{badge.description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default BadgeDisplay;
