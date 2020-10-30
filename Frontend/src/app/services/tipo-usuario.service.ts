import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TipoUsuarioService {

  private tiposUsuario:TipoUsuario[] = [{
    _id: 0,
    tipo: "cliente",
    descripcion: "usuario tipo cliente. Tiene derecho a ver otras tiendas y hacer compras"
}, {
    _id: 1,
    tipo: "empresa",
    descripcion: "usuario tipo empresa. Tiene derecho a un banco de archivos, creacion de pagina y actualizar su plan (debe tener un plan antes de ser un usuario empresa). Tambien puede realizar las mismas acciones que el cliente"
},
{
    _id: 2,
    tipo: "administrador",
    descripcion: "usuario tipo cliente. Tiene derecho a editar planes, usuarios y bloqueo de paginas. Tambien puede realizar las mismas acciones que el cliente"
}
];
  constructor() { 
    console.log("Servicio tipo usuario activo");
  }

  getTiposUsuario(){
    return this.tiposUsuario;
  }

  getTipoUsuario(id:number){
    this.tiposUsuario.forEach(tipo => {
      if(tipo._id === id)
        return tipo;
    });
  }
}

export interface TipoUsuario {
  _id:Number,
  tipo:String,
  descripcion:String
}