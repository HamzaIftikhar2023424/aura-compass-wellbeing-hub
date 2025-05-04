
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { therapistService } from '@/services/api';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from '@/components/ui/sonner';
import { format } from 'date-fns';
import { CalendarIcon, Users, MessageSquare } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import TherapistCard from '@/components/therapist/TherapistCard';
import TherapistFilter from '@/components/therapist/TherapistFilter';
import AppointmentModal from '@/components/therapist/AppointmentModal';
import ChatbotSupport from '@/components/therapist/ChatbotSupport';

interface Therapist {
  id: number;
  name: string;
  specialty: string;
  languages: string[];
  availability: string[];
  imageUrl: string;
}

const TherapistDirectory = () => {
  const { user } = useAuth();
  const [selectedTherapist, setSelectedTherapist] = useState<Therapist | null>(null);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [filters, setFilters] = useState({
    specialty: '',
    language: '',
    day: ''
  });

  const { data: therapistsData, isLoading, error } = useQuery({
    queryKey: ['therapists'],
    queryFn: therapistService.getTherapists
  });

  const filteredTherapists = therapistsData?.data?.filter((therapist: Therapist) => {
    return (
      (filters.specialty === '' || therapist.specialty.toLowerCase().includes(filters.specialty.toLowerCase())) &&
      (filters.language === '' || therapist.languages.some(lang => lang.toLowerCase().includes(filters.language.toLowerCase()))) &&
      (filters.day === '' || therapist.availability.includes(filters.day))
    );
  }) || [];

  const handleBookAppointment = (therapist: Therapist) => {
    setSelectedTherapist(therapist);
    setShowAppointmentModal(true);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Connect with Therapists</h1>
        <p className="text-mentora-subtext">
          Find the right mental health professional for your needs. Filter by specialty, languages spoken, or availability.
        </p>
      </div>

      {/* Support Button */}
      <div className="flex justify-end mb-6">
        <Button 
          onClick={() => setShowChatbot(true)}
          className="bg-mentora-teal hover:bg-mentora-teal/90 text-white flex items-center gap-2"
        >
          <MessageSquare size={18} />
          <span>Need urgent support?</span>
        </Button>
      </div>

      {/* Filters */}
      <TherapistFilter filters={filters} setFilters={setFilters} />

      {/* Therapist Listing */}
      <div className="mt-8">
        <div className="flex items-center mb-4">
          <Users className="mr-2 h-5 w-5 text-mentora-teal" />
          <h2 className="text-xl font-semibold">Available Therapists</h2>
          <Badge variant="outline" className="ml-2">{filteredTherapists.length}</Badge>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="bg-white/50 shadow-md animate-pulse">
                <div className="h-64"></div>
              </Card>
            ))}
          </div>
        ) : error ? (
          <p className="text-red-500">Error loading therapists. Please try again later.</p>
        ) : filteredTherapists.length === 0 ? (
          <p className="text-center py-8 text-mentora-subtext">No therapists found matching your criteria. Please adjust your filters.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTherapists.map((therapist: Therapist) => (
              <TherapistCard 
                key={therapist.id} 
                therapist={therapist} 
                onBook={() => handleBookAppointment(therapist)} 
              />
            ))}
          </div>
        )}
      </div>

      {/* Appointment Modal */}
      {showAppointmentModal && selectedTherapist && (
        <AppointmentModal
          therapist={selectedTherapist}
          onClose={() => setShowAppointmentModal(false)}
          userId={user?.id || 0}
        />
      )}

      {/* Chatbot Support */}
      {showChatbot && (
        <ChatbotSupport onClose={() => setShowChatbot(false)} />
      )}
    </div>
  );
};

export default TherapistDirectory;
