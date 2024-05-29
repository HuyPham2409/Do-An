import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhieuXetNghiemComponent } from './phieu-xet-nghiem.component';

describe('PhieuXetNghiemComponent', () => {
  let component: PhieuXetNghiemComponent;
  let fixture: ComponentFixture<PhieuXetNghiemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhieuXetNghiemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhieuXetNghiemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
