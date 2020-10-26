import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BancoArchivosComponent } from './banco-archivos.component';

describe('BancoArchivosComponent', () => {
  let component: BancoArchivosComponent;
  let fixture: ComponentFixture<BancoArchivosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BancoArchivosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BancoArchivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
