
import { NgModule } from '@angular/core';
import { HealthStatePipe } from './health-state.pipe';
import { CustomDatePipe } from './date-pipe.pipe';
import { ResultPipe } from './result-pipe.pipe';

@NgModule({
  imports: [
    // dep modules
  ],
  declarations: [ 
    HealthStatePipe,
    CustomDatePipe,
    ResultPipe,
  ],
  exports: [
    HealthStatePipe,
    ResultPipe,
    CustomDatePipe
  ]
})
export class PipesModule {};