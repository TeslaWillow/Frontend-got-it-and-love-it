import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BancoImagenesComponent } from './banco-imagenes.component';

describe('BancoImagenesComponent', () => {
  let component: BancoImagenesComponent;
  let fixture: ComponentFixture<BancoImagenesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BancoImagenesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BancoImagenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
