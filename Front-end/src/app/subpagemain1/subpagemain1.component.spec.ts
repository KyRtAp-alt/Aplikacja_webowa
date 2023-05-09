import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Subpagemain1Component } from './subpagemain1.component';

describe('Subpagemain1Component', () => {
  let component: Subpagemain1Component;
  let fixture: ComponentFixture<Subpagemain1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Subpagemain1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Subpagemain1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
