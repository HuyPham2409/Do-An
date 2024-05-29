import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhieuGiaoDucSucKhoeComponent } from './phieu-giao-duc-suc-khoe.component';

describe('PhieuGiaoDucSucKhoeComponent', () => {
  let component: PhieuGiaoDucSucKhoeComponent;
  let fixture: ComponentFixture<PhieuGiaoDucSucKhoeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhieuGiaoDucSucKhoeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhieuGiaoDucSucKhoeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
