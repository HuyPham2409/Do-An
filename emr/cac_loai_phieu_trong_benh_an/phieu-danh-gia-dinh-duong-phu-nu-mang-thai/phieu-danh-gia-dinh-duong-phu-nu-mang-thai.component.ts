import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { GiayToLienQuanComponent } from '../../benh-an-emr/giay-to-lien-quan.component';
import { fakeAsync } from '@angular/core/testing';
import { ReceptionService } from '../../../../services/reception.service';
import { ShareDataService } from '../../../../services/share-data.service';
import { ToastrTranslateService } from '@shared/services/toastr-translate-service';
import { FormGroup, NgForm } from '@angular/forms';

export class PhieuDanhGiaDinhDuongPhuNuMangThai{
  canNangTruoc: number = 0;
  tuoiThai: number = 0;
  benhLy: number = 0;
  chieuCaoHienTai: number = 0;
  theo: number = 0;
  bmi: number = 0;
  tangCanTheoKhuyenNghi: number = 0;
  canNangHienTai: number = 0;
}

@Component({
  selector: 'app-phieu-danh-gia-dinh-duong-phu-nu-mang-thai',
  templateUrl: './phieu-danh-gia-dinh-duong-phu-nu-mang-thai.component.html',
  styleUrls: ['./phieu-danh-gia-dinh-duong-phu-nu-mang-thai.component.scss'],
})
export class PhieuDanhGiaDinhDuongPhuNuMangThaiComponent extends GiayToLienQuanComponent implements OnInit, OnChanges, AfterViewInit {

  phieuDanhGia = new PhieuDanhGiaDinhDuongPhuNuMangThai();

  @ViewChild(NgForm) form!: NgForm;

  constructor(private receptionService: ReceptionService,
              private toastrTranslateService : ToastrTranslateService,
              private shareDataService: ShareDataService) {
                super()
              }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.form.form.valueChanges.subscribe( (x) => {
      this.toastrTranslateService.clear()
      setTimeout(()=>{
        if ((x.canNangTruoc && Number(x.canNangTruoc) < 0) || (x.canNangHienTai && Number(x.canNangHienTai) < 0))
          this.toastrTranslateService.error("Cân nặng phải lớn hơn 0", "Lỗi", {})
        if (x.chieuCao && Number(x.canNangTruoc) < 0)
          this.toastrTranslateService.error("Chiều cao phải lớn hơn 0", "Lỗi")
        if (x.tuan && (Number(x.tuan) < 0 || !Number.isInteger(x.tuan)))
          this.toastrTranslateService.error("Tuẩn thai phải là số nguyên lớn hơn 0", "Lỗi")
      },250)
    }
    )
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.patientInfo) {
      this.patientInfo = this.patientInfo
    }
    if (!this.isCreateGiayToLienQuan && this.selectGiayToLienQuan) {
      console.log(this.selectGiayToLienQuan)
      this.phieuDanhGia = this.selectGiayToLienQuan;
    }
    this.shareDataService.pushData(this.phieuDanhGia, 'phieu_danh_gia-dinh_duong_phu_nu_mang_thai');
  }

  calculate(){
    if(this.phieuDanhGia.canNangTruoc && this.phieuDanhGia.chieuCaoHienTai){
      this.phieuDanhGia.bmi = Number((this.phieuDanhGia.canNangTruoc / Math.pow((this.phieuDanhGia.chieuCaoHienTai / 100),2)).toFixed(2))
    }
  }

}
