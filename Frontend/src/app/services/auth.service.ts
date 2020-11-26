import { Injectable } from '@angular/core';
import { UsuariosService } from './usuarios.service';
import { TipoUsuarioService } from './tipo-usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _UsuariosService:UsuariosService,
    private _TipoUsuarioService:TipoUsuarioService
  ) { }

  login(correo:string, pass:string){
    let usuario = this._UsuariosService.validarUsuario(correo,pass)
    if(usuario){
      localStorage.setItem('session', JSON.stringify(usuario));
      return true;
    }
    else{
      return false;
    }
  }

  isAuthUser(): boolean {
    let session = localStorage.getItem('session');
    if(session !== null && session !== "")
      return true;
    else
      return false;
  }

  getSession(){
    return JSON.parse(localStorage.getItem('session'));
  }

  getTipoUsuario(): string {
    let session = JSON.parse(localStorage.getItem('session'));
    return this._TipoUsuarioService.getTipoUsuario(session.tipoUsuario).tipo;
  }

  logout(){
    localStorage.removeItem('session');
  }
}
