import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KhamMatBenhAnPhauThuatKhucXaComponent } from './kham-mat-benh-an-phau-thuat-khuc-xa.component';

describe('KhamMatBenhAnPhauThuatKhucXaComponent', () => {
  let component: KhamMatBenhAnPhauThuatKhucXaComponent;
  let fixture: ComponentFixture<KhamMatBenhAnPhauThuatKhucXaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KhamMatBenhAnPhauThuatKhucXaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KhamMatBenhAnPhauThuatKhucXaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
