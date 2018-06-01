import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AdministratorsService {

  constructor(public http: HttpClient) {
    console.log('Hello AdministratorsProvider Provider');
  }

}
