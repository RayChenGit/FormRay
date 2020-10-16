import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecidingComponent } from './deciding.component';

describe('DecidingComponent', () => {
  let component: DecidingComponent;
  let fixture: ComponentFixture<DecidingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecidingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecidingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
