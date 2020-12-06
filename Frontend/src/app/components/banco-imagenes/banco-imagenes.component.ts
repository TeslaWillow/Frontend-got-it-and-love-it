import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImagenesService, Imagen } from '../../services/imagenes.service';
import { FileItem } from '../../Models/file-item';

@Component({
  selector: 'app-banco-imagenes',
  templateUrl: './banco-imagenes.component.html',
  styleUrls: ['./banco-imagenes.component.css']
})
export class BancoImagenesComponent implements OnInit {
  public dejandoCaerImgs = false;
  public archivos:FileItem[] = [];
  public isEmpty = false;
  public imagenes:Imagen[];
  public imagenModal:Imagen;

  @ViewChild("modalDetallesImagen") _modalDetallesImagen;
  @ViewChild("modalSubirArchivo") _modalSubirArchivo;

  constructor(
    private _NgbModal:NgbModal,
    private _ImagenesService:ImagenesService
  ) { }

  ngOnInit(): void {
    this.imagenes = this._ImagenesService.getImagenes();
  }

  subirArchivo() : void{
    this._NgbModal.open(this._modalSubirArchivo, {size: 'lg'});
  }

  detallesImagen(_id:number) : void{
    this.imagenModal = this._ImagenesService.getImagen(_id);
    this._NgbModal.open(this._modalDetallesImagen, {size: 'lg'});
  }

  POST_Imagenes(){
    if(this.archivos.length > 0){
      this.isEmpty = false;
      this._ImagenesService.postImagenes(this.archivos);
    }else{
      this.isEmpty = true;
    }
  }
}
