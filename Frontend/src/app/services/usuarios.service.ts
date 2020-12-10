import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
/*
  private usuarios:Usuario[] = [
  {
      _id: 0,
      nombre: "raul",
      apellido: "perez torres",
      correo: "cliente@cliente.com",
      password: "pass-cliente",
      telefono: "8888-8888",
      foto: "assets/img/profile/cliente-img.jpg",
      tipoUsuario: 0,
      plan: 0,
      activo: false,
      compras: [],
      empresa: []
  },
  {
      _id: 1,
      nombre: "lucas",
      apellido: "castellanos",
      correo: "empresa@empresa.com",
      password: "pass-empresa",
      telefono: "9999-9999",
      foto: "assets/img/profile/empresa-img.png",
      tipoUsuario: 1,
      plan: 1,
      activo: true,
      compras: [],
      empresa: []
  },
  {
      _id: 3,
      nombre: "pedro",
      apellido: "martinez",
      correo: "admin@admin.com",
      password: "pass-admin",
      telefono: "7777-7777",
      foto: "assets/img/profile/admin-img.png",
      tipoUsuario: 2,
      plan: 0,
      activo: true,
      compras: [],
      empresa: []
  }
  ];
*/
  
  private URL_BACKEND = 'http://localhost:8888';
  private httpOptions;

  constructor(
    private http:HttpClient
    ) {}

  SET_Headers(){
    let userToken = JSON.parse(localStorage.getItem("session")).token;
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': userToken })
    };
  }

  GET_Usuarios(){
    this.SET_Headers();
    return this.http.get(`${this.URL_BACKEND}/usuarios/`, this.httpOptions);
  }

  GET_Usuario(_id:string){
    this.SET_Headers();
    return this.http.get(`${this.URL_BACKEND}/usuarios/${_id}`, this.httpOptions);
  }

  PUT_Usuario(_id:string, usuarioActualizado:JSON){
    this.SET_Headers();
    return this.http.put(`${this.URL_BACKEND}/usuarios/${_id}`, usuarioActualizado, this.httpOptions);
  };
  //Cualquiera puede crear un usuario por eso no se verifica si es un usuario logeado o no
  POST_Usuario(nuevoUsuario:JSON){
    return this.http.post(`${this.URL_BACKEND}/usuarios/`, nuevoUsuario);
  }

  DELETE_Usuario(_id:string){
    this.SET_Headers();
    return this.http.delete(`${this.URL_BACKEND}/usuarios/${_id}`, this.httpOptions);
  }
}

export interface Usuario {
  _id: any, //Seran objectId()
  nombre: any,
  apellido: any,
  correo: any,
  password: any,
  telefono: any,
  foto: any,
  tipoUsuario: any, //Seran objectId()
  plan: any, //Seran objectId()
  activo: any,
  compras: any[],
  empresa: any[]
}