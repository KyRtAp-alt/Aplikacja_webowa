import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-subpage-blog1',
  templateUrl: './subpage-blog1.component.html',
  styleUrls: ['./subpage-blog1.component.scss'],
})

//implements OnInit
export class SubpageBlog1Component implements OnInit {
  blogs: any[] = [];
  selectedBlogId: string = '';

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private el: ElementRef
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.selectedBlogId = params['id'];
      this.getBlogs();
    });
  }

  getBlogs() {
    this.blogService.getBlogs().subscribe(
      (blogs: any) => {
        console.log(blogs);
        this.blogs = blogs.filter(
          (blog: { _id: string }) => blog._id === this.selectedBlogId
        );
      },
      (error) => {
        console.error(error);
      }
    );
  }

  scrollToPlaceOnHomePage() {
    const element = this.el.nativeElement.querySelector('#bloglist');
    if (element) {
      const yOffset = element.offsetTop - 70;
      window.scrollTo({ top: yOffset, behavior: 'smooth' });
    }
  }
}

// ngOnInit() {
//   this.route.params.subscribe((params) => {
//     const blogId = params['id'];
//     this.getBlogData(blogId);
//   });
// }

// getBlogData(id: string) {
//   this.blogService.getBlogById(id).subscribe(
//     (data) => {
//       this.blogs = data;
//       console.log(this.blogs);
//     },
//     (error) => {
//       console.log(error);
//     }
//   );
// }
