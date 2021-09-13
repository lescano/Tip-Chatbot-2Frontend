import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnansweredQuestionComponent } from './unanswered-question.component';

describe('UnansweredQuestionComponent', () => {
  let component: UnansweredQuestionComponent;
  let fixture: ComponentFixture<UnansweredQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnansweredQuestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnansweredQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
