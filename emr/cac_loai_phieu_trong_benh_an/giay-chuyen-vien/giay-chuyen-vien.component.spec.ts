import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiayChuyenVienComponent } from './giay-chuyen-vien.component';

describe('GiayChuyenVienComponent', () => {
  let component: GiayChuyenVienComponent;
  let fixture: ComponentFixture<GiayChuyenVienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiayChuyenVienComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GiayChuyenVienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
