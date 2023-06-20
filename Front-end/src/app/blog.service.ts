import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getBlogs() {
    return this.http.get('http://localhost:3000/blog');
  }

  addBlogs(blog: any) {
    return this.http.post('http://localhost:3000/blog', blog);
  }

  deleteBlog(id: string) {
    return this.http.delete(`http://localhost:3000/blog/${id}`);
  }

  updateBlog(id: string, blog: any) {
    return this.http.put(`http://localhost:3000/blog/${id}`, blog);
  }
}
