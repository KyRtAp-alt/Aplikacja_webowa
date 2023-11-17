import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { AdminSchemeComponent } from './AdminSchemeComponent';
import { AdminSchemeComponent } from './admin-scheme.component';

describe('AdminSchemeComponent', () => {
  let component: AdminSchemeComponent;
  let fixture: ComponentFixture<AdminSchemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminSchemeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminSchemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
