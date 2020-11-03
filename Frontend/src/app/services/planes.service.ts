import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlanesService {

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

  constructor() { 
    console.log("Servicio de planes activo");
  }

  getPlanes(){
    return this.Planes;
  }

  getPlane(id:number){
    return this.Planes[id];
  }
}

export interface Plan{
  _id: number,
  nombrePlan: string,
  color: string,
  descripcion: string,
  precio: number,
  fechaCreación: Date,
  restricciones: any
}