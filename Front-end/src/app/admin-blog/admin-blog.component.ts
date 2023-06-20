import { Component } from '@angular/core';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-admin-blog',
  templateUrl: './admin-blog.component.html',
  styleUrls: ['./admin-blog.component.scss'],
})
export class AdminBlogComponent {
  blogs: any[] = [];
  title: string = '';
  content: string = '';
  selectedBlogId: string = '';
  editingBlog: boolean = false;

  constructor(private blogService: BlogService) {}

  ngOnInit() {
    this.getBlogs();
  }

  getBlogs() {
    this.blogService.getBlogs().subscribe(
      (blogs: any) => {
        console.log(blogs);
        this.blogs = blogs;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  addBlog() {
    const newBlog = {
      tytul: this.title,
      tresc: this.content,
    };

    this.blogService.addBlogs(newBlog).subscribe(
      () => {
        console.log('Dodano blog');
        this.clearForm();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  deleteBlog(id: string) {
    this.blogService.deleteBlog(id).subscribe(
      () => {
        console.log('Usunięto blog');
        this.getBlogs();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  confirmDelete(blogId: string) {
    const confirmation = confirm(
      'Czy na pewno chcesz usunąć tego lekarza, specialistę?'
    );
    if (confirmation) {
      this.deleteBlog(blogId);
      alert('Usunięto lekarza, specialistę');
    }
  }

  editBlog(blog: any) {
    this.selectedBlogId = blog._id;
    this.title = blog.tytul;
    this.content = blog.tresc;
    this.editingBlog = true;
  }

  updateBlog() {
    const updateBlogs = {
      tytul: this.title,
      tresc: this.content,
    };

    this.blogService.updateBlog(this.selectedBlogId, updateBlogs).subscribe(
      () => {
        console.log('Zaktulizowano blog');
        this.getBlogs();
        this.clearForm();
        this.editingBlog = false;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  clearForm() {
    this.selectedBlogId = '';
    this.title = '';
    this.content = '';
  }

  isEmptyFields(): boolean {
    return !this.title || !this.content;
  }
}
