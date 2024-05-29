import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BangDanhGiaThangDiemGlasgowComponent } from './bang-danh-gia-thang-diem-glasgow.component';


describe('PhieuDuyetMoComponent', () => {
  let component: BangDanhGiaThangDiemGlasgowComponent;
  let fixture: ComponentFixture<BangDanhGiaThangDiemGlasgowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BangDanhGiaThangDiemGlasgowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BangDanhGiaThangDiemGlasgowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
