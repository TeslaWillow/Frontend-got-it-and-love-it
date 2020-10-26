import { Component, OnInit, ViewChild } from '@angular/core';
import { ArchivosService, Archivo } from '../../services/archivos.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-banco-archivos',
  templateUrl: './banco-archivos.component.html',
  styleUrls: ['./banco-archivos.component.css']
})
export class BancoArchivosComponent implements OnInit {

  archivos:Archivo[];
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

  constructor(private _archivosService:ArchivosService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.archivos = this._archivosService.getArchivos();
  }

  verDetalles(archivo:Archivo){
    this.archivoModal = archivo;
    this.modalService.open(this.modalDetallesArchivo, {size: 'lg'});
  }

  subirArchivo(){
    this.modalService.open(this.modalSubirArchivo, {size: 'lg'});
  }
}
