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
import { RangeOfServices2Component } from './range-of-services2/range-of-services2.component';
import { SubpageRof1Component } from './subpage-rof1/subpage-rof1.component';


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
    RangeOfServices2Component,
    SubpageRof1Component,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
