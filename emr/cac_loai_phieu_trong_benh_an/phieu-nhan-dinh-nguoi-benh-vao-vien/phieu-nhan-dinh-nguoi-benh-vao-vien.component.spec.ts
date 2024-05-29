import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhieuNhanDinhNguoiBenhVaoVienComponent } from './phieu-nhan-dinh-nguoi-benh-vao-vien.component';

describe('PhieuNhanDinhNguoiBenhVaoVienComponent', () => {
  let component: PhieuNhanDinhNguoiBenhVaoVienComponent;
  let fixture: ComponentFixture<PhieuNhanDinhNguoiBenhVaoVienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhieuNhanDinhNguoiBenhVaoVienComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhieuNhanDinhNguoiBenhVaoVienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
