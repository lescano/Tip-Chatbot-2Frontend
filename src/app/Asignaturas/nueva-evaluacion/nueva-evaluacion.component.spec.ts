import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaEvaluacionComponent } from './nueva-evaluacion.component';

describe('NuevaEvaluacionComponent', () => {
  let component: NuevaEvaluacionComponent;
  let fixture: ComponentFixture<NuevaEvaluacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevaEvaluacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaEvaluacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
