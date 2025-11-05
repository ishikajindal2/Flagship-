import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Linkedin, ThumbsUp, MessageCircle, Share2, ExternalLink } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';

const linkedInPosts = [
  {
    id: 1,
    company: 'APB Corporation',
    handle: '@apbcorp',
    time: '2h ago',
    content: 'Excited to announce our partnership with leading tech innovators! This collaboration will drive digital transformation across industries. #Innovation #Partnership',
    likes: 234,
    comments: 45,
    shares: 23,
  },
  {
    id: 2,
    company: 'APB Corporation',
    handle: '@apbcorp',
    time: '5h ago',
    content: 'Our team at the Tech Summit 2024! Amazing insights on AI and machine learning. Proud of our experts sharing knowledge with the community. 🚀',
    likes: 567,
    comments: 89,
    shares: 67,
  },
  {
    id: 3,
    company: 'APB Corporation',
    handle: '@apbcorp',
    time: '1d ago',
    content: 'Celebrating 5 years of excellence! Thank you to our incredible team and loyal clients. Here\'s to many more years of growth and innovation. 🎉',
    likes: 1234,
    comments: 234,
    shares: 156,
  },
];

const LinkedInFeed = () => {
  const [readPosts, setReadPosts] = useState<Set<number>>(new Set());
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  const [selectedPost, setSelectedPost] = useState<typeof linkedInPosts[0] | null>(null);

  const handlePostClick = (post: typeof linkedInPosts[0]) => {
    setSelectedPost(post);
    setReadPosts(prev => new Set(prev).add(post.id));
  };

  const handleLike = (postId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
        toast.info('Like removed');
      } else {
        newSet.add(postId);
        toast.success('Post liked!');
      }
      return newSet;
    });
  };

  const handleComment = (postId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    toast.info('Comment feature - Coming soon!');
  };

  const handleShare = (postId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    toast.success('Post shared!');
  };

  return (
    <section className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-[#0A66C2] p-2">
            <Linkedin className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-1">LinkedIn Feed</h2>
            <p className="text-muted-foreground">Company updates and announcements</p>
          </div>
        </div>
      </div>

      <ScrollArea className="h-[600px] pr-4">
        <div className="space-y-4">
          {linkedInPosts.map((post, index) => (
            <Card 
              key={post.id} 
              className={`shadow-card hover:shadow-card-hover transition-shadow duration-300 cursor-pointer ${
                readPosts.has(post.id) ? 'bg-muted/30' : 'bg-card'
              }`}
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              onClick={() => handlePostClick(post)}
            >
            <CardHeader>
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-gradient-primary text-white">
                    APB
                  </AvatarFallback>
                </Avatar>
                  <div className="flex-1">
                    <CardTitle className={`text-base ${!readPosts.has(post.id) ? 'font-bold' : 'font-semibold'}`}>
                      {post.company}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2 text-sm">
                      {post.handle} · {post.time}
                    </CardDescription>
                  </div>
              </div>
            </CardHeader>
              <CardContent className="space-y-4">
                <p className={`text-sm leading-relaxed ${
                  !readPosts.has(post.id) ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {post.content}
                </p>
                
                <div className="flex items-center gap-6 pt-4 border-t">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={`gap-2 ${
                      likedPosts.has(post.id) 
                        ? 'text-primary' 
                        : 'text-muted-foreground hover:text-primary'
                    }`}
                    onClick={(e) => handleLike(post.id, e)}
                  >
                    <ThumbsUp className={`h-4 w-4 ${likedPosts.has(post.id) ? 'fill-current' : ''}`} />
                    <span className="text-xs">{post.likes + (likedPosts.has(post.id) ? 1 : 0)}</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="gap-2 text-muted-foreground hover:text-primary"
                    onClick={(e) => handleComment(post.id, e)}
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span className="text-xs">{post.comments}</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="gap-2 text-muted-foreground hover:text-primary"
                    onClick={(e) => handleShare(post.id, e)}
                  >
                    <Share2 className="h-4 w-4" />
                    <span className="text-xs">{post.shares}</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>

      <Dialog open={!!selectedPost} onOpenChange={(open) => !open && setSelectedPost(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <div className="flex items-start gap-4">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-gradient-primary text-white">
                  APB
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <DialogTitle>{selectedPost?.company}</DialogTitle>
                <p className="text-sm text-muted-foreground">
                  {selectedPost?.handle} · {selectedPost?.time}
                </p>
              </div>
            </div>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm leading-relaxed">{selectedPost?.content}</p>
            <div className="flex items-center gap-6 pt-4 border-t">
              <Button 
                variant="ghost" 
                size="sm" 
                className={`gap-2 ${
                  selectedPost && likedPosts.has(selectedPost.id) 
                    ? 'text-primary' 
                    : 'text-muted-foreground hover:text-primary'
                }`}
                onClick={(e) => selectedPost && handleLike(selectedPost.id, e)}
              >
                <ThumbsUp className={`h-4 w-4 ${selectedPost && likedPosts.has(selectedPost.id) ? 'fill-current' : ''}`} />
                <span className="text-xs">
                  {selectedPost && (selectedPost.likes + (likedPosts.has(selectedPost.id) ? 1 : 0))}
                </span>
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="gap-2 text-muted-foreground hover:text-primary"
                onClick={(e) => selectedPost && handleComment(selectedPost.id, e)}
              >
                <MessageCircle className="h-4 w-4" />
                <span className="text-xs">{selectedPost?.comments}</span>
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="gap-2 text-muted-foreground hover:text-primary"
                onClick={(e) => selectedPost && handleShare(selectedPost.id, e)}
              >
                <Share2 className="h-4 w-4" />
                <span className="text-xs">{selectedPost?.shares}</span>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default LinkedInFeed;
