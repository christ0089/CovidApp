
import { NgModule } from '@angular/core';
import { HealthStatePipe } from './health-state.pipe';
import { CustomDatePipe } from './date-pipe.pipe';
import { ResultPipe } from './result-pipe.pipe';
import { SafePipe } from './safe.pipe';

@NgModule({
  imports: [
    // dep modules
  ],
  declarations: [ 
    HealthStatePipe,
    SafePipe,
    CustomDatePipe,
    ResultPipe,
  ],
  exports: [
    HealthStatePipe,
    ResultPipe,
    SafePipe,
    CustomDatePipe
  ]
})
export class PipesModule {};