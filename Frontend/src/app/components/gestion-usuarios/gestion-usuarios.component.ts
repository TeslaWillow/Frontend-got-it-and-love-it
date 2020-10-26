import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-gestion-usuarios',
  templateUrl: './gestion-usuarios.component.html',
  styleUrls: ['./gestion-usuarios.component.css']
})
export class GestionUsuariosComponent implements OnInit {


  @ViewChild ('modalCrearNuevoUsuario') modalCrearNuevoUsuario;
  @ViewChild ('modalActualizarUsuario') modalActualizarUsuario;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  actualizarUsuario(){
    this.modalService.open(this.modalActualizarUsuario, {size: 'lg'});
  }

  crearNuevoUsuario(){
    this.modalService.open(this.modalCrearNuevoUsuario, {size: 'lg'});
  }

}
