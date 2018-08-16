import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MealpassComponent } from './mealpass.component';

describe('MealpassComponent', () => {
  let component: MealpassComponent;
  let fixture: ComponentFixture<MealpassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MealpassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MealpassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
