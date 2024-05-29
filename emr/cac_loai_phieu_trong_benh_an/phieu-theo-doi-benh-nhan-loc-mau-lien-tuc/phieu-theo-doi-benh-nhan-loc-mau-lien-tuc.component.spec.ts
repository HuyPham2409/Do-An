import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhieuTheoDoiBenhNhanLocMauLienTucComponent } from './phieu-theo-doi-benh-nhan-loc-mau-lien-tuc.component';

describe('PhieuTheoDoiBenhNhanLocMauLienTucComponent', () => {
  let component: PhieuTheoDoiBenhNhanLocMauLienTucComponent;
  let fixture: ComponentFixture<PhieuTheoDoiBenhNhanLocMauLienTucComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhieuTheoDoiBenhNhanLocMauLienTucComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhieuTheoDoiBenhNhanLocMauLienTucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
