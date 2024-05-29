import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenhAnSanPhuKhoaComponent } from './benh-an-san-phu-khoa.component';

describe('BenhAnSanPhuKhoaComponent', () => {
  let component: BenhAnSanPhuKhoaComponent;
  let fixture: ComponentFixture<BenhAnSanPhuKhoaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BenhAnSanPhuKhoaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BenhAnSanPhuKhoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
