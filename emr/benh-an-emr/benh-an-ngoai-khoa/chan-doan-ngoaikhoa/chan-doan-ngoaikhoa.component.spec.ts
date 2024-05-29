import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChanDoanNgoaikhoaComponent } from './chan-doan-ngoaikhoa.component';

describe('ChanDoanNgoaikhoaComponent', () => {
  let component: ChanDoanNgoaikhoaComponent;
  let fixture: ComponentFixture<ChanDoanNgoaikhoaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChanDoanNgoaikhoaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChanDoanNgoaikhoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
