import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChanDoanKhiVaoKhoaDieuTriComponent } from './chan-doan-khi-vao-khoa-dieu-tri.component';

describe('ChanDoanKhiVaoKhoaDieuTriComponent', () => {
  let component: ChanDoanKhiVaoKhoaDieuTriComponent;
  let fixture: ComponentFixture<ChanDoanKhiVaoKhoaDieuTriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChanDoanKhiVaoKhoaDieuTriComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChanDoanKhiVaoKhoaDieuTriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
