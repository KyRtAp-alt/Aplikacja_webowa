import { Component, HostListener } from '@angular/core';
import { BlogService } from '../blog.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss'],
})
export class BlogListComponent {
  showScrollButton = false;

  blogs: any[] = [];
  title: string = '';
  content: string = '';
  currentBlogIndex: number = 0;
  currentBlog: any;
  selectedBlog: any;

  onShowMore() {
    this.showMore = true;
  }
  showMore = false;

  constructor(private blogService: BlogService, private titleService: Title) {
    this.titleService.setTitle('Blog');
  }

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

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showScrollButton = window.scrollY > 400;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
