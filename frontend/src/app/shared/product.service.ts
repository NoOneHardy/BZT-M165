import { Injectable } from '@angular/core';
import {of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  getProducts() {
    return of([
      {
        id: 'kj213498asfb1',
        name: 'Test',
        attribute1: 'blabla',
        attribute2: 'blabla',
        attribute3: 'blabla',
        attribute4: 'blabla',
        attribute5: 'blabla',
        attribute6: 'blabla',
        attribute7: 'blabla',
      }
    ])
  }
}
