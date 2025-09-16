import { MessageCircle, User } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Comment } from '../../types';

interface CommentListProps {
  comments: Comment[];
}

const CommentList = ({ comments }: CommentListProps) => {
  if (comments.length === 0) {
    return (
      <div className="text-center py-8 animate-fade-in">
        <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
        <p className="text-muted-foreground">No comments yet. Be the first to comment!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-fade-in">
      {comments.map((comment, index) => (
        <Card key={comment.id} className="shadow-soft bg-gradient-card border-0 animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-primary/10 text-primary">
                  <User className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-semibold text-sm">{comment.name}</h4>
                <p className="text-xs text-muted-foreground">{comment.email}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">{comment.body}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CommentList;