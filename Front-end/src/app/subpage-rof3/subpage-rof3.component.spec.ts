import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubpageRof3Component } from './subpage-rof3.component';

describe('SubpageRof3Component', () => {
  let component: SubpageRof3Component;
  let fixture: ComponentFixture<SubpageRof3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubpageRof3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubpageRof3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
