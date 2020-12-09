import { Component, OnInit } from '@angular/core';
import { ComprasService, Compra } from '../../services/compras.service';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-historial-compras',
  templateUrl: './historial-compras.component.html',
  styleUrls: ['./historial-compras.component.css']
})
export class HistorialComprasComponent implements OnInit {

  public compras:Compra[];

  constructor(
    private _ComprasService:ComprasService,
    private _ProductosService:ProductosService
    ) { }

  ngOnInit(): void {
    this._ComprasService.getComprasUsuario().subscribe( 
      (res:any) => {
        this.compras = res;
        console.log(this.compras);
      },
      (err:any) => {
        console.log("ocurrio un error");
      }  
    );
  }
}
