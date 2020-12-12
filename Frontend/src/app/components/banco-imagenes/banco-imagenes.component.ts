import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImagenesService, Imagen } from '../../services/imagenes.service';
import { FileItem } from '../../Models/file-item';
import { EmpresasService } from '../../services/empresas.service';

@Component({
  selector: 'app-banco-imagenes',
  templateUrl: './banco-imagenes.component.html',
  styleUrls: ['./banco-imagenes.component.css']
})
export class BancoImagenesComponent implements OnInit {
  public dejandoCaerImgs = false;  //Controlador de eventos
  public isEmpty = false;  //Controla si el usuario quiere enviar imagenes sin haber subido nada
  public hasEmpresa:boolean = false; //Tiene o no una empresa
  public archivos:FileItem[] = [];  //Archivos a subir
  public imagenes:Imagen[] = [];  //Arreglo de imagenes para el html
  public imagenModal:Imagen;  //Imagen mostrada con más detalle

  @ViewChild("modalDetallesImagen") _modalDetallesImagen;
  @ViewChild("modalSubirArchivo") _modalSubirArchivo;

  constructor(
    private _NgbModal:NgbModal,
    private _ImagenesService:ImagenesService,
    private _EmpresasService:EmpresasService
  ) { }

  ngOnInit(): void {
    this.verificarEmpresaUsuario();
    this.GET_Imagenes();
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

  GET_Imagenes(){
    this._ImagenesService.GET_ImagenesEmpresa().subscribe(
      (res:any) => {
        this.imagenes = res.data;
      },
      (err:any) => {
        console.log(err);
      }
      );
  }

  subirArchivo() : void{
    this._NgbModal.open(this._modalSubirArchivo, {size: 'lg'});
  }

  detallesImagen(_id:string) : void{
    this._ImagenesService.GET_Imagen(_id).subscribe(
      (res:any) => {
        this.imagenModal = res.data;
      },
      (err:any) => {
        console.log(err);
      }
    );
    this._NgbModal.open(this._modalDetallesImagen, {size: 'lg'});
  }

  POST_Imagenes(){
    if(this.archivos.length > 0){
      this.isEmpty = false;
      this._ImagenesService.POST_Imagen(this.archivos).subscribe((res:any) => {
        if(res.ok){
          for(const imagen of this.archivos){
            imagen.progressUpload = 100;
          }
          this.GET_Imagenes();
          this.archivos = [];
        }
      });
    }else{
      this.isEmpty = true;
    }
  }

  DELETE_Imagen(_id:string){
    this._ImagenesService.DELETE_Imagen(_id).subscribe(
      (res:any) => {
        this.GET_Imagenes();
        this._NgbModal.dismissAll();
        console.log(res);
      },
      (err:any) => {
        console.log(err);
      }
    );
  }
}
