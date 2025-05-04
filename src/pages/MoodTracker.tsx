
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Smile, Meh, Frown, TrendingUp, Calendar } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { moodService } from "@/services/api";
import { toast } from "@/hooks/use-toast";

interface MoodEntry {
  id: number;
  mood: string;
  timestamp: string;
}

const moodOptions = [
  { value: "Happy", icon: <Smile className="h-8 w-8" />, color: "bg-green-100 text-green-500" },
  { value: "Neutral", icon: <Meh className="h-8 w-8" />, color: "bg-yellow-100 text-yellow-500" },
  { value: "Sad", icon: <Frown className="h-8 w-8" />, color: "bg-blue-100 text-blue-500" },
  { value: "Anxious", icon: <TrendingUp className="h-8 w-8 rotate-45" />, color: "bg-orange-100 text-orange-500" },
  { value: "Energetic", icon: <TrendingUp className="h-8 w-8" />, color: "bg-purple-100 text-purple-500" },
];

const MoodTracker = () => {
  const { user } = useAuth();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMoods = async () => {
      try {
        setIsLoading(true);
        const response = await moodService.getMoods();
        setMoodHistory(response.data || []);
      } catch (error) {
        console.error("Error fetching mood history:", error);
        toast({
          title: "Error",
          description: "Failed to load your mood history",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchMoods();
  }, []);

  const handleMoodSubmit = async () => {
    if (!selectedMood || !user) return;

    try {
      setIsSubmitting(true);
      await moodService.createMood(selectedMood, user.id);
      
      // Update the local state with the new mood
      const newMood = {
        id: Date.now(), // Temporary ID until we refetch
        mood: selectedMood,
        timestamp: new Date().toISOString(),
      };
      
      setMoodHistory([newMood, ...moodHistory]);
      setSelectedMood(null);
      
      toast({
        title: "Mood recorded",
        description: `You're feeling ${selectedMood} today.`,
      });
    } catch (error) {
      console.error("Error submitting mood:", error);
      toast({
        title: "Error",
        description: "Failed to record your mood",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <h1 className="text-3xl font-bold">Mood Tracker</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Track and monitor how you're feeling over time
            </p>
          </div>

          {/* Mood Selection */}
          <Card className="mb-10 bg-white dark:bg-gray-800 border-none shadow-md">
            <CardHeader>
              <CardTitle>How are you feeling today?</CardTitle>
              <CardDescription>Select the mood that best represents how you feel right now</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {moodOptions.map((mood) => (
                  <button
                    key={mood.value}
                    onClick={() => setSelectedMood(mood.value)}
                    className={`flex flex-col items-center p-4 rounded-lg transition-all ${
                      selectedMood === mood.value
                        ? `ring-2 ring-cyan-500 ${mood.color}`
                        : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      selectedMood === mood.value ? mood.color : "bg-gray-200 dark:bg-gray-600"
                    }`}>
                      {mood.icon}
                    </div>
                    <Label className="mt-2">{mood.value}</Label>
                  </button>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleMoodSubmit} 
                disabled={!selectedMood || isSubmitting}
                className="w-full bg-cyan-500 hover:bg-cyan-600"
              >
                {isSubmitting ? "Recording..." : "Record Mood"}
              </Button>
            </CardFooter>
          </Card>

          {/* Mood History */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Your Mood History</h2>
            <p className="text-gray-600 dark:text-gray-400">Track your emotional patterns over time</p>
          </div>

          {isLoading ? (
            <div className="flex justify-center my-10">
              <div className="animate-pulse rounded-full bg-cyan-400 h-12 w-12"></div>
            </div>
          ) : moodHistory.length > 0 ? (
            <div className="space-y-4">
              {moodHistory.map((entry) => (
                <Card key={entry.id} className="bg-white dark:bg-gray-800 border-none shadow-md">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center mr-4">
                        <Calendar className="h-5 w-5 text-cyan-500" />
                      </div>
                      <div>
                        <p className="font-medium">{entry.mood}</p>
                        <p className="text-gray-500 text-sm">{formatDate(entry.timestamp)}</p>
                      </div>
                    </div>
                    
                    {/* Mood icon based on the mood value */}
                    <div className="w-10 h-10 rounded-full flex items-center justify-center">
                      {moodOptions.find(m => m.value === entry.mood)?.icon || 
                       <Meh className="h-5 w-5 text-gray-500" />}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-white dark:bg-gray-800 border-none text-center p-10 shadow-md">
              <p className="text-gray-500">No mood entries yet. Start tracking your mood today!</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoodTracker;
