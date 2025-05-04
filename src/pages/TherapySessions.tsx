
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { therapyService } from '@/services/api';

interface TherapySession {
  id: number;
  user_name: string;
  mood: string;
  notes: string;
}

const TherapySessions = () => {
  const { toast } = useToast();
  const [sessions, setSessions] = useState<TherapySession[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    id: 0,
    user_name: '',
    mood: 'calm',
    notes: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  const fetchSessions = async () => {
    // This is a mock function since the API doesn't have a get all sessions endpoint
    // In a real application, you would call the API to get all sessions
    setIsLoading(true);
    try {
      // Mock data - in real app, this would come from API
      const mockSessions = [
        { id: 1, user_name: "Jane Doe", mood: "happy", notes: "Great progress today!" },
        { id: 2, user_name: "John Smith", mood: "anxious", notes: "Discussed coping strategies for stress." }
      ];
      setSessions(mockSessions);
    } catch (error) {
      console.error("Error fetching sessions:", error);
      toast({
        title: "Error",
        description: "Could not fetch therapy sessions.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSelectChange = (value: string) => {
    setFormData({
      ...formData,
      mood: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isEditing) {
        await therapyService.updateSession(
          formData.id,
          formData.user_name,
          formData.mood,
          formData.notes
        );
        toast({
          title: "Success",
          description: "Therapy session updated successfully!",
        });
      } else {
        await therapyService.createSession(
          formData.user_name,
          formData.mood,
          formData.notes
        );
        toast({
          title: "Success",
          description: "New therapy session created!",
        });
      }

      // Reset form and refresh sessions
      setFormData({ id: 0, user_name: '', mood: 'calm', notes: '' });
      setIsEditing(false);
      fetchSessions();
    } catch (error) {
      console.error("Error saving session:", error);
      toast({
        title: "Error",
        description: isEditing ? "Failed to update session" : "Failed to create session",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (session: TherapySession) => {
    setFormData({
      id: session.id,
      user_name: session.user_name,
      mood: session.mood,
      notes: session.notes
    });
    setIsEditing(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this session?")) {
      setIsLoading(true);
      try {
        await therapyService.deleteSession(id);
        toast({
          title: "Success",
          description: "Therapy session deleted successfully!",
        });
        fetchSessions();
      } catch (error) {
        console.error("Error deleting session:", error);
        toast({
          title: "Error",
          description: "Failed to delete session",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleCancel = () => {
    setFormData({ id: 0, user_name: '', mood: 'calm', notes: '' });
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Therapy Sessions</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>{isEditing ? "Edit Session" : "New Therapy Session"}</CardTitle>
              <CardDescription>
                {isEditing 
                  ? "Update the details of this therapy session"
                  : "Record a new therapy session with notes and mood tracking"}
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div>
                  <label htmlFor="user_name" className="block text-sm font-medium mb-1">
                    Client Name
                  </label>
                  <Input
                    id="user_name"
                    name="user_name"
                    value={formData.user_name}
                    onChange={handleInputChange}
                    placeholder="Enter client name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="mood" className="block text-sm font-medium mb-1">
                    Mood
                  </label>
                  <Select 
                    value={formData.mood} 
                    onValueChange={handleSelectChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select mood" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="happy">Happy</SelectItem>
                      <SelectItem value="calm">Calm</SelectItem>
                      <SelectItem value="anxious">Anxious</SelectItem>
                      <SelectItem value="sad">Sad</SelectItem>
                      <SelectItem value="angry">Angry</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label htmlFor="notes" className="block text-sm font-medium mb-1">
                    Session Notes
                  </label>
                  <Textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Enter session notes..."
                    rows={5}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                {isEditing && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={handleCancel}
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                )}
                <Button 
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? 'Saving...' : isEditing ? 'Update Session' : 'Create Session'}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Recent Sessions</h2>
          {isLoading ? (
            <div className="flex justify-center">
              <div className="animate-pulse rounded-full bg-cyan-400 h-12 w-12"></div>
            </div>
          ) : sessions.length === 0 ? (
            <p className="text-gray-500">No therapy sessions found.</p>
          ) : (
            sessions.map((session) => (
              <Card key={session.id} className="border-l-4 border-l-cyan-500">
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <CardTitle>{session.user_name}</CardTitle>
                    <span className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700">
                      {session.mood}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-gray-600 dark:text-gray-300">{session.notes}</p>
                </CardContent>
                <CardFooter className="flex justify-end space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleEdit(session)}
                  >
                    Edit
                  </Button>
                  <Button 
                    size="sm" 
                    variant="destructive"
                    onClick={() => handleDelete(session.id)}
                  >
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TherapySessions;
