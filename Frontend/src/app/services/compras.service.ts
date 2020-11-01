import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {

  private compras:Compra[] = [
    {
      "_id": 0,
      "Productoid": 0,
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

  constructor() { }

  getCompras(){
    return this.compras;
  }

  getCompra(id:number){
    let resultado;
    this.compras.forEach(compra => {
      if(compra._id === id)
        resultado = compra;
    });
    return resultado;
  }
}

export interface Compra {
  _id:Number
  Productoid:Number
  fechaCompra:Date
  cantidad:number
  total:Number
}