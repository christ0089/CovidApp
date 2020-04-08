import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SymtomsFormsPage } from './symtoms-forms.page';

const routes: Routes = [
  {
    path: '',
    component: SymtomsFormsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SymtomsFormsPageRoutingModule {}
