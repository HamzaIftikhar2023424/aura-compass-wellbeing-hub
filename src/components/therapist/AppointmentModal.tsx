
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from '@/components/ui/sonner';
import { therapistService } from '@/services/api';

interface Therapist {
  id: number;
  name: string;
  specialty: string;
  languages: string[];
  availability: string[];
  imageUrl: string;
}

interface AppointmentModalProps {
  therapist: Therapist;
  onClose: () => void;
  userId: number;
}

const AppointmentModal: React.FC<AppointmentModalProps> = ({ therapist, onClose, userId }) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generate available time slots (in a real app, this would come from the API)
  const availableTimes = ["09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"];

  const handleSubmit = async () => {
    if (!date || !time) {
      toast.error("Please select both date and time");
      return;
    }

    setIsSubmitting(true);
    try {
      const formattedDate = format(date, 'yyyy-MM-dd');
      await therapistService.bookAppointment(therapist.id, formattedDate, time, userId);
      toast.success("Appointment booked successfully!");
      onClose();
    } catch (error) {
      console.error("Error booking appointment:", error);
      toast.error("Failed to book appointment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Book an Appointment</DialogTitle>
          <DialogDescription>
            Schedule a session with {therapist.name}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="flex flex-col items-center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={(date) => {
                const day = format(date, 'EEEE');
                return (
                  date < new Date() || // Can't book in the past
                  !therapist.availability.includes(day) // Therapist not available on this day
                );
              }}
              className="border rounded-md"
            />
          </div>
          
          {date && (
            <div className="space-y-2">
              <Label htmlFor="time">Select a time</Label>
              <Select value={time} onValueChange={setTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {availableTimes.map((timeOption) => (
                    <SelectItem key={timeOption} value={timeOption}>
                      {timeOption}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={!date || !time || isSubmitting}
            className="bg-mentora-teal hover:bg-mentora-teal/90 text-white"
          >
            {isSubmitting ? "Booking..." : "Book Appointment"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentModal;
