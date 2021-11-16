import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OngletsFormComponent } from './onglets-form.component';

describe('OngletsFormComponent', () => {
  let component: OngletsFormComponent;
  let fixture: ComponentFixture<OngletsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OngletsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OngletsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
