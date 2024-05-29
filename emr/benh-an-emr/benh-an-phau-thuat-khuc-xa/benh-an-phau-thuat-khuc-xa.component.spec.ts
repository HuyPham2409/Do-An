import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenhAnPhauThuatKhucXaComponent } from './benh-an-phau-thuat-khuc-xa.component';

describe('BenhAnPhauThuatKhucXaComponent', () => {
  let component: BenhAnPhauThuatKhucXaComponent;
  let fixture: ComponentFixture<BenhAnPhauThuatKhucXaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BenhAnPhauThuatKhucXaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BenhAnPhauThuatKhucXaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
