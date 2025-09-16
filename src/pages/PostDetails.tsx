import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, MessageCircle, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import CommentList from '../components/Comments/CommentList';
import CommentForm from '../components/Comments/CommentForm';
import LoadingSpinner from '../components/Layout/LoadingSpinner';
import ErrorMessage from '../components/Layout/ErrorMessage';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchPostById, clearError } from '../store/slices/postsSlice';
import { fetchCommentsByPostId } from '../store/slices/commentsSlice';
import { toggleLike } from '../store/slices/likesSlice';

const PostDetails = () => {
  const { id } = useParams<{ id: string }>();
  const postId = parseInt(id || '0');
  
  const dispatch = useAppDispatch();
  const { posts, loading: postsLoading, error: postsError } = useAppSelector((state) => state.posts);
  const { comments, loading: commentsLoading } = useAppSelector((state) => state.comments);
  const isLiked = useAppSelector((state) => state.likes.likedPosts[postId]);

  const post = posts.find(p => p.id === postId);
  const postComments = comments[postId] || [];

  useEffect(() => {
    if (!post) {
      dispatch(fetchPostById(postId));
    }
    dispatch(fetchCommentsByPostId(postId));
  }, [dispatch, postId, post]);

  const handleLike = () => {
    dispatch(toggleLike(postId));
  };

  const handleRetry = () => {
    dispatch(clearError());
    dispatch(fetchPostById(postId));
  };

  if (postsLoading && !post) {
    return <LoadingSpinner size="lg" text="Loading post..." />;
  }

  if (postsError && !post) {
    return <ErrorMessage message={postsError} onRetry={handleRetry} />;
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorMessage message="Post not found" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <Button asChild variant="ghost" className="mb-4 hover:bg-muted/50">
          <Link to="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Posts
          </Link>
        </Button>
      </div>

      <article className="animate-slide-up">
        <Card className="shadow-large bg-gradient-card border-0 mb-8">
          <CardHeader className="pb-6">
            <div className="flex items-center space-x-3 mb-4">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-primary/10 text-primary">
                  <User className="h-6 w-6" />
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">Author #{post.userId}</p>
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
              {post.title}
            </h1>
            
            <div className="flex items-center space-x-4 pt-4 border-t">
              <Button
                variant="ghost"
                onClick={handleLike}
                className={`transition-bounce ${
                  isLiked 
                    ? 'text-like hover:text-like/80' 
                    : 'text-muted-foreground hover:text-like'
                }`}
              >
                <Heart 
                  className={`h-5 w-5 mr-2 transition-smooth ${isLiked ? 'fill-current' : ''}`} 
                />
                {isLiked ? 'Liked' : 'Like this post'}
              </Button>
              
              <div className="flex items-center text-muted-foreground">
                <MessageCircle className="h-5 w-5 mr-2" />
                {postComments.length} comments
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed text-muted-foreground">
                {post.body}
              </p>
            </div>
          </CardContent>
        </Card>
      </article>

      <section className="space-y-8">
        <div className="animate-slide-up" style={{ animationDelay: '200ms' }}>
          <h2 className="text-2xl font-bold mb-6">Comments ({postComments.length})</h2>
          
          {commentsLoading ? (
            <LoadingSpinner text="Loading comments..." />
          ) : (
            <CommentList comments={postComments} />
          )}
        </div>
        
        <div className="animate-slide-up" style={{ animationDelay: '400ms' }}>
          <CommentForm postId={postId} />
        </div>
      </section>
    </div>
  );
};

export default PostDetails;