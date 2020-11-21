import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private usuarios:Usuario[] = [
  {
      _id: 0,
      nombre: "raul",
      apellido: "perez torres",
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
      nombre: "lucas",
      apellido: "castellanos",
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
      nombre: "pedro",
      apellido: "martinez",
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

  getUsuario(id:number){
    let resultado;
    this.usuarios.forEach(usuario => {
      if(usuario._id === id)
        resultado = usuario;
    });
    return resultado;
  }

  validarUsuario(correo:string, password:string){
    let resultado = null;
    for (const usuario of this.usuarios) {
      if((usuario.correo === correo) && (usuario.password === password)){
        resultado = usuario;
        break
      }
    }
    return resultado;
  }
}

export interface Usuario {
  _id: number, //Seran objectId()
  nombre: string,
  apellido: string,
  correo: string,
  password: string,
  telefono: string,
  foto: string,
  tipoUsuario: number, //Seran objectId()
  plan: number, //Seran objectId()
  activo: boolean,
  compras: any[],
  empresa: any[]
}