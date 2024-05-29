import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TinhTrangRaVienNgoaikhoaComponent } from './tinh-trang-ra-vien-ngoaikhoa.component';

describe('TinhTrangRaVienNgoaikhoaComponent', () => {
  let component: TinhTrangRaVienNgoaikhoaComponent;
  let fixture: ComponentFixture<TinhTrangRaVienNgoaikhoaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TinhTrangRaVienNgoaikhoaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TinhTrangRaVienNgoaikhoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
