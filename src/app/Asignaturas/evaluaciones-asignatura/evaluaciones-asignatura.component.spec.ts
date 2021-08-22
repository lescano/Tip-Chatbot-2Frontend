import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacionesAsignaturaComponent } from './evaluaciones-asignatura.component';

describe('EvaluacionesAsignaturaComponent', () => {
  let component: EvaluacionesAsignaturaComponent;
  let fixture: ComponentFixture<EvaluacionesAsignaturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluacionesAsignaturaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluacionesAsignaturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
