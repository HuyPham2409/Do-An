import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmrDateRangeComponent } from './emr-date-range.component';

describe('EmrDateRangeComponent', () => {
  let component: EmrDateRangeComponent;
  let fixture: ComponentFixture<EmrDateRangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmrDateRangeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmrDateRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
