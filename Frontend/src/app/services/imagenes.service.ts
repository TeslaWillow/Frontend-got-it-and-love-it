import { Injectable } from '@angular/core';

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

  constructor() {  }

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
