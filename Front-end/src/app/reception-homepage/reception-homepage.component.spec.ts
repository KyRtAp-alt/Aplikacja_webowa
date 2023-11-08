import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionHomepageComponent } from './reception-homepage.component';

describe('ReceptionHomepageComponent', () => {
  let component: ReceptionHomepageComponent;
  let fixture: ComponentFixture<ReceptionHomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceptionHomepageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceptionHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
