import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private URL_BACKEND = 'http://localhost:8888';
  private httpOptions;

  private productos:Producto[] = [{
    _id: 0,
    nombre: "Coca cola Lite",
    descripcion: "ut nulla labore eiusmod aliqua esse commodo proident commodo ad officia officia",
    precio: 63,
    calificacion: 5,
    activo: false,
    foto: "assets/img/productos/cocacola.jpg",
    categoria: 1
},
{
    _id: 1,
    nombre: "Coca cola",
    descripcion: "aliqua est proident ut Lorem tempor reprehenderit occaecat ipsum sint ad sunt",
    precio: 74,
    calificacion: 5,
    activo: true,
    foto: "assets/img/productos/cocacola.jpg",
    categoria: 1
},
{
    _id: 2,
    nombre: "Laptop HP",
    descripcion: "qui eiusmod sint eiusmod minim consectetur dolor id in ullamco nostrud ex",
    precio: 42,
    calificacion: 1,
    activo: true,
    foto: "assets/img/productos/hp.jpg",
    categoria: 2
},
{
    _id: 3,
    nombre: "Panadol",
    descripcion: "eiusmod dolore consequat cupidatat tempor magna aliquip sit enim duis ad pariatur",
    precio: 76,
    calificacion: 2,
    activo: true,
    foto: "assets/img/productos/pill.jpg",
    categoria: 3
},
{
    _id: 4,
    nombre: "Gati",
    descripcion: "nostrud et ad elit tempor ex voluptate eu eiusmod officia aute aliquip",
    precio: 63,
    calificacion: 3,
    activo: true,
    foto: "assets/img/productos/gati.jpg",
    categoria: 4
},
{
    _id: 5,
    nombre: "Aceite",
    descripcion: "culpa officia ex cillum velit Lorem nulla labore aute adipisicing do minim",
    precio: 58,
    calificacion: 0,
    activo: true,
    foto: "assets/img/productos/oil.jpg",
    categoria: 5
},
{
    _id: 6,
    nombre: "ACE",
    descripcion: "cupidatat elit laboris consectetur aliquip elit minim adipisicing commodo ad commodo ut",
    precio: 83,
    calificacion: 4,
    activo: true,
    foto: "assets/img/productos/ace.jpg",
    categoria: 6
},
{
    _id: 7,
    nombre: "Chamarra",
    descripcion: "dolor pariatur magna pariatur anim enim qui fugiat consectetur do ullamco eiusmod",
    precio: 51,
    calificacion: 1,
    activo: true,
    foto: "assets/img/productos/chamarra.jpg",
    categoria: 7
}
];

  constructor(
    private http:HttpClient
  ) { }

  SET_Headers(){
    let userToken = JSON.parse(localStorage.getItem("session")).token;
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': userToken })
    };
  }

  GET_Productos(){
    return this.http.get(`${this.URL_BACKEND}/productos/`);
  }

  GET_Producto(_idEmpresa:string){
    return this.http.get(`${this.URL_BACKEND}/productos/${_idEmpresa}`);
  }

  GET_ProductosEmpresa(){
    this.SET_Headers();
    return this.http.get(`${this.URL_BACKEND}/productos/empresa`, this.httpOptions);
  }

  POST_Producto(nuevoProducto:JSON){
    this.SET_Headers();
    return this.http.post(`${this.URL_BACKEND}/productos/`, nuevoProducto, this.httpOptions);
  }

  PUT_Producto(_idProducto:string ,nuevoActualizado:JSON){
    this.SET_Headers();
    return this.http.put(`${this.URL_BACKEND}/productos/${_idProducto}`, nuevoActualizado, this.httpOptions);
  }

  DELETE_Producto(_idProducto:string){
    this.SET_Headers();
    return this.http.delete(`${this.URL_BACKEND}/productos/${_idProducto}`, this.httpOptions);
  }
}


export interface Producto {
  _id: any,
  nombre: any,
  descripcion: any,
  precio: any,
  calificacion: any,
  activo:any,
  foto: any,
  categoria: any
}