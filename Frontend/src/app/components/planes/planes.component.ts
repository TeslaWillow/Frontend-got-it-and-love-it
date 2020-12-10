import { Component, OnInit, ViewChild } from '@angular/core';
import { PlanesService, Plan } from '../../services/planes.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-planes',
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.css']
})
export class PlanesComponent implements OnInit {

  public planes:Plan[];
  public plan:Plan;
  public formTarjetaPlan:FormGroup;

  @ViewChild("modalPagarPlan") modalPagarPlan;

  constructor(
    private _PlanesService:PlanesService,
    private _NgbModal:NgbModal,
    private fb:FormBuilder
    ) { 
      this.crearFormulario();
    }

  ngOnInit(): void {
    this._PlanesService.GET_Planes().subscribe(
      (res:any) => {
        console.log(res.data);
        this.planes = res.data;
      },
      (err:any) => {
        console.log(err);
      }
    );
  }

  crearFormulario(){
    this.formTarjetaPlan = this.fb.group({
      destinatario: ['', [
        Validators.required
      ]],
      numeroTarjeta: ['', [
        Validators.required,
        Validators.minLength(16),
        Validators.maxLength(16),
        Validators.max(9999999999999999)
      ]],
      mesVencimiento: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(2),
        Validators.max(12),
        Validators.min(1)
      ]],
      yearVencimiento: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(2),
        Validators.max(99)
      ]],
      CCV: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(3),
        Validators.min(100),
        Validators.max(999)
      ]]
    });
  }

  /* Validador generico*/
  isValid(formulario:FormGroup, campo:string){
    return formulario.get(campo).invalid && formulario.get(campo).touched;
  }

  isGratis(precio:number){
    if(precio < 1)
      return true;
    else
      return false;
  }

  comprarPlan(_id:string){
    this.formTarjetaPlan.reset();
    this._PlanesService.GET_Plan(_id).subscribe(
      (res:any) => {
        this.plan = res.data;
        console.log(this.plan);
      },
      (err:any) => {
        console.log(err);
      }
    );
    this._NgbModal.open(this.modalPagarPlan, {size:"lg"});
  }

  pagar(){
    if(this.formTarjetaPlan.invalid){
      return Object.values(this.formTarjetaPlan.controls).forEach(control => {
        control.markAsTouched();
      });
    }else{
      console.log("Plan pagado");
    }
  }
}
