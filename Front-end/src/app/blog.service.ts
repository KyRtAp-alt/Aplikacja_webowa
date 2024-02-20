import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getBlogs() {
    return this.http.get(`${this.apiUrl}/blog`);
  }

  addBlogs(blog: any) {
    return this.http.post(`${this.apiUrl}/blog`, blog);
  }

  deleteBlog(id: string) {
    return this.http.delete(`${this.apiUrl}/blog/${id}`);
  }

  updateBlog(id: string, blog: any) {
    return this.http.put(`${this.apiUrl}/blog/${id}`, blog);
  }

  getBlogById(id: string) {
    return this.http.get(`${this.apiUrl}/blog/${id}`);
  }
}
