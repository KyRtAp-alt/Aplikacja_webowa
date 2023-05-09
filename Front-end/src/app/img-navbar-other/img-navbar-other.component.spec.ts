import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgNavbarOtherComponent } from './img-navbar-other.component';

describe('ImgNavbarOtherComponent', () => {
  let component: ImgNavbarOtherComponent;
  let fixture: ComponentFixture<ImgNavbarOtherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImgNavbarOtherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImgNavbarOtherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
