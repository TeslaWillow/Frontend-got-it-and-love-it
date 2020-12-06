import { Component, OnInit } from '@angular/core';
import { Plan, PlanesService } from '../../services/planes.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-plan-actual',
  templateUrl: './plan-actual.component.html',
  styleUrls: ['./plan-actual.component.css']
})
export class PlanActualComponent implements OnInit {
  public planActual:Plan;

  constructor(
    private _PlanesService:PlanesService,
    private _auth:AuthService
  ) { }

  ngOnInit(): void {
    this.planActual = this._PlanesService.getPlane(this._auth.getSession().plan);
  }

}
