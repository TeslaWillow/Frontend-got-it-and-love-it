import { Component, OnInit, ViewChild } from '@angular/core';
import { PlanesService, Plan } from '../../services/planes.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-planes',
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.css']
})
export class PlanesComponent implements OnInit {

  public planes:Plan[];
  public plan:Plan;
  public formTarjetaPlan:FormGroup;
  public hasEmpresa:Boolean;

  @ViewChild("modalPagarPlan") modalPagarPlan;

  constructor(
    private _PlanesService:PlanesService,
    private _UsuariosService:UsuariosService,
    private _NgbModal:NgbModal,
    private auth:AuthService,
    private router:Router,
    private fb:FormBuilder
    ) { 
      this.crearFormulario();
    }

  ngOnInit(): void {
    this._PlanesService.GET_Planes().subscribe(
      (res:any) => {
        if(res.ok){
          this.hasEmpresa = res.ok;
          this.planes = res.data;
        }
        else 
          this.hasEmpresa = false;
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
      this._UsuariosService.PUT_AscenderAEmpresa(this.plan).subscribe(
        (res:any) => {
          if(res.ok){
            this._NgbModal.dismissAll(this.modalPagarPlan);
            this.auth.logout();
            this.router.navigateByUrl('/inicio-sesion-usuario');
          }
        },
        (err:any) => {
          console.log(err);
        }
      );
    }
  }
}
