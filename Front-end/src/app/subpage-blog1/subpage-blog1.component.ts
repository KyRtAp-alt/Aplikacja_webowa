import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-subpage-blog1',
  templateUrl: './subpage-blog1.component.html',
  styleUrls: ['./subpage-blog1.component.scss'],
})
export class SubpageBlog1Component implements OnInit {
  blogs: any;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const blogId = params['id'];
      this.getBlogData(blogId);
    });
  }

  getBlogData(id: string) {
    this.blogService.getBlogById(id).subscribe(
      (data) => {
        this.blogs = data;
        console.log(this.blogs);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
