import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAppDispatch } from "../../hooks/redux";
import { addComment } from "../../store/slices/commentsSlice";
import { toast } from "sonner";

interface CommentFormProps {
  postId: number;
}

const CommentForm = ({ postId }: CommentFormProps) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    body: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.body.trim()
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      dispatch(
        addComment({
          postId,
          comment: {
            postId,
            name: formData.name.trim(),
            email: formData.email.trim(),
            body: formData.body.trim(),
          },
        })
      );

      setFormData({ name: "", email: "", body: "" });
      toast.success("Your comment has been successfully posted!");
    } catch (error) {
      toast.error("Failed to add comment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Card className="shadow-medium bg-gradient-card border-0 animate-bounce-in">
      <CardHeader>
        <CardTitle className="text-lg">Add a Comment</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Input
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                disabled={isSubmitting}
                className="transition-smooth focus-visible:ring-2 focus-visible:ring-primary"
              />
            </div>
            <div>
              <Input
                name="email"
                type="email"
                placeholder="Your email"
                value={formData.email}
                onChange={handleChange}
                disabled={isSubmitting}
                className="transition-smooth focus-visible:ring-2 focus-visible:ring-primary"
              />
            </div>
          </div>

          <Textarea
            name="body"
            placeholder="Write your comment..."
            value={formData.body}
            onChange={handleChange}
            disabled={isSubmitting}
            rows={4}
            className="resize-none transition-smooth focus-visible:ring-2 focus-visible:ring-primary"
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            className="gradient-primary text-white shadow-soft hover:shadow-medium transition-smooth"
          >
            {isSubmitting ? (
              "Posting..."
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Post Comment
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CommentForm;
