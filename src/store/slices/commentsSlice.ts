import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Comment } from '@/types';
import { api } from '@/services/api';
import { storage } from '@/services/storage';

interface CommentsState {
  comments: { [postId: number]: Comment[] };
  loading: boolean;
  error: string | null;
}

const initialState: CommentsState = {
  comments: storage.getComments(),
  loading: false,
  error: null,
};

export const fetchCommentsByPostId = createAsyncThunk(
  'comments/fetchCommentsByPostId',
  async (postId: number) => {
    const response = await api.getCommentsByPostId(postId);
    return { postId, comments: response };
  }
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state, action) => {
      const { postId, comment } = action.payload;
      if (!state.comments[postId]) {
        state.comments[postId] = [];
      }
      
      const newComment: Comment = {
        ...comment,
        id: Date.now(),
      };
      
      state.comments[postId].push(newComment);
      storage.saveComments(state.comments);
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsByPostId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCommentsByPostId.fulfilled, (state, action) => {
        state.loading = false;
        const { postId, comments } = action.payload;
        
        const existingComments = state.comments[postId] || [];
        const customComments = existingComments.filter(c => c.id > 1000000); 
        
        state.comments[postId] = [...comments, ...customComments];
        storage.saveComments(state.comments);
      })
      .addCase(fetchCommentsByPostId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch comments';
      });
  },
});

export const { addComment, clearError } = commentsSlice.actions;
export default commentsSlice.reducer;