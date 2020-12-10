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
    this._PlanesService.GET_Plan(this._auth.getSession().plan).subscribe(
      (res:any) => {
        this.planActual = res.data;
      },
      (err:any) => {}
    );
  }

}
