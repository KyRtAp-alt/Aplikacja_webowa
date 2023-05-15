import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesZakresuslugComponent } from './pages-zakresuslug.component';

describe('PagesZakresuslugComponent', () => {
  let component: PagesZakresuslugComponent;
  let fixture: ComponentFixture<PagesZakresuslugComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagesZakresuslugComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagesZakresuslugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
