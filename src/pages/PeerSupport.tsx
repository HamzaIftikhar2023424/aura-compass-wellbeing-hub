
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { peerSupportService } from '@/services/api';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { format, parseISO } from 'date-fns';
import { toast } from '@/components/ui/sonner';
import { MessageSquareHeart } from 'lucide-react';
import PostCard from '@/components/peer-support/PostCard';

interface Post {
  id: number;
  content: string;
  hearts: number;
  comments: Comment[];
  timestamp: string;
}

interface Comment {
  id: number;
  content: string;
  timestamp: string;
}

const PeerSupport = () => {
  const [newPost, setNewPost] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['peer-support-posts'],
    queryFn: peerSupportService.getPosts
  });
  
  const posts = data?.data || [];
  
  const createPostMutation = useMutation({
    mutationFn: (content: string) => peerSupportService.createPost(content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['peer-support-posts'] });
      toast.success("Your post has been shared anonymously!");
      setNewPost('');
    },
    onError: () => {
      toast.error("Failed to create post. Please try again.");
    },
    onSettled: () => {
      setIsSubmitting(false);
    }
  });
  
  const handleSubmitPost = () => {
    if (!newPost.trim()) {
      toast.error("Please enter a message to post");
      return;
    }
    
    setIsSubmitting(true);
    createPostMutation.mutate(newPost);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Peer Support Wall</h1>
        <p className="text-mentora-subtext">
          Share your thoughts anonymously and support others on their mental health journey
        </p>
      </div>
      
      {/* Create Post Section */}
      <Card className="mb-10 border-mentora-teal/20">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <MessageSquareHeart className="h-5 w-5 text-mentora-teal" />
            <CardTitle>Share Your Thoughts</CardTitle>
          </div>
          <CardDescription>
            Your message will be posted anonymously. Be kind and supportive.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="What's on your mind today? Share your experiences, challenges, or victories..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            className="resize-none"
            rows={4}
          />
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button 
            onClick={handleSubmitPost} 
            disabled={!newPost.trim() || isSubmitting}
            className="bg-mentora-teal hover:bg-mentora-teal/90 text-white"
          >
            {isSubmitting ? "Posting..." : "Post Anonymously"}
          </Button>
        </CardFooter>
      </Card>
      
      {/* Posts Section */}
      <div>
        <div className="flex items-center mb-6">
          <MessageSquareHeart className="mr-2 h-5 w-5 text-mentora-teal" />
          <h2 className="text-xl font-semibold">Community Wall</h2>
        </div>
        
        {isLoading ? (
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-24"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : error ? (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-red-500">Error loading posts. Please try again later.</p>
            </CardContent>
          </Card>
        ) : posts.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <MessageSquareHeart className="h-16 w-16 text-mentora-teal/30 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No posts yet</h3>
              <p className="text-mentora-subtext">Be the first to share your thoughts!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {posts.map((post: Post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PeerSupport;
