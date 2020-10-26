import { Component, OnInit } from '@angular/core';
import { ArchivosService, Archivo } from '../../services/archivos.service';

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

  constructor(private _archivosService:ArchivosService) { }

  ngOnInit(): void {
    this.archivos = this._archivosService.getArchivos();
  }

  verDetalles(archivo:Archivo){
    this.archivoModal = archivo;
  }
}
