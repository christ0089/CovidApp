import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HospitalsPage } from './hospitals.page';

const routes: Routes = [
  {
    path: '',
    component: HospitalsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HospitalsPageRoutingModule {}
