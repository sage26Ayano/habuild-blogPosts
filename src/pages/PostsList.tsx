import { useState, useEffect, useMemo } from "react";
import ReactPaginate from "react-paginate";
import PostCard from "@/components/Posts/PostCard";
import LoadingSpinner from "@/components/Layout/LoadingSpinner";
import ErrorMessage from "@/components/Layout/ErrorMessage";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchPosts, clearError } from "@/store/slices/postsSlice";

const PostsList = () => {
  const dispatch = useAppDispatch();
  const { posts, loading, error, searchTerm } = useAppSelector(
    (state) => state.posts
  );

  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 15;

  useEffect(() => {
    if (posts.length === 0) {
      dispatch(fetchPosts());
    }
  }, [dispatch, posts.length]);

  const filteredPosts = useMemo(() => {
    if (!searchTerm.trim()) return posts;

    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.body.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [posts, searchTerm]);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = filteredPosts.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredPosts.length / itemsPerPage);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % filteredPosts.length;
    setItemOffset(newOffset);
  };

  const handleRetry = () => {
    dispatch(clearError());
    dispatch(fetchPosts());
  };

  if (loading && posts.length === 0) {
    return <LoadingSpinner size="lg" text="Loading posts..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={handleRetry} />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12 flex flex-col">
        <div className="mx-auto mb-6">
          <img
            src="saurabh-banner-desktop.webp"
            alt="saurabh-banner"
            className="h-[250px]"
          />
        </div>

        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover amazing Habuild Blog posts
        </p>
      </div>

      {searchTerm && (
        <div className="mb-6 animate-fade-in">
          <p className="text-muted-foreground">
            {filteredPosts.length === 0
              ? `No posts found for "${searchTerm}"`
              : `Found ${filteredPosts.length} post${
                  filteredPosts.length === 1 ? "" : "s"
                } for "${searchTerm}"`}
          </p>
        </div>
      )}

      {filteredPosts.length === 0 && !searchTerm ? (
        <div className="text-center py-12 animate-fade-in">
          <p className="text-muted-foreground">No posts available.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentItems.map((post) => (
              <div key={post.id}>
                <PostCard post={post} />
              </div>
            ))}
          </div>

          {pageCount > 1 && (
            <div className="flex justify-center mt-8">
              <ReactPaginate
                breakLabel="..."
                nextLabel="Next"
                previousLabel="Prev"
                onPageChange={handlePageClick}
                pageRangeDisplayed={2}
                marginPagesDisplayed={1}
                pageCount={pageCount}
                renderOnZeroPageCount={null}
                containerClassName="flex items-center space-x-2"
                pageClassName="px-3 py-1 border rounded"
                activeClassName="bg-blue-500 text-white"
                previousClassName="px-3 py-1 border rounded"
                nextClassName="px-3 py-1 border rounded"
                disabledClassName="opacity-50 cursor-not-allowed"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PostsList;
