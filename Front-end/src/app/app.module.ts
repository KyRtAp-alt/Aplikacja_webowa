import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { Navbar1Component } from './navbar1/navbar1.component';
import { Navbar2Component } from './navbar2/navbar2.component';
import { ImgNavbarComponent } from './img-navbar/img-navbar.component';
import { WeebbookingComponent } from './weebbooking/weebbooking.component';
import { BarComponent } from './bar/bar.component';
import { SliderComponent } from './slider/slider.component';
import { Bar2Component } from './bar2/bar2.component';
import { Blog1Component } from './blog1/blog1.component';
import { Blog2Component } from './blog2/blog2.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    Navbar1Component,
    Navbar2Component,
    ImgNavbarComponent,
    WeebbookingComponent,
    BarComponent,
    SliderComponent,
    Bar2Component,
    Blog1Component,
    Blog2Component,
    FooterComponent,
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
