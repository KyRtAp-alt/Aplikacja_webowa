import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Zakresuslug2Component } from './zakresuslug2.component';

describe('Zakresuslug2Component', () => {
  let component: Zakresuslug2Component;
  let fixture: ComponentFixture<Zakresuslug2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Zakresuslug2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Zakresuslug2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
