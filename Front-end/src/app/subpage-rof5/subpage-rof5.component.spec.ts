import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubpageRof5Component } from './subpage-rof5.component';

describe('SubpageRof5Component', () => {
  let component: SubpageRof5Component;
  let fixture: ComponentFixture<SubpageRof5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubpageRof5Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubpageRof5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
