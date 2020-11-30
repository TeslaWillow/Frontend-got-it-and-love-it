import { Component, OnInit, ViewChild } from '@angular/core';
import { PlanesService, Plan } from '../../services/planes.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-planes',
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.css']
})
export class PlanesComponent implements OnInit {

  public planes:Plan[];
  public plan:Plan;

  @ViewChild("modalPagarPlan") modalPagarPlan;

  constructor(
    private _PlanesService:PlanesService,
    private _NgbModal:NgbModal
    ) { }

  ngOnInit(): void {
    this.planes = this._PlanesService.getPlanes();
  }

  isGratis(valor:number){
    if(valor < 1)
      return true;
    else
      return false;
  }

  comprarPlan(_id:number){
    this.plan = this._PlanesService.getPlane(_id);
    this._NgbModal.open(this.modalPagarPlan, {size:"lg"});
  }
}
