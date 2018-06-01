import { Injectable } from '@angular/core';
import { USERS_ARRAY } from '../../data/index.data';
import * as _ from 'lodash';

@Injectable()
export class UserService {

  constructor() {
  }

  login( username:string, password:string ) {
    let userLogin: UserModel[] = [];
    _.forEach(USERS_ARRAY, function(item) {
      if(item.UserName == username && item.Password == password){
        userLogin.push(item);
      }
    });

    return userLogin;
  }

}

export interface UserModel {
  Id: number;
  UserName: string;
  FirstName: string;
  LastName: string;
  Phone: string;
  Address: string;
  Genero: number;
  Photo: string;
  CountryId: number;
  DepartmentId: number;
  CityId: number;
  Password: string;
  Profile:string;
}

export interface Boss {
  FirstName:string;
  LastName:string;
  Document: number;
  DateOfBirth: string;
  CountryId: number;
  DepartmentId: number;
  CityId: number;
  Address: string;
  Street: string;
  Latitude: string;
  Longitude: string;
  Phone: number;
  CellPhone: number;
  Email: string;
  Ocupation: string;
  Speciality: string;
  SpecialityYears: number;
  CommuneId: number;
  AssociationId: number;
  VotingPlaceId: number;
  WorkPlaceId: number;
  Observation: string;
}
