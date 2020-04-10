
import { NgModule } from '@angular/core';
import { HealthStatePipe } from './health-state.pipe';
import { CustomDatePipe } from './date-pipe.pipe';
import { SafePipe } from './safe.pipe';

@NgModule({
  imports: [
    // dep modules
  ],
  declarations: [ 
    HealthStatePipe,
    CustomDatePipe,
    SafePipe
  ],
  exports: [
    HealthStatePipe,
    CustomDatePipe,
    SafePipe
  ]
})
export class PipesModule {};