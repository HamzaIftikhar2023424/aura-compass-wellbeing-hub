
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from '@/components/ui/sonner';
import { feedbackService } from '@/services/api';

interface MoodSelectorProps {
  userId: number;
}

const MoodSelector: React.FC<MoodSelectorProps> = ({ userId }) => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const moods = [
    { value: 'happy', emoji: '😊', label: 'Happy' },
    { value: 'neutral', emoji: '😐', label: 'Neutral' },
    { value: 'sad', emoji: '😔', label: 'Sad' },
    { value: 'anxious', emoji: '😰', label: 'Anxious' },
    { value: 'tired', emoji: '😴', label: 'Tired' }
  ];

  const handleSelectMood = async (mood: string) => {
    setSelectedMood(mood);
    setIsSubmitting(true);
    
    try {
      const response = await feedbackService.getCurrentMood(userId, mood);
      setSuggestion(response.data.suggestion);
    } catch (error) {
      console.error("Error submitting mood:", error);
      setSuggestion("Take a moment to breathe deeply and be kind to yourself today.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>How are you feeling today?</CardTitle>
        <CardDescription>
          Select the emoji that best matches your current mood
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center space-x-4">
          {moods.map((mood) => (
            <Button
              key={mood.value}
              variant="ghost"
              onClick={() => handleSelectMood(mood.value)}
              className={`text-4xl p-2 ${
                selectedMood === mood.value
                ? "bg-mentora-teal/20 border-2 border-mentora-teal"
                : "hover:bg-mentora-teal/10"
              }`}
              aria-label={mood.label}
            >
              {mood.emoji}
            </Button>
          ))}
        </div>
        
        {suggestion && (
          <div className="mt-4 p-3 bg-mentora-cream rounded-md text-center animate-fade-in">
            {suggestion}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MoodSelector;
