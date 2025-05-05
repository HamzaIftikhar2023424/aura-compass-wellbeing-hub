import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Book, ChevronDown, ChevronUp, Calendar } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { journalService } from "@/services/api";
import { toast } from "@/hooks/use-toast";

interface JournalEntry {
  id: number;
  content: string;
  timestamp: string;
}

const Journal = () => {
  const { user } = useAuth();
  const [journalContent, setJournalContent] = useState("");
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedEntryId, setExpandedEntryId] = useState<number | null>(null);

  useEffect(() => {
    const fetchJournalEntries = async () => {
      if (!user) return;
      
      try {
        setIsLoading(true);
        const response = await journalService.getJournals(user.id);
        setJournalEntries(response.data || []);
      } catch (error) {
        console.error("Error fetching journal entries:", error);
        toast({
          title: "Error",
          description: "Failed to load your journal entries",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchJournalEntries();
  }, [user]);

  const handleJournalSubmit = async () => {
    if (!journalContent.trim() || !user) return;

    try {
      setIsSubmitting(true);
      await journalService.createJournal(journalContent, user.id);
      
      // Update the local state with the new entry
      const newEntry = {
        id: Date.now(), // Temporary ID until we refetch
        content: journalContent,
        timestamp: new Date().toISOString(),
      };
      
      setJournalEntries([newEntry, ...journalEntries]);
      setJournalContent("");
      
      toast({
        title: "Journal entry saved",
        description: "Your thoughts have been recorded.",
      });
    } catch (error) {
      console.error("Error submitting journal entry:", error);
      toast({
        title: "Error",
        description: "Failed to save your journal entry",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const toggleEntryExpansion = (entryId: number) => {
    if (expandedEntryId === entryId) {
      setExpandedEntryId(null);
    } else {
      setExpandedEntryId(entryId);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <h1 className="text-3xl font-bold">Journal</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Express and explore your thoughts and feelings
            </p>
          </div>

          {/* New Journal Entry */}
          <Card className="mb-10 bg-white dark:bg-gray-800 border-none shadow-md">
            <CardHeader>
              <CardTitle>Write a New Entry</CardTitle>
              <CardDescription>What's on your mind today?</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Start writing here..."
                className="min-h-[200px] resize-none"
                value={journalContent}
                onChange={(e) => setJournalContent(e.target.value)}
              />
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleJournalSubmit} 
                disabled={!journalContent.trim() || isSubmitting}
                className="w-full bg-cyan-500 hover:bg-cyan-600"
              >
                {isSubmitting ? "Saving..." : "Save Entry"}
              </Button>
            </CardFooter>
          </Card>

          {/* Journal History */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Your Journal History</h2>
            <p className="text-gray-600 dark:text-gray-400">Review your previous entries</p>
          </div>

          {isLoading ? (
            <div className="flex justify-center my-10">
              <div className="animate-pulse rounded-full bg-cyan-400 h-12 w-12"></div>
            </div>
          ) : journalEntries.length > 0 ? (
            <div className="space-y-4">
              {journalEntries.map((entry) => (
                <Card key={entry.id} className="bg-white dark:bg-gray-800 border-none shadow-md">
                  <CardHeader className="p-4 pb-2 cursor-pointer" onClick={() => toggleEntryExpansion(entry.id)}>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center mr-4">
                          <Book className="h-5 w-5 text-cyan-500" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">Journal Entry</CardTitle>
                          <CardDescription>{formatDate(entry.timestamp)}</CardDescription>
                        </div>
                      </div>
                      {expandedEntryId === entry.id ? 
                        <ChevronUp className="h-5 w-5 text-gray-500" /> : 
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      }
                    </div>
                  </CardHeader>
                  {expandedEntryId === entry.id && (
                    <CardContent className="p-4 pt-2">
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                        <p className="whitespace-pre-wrap">{entry.content}</p>
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-white dark:bg-gray-800 border-none text-center p-10 shadow-md">
              <p className="text-gray-500">No journal entries yet. Start expressing yourself today!</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Journal;
