
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Calendar, 
  MessageCircle, 
  Trash2, 
  Edit, 
  Plus, 
  X, 
  Check 
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { therapyService } from "@/services/api";
import { toast } from "@/hooks/use-toast";

interface TherapySessionData {
  id: number;
  user_name: string;
  mood: string;
  notes: string;
}

const TherapySessions = () => {
  const { user } = useAuth();
  const [sessions, setSessions] = useState<TherapySessionData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    id: null as number | null,
    userName: "",
    mood: "",
    notes: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchSessions = async () => {
    try {
      setIsLoading(true);
      // Note: This is a mock implementation since the API doesn't have a get-all endpoint
      // In a real implementation, you'd call an endpoint that returns all sessions
      const mockSessions = [
        { id: 1, user_name: user?.username || "Anonymous", mood: "Positive", notes: "Had a productive session discussing anxiety management techniques." },
        { id: 2, user_name: user?.username || "Anonymous", mood: "Neutral", mood: "Reflective", notes: "Explored childhood memories and their impact on current behaviors." }
      ];
      setSessions(mockSessions);
    } catch (error) {
      console.error("Error fetching therapy sessions:", error);
      toast({
        title: "Error",
        description: "Failed to load your therapy sessions",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, [user]);

  const handleFormSubmit = async () => {
    if (!formData.userName.trim() || !formData.mood.trim() || !formData.notes.trim()) {
      toast({
        title: "Missing information",
        description: "Please fill out all fields",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      
      if (formData.id) {
        // Update existing session
        await therapyService.updateSession(
          formData.id,
          formData.userName,
          formData.mood,
          formData.notes
        );
        
        setSessions(sessions.map(session => 
          session.id === formData.id ? {
            id: formData.id,
            user_name: formData.userName,
            mood: formData.mood,
            notes: formData.notes
          } : session
        ));
        
        toast({
          title: "Session updated",
          description: "Your therapy session has been updated successfully.",
        });
      } else {
        // Create new session
        const response = await therapyService.createSession(
          formData.userName,
          formData.mood,
          formData.notes
        );
        
        setSessions([...sessions, response.data]);
        
        toast({
          title: "Session created",
          description: "Your therapy session has been recorded successfully.",
        });
      }
      
      resetForm();
    } catch (error) {
      console.error("Error saving therapy session:", error);
      toast({
        title: "Error",
        description: "Failed to save your therapy session",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteSession = async (id: number) => {
    try {
      await therapyService.deleteSession(id);
      setSessions(sessions.filter(session => session.id !== id));
      
      toast({
        title: "Session deleted",
        description: "Your therapy session has been removed.",
      });
    } catch (error) {
      console.error("Error deleting therapy session:", error);
      toast({
        title: "Error",
        description: "Failed to delete the therapy session",
        variant: "destructive",
      });
    }
  };

  const handleEditSession = (session: TherapySessionData) => {
    setFormData({
      id: session.id,
      userName: session.user_name,
      mood: session.mood,
      notes: session.notes
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      id: null,
      userName: user?.username || "",
      mood: "",
      notes: ""
    });
    setShowForm(false);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Therapy Sessions</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Track and manage your therapy sessions
              </p>
            </div>
            <Button 
              onClick={() => {
                resetForm(); 
                setShowForm(!showForm);
              }}
              className="bg-cyan-500 hover:bg-cyan-600 flex items-center"
            >
              {showForm ? (
                <>
                  <X className="mr-2 h-4 w-4" /> Cancel
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" /> New Session
                </>
              )}
            </Button>
          </div>

          {/* Session Form */}
          {showForm && (
            <Card className="mb-10 bg-white dark:bg-gray-800 border-none shadow-md">
              <CardHeader>
                <CardTitle>{formData.id ? "Edit Session" : "New Therapy Session"}</CardTitle>
                <CardDescription>
                  {formData.id 
                    ? "Update the details of your therapy session" 
                    : "Record details about your therapy session"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="userName">Your Name</Label>
                  <Input
                    id="userName"
                    value={formData.userName}
                    onChange={(e) => setFormData({...formData, userName: e.target.value})}
                    placeholder="Enter your name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="mood">Mood</Label>
                  <Input
                    id="mood"
                    value={formData.mood}
                    onChange={(e) => setFormData({...formData, mood: e.target.value})}
                    placeholder="How were you feeling? (e.g., Hopeful, Anxious)"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="notes">Session Notes</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    placeholder="What was discussed? What insights did you gain?"
                    className="min-h-[150px]"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={resetForm}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleFormSubmit} 
                  disabled={isSubmitting}
                  className="bg-cyan-500 hover:bg-cyan-600"
                >
                  {isSubmitting ? "Saving..." : (formData.id ? "Update Session" : "Save Session")}
                </Button>
              </CardFooter>
            </Card>
          )}

          {/* Sessions List */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Your Sessions</h2>
            <p className="text-gray-600 dark:text-gray-400">Review your therapy progress</p>
          </div>

          {isLoading ? (
            <div className="flex justify-center my-10">
              <div className="animate-pulse rounded-full bg-cyan-400 h-12 w-12"></div>
            </div>
          ) : sessions.length > 0 ? (
            <div className="space-y-4">
              {sessions.map((session) => (
                <Card key={session.id} className="bg-white dark:bg-gray-800 border-none shadow-md">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center mr-4">
                          <MessageCircle className="h-5 w-5 text-cyan-500" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{session.user_name}</CardTitle>
                          <CardDescription className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" /> 
                            Session {session.id}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleEditSession(session)}
                          className="text-gray-500 hover:text-cyan-500"
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button 
                          onClick={() => handleDeleteSession(session.id)}
                          className="text-gray-500 hover:text-red-500"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <span className="font-semibold">Mood:</span> {session.mood}
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <p className="whitespace-pre-wrap">{session.notes}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-white dark:bg-gray-800 border-none text-center p-10 shadow-md">
              <p className="text-gray-500">No therapy sessions recorded yet. Create your first session!</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default TherapySessions;
