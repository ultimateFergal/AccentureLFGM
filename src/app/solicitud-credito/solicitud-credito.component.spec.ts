import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudCreditoComponent } from './solicitud-credito.component';

describe('SolicitudCreditoComponent', () => {
  let component: SolicitudCreditoComponent;
  let fixture: ComponentFixture<SolicitudCreditoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitudCreditoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudCreditoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
