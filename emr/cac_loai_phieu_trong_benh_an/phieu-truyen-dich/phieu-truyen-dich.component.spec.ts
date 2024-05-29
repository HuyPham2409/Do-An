import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhieuTruyenDichComponent } from './phieu-truyen-dich.component';

describe('PhieuTruyenDichComponent', () => {
  let component: PhieuTruyenDichComponent;
  let fixture: ComponentFixture<PhieuTruyenDichComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhieuTruyenDichComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhieuTruyenDichComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
