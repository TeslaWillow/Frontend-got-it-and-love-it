import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private usuarios:Usuario[] = [
  {
      _id: 0,
      nombre: "raul",
      apellido: "perez torres",
      correo: "cliente@cliente.com",
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
      correo: "empresa@empresa.com",
      password: "pass-empresa",
      telefono: "9999-9999",
      foto: "assets/img/profile/empresa-img.png",
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
      correo: "admin@admin.com",
      password: "pass-admin",
      telefono: "7777-7777",
      foto: "assets/img/profile/admin-img.png",
      tipoUsuario: 2,
      plan: 0,
      activo: true,
      compras: [],
      empresa: []
  }
  ];
  private URL_BACKEND = 'http://localhost:8888';

  constructor(private http:HttpClient) { 
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

  POST_Usuario(nuevoUsuario:JSON){
    return this.http.post(`${this.URL_BACKEND}/usuarios/`, nuevoUsuario);
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
  _id: any, //Seran objectId()
  nombre: any,
  apellido: any,
  correo: any,
  password: any,
  telefono: any,
  foto: any,
  tipoUsuario: any, //Seran objectId()
  plan: any, //Seran objectId()
  activo: any,
  compras: any[],
  empresa: any[]
}