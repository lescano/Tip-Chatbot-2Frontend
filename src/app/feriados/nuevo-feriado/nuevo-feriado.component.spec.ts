import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoFeriadoComponent } from './nuevo-feriado.component';

describe('NuevoFeriadoComponent', () => {
  let component: NuevoFeriadoComponent;
  let fixture: ComponentFixture<NuevoFeriadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoFeriadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoFeriadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
