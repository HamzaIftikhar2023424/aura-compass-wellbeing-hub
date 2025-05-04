
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from '@/components/ui/sonner';
import { useAuth } from '@/contexts/AuthContext';
import { feedbackService } from '@/services/api';
import { ThumbsUp, ThumbsDown, FileText, Mail } from 'lucide-react';
import MoodSelector from '@/components/feedback/MoodSelector';

const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const Feedback = () => {
  const { user } = useAuth();
  const [rating, setRating] = useState<number | null>(null);
  const [comments, setComments] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: user?.username || "",
      email: user?.email || "",
      message: "",
    },
  });

  const handleFeedbackSubmit = async () => {
    if (rating === null) {
      toast.error("Please select a rating");
      return;
    }

    setIsSubmitting(true);
    try {
      await feedbackService.submitFeedback(user?.id || 0, rating, comments);
      toast.success("Thank you for your feedback!");
      setRating(null);
      setComments("");
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("Failed to submit feedback. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onContactSubmit = async (data: z.infer<typeof contactFormSchema>) => {
    toast.success("Your message has been sent. We'll get back to you soon!");
    form.reset();
  };

  // FAQ items
  const faqItems = [
    {
      question: "How do I book a therapy session?",
      answer: "You can book a therapy session by visiting our 'Connect with Therapists' page, where you can browse therapists, filter by specialty, and schedule appointments directly."
    },
    {
      question: "How often should I track my mood?",
      answer: "For the best results, we recommend tracking your mood daily. Consistent tracking helps identify patterns and triggers that affect your wellbeing."
    },
    {
      question: "Are my journal entries private?",
      answer: "Yes, your journal entries are completely private and can only be accessed by you. We prioritize your privacy and data security."
    },
    {
      question: "What if I need immediate support?",
      answer: "If you need immediate support, use the 'Need urgent support?' button on our 'Connect with Therapists' page to chat with our support assistant or request therapist contact."
    },
    {
      question: "How can I set wellness goals?",
      answer: "Visit the 'Goals & Achievements' page to set personal wellness goals. You'll earn badges and track your progress as you complete activities."
    }
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Feedback & Support</h1>
        <p className="text-mentora-subtext">
          We value your feedback and are here to support you on your wellness journey.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Mood Check-in and Feedback Section */}
        <div className="space-y-8">
          <MoodSelector userId={user?.id || 0} />
          
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <ThumbsUp className="h-5 w-5 text-mentora-teal" />
                  <ThumbsDown className="h-5 w-5 text-mentora-teal" />
                </div>
                <CardTitle>Rate Your Experience</CardTitle>
              </div>
              <CardDescription>
                How would you rate your experience with Mentora?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center space-x-4 mb-4">
                {[1, 2, 3, 4, 5].map((value) => (
                  <Button
                    key={value}
                    variant={rating === value ? "default" : "outline"}
                    onClick={() => setRating(value)}
                    className={`w-12 h-12 ${rating === value ? "bg-mentora-teal hover:bg-mentora-teal/90 text-white" : ""}`}
                  >
                    {value}
                  </Button>
                ))}
              </div>
              <Textarea
                placeholder="Share your thoughts (optional)"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                className="resize-none"
                rows={4}
              />
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleFeedbackSubmit}
                disabled={rating === null || isSubmitting}
                className="w-full bg-mentora-teal hover:bg-mentora-teal/90 text-white"
              >
                {isSubmitting ? "Submitting..." : "Submit Feedback"}
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* FAQ and Contact Section */}
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-mentora-teal" />
                <CardTitle>Frequently Asked Questions</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{item.question}</AccordionTrigger>
                    <AccordionContent>{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-mentora-teal" />
                <CardTitle>Contact Us</CardTitle>
              </div>
              <CardDescription>
                Have questions or need help? Send us a message.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onContactSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Your email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea placeholder="How can we help?" {...field} rows={4} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit"
                    className="w-full bg-mentora-teal hover:bg-mentora-teal/90 text-white"
                  >
                    Send Message
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
