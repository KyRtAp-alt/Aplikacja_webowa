import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubpageBlog1Component } from './subpage-blog1.component';

describe('SubpageBlog1Component', () => {
  let component: SubpageBlog1Component;
  let fixture: ComponentFixture<SubpageBlog1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubpageBlog1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubpageBlog1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
