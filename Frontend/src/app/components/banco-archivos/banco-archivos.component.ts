import { Component, OnInit, ViewChild } from '@angular/core';
import { ArchivosService, Archivo } from '../../services/archivos.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmpresasService } from '../../services/empresas.service';

@Component({
  selector: 'app-banco-archivos',
  templateUrl: './banco-archivos.component.html',
  styleUrls: ['./banco-archivos.component.css']
})
export class BancoArchivosComponent implements OnInit {

  archivos:Archivo[];
  public hasEmpresa:boolean = false;
  archivoModal:Archivo = {
    nombre: "",
    descripcion: "",
    extencion: "",
    imgUrl: "",
    fechaDeSubida: "",
    peso: ""
  };

  @ViewChild ('modalDetallesArchivo') modalDetallesArchivo;
  @ViewChild ('modalSubirArchivo') modalSubirArchivo;

  constructor(
    private _archivosService:ArchivosService, 
    private _EmpresasService:EmpresasService,
    private modalService: NgbModal
    ) { }

  ngOnInit(): void {
    this.verificarEmpresaUsuario();
    if(this.hasEmpresa)
      this.archivos = this._archivosService.getArchivos();
  }

  verificarEmpresaUsuario(){
    this._EmpresasService.GET_EmpresaUsuario().subscribe(
      (res:any) => {
        this.hasEmpresa = res.ok;
      },
      (err:any) => {
        this.hasEmpresa = err.ok;
      }
    );
  }

  verDetalles(archivo:Archivo){
    this.archivoModal = archivo;
    this.modalService.open(this.modalDetallesArchivo, {size: 'md'});
  }

  subirArchivo(){
    this.modalService.open(this.modalSubirArchivo, {size: 'lg'});
  }
}
