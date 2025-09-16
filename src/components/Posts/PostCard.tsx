import { Link } from "react-router-dom";
import { Heart, MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Post } from "@/types";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { toggleLike } from "@/store/slices/likesSlice";

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  const dispatch = useAppDispatch();
  const isLiked = useAppSelector((state) => state.likes.likedPosts[post.id]);
  const comments = useAppSelector(
    (state) => state.comments.comments[post.id] || []
  );

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(toggleLike(post.id));
  };

  return (
    <Card className="h-full shadow-soft hover:shadow-medium hover:text-primary">
      <CardHeader className="h-[70px]">
        <CardTitle>{post.title}</CardTitle>
      </CardHeader>

      <CardContent className="h-[100px]">
        <CardDescription className="line-clamp-3">{post.body}</CardDescription>
      </CardContent>

      <CardFooter className="flex items-center justify-between border-t">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className={`transition-bounce ${
              isLiked
                ? "text-like hover:text-like/80"
                : "text-muted-foreground hover:text-like"
            }`}
          >
            <Heart
              className={`h-4 w-4 transition-smooth ${
                isLiked ? "fill-current" : ""
              }`}
            />
          </Button>

          <div className="flex items-center text-muted-foreground text-sm hover:bg-gray-100 p-2">
            <Link to={`/post/${post.id}`}>
              <MessageCircle className="h-4 w-4" /> 
            </Link>
          </div>
        </div>

        <Button
          asChild
          variant="ghost"
          size="sm"
          className="hover:bg-gray-100 hover:text-primary"
        >
          <Link to={`/post/${post.id}`}>
            Read more
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
