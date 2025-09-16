import { Comment } from '../types';

const LIKES_KEY = 'blog_likes';
const COMMENTS_KEY = 'blog_comments';

class StorageService {
  getLikes(): { [postId: number]: boolean } {
    try {
      const likes = localStorage.getItem(LIKES_KEY);
      return likes ? JSON.parse(likes) : {};
    } catch (error) {
      console.error('Error loading likes from localStorage:', error);
      return {};
    }
  }

  saveLikes(likes: { [postId: number]: boolean }): void {
    try {
      localStorage.setItem(LIKES_KEY, JSON.stringify(likes));
    } catch (error) {
      console.error('Error saving likes to localStorage:', error);
    }
  }

  getComments(): { [postId: number]: Comment[] } {
    try {
      const comments = localStorage.getItem(COMMENTS_KEY);
      return comments ? JSON.parse(comments) : {};
    } catch (error) {
      console.error('Error loading comments from localStorage:', error);
      return {};
    }
  }

  saveComments(comments: { [postId: number]: Comment[] }): void {
    try {
      localStorage.setItem(COMMENTS_KEY, JSON.stringify(comments));
    } catch (error) {
      console.error('Error saving comments to localStorage:', error);
    }
  }
}

export const storage = new StorageService();