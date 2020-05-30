import { Pipe, PipeTransform } from '@angular/core';
import { iresult } from '../Models/iResults';
@Pipe({
  name: 'resultPipe'
})
export class ResultPipe implements PipeTransform {


  transform(value: iresult): any {
    return {
      result: value.result,
      date: value.dateRevised,
      platform: value.platform
    }
  }

}


