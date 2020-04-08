import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'healthState'
})
export class HealthStatePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (value == null) {
      "No se completo"
    }
    if (value >= 10) {
      if (value >= 15) {
        return "Urgente, Caso posible";
      }
      return "Posible Caso";
    }
    return "Saludable";
  }
}
