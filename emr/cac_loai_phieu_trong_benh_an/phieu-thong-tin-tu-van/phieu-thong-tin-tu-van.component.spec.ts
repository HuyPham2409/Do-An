import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhieuThongTinTuVanComponent } from './phieu-thong-tin-tu-van.component';

describe('PhieuThongTinTuVanComponent', () => {
  let component: PhieuThongTinTuVanComponent;
  let fixture: ComponentFixture<PhieuThongTinTuVanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhieuThongTinTuVanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhieuThongTinTuVanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
