import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Plan } from './planes.service';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
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

  PUT_AscenderAEmpresa(plan:Plan){
    const _idPlan = {
      "plan": plan._id
    }
    this.SET_Headers();
    return this.http.put(`${this.URL_BACKEND}/usuarios/cliente/empresa`, _idPlan, this.httpOptions);
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