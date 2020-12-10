import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  private URL_BACKEND = 'http://localhost:8888';

  constructor(
    private http:HttpClient
  ) { }

  GET_Categorias(){
    return this.http.get(`${this.URL_BACKEND}/categorias/`);
  }

  GET_Categoria(_idCategoria:string){
    return this.http.get(`${this.URL_BACKEND}/categorias/${_idCategoria}`);
  }
}

export interface Categoria{
  _id: number,
  nombre: string,
  descripcion: string
}