import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhieuDeNghiKhamChuaBenhTheoYeuCauComponent } from './phieu-de-nghi-kham-chua-benh-theo-yeu-cau.component';

describe('GiayDeNghiKhamChuaBenhTheoYeuCauComponent', () => {
  let component: PhieuDeNghiKhamChuaBenhTheoYeuCauComponent;
  let fixture: ComponentFixture<PhieuDeNghiKhamChuaBenhTheoYeuCauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhieuDeNghiKhamChuaBenhTheoYeuCauComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhieuDeNghiKhamChuaBenhTheoYeuCauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
