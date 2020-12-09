import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {
  private URL_BACKEND = 'http://localhost:8888';
  /*
  private compras:Compra[] = [
    {
      "_id": 0,
      "Productoid": 5,
      "fechaCompra": new Date("2018-06-05"),
      "cantidad": 5,
      "total": 4
    },
    {
      "_id": 1,
      "Productoid": 1,
      "fechaCompra": new Date("2019-08-02"),
      "cantidad": 4,
      "total": 2
    },
    {
      "_id": 2,
      "Productoid": 2,
      "fechaCompra": new Date("2018-04-05"),
      "cantidad": 2,
      "total": 4
    },
    {
      "_id": 3,
      "Productoid": 3,
      "fechaCompra": new Date("2017-09-08"),
      "cantidad": 2,
      "total": 5
    },
    {
      "_id": 4,
      "Productoid": 4,
      "fechaCompra": new Date("2017-03-05"),
      "cantidad": 3,
      "total": 0
    }
  ];
  */
  
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