import { Injectable } from '@angular/core';
import { Usuario, UsuariosService } from './usuarios.service';
import { TipoUsuarioService, TipoUsuario } from './tipo-usuario.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL_BACKEND = 'http://localhost:8888';

  constructor(
    private _TipoUsuarioService:TipoUsuarioService,
    private http:HttpClient
  ) { }

  login(usuario:JSON){
    return this.http.post(`${this.URL_BACKEND}/login/`, usuario);
  }

  createSession(usuario:JSON){
    localStorage.setItem('session', JSON.stringify(usuario));
  }

  isAuthUser(): boolean {
    let session = localStorage.getItem('session');
    if(session !== null && session !== "")
      return true;
    else
      return false;
  }

  getSession(): Usuario{
    return JSON.parse(localStorage.getItem('session'));
  }

  getTipoUsuario(): string {
    let session = JSON.parse(localStorage.getItem('session'));
    return session.TipoUsuario;
  }

  logout(){
    localStorage.removeItem('session');
  }
}
