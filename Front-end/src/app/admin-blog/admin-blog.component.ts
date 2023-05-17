import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';

interface Post{
  title: string;
  content: string;
  image: string;
}

@Component({
  selector: 'app-admin-blog',
  templateUrl: './admin-blog.component.html',
  styleUrls: ['./admin-blog.component.scss']
})
export class AdminBlogComponent implements OnInit {
  posts: Post[] = [];
  newPost: Post = { title: '', content: '', image: '' };

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.posts = this.postService.getPosts();
  }

  addPost(): void {
    this.postService.addPost(this.newPost);
    this.newPost = { title: '', content: '', image: '' };
    this.posts = this.postService.getPosts();
  }

  deletePost(index: number): void {
    this.postService.deletePost(index);
    this.posts = this.postService.getPosts();
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    this.convertToBase64(file).then(base64 => {
      this.newPost.image = base64;
    });
  }

  convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }
}
