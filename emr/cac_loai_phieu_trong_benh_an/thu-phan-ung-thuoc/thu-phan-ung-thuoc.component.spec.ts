import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThuPhanUngThuocComponent } from './thu-phan-ung-thuoc.component';

describe('ThuPhanUngThuocComponent', () => {
  let component: ThuPhanUngThuocComponent;
  let fixture: ComponentFixture<ThuPhanUngThuocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThuPhanUngThuocComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThuPhanUngThuocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
