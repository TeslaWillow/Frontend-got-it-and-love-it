import { Injectable } from '@angular/core';

@Injectable()

export class ArchivosService {

  constructor(){
      console.log("Servicio listo de archivos");
  }

  GET_Archivos(){
      return null;
  }

  GET_Archivo(){}

  GET_ArchivosEmpresa(){}

  POST_Archivos(){}

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