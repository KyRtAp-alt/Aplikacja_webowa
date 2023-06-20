import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private blogData: any[] = [];

  constructor() {}

  setBlogData(blog: any) {
    this.blogData.push(blog);
  }

  getBlogData() {
    return this.blogData;
  }
}
