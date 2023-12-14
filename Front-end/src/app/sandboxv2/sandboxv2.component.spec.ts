import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sandboxv2Component } from './sandboxv2.component';

describe('Sandboxv2Component', () => {
  let component: Sandboxv2Component;
  let fixture: ComponentFixture<Sandboxv2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Sandboxv2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sandboxv2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
