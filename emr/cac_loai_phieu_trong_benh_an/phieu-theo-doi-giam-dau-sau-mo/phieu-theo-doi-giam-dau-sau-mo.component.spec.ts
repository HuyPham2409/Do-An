import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhieuTheoDoiGiamDauSauMoComponent } from './phieu-theo-doi-giam-dau-sau-mo.component';

describe('PhieuTheoDoiGiamDauSauMoComponent', () => {
  let component: PhieuTheoDoiGiamDauSauMoComponent;
  let fixture: ComponentFixture<PhieuTheoDoiGiamDauSauMoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhieuTheoDoiGiamDauSauMoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhieuTheoDoiGiamDauSauMoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
