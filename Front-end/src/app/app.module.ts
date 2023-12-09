import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ImgNavbarComponent } from './img-navbar/img-navbar.component';
import { WeebbookingComponent } from './weebbooking/weebbooking.component';
import { SliderComponent } from './slider/slider.component';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { MainpageComponent } from './mainpage/mainpage.component';
import { ImgNavbarOtherComponent } from './img-navbar-other/img-navbar-other.component';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SubpageBlog1Component } from './subpage-blog1/subpage-blog1.component';
import { RangeOfServices1Component } from './range-of-services1/range-of-services1.component';
import { SubpageRof1Component } from './subpage-rof1/subpage-rof1.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminHomepageComponent } from './admin-homepage/admin-homepage.component';
import { HeaderAdminComponent } from './header-admin/header-admin.component';
import { DoctorAddComponent } from './doctor-add/doctor-add.component';
import { AdminBlogComponent } from './admin-blog/admin-blog.component';
import { UmowWizyteComponent } from './umow-wizyte/umow-wizyte.component';
import { FormsModule } from '@angular/forms';
import { PriceListComponent } from './price-list/price-list.component';
import { OurTeamComponent } from './our-team/our-team.component';
import { ContactComponent } from './contact/contact.component';
import { HttpClientModule } from '@angular/common/http';
import { BlogListComponent } from './blog-list/blog-list.component';
import { AdminRosComponent } from './admin-ros/admin-ros.component';
import { SandboxComponent } from './sandbox/sandbox.component';
import { AdminReservationComponent } from './admin-reservation/admin-reservation.component';
import { ReceptionSchemeComponent } from './reception-scheme/reception-scheme.component';
import { ReceptionHomepageComponent } from './reception-homepage/reception-homepage.component';
import { HeaderReceptionComponent } from './header-reception/header-reception.component';
import { ReceptionReservationComponent } from './reception-reservation/reception-reservation.component';
// import { AdminSchemeComponent } from './admin-scheme/AdminSchemeComponent';
import { AdminSchemeComponent } from './admin-scheme/admin-scheme.component';
import { AppointmentGeneratorService } from './appointment-generator.service';
import { ShcemeDisplayComponent } from './shceme-display/shceme-display.component';

@NgModule({
  declarations: [
    AppComponent,
    ImgNavbarComponent,
    WeebbookingComponent,
    SliderComponent,
    FooterComponent,
    MainpageComponent,
    ImgNavbarOtherComponent,
    HeaderComponent,
    NavbarComponent,
    SubpageBlog1Component,
    RangeOfServices1Component,
    SubpageRof1Component,
    AdminLoginComponent,
    AdminHomepageComponent,
    HeaderAdminComponent,
    DoctorAddComponent,
    AdminBlogComponent,
    UmowWizyteComponent,
    PriceListComponent,
    OurTeamComponent,
    ContactComponent,
    BlogListComponent,
    AdminRosComponent,
    SandboxComponent,
    AdminReservationComponent,
    ReceptionSchemeComponent,
    ReceptionHomepageComponent,
    HeaderReceptionComponent,
    ReceptionReservationComponent,
    AdminSchemeComponent,
    ShcemeDisplayComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [AppointmentGeneratorService],
  bootstrap: [AppComponent],
})
export class AppModule {}
