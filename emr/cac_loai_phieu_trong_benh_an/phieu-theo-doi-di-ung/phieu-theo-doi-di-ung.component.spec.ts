import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhieuTheoDoiDiUngComponent } from './phieu-theo-doi-di-ung.component';

describe('PhieuTheoDoiDiUngComponent', () => {
  let component: PhieuTheoDoiDiUngComponent;
  let fixture: ComponentFixture<PhieuTheoDoiDiUngComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhieuTheoDoiDiUngComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhieuTheoDoiDiUngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
