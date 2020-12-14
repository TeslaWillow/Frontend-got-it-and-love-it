import { Component, OnInit } from '@angular/core';
import { EmpresasService, Empresa } from '../../services/empresas.service';

@Component({
  selector: 'app-gestion-empresas',
  templateUrl: './gestion-empresas.component.html',
  styleUrls: ['./gestion-empresas.component.css']
})
export class GestionEmpresasComponent implements OnInit {

  public empresas:Empresa[];
  public totalEmpresas:number = 0;
  public desde:number = 0;
  public hasta:number = 100;

  constructor(private _EmpresasService:EmpresasService) { }

  ngOnInit(): void {
    this.GET_Empresas();
  }

  GET_Empresas(){
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

  PUT_EmpresaDesbloquear(_idEmpresa:string){
    this._EmpresasService.PUT_EmpresaDesbloquear(_idEmpresa).subscribe(
      (res:any) => {
        if(res.ok){ this.GET_Empresas(); }
      },
      (err:any) => {console.log(err);}
    );
  }

  DELETE_Empresa(_idEmpresa:string){
    this._EmpresasService.DELETE_Empresa(_idEmpresa).subscribe(
      (res:any) => {
        if(res.ok){ this.GET_Empresas(); }
      },
      (err:any) => {console.log(err);}
    );
  }

  DELETE_EmpresaBloquer(_idEmpresa:string){
    this._EmpresasService.DELETE_EmpresaBloquear(_idEmpresa).subscribe(
      (res:any) => {
        if(res.ok){ this.GET_Empresas(); }
      },
      (err:any) => {console.log(err);}
    );
  }

}
