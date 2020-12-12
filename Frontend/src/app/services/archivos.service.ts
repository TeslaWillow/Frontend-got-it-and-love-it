import { Injectable } from '@angular/core';
import { FileItem } from '../Models/file-item';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()

export class ArchivosService {
  private httpOptions;
  private URL_BACKEND = 'http://localhost:8888';
  constructor(
    private http:HttpClient
  ){
      console.log("Servicio listo de archivos");
  }

  private SET_Headers(){
    let userToken = JSON.parse(localStorage.getItem("session")).token;
    this.httpOptions = {
      headers: new HttpHeaders({ 'Accept': 'application/json', 'token': userToken })
    };
  }


  GET_Archivos(){
    this.SET_Headers();
    return this.http.get( `${this.URL_BACKEND}/bancoarchivos/` , this.httpOptions);
  }

  GET_Archivo(_idArchivo:String){
    this.SET_Headers();
    return this.http.get( `${this.URL_BACKEND}/bancoarchivos/archivo/${_idArchivo}` , this.httpOptions);
  }

  GET_ArchivosEmpresa(){
    this.SET_Headers();
    return this.http.get( `${this.URL_BACKEND}/bancoarchivos/empresa` , this.httpOptions);
  }

  POST_Archivos(imagenes:FileItem[]){
    this.SET_Headers();
    let formData = new FormData();
    for (const imagen of imagenes){
      formData.append("archivo", imagen.archivo, imagen.nombreArchivo);
    }
    return this.http.post( `${this.URL_BACKEND}/bancoarchivos/`, formData, this.httpOptions);
  }

  DELETE_Archivos(){}
}

export interface Archivo {
    _id:any,
    nombreArchivo: any,
    descripcion: any,
    extencion:any,
    rutaArchivo: any,
    fechaDeSubida: any,
    peso: any
}