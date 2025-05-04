
import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { peerSupportService } from '@/services/api';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { format, parseISO } from 'date-fns';
import { toast } from '@/components/ui/sonner';
import { Heart, MessageCircle } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";

interface Comment {
  id: number;
  content: string;
  timestamp: string;
}

interface Post {
  id: number;
  content: string;
  hearts: number;
  comments: Comment[];
  timestamp: string;
}

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);
  const [localHearts, setLocalHearts] = useState(post.hearts);
  const queryClient = useQueryClient();
  
  const addHeartMutation = useMutation({
    mutationFn: () => peerSupportService.addHeart(post.id),
    onSuccess: () => {
      setHasLiked(true);
      setLocalHearts(prev => prev + 1);
    },
    onError: () => {
      toast.error("Failed to like the post.");
    }
  });
  
  const addCommentMutation = useMutation({
    mutationFn: (content: string) => peerSupportService.addComment(post.id, content),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['peer-support-posts'] });
      setNewComment('');
      toast.success("Your supportive message has been added!");
    },
    onError: () => {
      toast.error("Failed to add comment. Please try again.");
    },
    onSettled: () => {
      setIsSubmittingComment(false);
    }
  });
  
  const handleAddHeart = () => {
    if (!hasLiked) {
      addHeartMutation.mutate();
    }
  };
  
  const handleAddComment = () => {
    if (!newComment.trim()) {
      toast.error("Please enter a comment");
      return;
    }
    
    setIsSubmittingComment(true);
    addCommentMutation.mutate(newComment);
  };
  
  return (
    <Card className="border-mentora-teal/10 shadow-md">
      <CardContent className="p-6">
        <div className="mb-2 flex justify-between items-center">
          <Badge variant="outline" className="bg-mentora-cream text-mentora-text">
            Anonymous
          </Badge>
          <span className="text-xs text-mentora-subtext">
            {format(parseISO(post.timestamp), 'MMM d, h:mm a')}
          </span>
        </div>
        <p className="text-lg mb-4">{post.content}</p>
        
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleAddHeart}
            className={`flex items-center space-x-1 ${hasLiked ? 'text-red-500' : ''}`}
            disabled={hasLiked}
          >
            <Heart className={`h-4 w-4 ${hasLiked ? 'fill-current' : ''}`} />
            <span>{localHearts}</span>
          </Button>
          
          <CollapsibleTrigger asChild onClick={() => setShowComments(!showComments)}>
            <Button variant="ghost" size="sm" className="flex items-center space-x-1">
              <MessageCircle className="h-4 w-4" />
              <span>{post.comments.length}</span>
            </Button>
          </CollapsibleTrigger>
        </div>
      </CardContent>
      
      <Collapsible open={showComments}>
        <CollapsibleContent>
          <div className="px-6 pb-2">
            <div className="border-t border-gray-100 dark:border-gray-800 pt-4">
              {post.comments.length > 0 ? (
                <div className="space-y-4 mb-4">
                  {post.comments.map((comment) => (
                    <div key={comment.id} className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                      <div className="flex justify-between items-start mb-1">
                        <Badge variant="outline" className="bg-mentora-teal/10 text-mentora-teal">
                          Supportive Message
                        </Badge>
                        <span className="text-xs text-mentora-subtext">
                          {format(parseISO(comment.timestamp), 'MMM d')}
                        </span>
                      </div>
                      <p className="text-sm">{comment.content}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-mentora-subtext mb-4 text-center">
                  No supportive messages yet. Be the first to leave one!
                </p>
              )}
              
              <div className="space-y-2">
                <Textarea
                  placeholder="Add a supportive message..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows={2}
                  className="resize-none"
                />
                <div className="flex justify-end">
                  <Button 
                    onClick={handleAddComment}
                    disabled={!newComment.trim() || isSubmittingComment}
                    size="sm"
                    className="bg-mentora-teal hover:bg-mentora-teal/90 text-white"
                  >
                    {isSubmittingComment ? "Sending..." : "Send Support"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default PostCard;
