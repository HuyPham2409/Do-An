import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiayCamDoanChapNhanPhauThuatThuThuatComponent } from './giay-cam-doan-chap-nhan-phau-thuat-thu-thuat.component';

describe('GiayCamDoanChapNhanPhauThuatThuThuatComponent', () => {
  let component: GiayCamDoanChapNhanPhauThuatThuThuatComponent;
  let fixture: ComponentFixture<GiayCamDoanChapNhanPhauThuatThuThuatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiayCamDoanChapNhanPhauThuatThuThuatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GiayCamDoanChapNhanPhauThuatThuThuatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
