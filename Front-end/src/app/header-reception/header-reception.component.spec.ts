import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderReceptionComponent } from './header-reception.component';

describe('HeaderReceptionComponent', () => {
  let component: HeaderReceptionComponent;
  let fixture: ComponentFixture<HeaderReceptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderReceptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderReceptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
