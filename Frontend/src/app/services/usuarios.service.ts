import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private usuarios:Usuario[] = [
  {
      _id: 0,
      nombre: "Raul",
      apellido: "Perez Torres",
      correo: "raulpt@gmail.com",
      password: "pass-cliente",
      telefono: "8888-8888",
      foto: "assets/img/profile/cliente-img.jpg",
      tipoUsuario: 0,
      plan: 0,
      activo: false,
      compras: [],
      empresa: []
  },
  {
      _id: 1,
      nombre: "Lucas",
      apellido: "Castellanos",
      correo: "lucscast@gmail.com",
      password: "pass-empresa",
      telefono: "9999-9999",
      foto: "assets/img/profile/empresa-img.jpg",
      tipoUsuario: 1,
      plan: 1,
      activo: true,
      compras: [],
      empresa: []
  },
  {
      _id: 3,
      nombre: "Pedro",
      apellido: "Martinez",
      correo: "pm@gmail.com",
      password: "pass-admin",
      telefono: "7777-7777",
      foto: "assets/img/profile/admin-img.jpg",
      tipoUsuario: 2,
      plan: 0,
      activo: true,
      compras: [],
      empresa: []
  }
];

  constructor() { 
    console.log("Servicio dummy listo de usuarios");
  }

  getUsuarios(){
    return this.usuarios;
  }

  getUsuario(id:Number){
    let resultado;
    this.usuarios.forEach(usuario => {
      if(usuario._id === id)
        resultado = usuario;
    });
    return resultado;
  }
}

export interface Usuario {
  _id: Number, //Seran objectId()
  nombre: String,
  apellido: String,
  correo: String,
  password: String,
  telefono: String,
  foto: String,
  tipoUsuario: Number, //Seran objectId()
  plan: Number, //Seran objectId()
  activo: Boolean,
  compras: any[],
  empresa: any[]
}