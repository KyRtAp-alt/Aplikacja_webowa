import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LekarzMedycynyRodzinnejComponent } from './lekarz-medycyny-rodzinnej.component';

describe('LekarzMedycynyRodzinnejComponent', () => {
  let component: LekarzMedycynyRodzinnejComponent;
  let fixture: ComponentFixture<LekarzMedycynyRodzinnejComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LekarzMedycynyRodzinnejComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LekarzMedycynyRodzinnejComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
