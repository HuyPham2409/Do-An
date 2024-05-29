import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiayRaVienComponent } from './giay-ra-vien.component';

describe('GiayRaVienComponent', () => {
  let component: GiayRaVienComponent;
  let fixture: ComponentFixture<GiayRaVienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiayRaVienComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GiayRaVienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
