import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemeDisplayComponent } from './scheme-display.component';

describe('SchemeDisplayComponent', () => {
  let component: SchemeDisplayComponent;
  let fixture: ComponentFixture<SchemeDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchemeDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchemeDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
