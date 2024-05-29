import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NguoiTruongThanhComponent } from './nguoi-truong-thanh.component';

describe('NguoiTruongThanhComponent', () => {
  let component: NguoiTruongThanhComponent;
  let fixture: ComponentFixture<NguoiTruongThanhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NguoiTruongThanhComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NguoiTruongThanhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
