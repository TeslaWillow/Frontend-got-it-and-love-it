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
    this.compras = this._ComprasService.getCompras();
  }

  getProducto(id:number){
    return this._ProductosService.getProducto(id);
  }
}
