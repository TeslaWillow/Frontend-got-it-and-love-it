import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmpresasService, Empresa } from '../../services/empresas.service';

@Component({
  selector: 'app-gestion-empresas',
  templateUrl: './gestion-empresas.component.html',
  styleUrls: ['./gestion-empresas.component.css']
})
export class GestionEmpresasComponent implements OnInit {

  public empresas:Empresa[];
  public desde:number = 0;
  public hasta:number = 9;

  constructor(private _EmpresasService:EmpresasService) { }

  ngOnInit(): void {
    this.empresas = this._EmpresasService.getEmpresas();
  }

}
