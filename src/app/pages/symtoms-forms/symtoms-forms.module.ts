import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SymtomsFormsPageRoutingModule } from './symtoms-forms-routing.module';

import { SymtomsFormsPage } from './symtoms-forms.page';
import { ResultPage } from '../result/result.page';
import { ResultPageModule } from '../result/result.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SymtomsFormsPageRoutingModule
  ],
  declarations: [SymtomsFormsPage],
})
export class SymtomsFormsPageModule {}
