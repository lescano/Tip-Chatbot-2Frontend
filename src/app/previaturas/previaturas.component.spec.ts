import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviaturasComponent } from './previaturas.component';

describe('PreviaturasComponent', () => {
  let component: PreviaturasComponent;
  let fixture: ComponentFixture<PreviaturasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviaturasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviaturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
