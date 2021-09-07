import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StaticsAsignaturasComponent } from './statics-asignaturas.component';

describe('StaticsAsignaturasComponent', () => {
  let component: StaticsAsignaturasComponent;
  let fixture: ComponentFixture<StaticsAsignaturasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaticsAsignaturasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticsAsignaturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
