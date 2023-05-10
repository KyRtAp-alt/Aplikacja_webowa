import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { LekarzMedycynyRodzinnejComponent } from './lekarz-medycyny-rodzinnej/lekarz-medycyny-rodzinnej.component';
import { RangeOfServices1Component } from './range-of-services1/range-of-services1.component';
import { RangeOfServices2Component } from './range-of-services2/range-of-services2.component';
import { SubpageBlog1Component } from './subpage-blog1/subpage-blog1.component';
import { SubpageBlog2Component } from './subpage-blog2/subpage-blog2.component';
import { SubpageBlog3Component } from './subpage-blog3/subpage-blog3.component';

const routes: Routes = [
  { path: '', component: MainpageComponent },
  { path: 'mainpage', component: MainpageComponent},
  { path: 'chrapanie–uciazliwy-problem-nie-tylko-dla-chorego', component: SubpageBlog1Component },
  { path: 'dretwienia-rak–jakie-moga-byc-przyczyny', component: SubpageBlog2Component },
  { path: 'czeste-krwawienia-z-nosa-gdzie-szukac-pomocy', component: SubpageBlog3Component },
  { path: 'zakres-uslug', component: RangeOfServices1Component},
  { path: 'zakres-uslug/wiecej', component: RangeOfServices2Component },
  {path: 'lekarz-medycyny-rodzinnej', component: LekarzMedycynyRodzinnejComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
