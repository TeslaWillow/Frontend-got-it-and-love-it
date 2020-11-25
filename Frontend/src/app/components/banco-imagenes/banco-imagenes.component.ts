import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-banco-imagenes',
  templateUrl: './banco-imagenes.component.html',
  styleUrls: ['./banco-imagenes.component.css']
})
export class BancoImagenesComponent implements OnInit {

  @ViewChild("modalDetallesImagen") _modalDetallesImagen;
  @ViewChild("modalSubirArchivo") _modalSubirArchivo;

  public variable:number = 3;

  constructor(
    private _NgbModal:NgbModal
  ) { }

  ngOnInit(): void {
  }

  subirArchivo() : void{
    this._NgbModal.open(this._modalSubirArchivo, {size: 'lg'});
  }

  detallesImagen() : void{
    this._NgbModal.open(this._modalDetallesImagen, {size: 'lg'});
  }
}
