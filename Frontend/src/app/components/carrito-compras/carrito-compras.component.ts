import { Component, OnInit } from '@angular/core';
import { ProductosService, Producto } from '../../services/productos.service';
import { ComprasService, Compra } from '../../services/compras.service';

@Component({
  selector: 'app-carrito-compras',
  templateUrl: './carrito-compras.component.html',
  styleUrls: ['./carrito-compras.component.css']
})
export class CarritoComprasComponent implements OnInit {

  private lStorage = window.localStorage;
  public compras:Compra[];
  public producto:Producto;
  public total:number;

  constructor(
    private _ComprasService:ComprasService,
    private _ProductosService:ProductosService) { }

  ngOnInit(): void {
    let compras = this._ComprasService.getCompras();
    if(this.lStorage.getItem('carrito'))
      console.log("Recuperando carrito");
    else
      this.lStorage.setItem('carrito', JSON.stringify(compras));
    
    this.compras = JSON.parse(this.lStorage.getItem('carrito'));
  }

  getProducto(id:number){
    this.producto = this._ProductosService.getProducto(id);
    console.log(this.producto);
  }

  sumarTotal(cantidad:number, precio:number):void{
    console.log("hola");
    let totalItem = (cantidad * precio);
    this.total += totalItem;
  }
}
