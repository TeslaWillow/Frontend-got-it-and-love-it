import { Injectable } from '@angular/core';
import { UsuariosService } from './usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _UsuariosService:UsuariosService
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
    if(localStorage.getItem('session'))
      return true;
    else
      return false;
  }

  logout(){
    localStorage.removeItem('session');
  }
}
