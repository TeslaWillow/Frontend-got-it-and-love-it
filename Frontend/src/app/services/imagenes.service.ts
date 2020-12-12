import { Injectable } from '@angular/core';
import { FileItem } from '../Models/file-item';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImagenesService {
  private URL_BACKEND = 'http://localhost:8888';
  private httpOptions;
  constructor(
    private http:HttpClient
    ) {  }

  SET_Headers(){
    let userToken = JSON.parse(localStorage.getItem("session")).token;
    this.httpOptions = {
      headers: new HttpHeaders({ "Accept": "application/json", 'token': userToken })
    };
  }

  GET_Imagenes(){
    return this.http.get(`${this.URL_BACKEND}/imagenes/`);
  }

  GET_Imagen(_idImagen:string){
    return this.http.get(`${this.URL_BACKEND}/imagenes/imagen/${_idImagen}`);
  }

  GET_ImagenesEmpresa(){
    this.SET_Headers();
    return this.http.get(`${this.URL_BACKEND}/imagenes/empresa`, this.httpOptions);
  }

  POST_Imagen(imagenes:FileItem[]){
    this.SET_Headers();
    let formData = new FormData();
    for (const imagen of imagenes){
      formData.append("archivo", imagen.archivo, imagen.nombreArchivo);
    }
    return this.http.post(`${this.URL_BACKEND}/imagenes/`, formData, this.httpOptions);
  }

  DELETE_Imagen(_idImagen:string){
    this.SET_Headers();
    return this.http.delete(`${this.URL_BACKEND}/imagenes/${_idImagen}`, this.httpOptions);
  }
}

export interface Imagen{
  _id:any,
  nombreArchivo: any,
  descripcion: any,
  extencion:any,
  rutaArchivo: any,
  fechaDeSubida: any,
  peso: any
}
