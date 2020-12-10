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
  public totalEmpresas:number = 0;
  public paginaActual:number = 0;
  public desde:number = 0;
  public hasta:number = 9;

  constructor(private _EmpresasService:EmpresasService) { }

  ngOnInit(): void {
    this._EmpresasService.GET_Empresas().subscribe(
      (res:any) => {
        this.empresas = res.data;
        this.totalEmpresas = res.data.length;
      },
      (err:any) => {
        console.log(err);
      }
    );
  }

  agregarPaginacion(){
    let paginacion = [];
    for (let i = 0; i < Math.ceil(this.totalEmpresas/9); i++) {
      paginacion.push(i);
    };
    return paginacion;
  }

}
