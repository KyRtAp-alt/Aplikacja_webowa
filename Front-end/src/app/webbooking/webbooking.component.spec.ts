import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebbookingComponent } from './webbooking.component';

describe('WebbookingComponent', () => {
  let component: WebbookingComponent;
  let fixture: ComponentFixture<WebbookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebbookingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebbookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
