import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RangeOfServices1Component } from './range-of-services1.component';

describe('RangeOfServices1Component', () => {
  let component: RangeOfServices1Component;
  let fixture: ComponentFixture<RangeOfServices1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RangeOfServices1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RangeOfServices1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
