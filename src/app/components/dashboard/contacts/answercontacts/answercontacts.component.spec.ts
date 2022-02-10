import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswercontactsComponent } from './answercontacts.component';

describe('AnswercontactsComponent', () => {
  let component: AnswercontactsComponent;
  let fixture: ComponentFixture<AnswercontactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnswercontactsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswercontactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
