import { Component, SimpleChanges } from '@angular/core';
import { matTreEm } from '../../../../model/emr/kham_mat';
import { ShareDataService } from '../../../../services/share-data.service';
import { BenhAnComponent } from '../../benh-an-emr/benh-an.component';

@Component({
  selector: 'app-kham-mat-tre-em',
  templateUrl: './kham-mat-tre-em.component.html',
  styleUrls: ['./kham-mat-tre-em.component.scss']
})
export class KhamMatTreEmComponent extends BenhAnComponent {
  matTreEm = new matTreEm();

  constructor(private shareDataService: ShareDataService) {
    super();
  }
  phanXa = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "Bình thường"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "Giảm"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "Mất"
    }
  ];
  tinhTrangTheTT = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "Bình thường"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "Đục thân"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "Đục toàn bộ"
    },
    {
      ID:"4",
      MA: "4",
      MO_TA: "Đục bao"
    },
    {
      ID:"5",
      MA: "5",
      MO_TA: "Lệch"
    },
    {
      ID:"6",
      MA: "6",
      MO_TA: "Sa"
    },
    {
      ID:"7",
      MA: "7",
      MO_TA: "Khác"
    }
  ];
  tinhTrangNhanCau = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "Mềm"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "Căng"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "To"
    },
    {
      ID:"4",
      MA: "4",
      MO_TA: "Nhỏ"
    },
    {
      ID:"5",
      MA: "5",
      MO_TA: "Teo"
    }
  ];

  ngOnChanges(changes: SimpleChanges) {
    if(this.patientInfo.idEMR && this.patientInfo.results && this.patientInfo.results.kham_mat_tre_em){
      this.matTreEm = this.patientInfo.results.kham_mat_tre_em;
    }
    this.shareDataService.pushData(this.matTreEm, "kham_mat_tre_em");
  }
  resetBenhLy(key: string) {
    if (key === "ngoaiLaiMatPhai"){
      this.matTreEm.MAT_PHAI.VAN_NHAN_NGOAI_LAI.TEN_BENH_LY = "";
    }
    if (key === "ngoaiLaiMatTrai"){
      this.matTreEm.MAT_TRAI.VAN_NHAN_NGOAI_LAI.TEN_BENH_LY = "";
    }
    if (key === "noiTaiMatPhai"){
      this.matTreEm.MAT_PHAI.VAN_NHAN_NOI_TAI.TEN_BENH_LY = "";
    }
    if (key === "noiTaiMatTrai"){
      this.matTreEm.MAT_TRAI.VAN_NHAN_NOI_TAI.TEN_BENH_LY = "";
    }
    if (key === "rungGiatNhanCau"){
      this.matTreEm.RUNG_GIAT_NHAN_CAU.TEN_BENH_LY = "";
    }
    if (key === "giacMacPhaiTrong"){
      this.matTreEm.MAT_PHAI.GIAC_MAC.CHI_TIET_TINH_TRANG_TRONG_SUOT.CHI_TIET_SEO = "";
      this.matTreEm.MAT_PHAI.GIAC_MAC.CHI_TIET_TINH_TRANG_TRONG_SUOT.CHI_TIET_LOAN_DUONG = "";
      this.matTreEm.MAT_PHAI.GIAC_MAC.CHI_TIET_TINH_TRANG_TRONG_SUOT.CHI_TIET_THOAI_HOA = "";
    }
    if (key === "giacMacPhaiSeo"){
      this.matTreEm.MAT_PHAI.GIAC_MAC.CHI_TIET_TINH_TRANG_TRONG_SUOT.CHI_TIET_LOAN_DUONG = "";
      this.matTreEm.MAT_PHAI.GIAC_MAC.CHI_TIET_TINH_TRANG_TRONG_SUOT.CHI_TIET_THOAI_HOA = "";
    }
    if (key === "giacMacPhaiLoanDuong"){
      this.matTreEm.MAT_PHAI.GIAC_MAC.CHI_TIET_TINH_TRANG_TRONG_SUOT.CHI_TIET_SEO = "";
      this.matTreEm.MAT_PHAI.GIAC_MAC.CHI_TIET_TINH_TRANG_TRONG_SUOT.CHI_TIET_THOAI_HOA = "";
    }
    if (key === "giacMacPhaiThaiHoa"){
      this.matTreEm.MAT_PHAI.GIAC_MAC.CHI_TIET_TINH_TRANG_TRONG_SUOT.CHI_TIET_SEO = "";
      this.matTreEm.MAT_PHAI.GIAC_MAC.CHI_TIET_TINH_TRANG_TRONG_SUOT.CHI_TIET_LOAN_DUONG = "";
    }
    if (key === "giacMacTraiTrong"){
      this.matTreEm.MAT_TRAI.GIAC_MAC.CHI_TIET_TINH_TRANG_TRONG_SUOT.CHI_TIET_SEO = "";
      this.matTreEm.MAT_TRAI.GIAC_MAC.CHI_TIET_TINH_TRANG_TRONG_SUOT.CHI_TIET_LOAN_DUONG = "";
      this.matTreEm.MAT_TRAI.GIAC_MAC.CHI_TIET_TINH_TRANG_TRONG_SUOT.CHI_TIET_THOAI_HOA = "";
    }
    if (key === "giacMacTraiSeo"){
      this.matTreEm.MAT_TRAI.GIAC_MAC.CHI_TIET_TINH_TRANG_TRONG_SUOT.CHI_TIET_LOAN_DUONG = "";
      this.matTreEm.MAT_TRAI.GIAC_MAC.CHI_TIET_TINH_TRANG_TRONG_SUOT.CHI_TIET_THOAI_HOA = "";
    }
    if (key === "giacMacTraiLoanDuong"){
      this.matTreEm.MAT_TRAI.GIAC_MAC.CHI_TIET_TINH_TRANG_TRONG_SUOT.CHI_TIET_SEO = "";
      this.matTreEm.MAT_TRAI.GIAC_MAC.CHI_TIET_TINH_TRANG_TRONG_SUOT.CHI_TIET_THOAI_HOA = "";
    }
    if (key === "giacMacTraiThoaiHoa"){
      this.matTreEm.MAT_TRAI.GIAC_MAC.CHI_TIET_TINH_TRANG_TRONG_SUOT.CHI_TIET_SEO = "";
      this.matTreEm.MAT_TRAI.GIAC_MAC.CHI_TIET_TINH_TRANG_TRONG_SUOT.CHI_TIET_LOAN_DUONG = "";
    }
  }
}
