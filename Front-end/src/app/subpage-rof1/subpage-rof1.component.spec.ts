import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubpageRof1Component } from './subpage-rof1.component';

describe('SubpageRof1Component', () => {
  let component: SubpageRof1Component;
  let fixture: ComponentFixture<SubpageRof1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubpageRof1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubpageRof1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
