import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlanesService {
  private URL_BACKEND = 'http://localhost:8888';
  private httpOptions;
  private Planes:Plan[] = [{
    _id: 0,
    nombrePlan: "Gratis",
    color: "#F77F00",
    descripcion: "Plan gratis para usuarios particulares, sin beneficios de empresa",
    precio: 0,
    fechaCreación: new Date(20/10/2020),
    restricciones: {
        limiteFilas: 0,
        limiteColumnas: 0,
        limitePaginas: 0,
        limiteAlmacenamiento: 0
    }
},
{
    _id: 1,
    nombrePlan: "Básico",
    color: "#D62828",
    descripcion: "Plan basico para empresas",
    precio: 9.99,
    fechaCreación: new Date(20/10/2020),
    restricciones: {
        limiteFilas: 3,
        limiteColumnas: 2,
        limitePaginas: 1,
        limiteAlmacenamiento: 50
    }
},
{
    _id: 2,
    nombrePlan: "Pro",
    color: "#FCBF49",
    descripcion: "Plan Pro para empresas",
    precio: 19.99,
    fechaCreación: new Date(20/10/2020),
    restricciones: {
        limiteFilas: 5,
        limiteColumnas: 3,
        limitePaginas: 2,
        limiteAlmacenamiento: 500
    }
},
{
    _id: 3,
    nombrePlan: "Ultimate",
    color: "#F77F00",
    descripcion: "Plan Ultimate para empresas",
    precio: 29.99,
    fechaCreación: new Date(20/10/2020),
    restricciones: {
        limiteFilas: 7,
        limiteColumnas: 5,
        limitePaginas: 3,
        limiteAlmacenamiento: 1024
    }
}
];

  constructor(
    private http:HttpClient
    ) {}

  SET_Headers(){
    let userToken = JSON.parse(localStorage.getItem("session")).token;
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': userToken })
    };
  }

  //No requiren autenticación
  GET_Planes(){
    return this.http.get(`${this.URL_BACKEND}/planes/`);
  }

  GET_Plan(_idPlan:String){
    return this.http.get(`${this.URL_BACKEND}/planes/${_idPlan}`);
  }

  //Requieren autenticacion
  POST_Plan(nuevoPlan:JSON){
    this.SET_Headers();
    return this.http.post(`${this.URL_BACKEND}/planes/`, nuevoPlan, this.httpOptions);
  }

  PUT_Plan(_idPlan:String, planActualizado:JSON){
    this.SET_Headers();
    return this.http.put(`${this.URL_BACKEND}/planes/${_idPlan}`, planActualizado, this.httpOptions);
  }

  DELETE_Plan(_idPlan:String){
    this.SET_Headers();
    return this.http.put(`${this.URL_BACKEND}/planes/${_idPlan}`, this.httpOptions);
  }
}

export interface Plan{
  _id: any,
  nombrePlan: any,
  color: any,
  descripcion: any,
  precio: any,
  fechaCreación: any,
  restricciones: any
}