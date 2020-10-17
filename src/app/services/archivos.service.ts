import { Injectable } from '@angular/core';

@Injectable()

export class ArchivosService {

    private archivos:Archivo[] = [
        {
          nombre: "Imagen 1",
          descripcion: "Imagen muy bonita",
          extencion: "jpg",
          imgUrl: "./../../../assets/img/agnieszka-kowalczyk-z-qxSYHXrh4-unsplash.jpg",
          fechaDeSubida: "19/05/2020",
          peso: "5 MB"
        },
        {
          nombre: "Documento",
          descripcion: "Documento muy bonito",
          extencion: "pdf",
          imgUrl: "./../../../assets/svg/file-pdf-solid.svg",
          fechaDeSubida: "19/05/2020",
          peso: "25 MB"
        },
        {
          nombre: "Documento",
          descripcion: "Documento muy bonito",
          extencion: "docx",
          imgUrl: "./../../../assets/svg/file-word-solid.svg",
          fechaDeSubida: "20/04/2020",
          peso: "4 MB"
        },
        {
          nombre: "Archivo",
          descripcion: "Archivo muy bonito",
          extencion: "zip",
          imgUrl: "./../../../assets/svg/file-archive-solid.svg",
          fechaDeSubida: "20/04/2020",
          peso: "4 MB"
        },
        {
          nombre: "Video",
          descripcion: "Video muy bonito",
          extencion: "mp4",
          imgUrl: "./../../../assets/svg/file-video-solid.svg",
          fechaDeSubida: "25/04/2020",
          peso: "15 MB"
        }
    ];

    constructor(){
        console.log("Servicio listo de archivos");
    }

    getArchivos(){
        return this.archivos;
    }
}

export interface Archivo {
    nombre:string
    descripcion:string
    extencion:string
    imgUrl:string
    fechaDeSubida:string
    peso:string
}