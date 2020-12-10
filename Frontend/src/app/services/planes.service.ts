import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlanesService {
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
    return this.http.delete(`${this.URL_BACKEND}/planes/${_idPlan}`, this.httpOptions);
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