
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { goalsService } from '@/services/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useAuth } from '@/contexts/AuthContext';
import { Star, Award } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import BadgeDisplay from '@/components/goals/BadgeDisplay';

interface Goal {
  id: number;
  title: string;
  progress: number;
  total: number;
  completed: boolean;
}

interface Badge {
  id: number;
  name: string;
  description: string;
  dateEarned: string;
  iconName: string;
}

const GoalsAchievements = () => {
  const { user } = useAuth();
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['user-achievements', user?.id],
    queryFn: () => goalsService.getUserAchievements(user?.id || 0),
    enabled: !!user?.id
  });
  
  const achievements = data?.data || { badges: [], goals: [] };
  const { badges, goals } = achievements;
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Goals & Achievements</h1>
        <p className="text-mentora-subtext">
          Track your wellness journey and celebrate your progress
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Badges section */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-mentora-teal" />
                <CardTitle>Your Badges</CardTitle>
              </div>
              <CardDescription>
                Badges you've earned on your wellness journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-gray-100 dark:bg-gray-800 h-32 rounded-lg animate-pulse"></div>
                  ))}
                </div>
              ) : error ? (
                <p className="text-red-500 text-center py-8">Error loading badges. Please try again later.</p>
              ) : badges.length === 0 ? (
                <div className="text-center py-12">
                  <Award className="h-16 w-16 text-mentora-teal/30 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Badges Yet</h3>
                  <p className="text-mentora-subtext">
                    Start tracking your mood or journaling to earn your first badge!
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {badges.map((badge: Badge) => (
                    <BadgeDisplay key={badge.id} badge={badge} />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Stats and goals section */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-mentora-teal" />
                <CardTitle>Your Progress</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-gray-100 dark:bg-gray-800 h-16 rounded-lg animate-pulse"></div>
                  ))}
                </div>
              ) : error ? (
                <p className="text-red-500 text-center py-4">Error loading goals. Please try again.</p>
              ) : goals.length === 0 ? (
                <p className="text-center text-mentora-subtext py-4">No goals set yet.</p>
              ) : (
                <div className="space-y-6">
                  {goals.map((goal: Goal) => {
                    const percentage = Math.round((goal.progress / goal.total) * 100);
                    return (
                      <div key={goal.id}>
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex-1">
                            <h4 className="font-medium">{goal.title}</h4>
                            <p className="text-sm text-mentora-subtext">
                              {goal.progress} of {goal.total} completed
                            </p>
                          </div>
                          {goal.completed && (
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                              Completed
                            </Badge>
                          )}
                        </div>
                        <Progress value={percentage} className="h-2" />
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Wellness Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Card className="border-none bg-mentora-teal/10">
                  <CardContent className="p-4">
                    <p className="text-sm font-medium">Mood Check-ins</p>
                    <p className="text-3xl font-bold">{Math.floor(Math.random() * 20) + 5}</p>
                  </CardContent>
                </Card>
                <Card className="border-none bg-mentora-orange/10">
                  <CardContent className="p-4">
                    <p className="text-sm font-medium">Journal Entries</p>
                    <p className="text-3xl font-bold">{Math.floor(Math.random() * 15) + 3}</p>
                  </CardContent>
                </Card>
                <Card className="border-none bg-mentora-cream/50">
                  <CardContent className="p-4">
                    <p className="text-sm font-medium">Sessions Attended</p>
                    <p className="text-3xl font-bold">{Math.floor(Math.random() * 8) + 1}</p>
                  </CardContent>
                </Card>
                <Card className="border-none bg-mentora-teal/5">
                  <CardContent className="p-4">
                    <p className="text-sm font-medium">Current Streak</p>
                    <p className="text-3xl font-bold">{Math.floor(Math.random() * 10) + 1} days</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GoalsAchievements;
