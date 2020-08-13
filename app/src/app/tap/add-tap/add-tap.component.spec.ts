import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTapComponent } from './add-tap.component';

describe('AddTapComponent', () => {
  let component: AddTapComponent;
  let fixture: ComponentFixture<AddTapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
