import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmrDateComponent } from './emr-date.component';

describe('EmrDateComponent', () => {
  let component: EmrDateComponent;
  let fixture: ComponentFixture<EmrDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmrDateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmrDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
