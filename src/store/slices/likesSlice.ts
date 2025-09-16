import { createSlice } from '@reduxjs/toolkit';
import { storage } from '@/services/storage';

interface LikesState {
  likedPosts: { [postId: number]: boolean };
}

const initialState: LikesState = {
  likedPosts: storage.getLikes(),
};

const likesSlice = createSlice({
  name: 'likes',
  initialState,
  reducers: {
    toggleLike: (state, action) => {
      const postId = action.payload;
      state.likedPosts[postId] = !state.likedPosts[postId];
      storage.saveLikes(state.likedPosts);
    },
  },
});

export const { toggleLike } = likesSlice.actions;
export default likesSlice.reducer;