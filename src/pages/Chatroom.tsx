
import React, { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { chatroomService } from '@/services/api';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format, parseISO } from 'date-fns';
import { toast } from '@/components/ui/sonner';
import { useAuth } from '@/contexts/AuthContext';
import { MessageSquare } from 'lucide-react';

interface Message {
  id: number;
  userId: number;
  username: string;
  message: string;
  timestamp: string;
}

const Chatroom = () => {
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['chatroom-messages'],
    queryFn: chatroomService.getMessages
  });
  
  const messages = data?.data || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSendMessage = async () => {
    if (!message.trim() || !user) return;
    
    setSending(true);
    try {
      await chatroomService.sendMessage(user.id || 0, user.username || 'Anonymous', message);
      setMessage('');
      refetch();
      toast.success("Message sent successfully!");
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setSending(false);
    }
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };
  
  const getRandomColor = (id: number) => {
    const colors = ['bg-mentora-teal text-white', 'bg-mentora-orange text-white', 'bg-mentora-cream text-mentora-text'];
    return colors[id % colors.length];
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Community Chatroom</h1>
        <p className="text-mentora-subtext">
          Connect with others and share your experiences
        </p>
      </div>
      
      <Card className="border border-mentora-teal/20">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <MessageSquare className="h-5 w-5 text-mentora-teal" />
            <CardTitle>Live Chat</CardTitle>
          </div>
          <CardDescription>
            Chat with other community members about your mental health journey.
            Please be respectful and supportive.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[500px] flex flex-col">
            <div className="flex-grow overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900 rounded-md mb-4">
              {isLoading ? (
                <div className="flex justify-center items-center h-full">
                  <div className="animate-pulse rounded-full bg-mentora-teal h-12 w-12"></div>
                </div>
              ) : error ? (
                <div className="flex justify-center items-center h-full text-red-500">
                  Error loading messages. Please try again.
                </div>
              ) : messages.length === 0 ? (
                <div className="flex justify-center items-center h-full text-mentora-subtext">
                  No messages yet. Be the first to share!
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((msg: Message) => (
                    <div key={msg.id} className="flex items-start gap-3">
                      <Avatar className={getRandomColor(msg.userId)}>
                        <AvatarFallback>{getInitials(msg.username)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium">{msg.username}</p>
                          <span className="text-xs text-mentora-subtext">
                            {format(parseISO(msg.timestamp), 'MMM d, h:mm a')}
                          </span>
                        </div>
                        <p className="text-mentora-text dark:text-mentora-white">{msg.message}</p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>
            
            {user ? (
              <div className="flex gap-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  disabled={sending}
                  className="flex-grow"
                />
                <Button 
                  onClick={handleSendMessage} 
                  disabled={!message.trim() || sending}
                  className="bg-mentora-teal hover:bg-mentora-teal/90 text-white"
                >
                  {sending ? "Sending..." : "Send"}
                </Button>
              </div>
            ) : (
              <div className="text-center p-4 bg-mentora-cream/50 rounded-md">
                <p>Please login to participate in the conversation.</p>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-mentora-subtext">
            Remember: This is a community space. Be kind, respectful, and supportive to fellow members.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Chatroom;
