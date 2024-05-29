import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhieuTheoDoiTruyenDichComponent } from './phieu-theo-doi-truyen-dich.component';

describe('PhieuTheoDoiTruyenDichComponent', () => {
  let component: PhieuTheoDoiTruyenDichComponent;
  let fixture: ComponentFixture<PhieuTheoDoiTruyenDichComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhieuTheoDoiTruyenDichComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhieuTheoDoiTruyenDichComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
