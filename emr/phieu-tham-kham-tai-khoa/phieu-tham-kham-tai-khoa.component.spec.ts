import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhieuThamKhamTaiKhoaComponent } from './phieu-tham-kham-tai-khoa.component';

describe('PhieuThamKhamTaiKhoaComponent', () => {
  let component: PhieuThamKhamTaiKhoaComponent;
  let fixture: ComponentFixture<PhieuThamKhamTaiKhoaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhieuThamKhamTaiKhoaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhieuThamKhamTaiKhoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
