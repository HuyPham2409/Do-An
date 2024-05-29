import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TinhTrangRaVienComponent } from './tinh-trang-ra-vien.component';

describe('TinhTrangRaVienComponent', () => {
  let component: TinhTrangRaVienComponent;
  let fixture: ComponentFixture<TinhTrangRaVienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TinhTrangRaVienComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TinhTrangRaVienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
