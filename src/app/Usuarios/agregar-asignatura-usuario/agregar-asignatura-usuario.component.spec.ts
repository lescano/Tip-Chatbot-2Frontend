import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarAsignaturaUsuarioComponent } from './agregar-asignatura-usuario.component';

describe('AgregarAsignaturaUsuarioComponent', () => {
  let component: AgregarAsignaturaUsuarioComponent;
  let fixture: ComponentFixture<AgregarAsignaturaUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarAsignaturaUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarAsignaturaUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
