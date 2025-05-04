
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/AuthContext";
import { moodService, journalService } from "@/services/api";
import { CalendarCheck, Book, MessageCircle, TrendingUp, Clock } from "lucide-react";

interface MoodEntry {
  id: number;
  mood: string;
  timestamp: string;
}

interface JournalEntry {
  id: number;
  content: string;
  timestamp: string;
}

const Dashboard = () => {
  const { user } = useAuth();
  const [moods, setMoods] = useState<MoodEntry[]>([]);
  const [journals, setJournals] = useState<JournalEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Fetch user's mood and journal data
        const [moodsResponse, journalsResponse] = await Promise.all([
          moodService.getMoods(),
          journalService.getJournals()
        ]);
        
        setMoods(moodsResponse.data || []);
        setJournals(journalsResponse.data || []);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const getLatestMood = () => {
    if (moods.length === 0) return null;
    return moods[0].mood;
  };

  const getStreakCount = () => {
    // Simple placeholder for streak counting logic
    return moods.length;
  };

  const getCompletionPercentage = () => {
    // Placeholder for completion percentage calculation
    const totalTasks = 3; // Mood, Journal, Therapy
    let completed = 0;
    
    if (moods.length > 0) completed++;
    if (journals.length > 0) completed++;
    
    return Math.round((completed / totalTasks) * 100);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-10">
          <h1 className="text-3xl font-bold">Welcome back, {user?.username}</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Track your progress and continue your wellness journey
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center">
            <div className="animate-pulse rounded-full bg-cyan-400 h-12 w-12"></div>
          </div>
        ) : (
          <>
            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <Card className="bg-white dark:bg-gray-800 border-none shadow-md">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Today's Mood</CardTitle>
                    <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center">
                      <TrendingUp className="h-5 w-5 text-cyan-500" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{getLatestMood() || 'Not tracked yet'}</p>
                  <Link to="/mood" className="text-cyan-500 hover:underline text-sm flex items-center mt-2">
                    Track today's mood <CalendarCheck className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 border-none shadow-md">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Daily Streak</CardTitle>
                    <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center">
                      <Clock className="h-5 w-5 text-cyan-500" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{getStreakCount()} days</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                    Keep the momentum going!
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 border-none shadow-md">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Daily Progress</CardTitle>
                    <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center">
                      <CalendarCheck className="h-5 w-5 text-cyan-500" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Progress value={getCompletionPercentage()} className="mb-2" />
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {getCompletionPercentage()}% of daily activities completed
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Activities Section */}
            <h2 className="text-2xl font-bold mb-6">Your Wellness Activities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-cyan-50 to-white dark:from-gray-800 dark:to-gray-700 border-none shadow-md">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center">
                      <TrendingUp className="h-5 w-5 text-cyan-500" />
                    </div>
                    <div>
                      <CardTitle>Mood Tracker</CardTitle>
                      <CardDescription>Track how you're feeling</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Tracking your mood helps identify patterns and triggers that affect your well-being.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link to="/mood" className="w-full">
                    <Button className="w-full bg-cyan-500 hover:bg-cyan-600">
                      Track Mood
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card className="bg-gradient-to-br from-cyan-50 to-white dark:from-gray-800 dark:to-gray-700 border-none shadow-md">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center">
                      <Book className="h-5 w-5 text-cyan-500" />
                    </div>
                    <div>
                      <CardTitle>Journal</CardTitle>
                      <CardDescription>Express your thoughts</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Regular journaling helps process emotions and gain clarity about your experiences.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link to="/journal" className="w-full">
                    <Button className="w-full bg-cyan-500 hover:bg-cyan-600">
                      Write Entry
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card className="bg-gradient-to-br from-cyan-50 to-white dark:from-gray-800 dark:to-gray-700 border-none shadow-md">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center">
                      <MessageCircle className="h-5 w-5 text-cyan-500" />
                    </div>
                    <div>
                      <CardTitle>Therapy Sessions</CardTitle>
                      <CardDescription>Professional guidance</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Track your therapy sessions and notes to maximize benefits from professional support.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link to="/therapy" className="w-full">
                    <Button className="w-full bg-cyan-500 hover:bg-cyan-600">
                      Manage Sessions
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
