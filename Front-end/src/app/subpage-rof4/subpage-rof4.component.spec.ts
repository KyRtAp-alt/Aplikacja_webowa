import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubpageRof4Component } from './subpage-rof4.component';

describe('SubpageRof4Component', () => {
  let component: SubpageRof4Component;
  let fixture: ComponentFixture<SubpageRof4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubpageRof4Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubpageRof4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
