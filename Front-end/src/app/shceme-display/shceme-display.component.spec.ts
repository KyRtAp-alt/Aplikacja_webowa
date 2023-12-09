import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShcemeDisplayComponent } from './shceme-display.component';

describe('ShcemeDisplayComponent', () => {
  let component: ShcemeDisplayComponent;
  let fixture: ComponentFixture<ShcemeDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShcemeDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShcemeDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
