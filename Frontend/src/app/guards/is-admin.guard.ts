import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class IsAdminGuard implements CanActivate {

  constructor(
    private auth:AuthService,
    private router:Router
    ) {}

  canActivate():boolean{
    if(this.auth.getTipoUsuario() === "administrador")
      return true
    else{
      this.auth.logout();
      this.router.navigateByUrl('./inicio-sesion-usuario');
    }
  }
  
}
