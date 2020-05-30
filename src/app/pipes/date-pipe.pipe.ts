import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "datePipe",
})
export class CustomDatePipe implements PipeTransform {
  transform(value: number, ...args: any[]): any {
    const today = new Date(Date.now());
    const retrievedDate = new Date(value);
    const diff = Math.abs(retrievedDate.getTime() - today.getTime());
    console.log(diff * 1000 * 3600);
    const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    console.log(diffDays);
    if (diffDays > 7 && diffDays < 30) {
      const weeks = diffDays % 7;
      if (weeks === 1) {
        return `hace una semana`;
      }
      return `hace ${weeks} Semanas`;
    } else if (diffDays > 31) {
      const weeks = diffDays % 7;
      if (weeks == 4) {
        return `hace un mes`;
      } else {
        return new Date(value).getDate();
      }
    }
    if (diffDays === 1) {
      return `hace un día`;
    }
    return `hace ${diffDays} días`;
  }
}
