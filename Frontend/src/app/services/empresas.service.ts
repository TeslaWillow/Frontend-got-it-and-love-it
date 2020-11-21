import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {
  
  private empresas:Empresa[] = [{
    "_id": 0,
    "nombre": "NIQUENT",
    "direccion": "Stoddard Place",
    "foto": "assets/img/christelle-bourgeois-Aq7paIaerrY-unsplash.jpg",
    "rubro": [
        "dolore",
        "excepteur",
        "ipsum"
    ],
    "productos": [1, 5, 7],
    "paginas": []
},
{
    "_id": 1,
    "nombre": "VERBUS",
    "direccion": "Clarkson Avenue",
    "foto": "assets/img/hannah-morgan-ycVFts5Ma4s-unsplash.jpg",
    "rubro": [
        "laboris",
        "do",
        "ullamco"
    ],
    "productos": [2, 4, 5],
    "paginas": []
},
{
    "_id": 2,
    "nombre": "QNEKT",
    "direccion": "Merit Court",
    "foto": "assets/img/clark-street-mercantile-P3pI6xzovu0-unsplash.jpg",
    "rubro": [
        "mollit",
        "nostrud",
        "incididunt"
    ],
    "productos": [1, 2, 3],
    "paginas": []
},
{
    "_id": 3,
    "nombre": "FROLIX",
    "direccion": "Milford Street",
    "foto": "assets/img/serge-kutuzov-HCBmCsaF0GY-unsplash.jpg",
    "rubro": [
        "ex",
        "est",
        "esse"
    ],
    "productos": [6, 7],
    "paginas": []
},
{
    "_id": 4,
    "nombre": "ANDRYX",
    "direccion": "Schermerhorn Street",
    "foto": "assets/img/toa-heftiba-MmPH0quV3rU-unsplash.jpg",
    "rubro": [
        "sint",
        "aliquip",
        "minim"
    ],
    "productos": [3, 5, 6],
    "paginas": []
}
];

  constructor() { }

  getEmpresas(){
    return this.empresas;
  }

  getEmpresa(id:number){
    let resultado;
    this.empresas.forEach(empresa => {
      if(empresa._id === id)
        resultado = empresa;
    });
    return resultado;
  }
}

export interface Empresa{
  _id: number,
  nombre: string,
  direccion: string,
  foto: string,
  rubro: string[],
  productos: number[],
  paginas: any[]
}