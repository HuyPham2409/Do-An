import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BangKiemAnToanPhauThuatComponent } from './bang-kiem-an-toan-phau-thuat.component';

describe('BangKiemAnToanPhauThuatComponent', () => {
  let component: BangKiemAnToanPhauThuatComponent;
  let fixture: ComponentFixture<BangKiemAnToanPhauThuatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BangKiemAnToanPhauThuatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BangKiemAnToanPhauThuatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
