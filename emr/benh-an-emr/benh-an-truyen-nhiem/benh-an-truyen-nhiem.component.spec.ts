import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenhAnTruyenNhiemComponent } from './benh-an-truyen-nhiem.component';

describe('BenhAnTruyenNhiemComponent', () => {
  let component: BenhAnTruyenNhiemComponent;
  let fixture: ComponentFixture<BenhAnTruyenNhiemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BenhAnTruyenNhiemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BenhAnTruyenNhiemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
