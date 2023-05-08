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
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
