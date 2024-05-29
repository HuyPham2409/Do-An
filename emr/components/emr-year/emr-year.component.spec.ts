import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmrYearComponent } from './emr-year.component';

describe('EmrYearComponent', () => {
  let component: EmrYearComponent;
  let fixture: ComponentFixture<EmrYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmrYearComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmrYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
