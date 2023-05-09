import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZakresuslugComponent } from './zakresuslug.component';

describe('ZakresuslugComponent', () => {
  let component: ZakresuslugComponent;
  let fixture: ComponentFixture<ZakresuslugComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZakresuslugComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZakresuslugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
