import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubpageRof2Component } from './subpage-rof2.component';

describe('SubpageRof2Component', () => {
  let component: SubpageRof2Component;
  let fixture: ComponentFixture<SubpageRof2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubpageRof2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubpageRof2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
