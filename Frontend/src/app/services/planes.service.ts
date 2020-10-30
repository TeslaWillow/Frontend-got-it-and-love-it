import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlanesService {

  private Planes:Plan[] = [{
    _id: 0,
    nombrePlan: "Gratis",
    descripción: "Plan gratis para usuarios particulares, sin beneficios de empresa",
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
    descripción: "Plan basico para empresas",
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
    descripción: "Plan Pro para empresas",
    precio: 0,
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
    descripción: "Plan Ultimate para empresas",
    precio: 0,
    fechaCreación: new Date(20/10/2020),
    restricciones: {
        limiteFilas: 7,
        limiteColumnas: 5,
        limitePaginas: 3,
        limiteAlmacenamiento: 1024
    }
}
];

  constructor() { 
    console.log("Servicio de planes activo");
  }

  getPlanes(){
    return this.Planes;
  }

  getPlane(id){
    return this.Planes[id];
  }
}

export interface Plan{
  _id: Number,
  nombrePlan: String,
  descripción: String,
  precio: Number,
  fechaCreación: Date,
  restricciones: any
}