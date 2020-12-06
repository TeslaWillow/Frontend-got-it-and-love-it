import { Injectable } from '@angular/core';
import { FileItem } from '../Models/file-item';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImagenesService {

  private imagenes:Imagen[] = [
    {
      _id: 0,
      nombre: "Imagen 1",
      descripcion: "Imagen muy bonita",
      extencion: "jpg",
      imgUrl: "assets/img/agnieszka-kowalczyk-z-qxSYHXrh4-unsplash.jpg",
      fechaDeSubida: new Date(),
      peso: "5 MB"
    },
    {
      _id: 1,
      nombre: "Imagen",
      descripcion: "Imagen muy bonito",
      extencion: "jpg",
      imgUrl: "assets/img/clark-street-mercantile-P3pI6xzovu0-unsplash.jpg",
      fechaDeSubida: new Date(),
      peso: "25 MB"
    },
    {
      _id: 2,
      nombre: "Imagen",
      descripcion: "Imagen muy bonito",
      extencion: "jpg",
      imgUrl: "assets/img/anastase-maragos-m-HDOBfSI7I-unsplash.jpg",
      fechaDeSubida: new Date(),
      peso: "4 MB"
    },
    {
      _id: 3,
      nombre: "Imagen",
      descripcion: "Imagen muy bonito",
      extencion: "jpg",
      imgUrl: "assets/img/mick-haupt-P87CeMMB6f0-unsplash.jpg",
      fechaDeSubida: new Date(),
      peso: "4 MB"
    },
    {
      _id: 4,
      nombre: "Imagen",
      descripcion: "Imagen muy bonito",
      extencion: "jpg",
      imgUrl: "assets/img/joshua-newton-wxW6Cp4WmE4-unsplash.jpg",
      fechaDeSubida: new Date(),
      peso: "15 MB"
    }
  ];
  private URL_BACKEND = 'http://localhost:8888';

  constructor(private http:HttpClient) {  }

  getImagenes(){
    return this.imagenes;
  }

  getImagen(id:number){
    let resultado;
    this.imagenes.forEach(imagen => {
      if(imagen._id === id)
        resultado = imagen;
    });
    return resultado;
  }

  postImagenes(imagenes:FileItem[]){
    let formData = new FormData();
    for (const imagen of imagenes){
      formData.append("imagenes[]", imagen.archivo, imagen.nombreArchivo);
    }
    this.http.post(`${this.URL_BACKEND}/imagenes/subir`, formData).subscribe((res) => {
      console.log(res);
    });
  }

  postImagen(imagen:any){
    console.log("Guardando imagen: ",imagen);
  }
}

export interface Imagen{
  _id:number,
  nombre: string,
  descripcion: string,
  extencion:string,
  imgUrl: string,
  fechaDeSubida: Date,
  peso: string
}
