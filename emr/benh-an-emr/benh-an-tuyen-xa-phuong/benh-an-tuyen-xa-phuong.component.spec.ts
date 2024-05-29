import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenhAnTuyenXaPhuongComponent } from './benh-an-tuyen-xa-phuong.component';

describe('BenhAnTuyenXaPhuongComponent', () => {
  let component: BenhAnTuyenXaPhuongComponent;
  let fixture: ComponentFixture<BenhAnTuyenXaPhuongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BenhAnTuyenXaPhuongComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BenhAnTuyenXaPhuongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
