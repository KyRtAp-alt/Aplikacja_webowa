import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionReservationComponent } from './reception-reservation.component';

describe('ReceptionReservationComponent', () => {
  let component: ReceptionReservationComponent;
  let fixture: ComponentFixture<ReceptionReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceptionReservationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceptionReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
