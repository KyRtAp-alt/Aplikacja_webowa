import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRosComponent } from './admin-ros.component';

describe('AdminRosComponent', () => {
  let component: AdminRosComponent;
  let fixture: ComponentFixture<AdminRosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
