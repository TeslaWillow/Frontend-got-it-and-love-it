import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmpresasService, Empresa } from '../../services/empresas.service';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})

export class EmpresasComponent implements OnInit {

  public empresas:Empresa[];

  constructor(private _EmpresasService:EmpresasService) { }

  ngOnInit(): void {
    this.empresas = this._EmpresasService.getEmpresas();
  }

}
