import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiayCamKetNguoiBenhNamNoiChuComponent } from './giay-cam-ket-nguoi-benh-nam-noi-chu.component';

describe('GiayCamKetNguoiBenhNamNoiChuComponent', () => {
  let component: GiayCamKetNguoiBenhNamNoiChuComponent;
  let fixture: ComponentFixture<GiayCamKetNguoiBenhNamNoiChuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiayCamKetNguoiBenhNamNoiChuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GiayCamKetNguoiBenhNamNoiChuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
