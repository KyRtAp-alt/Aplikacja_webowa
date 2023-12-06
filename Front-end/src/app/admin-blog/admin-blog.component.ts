import { Component } from '@angular/core';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-admin-blog',
  templateUrl: './admin-blog.component.html',
  styleUrls: ['./admin-blog.component.scss'],
})
export class AdminBlogComponent {
  blogs: any[] = [];
  selectedBlogId: string = '';
  editingBlog: boolean = false;
  onshowdescription1: boolean = false;
  onshowdescription2: boolean = false;
  onshowdescription3: boolean = false;
  showArrow1: boolean = false;
  showArrow2: boolean = false;
  showArrow3: boolean = false;
  //
  title: string = '';
  content: string = '';
  endcontent: string = '';
  lead1: string = '';
  lead2: string = '';
  lead3: string = '';
  description1: string = '';
  description2: string = '';
  description3: string = '';

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
      skrotopisu: this.endcontent,
      naglowek1: this.lead1,
      naglowek2: this.lead2,
      naglowek3: this.lead3,
      trescopisu1: this.description1,
      trescopisu2: this.description2,
      trescopisu3: this.description3,
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
    this.editingBlog = true;
    this.selectedBlogId = blog._id;
    this.title = blog.tytul;
    this.content = blog.tresc;
    this.endcontent = blog.skrotopisu;
    this.lead1 = blog.naglowek1;
    this.lead2 = blog.naglowek2;
    this.lead3 = blog.naglowek3;
    this.description1 = blog.trescopisu1;
    this.description2 = blog.trescopisu2;
    this.description3 = blog.trescopisu3;
  }

  updateBlog() {
    const updateBlogs = {
      tytul: this.title,
      tresc: this.content,
      skrotopisu: this.endcontent,
      naglowek1: this.lead1,
      naglowek2: this.lead2,
      naglowek3: this.lead3,
      trescopisu1: this.description1,
      trescopisu2: this.description2,
      trescopisu3: this.description3,
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

  toggleDescription1() {
    this.onshowdescription1 = !this.onshowdescription1;
    this.showArrow1 = !this.showArrow1;
  }

  toggleDescription2() {
    this.onshowdescription2 = !this.onshowdescription2;
    this.showArrow2 = !this.showArrow2;
  }

  toggleDescription3() {
    this.onshowdescription3 = !this.onshowdescription3;
    this.showArrow3 = !this.showArrow3;
  }

  onShowMore(doctor: any) {
    doctor.showMore = true;
  }

  onShowLess(doctor: any) {
    doctor.showMore = false;
  }
  clearForm() {
    this.selectedBlogId = '';
    this.title = '';
  }

  isEmptyFields(): boolean {
    return !this.title;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// showdescription1() {
//   this.onshowdescription1 = true;
// }

// closedescription1() {
//   this.onshowdescription1 = false;
// }

// showdescription2() {
//   this.onshowdescription2 = true;
// }

// closedescription2() {
//   this.onshowdescription2 = false;
// }

// showdescription3() {
//   this.onshowdescription3 = true;
// }

// closedescription3() {
//   this.onshowdescription3 = false;
// }
