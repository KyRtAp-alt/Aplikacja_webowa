import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubpageBlog3Component } from './subpage-blog3.component';

describe('SubpageBlog3Component', () => {
  let component: SubpageBlog3Component;
  let fixture: ComponentFixture<SubpageBlog3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubpageBlog3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubpageBlog3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
