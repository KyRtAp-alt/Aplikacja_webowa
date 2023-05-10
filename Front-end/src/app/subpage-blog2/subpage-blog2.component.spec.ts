import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubpageBlog2Component } from './subpage-blog2.component';

describe('SubpageBlog2Component', () => {
  let component: SubpageBlog2Component;
  let fixture: ComponentFixture<SubpageBlog2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubpageBlog2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubpageBlog2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
