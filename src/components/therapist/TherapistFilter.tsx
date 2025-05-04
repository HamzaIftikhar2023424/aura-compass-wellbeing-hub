
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FilterProps {
  filters: {
    specialty: string;
    language: string;
    day: string;
  };
  setFilters: React.Dispatch<React.SetStateAction<{
    specialty: string;
    language: string;
    day: string;
  }>>;
}

const TherapistFilter: React.FC<FilterProps> = ({ filters, setFilters }) => {
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-medium mb-4">Filter Therapists</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="specialty">Specialty</Label>
          <Input
            id="specialty"
            value={filters.specialty}
            onChange={(e) => setFilters({...filters, specialty: e.target.value})}
            placeholder="e.g., Anxiety, Depression, CBT"
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="language">Language</Label>
          <Input
            id="language"
            value={filters.language}
            onChange={(e) => setFilters({...filters, language: e.target.value})}
            placeholder="e.g., English, Spanish"
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="day">Availability</Label>
          <Select 
            value={filters.day} 
            onValueChange={(value) => setFilters({...filters, day: value})}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select day" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Any day</SelectItem>
              {daysOfWeek.map(day => (
                <SelectItem key={day} value={day}>{day}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default TherapistFilter;
