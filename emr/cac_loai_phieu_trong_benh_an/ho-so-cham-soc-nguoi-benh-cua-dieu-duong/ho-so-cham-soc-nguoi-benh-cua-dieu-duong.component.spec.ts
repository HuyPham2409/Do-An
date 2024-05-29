import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoSoChamSocNguoiBenhCuaDieuDuongComponent } from './ho-so-cham-soc-nguoi-benh-cua-dieu-duong.component';

describe('HoSoChamSocNguoiBenhCuaDieuDuongComponent', () => {
  let component: HoSoChamSocNguoiBenhCuaDieuDuongComponent;
  let fixture: ComponentFixture<HoSoChamSocNguoiBenhCuaDieuDuongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HoSoChamSocNguoiBenhCuaDieuDuongComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HoSoChamSocNguoiBenhCuaDieuDuongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
