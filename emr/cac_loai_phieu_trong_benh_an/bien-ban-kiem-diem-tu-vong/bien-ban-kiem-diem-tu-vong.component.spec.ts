import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BienBanKiemDiemTuVongComponent } from './bien-ban-kiem-diem-tu-vong.component';

describe('BienBanKiemDiemTuVongComponent', () => {
  let component: BienBanKiemDiemTuVongComponent;
  let fixture: ComponentFixture<BienBanKiemDiemTuVongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BienBanKiemDiemTuVongComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BienBanKiemDiemTuVongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
