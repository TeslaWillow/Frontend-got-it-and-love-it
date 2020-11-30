import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductosService, Producto } from '../../services/productos.service';
import { ComprasService, Compra } from '../../services/compras.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-carrito-compras',
  templateUrl: './carrito-compras.component.html',
  styleUrls: ['./carrito-compras.component.css']
})
export class CarritoComprasComponent implements OnInit {

  private lStorage = window.localStorage;
  public compras:Compra[];
  public producto:Producto;

  @ViewChild('modalPagarCarrito') modalPagarCarrito;

  constructor(
    private _ComprasService:ComprasService,
    private _ProductosService:ProductosService,
    private _NgbModal:NgbModal
    ) { }

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
  }

  actualizarCantidad(index:number){
    let carritoStorage = JSON.parse(this.lStorage.getItem('carrito'));
  }

  comprar(){
    this._NgbModal.open(this.modalPagarCarrito, {size:"lg"});
  }

  sumarTotal(){
    let total = 0;
    let carritoStorage = JSON.parse(this.lStorage.getItem('carrito'));
    carritoStorage.forEach(compra => {
      let producto = this._ProductosService.getProducto(compra.Productoid);
      total += producto.precio * compra.cantidad;
    });
    return total;
  }
}
