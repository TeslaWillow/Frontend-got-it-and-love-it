import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Usuario } from '../../../services/usuarios.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public isEmpresa:boolean = false;
  public isAdmin:boolean = false;
  public usuario:Usuario;

  constructor(
    private auth: AuthService,
    private router:Router
  ) { }

  ngOnInit(): void {
    switch(this.auth.getTipoUsuario()){
      case "empresa":
        this.isEmpresa = true;
        break;
      case "administrador":
        this.isAdmin = true;
        break;
    };
    this.usuario = this.auth.getSession();
  }

  cerrarSession(){
    this.auth.logout();
    this.router.navigateByUrl('/inicio-sesion-usuario');
  }
}
