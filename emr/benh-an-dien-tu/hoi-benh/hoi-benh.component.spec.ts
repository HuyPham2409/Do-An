import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoiBenhComponent } from './hoi-benh.component';

describe('HoiBenhComponent', () => {
  let component: HoiBenhComponent;
  let fixture: ComponentFixture<HoiBenhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HoiBenhComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HoiBenhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
