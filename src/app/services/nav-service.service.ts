import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class NavServiceService {
  private localData: any = {};

  constructor() { }

  setData<T>(data) {
    this.localData = data;
  }
  getData<T>(): T {
    return this.localData;
  }
}
