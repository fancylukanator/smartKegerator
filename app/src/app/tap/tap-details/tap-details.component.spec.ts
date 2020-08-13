import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TapDetailsComponent } from './tap-details.component';

describe('TapDetailsComponent', () => {
  let component: TapDetailsComponent;
  let fixture: ComponentFixture<TapDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TapDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TapDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
