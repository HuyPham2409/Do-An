import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BienBanHoiChanPhauThuatComponent } from './bien-ban-hoi-chan-phau-thuat.component';

describe('BienBanHoiChanPhauThuatComponent', () => {
  let component: BienBanHoiChanPhauThuatComponent;
  let fixture: ComponentFixture<BienBanHoiChanPhauThuatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BienBanHoiChanPhauThuatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BienBanHoiChanPhauThuatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
