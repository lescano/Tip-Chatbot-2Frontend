import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevapreguntaComponent } from './nuevapregunta.component';

describe('NuevapreguntaComponent', () => {
  let component: NuevapreguntaComponent;
  let fixture: ComponentFixture<NuevapreguntaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevapreguntaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevapreguntaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
