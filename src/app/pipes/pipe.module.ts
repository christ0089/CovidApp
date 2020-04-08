
import { NgModule } from '@angular/core';
import { HealthStatePipe } from './health-state.pipe';
import { CustomDatePipe } from './date-pipe.pipe';

@NgModule({
  imports: [
    // dep modules
  ],
  declarations: [ 
    HealthStatePipe,
    CustomDatePipe
  ],
  exports: [
    HealthStatePipe,
    CustomDatePipe
  ]
})
export class PipesModule {};