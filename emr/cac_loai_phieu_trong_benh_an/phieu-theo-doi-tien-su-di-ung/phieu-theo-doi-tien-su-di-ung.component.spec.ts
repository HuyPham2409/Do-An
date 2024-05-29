import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhieuTheoDoiTienSuDiUngComponent } from './phieu-theo-doi-tien-su-di-ung.component';

describe('PhieuTheoDoiTienSuDiUngComponent', () => {
  let component: PhieuTheoDoiTienSuDiUngComponent;
  let fixture: ComponentFixture<PhieuTheoDoiTienSuDiUngComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhieuTheoDoiTienSuDiUngComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhieuTheoDoiTienSuDiUngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
