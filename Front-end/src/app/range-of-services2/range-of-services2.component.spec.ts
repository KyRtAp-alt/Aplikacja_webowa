import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RangeOfServices2Component } from './range-of-services2.component';

describe('RangeOfServices2Component', () => {
  let component: RangeOfServices2Component;
  let fixture: ComponentFixture<RangeOfServices2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RangeOfServices2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RangeOfServices2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
