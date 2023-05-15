import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UmowWizyteComponent } from './umow-wizyte.component';

describe('UmowWizyteComponent', () => {
  let component: UmowWizyteComponent;
  let fixture: ComponentFixture<UmowWizyteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UmowWizyteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UmowWizyteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
