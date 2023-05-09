import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ZakresuslugComponent } from './zakresuslug/zakresuslug.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { Subpagemain1Component } from './subpagemain1/subpagemain1.component';

const routes: Routes = [
  { path: '', component: MainpageComponent },
  { path: 'mainpage', component: MainpageComponent},
  { path: 'zakres-uslug', component: ZakresuslugComponent },
  { path: 'subpagemain1', component: Subpagemain1Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
