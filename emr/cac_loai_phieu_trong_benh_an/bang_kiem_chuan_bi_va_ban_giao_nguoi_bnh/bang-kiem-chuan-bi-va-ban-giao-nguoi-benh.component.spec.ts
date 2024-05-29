import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BangKiemChuanBiVaBanGiaoNguoiBenhComponent } from './bang-kiem-an-toan-phau-thuat.component';

describe('BangKiemAnToanPhauThuatComponent', () => {
  let component: BangKiemChuanBiVaBanGiaoNguoiBenhComponent;
  let fixture: ComponentFixture<BangKiemChuanBiVaBanGiaoNguoiBenhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BangKiemChuanBiVaBanGiaoNguoiBenhComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BangKiemChuanBiVaBanGiaoNguoiBenhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
