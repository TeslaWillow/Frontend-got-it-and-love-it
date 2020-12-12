import { Component, OnInit, ViewChild } from '@angular/core';
import { ArchivosService, Archivo } from '../../services/archivos.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FileItem } from '../../Models/file-item';
import { EmpresasService } from '../../services/empresas.service';

@Component({
  selector: 'app-banco-archivos',
  templateUrl: './banco-archivos.component.html',
  styleUrls: ['./banco-archivos.component.css']
})
export class BancoArchivosComponent implements OnInit {

  public hasEmpresa:boolean = false;
  public dejandoCaerImgs = false;  //Controlador de eventos
  public isEmpty = false;  //Controla si el usuario quiere enviar imagenes sin haber subido nada
  public archivos:FileItem[] = [];  //Archivos a subir
  public todosLosArchivos:Archivo[];
  public archivoActual:Archivo;

  @ViewChild ('modalDetallesArchivo') modalDetallesArchivo;
  @ViewChild ('modalSubirArchivo') modalSubirArchivo;

  constructor(
    private _archivosService:ArchivosService, 
    private _EmpresasService:EmpresasService,
    private modalService: NgbModal
    ) { }

  ngOnInit(): void {
    this.verificarEmpresaUsuario();
    this.GET_Archivos();
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
    this.GET_Archivo(archivo._id);
    this.modalService.open(this.modalDetallesArchivo, {size: 'md'});
  }

  subirArchivo(){
    this.modalService.open(this.modalSubirArchivo, {size: 'lg'});
  }

  GET_Archivo(_idArchivo:string){
    this._archivosService.GET_Archivo(_idArchivo).subscribe(
      (res:any) => {
        this.archivoActual = res.data;
      },
      (err:any) => {
        console.log(err);
      }
    );
  }

  GET_Archivos(){
    this._archivosService.GET_ArchivosEmpresa().subscribe(
      (res:any) => {
        this.todosLosArchivos = res.data;
      },
      (err:any) => {
        console.log(err);
      }
    );
  }

  POST_Archivos(){
    this._archivosService.POST_Archivos(this.archivos).subscribe(
      (res:any) => {
        this.GET_Archivos();
        this.archivos = [];
      },
      (err:any) => {
        console.log(err);
      }
    );
  }
}
