import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  private URL_BACKEND = 'http://localhost:8888';
  private httpOptions;
  constructor(
    private http:HttpClient
  ) { }

  private SET_Headers(){
    let userToken = JSON.parse(localStorage.getItem("session")).token;
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': userToken })
    };
  }

  GET_Categorias(){
    return this.http.get(`${this.URL_BACKEND}/categorias/`);
  }

  GET_Categoria(_idCategoria:string){
    this.SET_Headers();
    return this.http.get(`${this.URL_BACKEND}/categorias/categoria/${_idCategoria}`, this.httpOptions);
  }

  GET_CategoriasEmpresa(){
    this.SET_Headers();
    return this.http.get(`${this.URL_BACKEND}/categorias/empresa`, this.httpOptions);
  }

  POST_Categoria(nuevaCategoria:JSON){
    this.SET_Headers();
    return this.http.post(`${this.URL_BACKEND}/categorias/`, nuevaCategoria, this.httpOptions);
  }

  PUT_Categoria(_idCategoria:string, categoriaActualizada:JSON){
    this.SET_Headers();
    return this.http.put(`${this.URL_BACKEND}/categorias/${_idCategoria}`, categoriaActualizada, this.httpOptions);
  }

  DELETE_Categoria(_idCategoria:string){
    this.SET_Headers();
    return this.http.delete(`${this.URL_BACKEND}/categorias/${_idCategoria}`, this.httpOptions);
  }
}

export interface Categoria{
  _id: string,
  nombre: string,
  descripcion: string
}