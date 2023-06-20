import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BlogSelectionService {
  selectedBlog: any;

  constructor() {}

  setSelectedBlog(blog: any) {
    this.selectedBlog = blog;
  }

  getSelectedBlog() {
    return this.selectedBlog;
  }
}
