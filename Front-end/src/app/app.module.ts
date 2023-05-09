import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ImgNavbarComponent } from './img-navbar/img-navbar.component';
import { WeebbookingComponent } from './weebbooking/weebbooking.component';
import { BarComponent } from './bar/bar.component';
import { SliderComponent } from './slider/slider.component';
import { Bar2Component } from './bar2/bar2.component';
import { Blog1Component } from './blog1/blog1.component';
import { Blog2Component } from './blog2/blog2.component';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { ZakresuslugComponent } from './zakresuslug/zakresuslug.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { ImgNavbarOtherComponent } from './img-navbar-other/img-navbar-other.component';
import { Subpagemain1Component } from './subpagemain1/subpagemain1.component';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';


@NgModule({
  declarations: [
    AppComponent,
    ImgNavbarComponent,
    WeebbookingComponent,
    BarComponent,
    SliderComponent,
    Bar2Component,
    Blog1Component,
    Blog2Component,
    FooterComponent,
    ZakresuslugComponent,
    MainpageComponent,
    ImgNavbarOtherComponent,
    Subpagemain1Component,
    HeaderComponent,
    NavbarComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
