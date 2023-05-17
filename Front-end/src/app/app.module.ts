import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ImgNavbarComponent } from './img-navbar/img-navbar.component';
import { WeebbookingComponent } from './weebbooking/weebbooking.component';
import { SliderComponent } from './slider/slider.component';
import { Blog1Component } from './blog1/blog1.component';
import { Blog2Component } from './blog2/blog2.component';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { MainpageComponent } from './mainpage/mainpage.component';
import { ImgNavbarOtherComponent } from './img-navbar-other/img-navbar-other.component';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { Blog3Component } from './blog3/blog3.component';
import { SubpageBlog1Component } from './subpage-blog1/subpage-blog1.component';
import { SubpageBlog2Component } from './subpage-blog2/subpage-blog2.component';
import { SubpageBlog3Component } from './subpage-blog3/subpage-blog3.component';
import { RangeOfServices1Component } from './range-of-services1/range-of-services1.component';
import { SubpageRof1Component } from './subpage-rof1/subpage-rof1.component';
import { SubpageRof2Component } from './subpage-rof2/subpage-rof2.component';
import { SubpageRof3Component } from './subpage-rof3/subpage-rof3.component';
import { SubpageRof4Component } from './subpage-rof4/subpage-rof4.component';
import { SubpageRof5Component } from './subpage-rof5/subpage-rof5.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminHomepageComponent } from './admin-homepage/admin-homepage.component';
import { HeaderAdminComponent } from './header-admin/header-admin.component';
import { DoctorAddComponent } from './doctor-add/doctor-add.component';
import { AdminBlogComponent } from './admin-blog/admin-blog.component';
import { UmowWizyteComponent } from './umow-wizyte/umow-wizyte.component';
import { FormsModule } from '@angular/forms';
import { PagesComponent } from './pages/pages.component';
import { PriceListComponent } from './price-list/price-list.component';




@NgModule({
  declarations: [
    AppComponent,
    ImgNavbarComponent,
    WeebbookingComponent,
    SliderComponent,
    Blog1Component,
    Blog2Component,
    FooterComponent,
    MainpageComponent,
    ImgNavbarOtherComponent,
    HeaderComponent,
    NavbarComponent,
    Blog3Component,
    SubpageBlog1Component,
    SubpageBlog2Component,
    SubpageBlog3Component,
    RangeOfServices1Component,
    SubpageRof1Component,
    SubpageRof2Component,
    SubpageRof3Component,
    SubpageRof4Component,
    SubpageRof5Component,
    AdminLoginComponent,
    AdminHomepageComponent,
    HeaderAdminComponent,
    DoctorAddComponent,
    AdminBlogComponent,
    UmowWizyteComponent,
    PagesComponent,
    PriceListComponent,

  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
