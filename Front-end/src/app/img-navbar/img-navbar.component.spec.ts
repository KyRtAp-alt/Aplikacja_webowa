import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgNavbarComponent } from './img-navbar.component';

describe('ImgNavbarComponent', () => {
  let component: ImgNavbarComponent;
  let fixture: ComponentFixture<ImgNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImgNavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImgNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
