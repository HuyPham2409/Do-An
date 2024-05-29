import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoCauHoiNRSComponent } from './bang-kiem-an-toan-phau-thuat.component';

describe('BangKiemAnToanPhauThuatComponent', () => {
  let component: BoCauHoiNRSComponent;
  let fixture: ComponentFixture<BoCauHoiNRSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoCauHoiNRSComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoCauHoiNRSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
