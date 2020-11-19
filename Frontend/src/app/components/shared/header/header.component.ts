import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public session;

  constructor() { }

  ngOnInit(): void {
    this.session = JSON.parse(localStorage.getItem("session"));
  }
}