import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-pagina-empresa',
  templateUrl: './pagina-empresa.component.html',
  styleUrls: ['./pagina-empresa.component.css']
})
export class PaginaEmpresaComponent implements OnInit {

  public rows:any[] = [{
    columns: [{
      descripcion: "Titulo 1",
      color: "#FFF"
    },
    {
      descripcion: "Titulo 2",
      color: "#D62828"
    }]
  },
  {
    columns: [{
      descripcion: "Titulo 3",
      color: "#F77F00"
    },
    {
      descripcion: "Titulo 4",
      color: "#FCBF49"
    },
    {
      descripcion: "Titulo 5",
      color: "#FFF"
    }]
  }];
  public bloque:any;

  @ViewChild("modalDetallesPagina") modalDetallesPagina;
  @ViewChild("modalContenidoBloque") modalContenidoBloque;
  constructor(private modalService:NgbModal) { }

  ngOnInit(): void {
  }

  anchoColumna(elementos:number):any{
    let ancho = (100/elementos) - 0.5;
    return ancho.toString();
  }

  agregarFila():void{
    this.rows.push({
      columns: [{
        descripcion: "Titulo X",
        color: "#FCBF49"
      }]
    });
  }

  eliminarFila(index:number):void{
    this.rows.splice(index,1);
  }

  agregarColumna(fila:number):void{
    this.rows[fila].columns.push({
      descripcion: "Titulo X",
      color: "#FFF"
    });
  }

  eliminarColumna(fila:number, columna:number):void{
    this.rows[fila].columns.splice(columna,1);
  }

  detallesPagina(){
    this.modalService.open(this.modalDetallesPagina, {size: 'lg'});
  }

  contenidoBloque(fila:number, columna:number){
    this.bloque = this.rows[fila].columns[columna];
    this.modalService.open(this.modalContenidoBloque, {size: 'xl'});
  }
}
