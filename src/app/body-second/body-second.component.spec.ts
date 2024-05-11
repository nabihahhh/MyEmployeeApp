import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodySecondComponent } from './body-second.component';

describe('BodySecondComponent', () => {
  let component: BodySecondComponent;
  let fixture: ComponentFixture<BodySecondComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BodySecondComponent]
    });
    fixture = TestBed.createComponent(BodySecondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
