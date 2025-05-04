
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon } from 'lucide-react';

interface Therapist {
  id: number;
  name: string;
  specialty: string;
  languages: string[];
  availability: string[];
  imageUrl: string;
}

interface TherapistCardProps {
  therapist: Therapist;
  onBook: () => void;
}

const TherapistCard: React.FC<TherapistCardProps> = ({ therapist, onBook }) => {
  return (
    <Card className="overflow-hidden border border-mentora-teal/20 shadow-md transition-all hover:shadow-lg">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={therapist.imageUrl} 
          alt={therapist.name} 
          className="object-cover w-full h-full"
        />
      </div>
      <CardHeader className="pb-2">
        <CardTitle>{therapist.name}</CardTitle>
        <CardDescription className="text-mentora-teal font-medium">
          {therapist.specialty}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <p className="text-sm font-medium mb-1">Languages:</p>
          <div className="flex flex-wrap gap-1">
            {therapist.languages.map((language, index) => (
              <Badge key={index} variant="outline" className="bg-mentora-cream text-mentora-text">
                {language}
              </Badge>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-medium mb-1">Available on:</p>
          <div className="flex flex-wrap gap-1">
            {therapist.availability.map((day, index) => (
              <Badge key={index} variant="outline" className="bg-mentora-teal/10 text-mentora-text">
                {day}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={onBook}
          className="w-full bg-mentora-teal hover:bg-mentora-teal/90 text-white"
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          Book Appointment
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TherapistCard;
