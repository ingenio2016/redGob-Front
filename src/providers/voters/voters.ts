import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class VotersService {

  constructor(public http: HttpClient) {
    console.log('Hello VotersProvider Provider');
  }

}
