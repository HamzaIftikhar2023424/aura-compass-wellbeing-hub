
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { MessageSquare } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

interface ChatbotSupportProps {
  onClose: () => void;
}

const ChatbotSupport: React.FC<ChatbotSupportProps> = ({ onClose }) => {
  const [step, setStep] = useState<'initial' | 'form' | 'chatbot'>('initial');
  const [name, setName] = useState('');
  const [concern, setConcern] = useState('');
  const [urgency, setUrgency] = useState<'low' | 'medium' | 'high'>('low');
  const [messages, setMessages] = useState<{text: string, isUser: boolean}[]>([
    {text: "Hi there! I'm Mentora's support assistant. How can I help you today?", isUser: false}
  ]);
  const [currentMessage, setCurrentMessage] = useState('');

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;
    
    const userMessage = {text: currentMessage, isUser: true};
    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    
    // Simulate bot response after a short delay
    setTimeout(() => {
      let botResponse = {
        text: "Thank you for sharing. Our team will reach out to you soon. In the meantime, try some deep breathing exercises: inhale for 4 counts, hold for 4, and exhale for 6.",
        isUser: false
      };
      
      if (currentMessage.toLowerCase().includes('emergency') || 
          currentMessage.toLowerCase().includes('crisis') ||
          currentMessage.toLowerCase().includes('suicide')) {
        botResponse = {
          text: "If you're experiencing a mental health emergency, please call the crisis hotline at 988 immediately. They are available 24/7 and can provide immediate support.",
          isUser: false
        };
      } else if (currentMessage.toLowerCase().includes('appointment')) {
        botResponse = {
          text: "You can book an appointment with a therapist through our 'Connect with Therapists' page. Would you like me to guide you there?",
          isUser: false
        };
      }
      
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleSubmitForm = () => {
    if (!name || !concern) {
      toast.error("Please fill in all fields");
      return;
    }
    
    toast.success("Your request has been submitted. A therapist will contact you shortly.");
    onClose();
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <MessageSquare className="mr-2 h-5 w-5 text-mentora-teal" />
            Urgent Support
          </DialogTitle>
          <DialogDescription>
            {step === 'initial' && "How would you like to receive support?"}
            {step === 'form' && "Please provide some information so we can help you"}
            {step === 'chatbot' && "Chat with our support assistant"}
          </DialogDescription>
        </DialogHeader>
        
        {step === 'initial' && (
          <div className="grid grid-cols-1 gap-4 py-4">
            <Button 
              onClick={() => setStep('chatbot')}
              className="bg-mentora-teal hover:bg-mentora-teal/90 text-white"
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Chat with Support Assistant
            </Button>
            <Button 
              onClick={() => setStep('form')}
              variant="outline"
            >
              Request Therapist Contact
            </Button>
          </div>
        )}
        
        {step === 'form' && (
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Your Name</Label>
              <Input 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Enter your name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="concern">What's concerning you?</Label>
              <Textarea 
                id="concern" 
                value={concern} 
                onChange={(e) => setConcern(e.target.value)} 
                placeholder="Please briefly describe your situation"
                rows={4}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="urgency">How urgent is your need?</Label>
              <div className="flex gap-2">
                {['low', 'medium', 'high'].map((level) => (
                  <Button 
                    key={level}
                    type="button" 
                    variant={urgency === level ? "default" : "outline"}
                    onClick={() => setUrgency(level as 'low' | 'medium' | 'high')}
                    className={urgency === level ? "bg-mentora-teal hover:bg-mentora-teal/90 text-white" : ""}
                  >
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
            
            <DialogFooter className="mt-4">
              <Button variant="outline" onClick={() => setStep('initial')}>
                Back
              </Button>
              <Button 
                onClick={handleSubmitForm}
                className="bg-mentora-teal hover:bg-mentora-teal/90 text-white"
              >
                Submit Request
              </Button>
            </DialogFooter>
          </div>
        )}
        
        {step === 'chatbot' && (
          <div className="flex flex-col h-[400px]">
            <div className="flex-grow overflow-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900 rounded-md">
              {messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] p-3 rounded-lg ${
                      msg.isUser 
                        ? 'bg-mentora-teal text-white rounded-br-none' 
                        : 'bg-gray-200 dark:bg-gray-800 rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex items-center gap-2 mt-4">
              <Input 
                value={currentMessage} 
                onChange={(e) => setCurrentMessage(e.target.value)}
                placeholder="Type your message..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button 
                onClick={handleSendMessage}
                className="bg-mentora-teal hover:bg-mentora-teal/90 text-white"
              >
                Send
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ChatbotSupport;
