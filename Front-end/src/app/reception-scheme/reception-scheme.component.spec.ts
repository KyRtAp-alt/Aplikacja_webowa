import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionSchemeComponent } from './reception-scheme.component';

describe('ReceptionSchemeComponent', () => {
  let component: ReceptionSchemeComponent;
  let fixture: ComponentFixture<ReceptionSchemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceptionSchemeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceptionSchemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
