import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmrAgeComponent } from './emr-age.component';

describe('EmrAgeComponent', () => {
  let component: EmrAgeComponent;
  let fixture: ComponentFixture<EmrAgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmrAgeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmrAgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
