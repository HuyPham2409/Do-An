import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiayChungNhanThuThuatComponent } from './giay-chung-nhan-thu-thuat.component';

describe('GiayChungNhanThuThuatComponent', () => {
  let component: GiayChungNhanThuThuatComponent;
  let fixture: ComponentFixture<GiayChungNhanThuThuatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiayChungNhanThuThuatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GiayChungNhanThuThuatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
