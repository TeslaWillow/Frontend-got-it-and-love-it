import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductosService, Producto } from '../../services/productos.service';
import { ComprasService, Compra, Carrito } from '../../services/compras.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-carrito-compras',
  templateUrl: './carrito-compras.component.html',
  styleUrls: ['./carrito-compras.component.css']
})
export class CarritoComprasComponent implements OnInit {

  private lStorage = window.localStorage;
  public producto:Producto;
  public total:number = 0;
  public productosEnCarrito:Compra[] = [];
  public productos:Producto[] = [];
  public compras:Compra[] = [];

  @ViewChild('modalPagarCarrito') modalPagarCarrito;

  constructor(
    private _ComprasService:ComprasService,
    private _ProductosService:ProductosService,
    private _NgbModal:NgbModal
    ) { }

  ngOnInit(): void {
    this.ConfigCarrito();
  }

  ConfigCarrito(){
    if(this.lStorage.getItem('carrito')){
      console.log("Recuperando carrito...");
      this.productosEnCarrito = JSON.parse(this.lStorage.getItem('carrito'));
      for (const productoEncarrito of this.productosEnCarrito) {
        this._ProductosService.GET_Producto(productoEncarrito.producto).subscribe(
          (res:any) => {
            let compra:Compra;
            for (const producto of res.data) {
              compra = {
                producto:producto._id,
                nombreProducto: producto.nombre,
                descripcion:producto.descripcion,
                foto:producto.foto,
                cantidad: productoEncarrito.cantidad,
                precioUnitario: producto.precio,
              };
              this.compras.push(compra);
              this.sumarTotal(compra.cantidad, compra.precioUnitario);
            }
          },
          (err:any) => {
            console.log(err);
          }
        );
      }
    }
    else{
      let test:Carrito[] = [{
        producto: '5fd7fc6f574ab318e0f22388',
        cantidad: 3
      }];
      this.lStorage.setItem('carrito', JSON.stringify(test));
    }
  }

  GET_Producto(_idProducto:string){
    this._ProductosService.GET_Producto(_idProducto).subscribe(
      (res:any) => {
        this.producto = res.data;
      },
      (err:any) => {
        console.log(err);
      }
    );
  }

  comprar(){
    this._NgbModal.open(this.modalPagarCarrito, {size:"lg"});
  }

  sumarTotal(cantidad:number, precio:number){
    this.total += (cantidad * precio);
    return this.total;
  }
}
