import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlanesService {
  private URL_BACKEND = 'http://localhost:8888';
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

  constructor(private http:HttpClient) { 
    console.log("Servicio de planes activo");
  }

  GET_Planes(){
    return this.Planes;
  }

  GET_Plan(id:number){
    return this.Planes[id];
  }

  POST_Plan(datos:any){
    this.http.post(`${this.URL_BACKEND}/planes/`, datos).subscribe((res) => {
      console.log(res);
    });
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