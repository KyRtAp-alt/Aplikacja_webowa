import { Injectable } from '@angular/core';

interface Post {
  title: string;
  content: string;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private localStorageKey = 'posts';

  constructor() { }

  getPosts(): Post[] {
    const savedPosts = localStorage.getItem(this.localStorageKey);
    return savedPosts ? JSON.parse(savedPosts) : [];
  }

  savePosts(posts: Post[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(posts));
  }

  addPost(post: Post): void {
    const posts = this.getPosts();
    posts.push(post);
    this.savePosts(posts);
  }

  editPost(index: number, updatedPost: Post): void {
    const posts = this.getPosts();
    posts[index] = updatedPost;
    this.savePosts(posts);
  }

  deletePost(index: number): void {
    const posts = this.getPosts();
    posts.splice(index, 1);
    this.savePosts(posts);
  }
}
