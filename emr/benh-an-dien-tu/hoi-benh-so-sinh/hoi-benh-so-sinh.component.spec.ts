import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoiBenhSoSinhComponent } from './hoi-benh-so-sinh.component';

describe('HoiBenhSoSinhComponent', () => {
  let component: HoiBenhSoSinhComponent;
  let fixture: ComponentFixture<HoiBenhSoSinhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HoiBenhSoSinhComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HoiBenhSoSinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
