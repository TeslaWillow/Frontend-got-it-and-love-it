import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TipoUsuarioService {
  private URL_BACKEND = 'http://localhost:8888';
  private httpOptions;
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
  
  constructor(
    private http:HttpClient
  ) { 
    console.log("Servicio tipo usuario activo");
  }

  SET_Headers(){
    let userToken = JSON.parse(localStorage.getItem("session")).token;
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': userToken })
    };
  }

  getTiposUsuario(){
    this.SET_Headers();
    return this.http.get(`${this.URL_BACKEND}/tipoUsuario/`, this.httpOptions);
  }

  getTipoUsuario(id:number){
    let resultado;
    this.tiposUsuario.forEach(tipoU => {
      if(tipoU._id === id)
        resultado = tipoU;
    });
    return resultado;
  }
}

export interface TipoUsuario {
  _id:number,
  tipo:string,
  descripcion:string
}