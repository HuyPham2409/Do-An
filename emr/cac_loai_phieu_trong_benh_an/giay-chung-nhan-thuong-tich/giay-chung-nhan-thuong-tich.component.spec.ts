import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiayChungNhanThuongTichComponent } from './giay-chung-nhan-thuong-tich.component';

describe('GiayChungNhanThuongTichComponent', () => {
  let component: GiayChungNhanThuongTichComponent;
  let fixture: ComponentFixture<GiayChungNhanThuongTichComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiayChungNhanThuongTichComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GiayChungNhanThuongTichComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
