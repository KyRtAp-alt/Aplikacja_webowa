import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ZakresuslugComponent } from './zakresuslug/zakresuslug.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { Subpagemain1Component } from './subpagemain1/subpagemain1.component';
import { Zakresuslug2Component } from './zakresuslug2/zakresuslug2.component';
import { LekarzMedycynyRodzinnejComponent } from './lekarz-medycyny-rodzinnej/lekarz-medycyny-rodzinnej.component';

const routes: Routes = [
  { path: '', component: MainpageComponent },
  { path: 'mainpage', component: MainpageComponent},
  { path: 'zakres-uslug', component: ZakresuslugComponent },
  { path: 'subpagemain1', component: Subpagemain1Component },
  { path: 'zakres-uslug2', component: Zakresuslug2Component },
  {path: 'lekarz-medycyny-rodzinnej', component: LekarzMedycynyRodzinnejComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
