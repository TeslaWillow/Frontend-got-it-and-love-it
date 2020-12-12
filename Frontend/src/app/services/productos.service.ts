import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private URL_BACKEND = 'http://localhost:8888';
  private httpOptions;

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

  POST_Producto(nuevoProducto:any){
    let userToken = JSON.parse(localStorage.getItem("session")).token;
    this.httpOptions = {
      headers: new HttpHeaders({ "Accept": "application/json", 'token': userToken })
    };
    let formData = new FormData();
    formData.append("archivo", nuevoProducto.foto);
    formData.append("nombre", nuevoProducto.nombre);
    formData.append("descripcion", nuevoProducto.descripcion);
    formData.append("precio", nuevoProducto.precio);
    formData.append("categoria", nuevoProducto.categoria);
    return this.http.post(`${this.URL_BACKEND}/productos/`, formData, this.httpOptions);
  }

  PUT_Producto(_idProducto:string ,nuevoActualizado:any){
    let userToken = JSON.parse(localStorage.getItem("session")).token;
    this.httpOptions = {
      headers: new HttpHeaders({ "Accept": "application/json", 'token': userToken })
    };

    let formData = new FormData();
    formData.append("archivo", nuevoActualizado.foto);
    formData.append("nombre", nuevoActualizado.nombre);
    formData.append("descripcion", nuevoActualizado.descripcion);
    formData.append("precio", nuevoActualizado.precio);
    formData.append("categoria", nuevoActualizado.categoria);

    return this.http.put(`${this.URL_BACKEND}/productos/${_idProducto}`, formData, this.httpOptions);
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