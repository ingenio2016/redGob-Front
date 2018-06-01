import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DatabaseServiceProvider {

  private database: SQLiteObject;
  private dbReady = new BehaviorSubject<boolean>(false);

  constructor( private platform:Platform, private sqlite:SQLite ) {
    this.platform.ready().then(()=>{
      this.sqlite.create({
        name: 'redGobernacion.db',
        location: 'default'
      })
      .then((db:SQLiteObject)=>{
        this.database = db;
        console.log(this.database);
        this.createTables().then(()=>{
          //communicate we are ready!
          this.dbReady.next(true);
        });
      })
    });
  }

  private createTables(){
    return this.database.executeSql(
      `CREATE TABLE IF NOT EXISTS Users (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        UserName TEXT,
        FirstName TEXT,
        LastName TEXT,
        Phone TEXT,
        Address TEXT,
        Genero TEXT,
        Photo TEXT,
        CountryId INTEGER,
        DepartmentId INTEGER,
        CityId INTEGER,
        Password TEXT
      );`
    ,{})
    .then(()=>{
      return this.database.executeSql(
      `CREATE TABLE IF NOT EXISTS Countries (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        Name TEXT
        );`,{} )
        .then(()=>{
          return this.database.executeSql(
          `CREATE TABLE IF NOT EXISTS Departments (
            Id INTEGER PRIMARY KEY AUTOINCREMENT,
            Name TEXT,
            CountryId INTEGER
            );`,{} )
            .then(()=>{
              return this.database.executeSql(
              `CREATE TABLE IF NOT EXISTS Cities (
                Id INTEGER PRIMARY KEY AUTOINCREMENT,
                Name TEXT,
                CountryId INTEGER,
                DepartmentId INTEGER
                );`,{} )
                .then(()=>{
                  return this.database.executeSql(
                  `CREATE TABLE IF NOT EXISTS Communes (
                    CommunneId INTEGER PRIMARY KEY AUTOINCREMENT,
                    Name TEXT,
                    CountryId INTEGER,
                    DepartmentId INTEGER,
                    CityId INTEGER
                    );`,{} )
                    .then(()=>{
                      return this.database.executeSql(
                      `CREATE TABLE IF NOT EXISTS RedUsers (
                        Id INTEGER PRIMARY KEY AUTOINCREMENT,
                        Name TEXT
                        );`,{} )
                        .then(()=>{
                          return this.database.executeSql(
                          `CREATE TABLE IF NOT EXISTS VotingPlaces (
                            Id INTEGER PRIMARY KEY AUTOINCREMENT,
                            Code TEXT,
                            Name TEXT,
                            CountryId INTEGER,
                            DepartmentId INTEGER,
                            CityId INTEGER
                            );`,{} )
                            .then(()=>{
                              console.log("Las tablas se Crearon correctamente")
                            }).catch((err)=>console.log("Error al Crear tabla de Lugares de Votación", err));
                        }).catch((err)=>console.log("Error al Crear tabla de Perfiles de Usuarios", err));
                    }).catch((err)=>console.log("Error al Crear tabla de Comunas", err));
                }).catch((err)=>console.log("Error al Crear tabla de Ciudades", err));
            }).catch((err)=>console.log("Error al Crear tabla de Departamentos", err));
        }).catch((err)=>console.log("Error al Crear tabla de Países", err));
    }).catch((err)=>console.log("Error al Crear tabla de Usuarios", err));
  }

  private isReady(){
    return new Promise((resolve, reject) =>{
      //if dbReady is true, resolve
      if(this.dbReady.getValue()){
        resolve();
      }
      //otherwise, wait to resolve until dbReady returns true
      else{
        this.dbReady.subscribe((ready)=>{
          if(ready){
            resolve();
          }
        });
      }
    })
  }

  //USER TABLE

  getAllUsers(){
    return this.isReady()
    .then(()=>{
      return this.database.executeSql("SELECT * from Users", [])
      .then((data)=>{
        let Users = [];
        for(let i=0; i<data.rows.length; i++){
          Users.push(data.rows.item(i));
        }
        return Users;
      })
    })
  }

  addUser( userName:string, firstName:string, lastName:string, phone:string, address:string, genero:string, photo:string, countryId:number, departmentId:number, cityId:number, password:string ){
    return this.isReady()
    .then(()=>{
      return this.database.executeSql(`INSERT INTO Users(UserName, FirstName, LastName, Phone, Address, Genero, Photo, CountryId, DepartmentId, CityId, Password)
                                       VALUES ('${userName}', '${firstName}', '${lastName}', '${phone}', '${address}', '${genero}', '${photo}', '${countryId}', '${departmentId}', '${cityId}', '${password}');`, {}).then((result)=>{
        if(result.insertId){
          return this.getUser(result.insertId);
        }
      })
    });
  }

  getUser( Id:number ){
    return this.isReady()
    .then(()=>{
      return this.database.executeSql(`SELECT * FROM Users WHERE Id = ${Id}`, [])
      .then((data)=>{
        if(data.rows.length){
          return data.rows.item(0);
        }
        return null;
      })
    })
  }

  //COUNTRY TABLE

  getAllCountries(){
    return this.isReady()
    .then(()=>{
      return this.database.executeSql("SELECT * from Countries", [])
      .then((data)=>{
        let Countries = [];
        for(let i=0; i<data.rows.length; i++){
          Countries.push(data.rows.item(i));
        }
        return Countries;
      })
    })
  }

  addCountry( name:string ){
    return this.isReady()
    .then(()=>{
      return this.database.executeSql(`INSERT INTO Countries(Name) VALUES ('${name}');`, {}).then((result)=>{
        if(result.insertId){
          return this.getCountry(result.insertId);
        }
      })
    });
  }

  getCountry( Id:number ){
    return this.isReady()
    .then(()=>{
      return this.database.executeSql(`SELECT * FROM Countries WHERE Id = ${Id}`, [])
      .then((data)=>{
        if(data.rows.length){
          return data.rows.item(0);
        }
        return null;
      })
    })
  }

  //DEPARTMENT TABLE

  getAllDepartments(){
    return this.isReady()
    .then(()=>{
      return this.database.executeSql("SELECT * from Departments", [])
      .then((data)=>{
        let Departments = [];
        for(let i=0; i<data.rows.length; i++){
          Departments.push(data.rows.item(i));
        }
        return Departments;
      })
    })
  }

  addDepartment( name:string, countryId:number ){
    return this.isReady()
    .then(()=>{
      return this.database.executeSql(`INSERT INTO Department(Name, CountryId) VALUES ('${name}', '${countryId}');`, {}).then((result)=>{
        if(result.insertId){
          return this.getDepartment(result.insertId);
        }
      })
    });
  }

  getDepartment( Id:number ){
    return this.isReady()
    .then(()=>{
      return this.database.executeSql(`SELECT * FROM Departments WHERE Id = ${Id}`, [])
      .then((data)=>{
        if(data.rows.length){
          return data.rows.item(0);
        }
        return null;
      })
    })
  }

  //CITIES TABLE

  getAllCities(){
    return this.isReady()
    .then(()=>{
      return this.database.executeSql("SELECT * from Cities", [])
      .then((data)=>{
        let Cities = [];
        for(let i=0; i<data.rows.length; i++){
          Cities.push(data.rows.item(i));
        }
        return Cities;
      })
    })
  }

  addCity( name:string, countryId:number, departmentId:number ){
    return this.isReady()
    .then(()=>{
      return this.database.executeSql(`INSERT INTO Cities(Name, CountryId, DepartmentId) VALUES ('${name}', '${countryId}', '${departmentId}');`, {}).then((result)=>{
        if(result.insertId){
          return this.getCity(result.insertId);
        }
      })
    });
  }

  getCity( Id:number ){
    return this.isReady()
    .then(()=>{
      return this.database.executeSql(`SELECT * FROM Cities WHERE Id = ${Id}`, [])
      .then((data)=>{
        if(data.rows.length){
          return data.rows.item(0);
        }
        return null;
      })
    })
  }

  //COMMUNES TABLE

  getAllCommunes(){
    return this.isReady()
    .then(()=>{
      return this.database.executeSql("SELECT * from Communes", [])
      .then((data)=>{
        let Communes = [];
        for(let i=0; i<data.rows.length; i++){
          Communes.push(data.rows.item(i));
        }
        return Communes;
      })
    })
  }

  addCommune( name:string, countryId:number, departmentId:number, cityId:number ){
    return this.isReady()
    .then(()=>{
      return this.database.executeSql(`INSERT INTO Communes(Name, CountryId, DepartmentId, CityId) VALUES ('${name}', '${countryId}', '${departmentId}', '${cityId}');`, {}).then((result)=>{
        if(result.insertId){
          return this.getCommune(result.insertId);
        }
      })
    });
  }

  getCommune( Id:number ){
    return this.isReady()
    .then(()=>{
      return this.database.executeSql(`SELECT * FROM Communes WHERE Id = ${Id}`, [])
      .then((data)=>{
        if(data.rows.length){
          return data.rows.item(0);
        }
        return null;
      })
    })
  }

  //REDUSERS TABLE

  getAllRedUsers(){
    return this.isReady()
    .then(()=>{
      return this.database.executeSql("SELECT * from RedUsers", [])
      .then((data)=>{
        let RedUsers = [];
        for(let i=0; i<data.rows.length; i++){
          RedUsers.push(data.rows.item(i));
        }
        return RedUsers;
      })
    })
  }

  addRedUser( name:string ){
    return this.isReady()
    .then(()=>{
      return this.database.executeSql(`INSERT INTO RedUser(Name) VALUES ('${name}');`, {}).then((result)=>{
        if(result.insertId){
          return this.getRedUser(result.insertId);
        }
      })
    });
  }

  getRedUser( Id:number ){
    return this.isReady()
    .then(()=>{
      return this.database.executeSql(`SELECT * FROM RedUsers WHERE Id = ${Id}`, [])
      .then((data)=>{
        if(data.rows.length){
          return data.rows.item(0);
        }
        return null;
      })
    })
  }

}
