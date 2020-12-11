import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {
  private URL_BACKEND = 'http://localhost:8888';
  
  constructor(private http:HttpClient) { }

  getComprasUsuario(){
    let userToken = JSON.parse(localStorage.getItem("session")).token;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': userToken })
    };
    return this.http.get(`${this.URL_BACKEND}/compras/usuario/`, httpOptions);
  }

}

export interface Compra {
  _id:number
  Productoid:number
  producto:any,
  fotoProducto:string,
  fechaCompra:Date
  precioUnitario:number,
  cantidad:number
  total:number
}