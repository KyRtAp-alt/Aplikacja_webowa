import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainpageComponent } from './mainpage/mainpage.component';
import { RangeOfServices1Component } from './range-of-services1/range-of-services1.component';
import { SubpageBlog1Component } from './subpage-blog1/subpage-blog1.component';
import { SubpageRof1Component } from './subpage-rof1/subpage-rof1.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminHomepageComponent } from './admin-homepage/admin-homepage.component';
import { DoctorAddComponent } from './doctor-add/doctor-add.component';
import { AdminBlogComponent } from './admin-blog/admin-blog.component';
import { UmowWizyteComponent } from './umow-wizyte/umow-wizyte.component';
import { PriceListComponent } from './price-list/price-list.component';
import { AppComponent } from './app.component';
import { OurTeamComponent } from './our-team/our-team.component';
import { ContactComponent } from './contact/contact.component';
import { AdminRosComponent } from './admin-ros/admin-ros.component';
import { SandboxComponent } from './sandbox/sandbox.component';
import { AdminReservationComponent } from './admin-reservation/admin-reservation.component';
import { ReceptionSchemeComponent } from './reception-scheme/reception-scheme.component';
import { ReceptionHomepageComponent } from './reception-homepage/reception-homepage.component';
import { ReceptionReservationComponent } from './reception-reservation/reception-reservation.component';
// import { AdminSchemeComponent } from './admin-scheme/AdminSchemeComponent';
import { AdminSchemeComponent } from './admin-scheme/admin-scheme.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { WebbookingComponent } from './webbooking/webbooking.component';
import { AuthGuard } from 'src/app/auth.guard';
import { AuthGuardReception } from './auth.guardReception';
import { ReceptionLoginComponent } from './reception-login/reception-login.component';
import { AuthGuardRreceptionService } from './auth-guard-rreception.service';

const routes: Routes = [
  { path: '', component: MainpageComponent },
  { path: 'mainpage', component: MainpageComponent },
  { path: 'zakres-uslug', component: RangeOfServices1Component },
  { path: 'umow-wizyte', component: WebbookingComponent },
  { path: 'umow-wizyte1', component: UmowWizyteComponent },
  { path: 'cennik', component: PriceListComponent },
  { path: 'nasz-zespol', component: OurTeamComponent },
  { path: 'kontakt', component: ContactComponent },
  { path: 'blog', component: BlogListComponent },
  { path: 'sandbox', component: SandboxComponent },

  //
  { path: 'blog/:id', component: SubpageBlog1Component },
  { path: 'ros/:id', component: SubpageRof1Component },

  //Admin
  { path: 'admin', component: AdminLoginComponent },
  {
    path: 'admin-homepage',
    component: AdminHomepageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-doctor',
    component: DoctorAddComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin-blog',
    component: AdminBlogComponent,
    canActivate: [AuthGuard],
  },
  { path: 'ros', component: AdminRosComponent, canActivate: [AuthGuard] },
  {
    path: 'admin-harmonogram',
    component: AdminSchemeComponent,
    canActivate: [AuthGuard],
  },

  //Recepcja
  { path: 'recepcja', component: ReceptionLoginComponent },
  {
    path: 'recepcja-stronaglowna',
    component: ReceptionHomepageComponent,
    canActivate: [AuthGuardReception],
  },
  {
    path: 'recepcja-harmonogram',
    component: ReceptionSchemeComponent,
    canActivate: [AuthGuardReception],
  },
  {
    path: 'recepcja-rezerwacja',
    component: ReceptionReservationComponent,
    canActivate: [AuthGuardReception],
  },

  //Inne
  { path: 'rezerwacja', component: AdminReservationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
