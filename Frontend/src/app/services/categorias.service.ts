import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  private categorias:Categoria[] = [{
    "_id": 0,
    "nombre": "Alimentos",
    "descripcion": "Est ad sunt nulla sunt enim."
},
{
    "_id": 1,
    "nombre": "Tecnología",
    "descripcion": "Do minim adipisicing voluptate anim mollit cupidatat ex do est deserunt ut pariatur."
},
{
    "_id": 2,
    "nombre": "Hogar",
    "descripcion": "Excepteur aute tempor dolore in pariatur ullamco ea ut do occaecat non minim ea eu."
},
{
    "_id": 3,
    "nombre": "Salud",
    "descripcion": "Consequat excepteur eu ipsum sunt est veniam culpa cupidatat nostrud ipsum esse eu Lorem ea."
},
{
    "_id": 4,
    "nombre": "Mascotas",
    "descripcion": "Non id mollit magna id occaecat sint cillum sunt."
},
{
    "_id": 5,
    "nombre": "Autos",
    "descripcion": "Non id mollit magna id occaecat sint cillum sunt."
},
{
    "_id": 6,
    "nombre": "Limpieza",
    "descripcion": "Non id mollit magna id occaecat sint cillum sunt."
},
{
    "_id": 7,
    "nombre": "Ropa",
    "descripcion": "Non id mollit magna id occaecat sint cillum sunt."
}
];

  constructor() { }

  getCategorias(){
    return this.categorias;
  }

  getCategoria(id:number){
    let resultado;
    this.categorias.forEach(categoria => {
      if(categoria._id === id)
        resultado = categoria;
    });
    return resultado;
  }
}

export interface Categoria{
  _id: number,
  nombre: string,
  descripcion: string
}