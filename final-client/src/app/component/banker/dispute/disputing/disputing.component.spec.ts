import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisputingComponent } from './disputing.component';

describe('DisputingComponent', () => {
  let component: DisputingComponent;
  let fixture: ComponentFixture<DisputingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisputingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisputingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
