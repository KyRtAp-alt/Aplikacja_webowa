import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeebbookingComponent } from './weebbooking.component';

describe('WeebbookingComponent', () => {
  let component: WeebbookingComponent;
  let fixture: ComponentFixture<WeebbookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeebbookingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeebbookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
