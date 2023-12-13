import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebbookingInfoComponent } from './webbooking-info.component';

describe('WebbookingInfoComponent', () => {
  let component: WebbookingInfoComponent;
  let fixture: ComponentFixture<WebbookingInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebbookingInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebbookingInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
