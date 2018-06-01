import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the LocalStorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LocalStorage {

  constructor(public http: Http) {
  }

    set (key: string, value: string) {
      return localStorage.setItem(key, value);
    }

    get (key: string) {
      return localStorage.getItem(key);
    }

    setObject (key: string, value: any) {
      return localStorage.setItem(key, JSON.stringify(value));
    }

    getObject (key: string) {
      return JSON.parse(localStorage.getItem(key) || '{}');
    }

    remove (key: string) {
      localStorage.removeItem(key);
    }

}
