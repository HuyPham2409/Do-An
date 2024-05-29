import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { GiayToLienQuanComponent } from '../../benh-an-emr/giay-to-lien-quan.component';
import { DateTime } from '../../../../model/emr/global';
import moment, { Moment } from 'moment';
import { ShareDataService } from '../../../../services/share-data.service';
import { DM } from '../../../../model/Patient_EMR';
import { MOMENT } from 'angular-calendar';

class PhieuGiaoDucSK {
  CHAN_DOAN =  '';
  MOI_QUAN_HE_NGUOI_BENH = '';
  TRI_GIAC = new DM();
  TRINH_DO_VAN_HOA = new DM();
  KHA_NANG_NGHE = new DM();
  KHA_NANG_NHIN = new DM();
  KHA_NANG_NOI = new DM();
  KIEN_THUC_VE_BENH = false;
  CHAM_SOC_PHONG_BENH = false;
  THIET_BI_Y_TE_HO_TRO = false;
  CACH_DUNG_THUOC = false;
  TEXT_CACH_DUNG_THUOC = '';
  TU_VAN_DINH_DUONG = false;
  CACH_TAP_VAN_DONG_PHCN = false;
  TEXT_CACH_TAP_VAN_DONG_PHCN = '';
  VE_SINH_CA_NHAN = false;
  TEXT_VE_SINH_CA_NHAN = '';
  KHAC = false;
  TEXT_KHAC = '';
  THOI_GIAN_DANH_GIA_BAN_DAU = new DateTime();
  thoi_gian_danh_gia_ban_dau: Moment | null = null;
  thoi_gian_danh_gia_ban_dau_unix :any;
  TEN_NGUOI_DANH_GIA_BAN_DAU = '';
  NGUOI_TU_VAN:any;
  nguoi_tu_van_name = '';
  DOI_TUONG = new DM();
  THOI_GIAN_TU_VAN = new DateTime();
  thoi_gian_tu_van: Moment | null = null;
  thoi_gian_tu_van_unix :any;
  KHI_TIEP_NHAN = {
    THU_TUC_NHAP_VIEN :false,
    TEXT_THU_TUC_NHAP_VIEN :'',
    NOI_QUY_BENH_VIEN :false,
    TEXT_NOI_QUY_BENH_VIEN :'',
    SU_DUNG_TTBYT :false,
    TEXT_SU_DUNG_TTBYT :'',
    BENH_LY_CHUYEN_KHOA :false,
    TEXT_BENH_LY_CHUYEN_KHOA :'',
    CHE_DO_DINH_DUONG :false,
    TEXT_CHE_DO_DINH_DUONG :'',
    CACH_DUNG_THUOC :false,
    TEXT_CACH_DUNG_THUOC :'',
    CACH_TAP_VAN_DONG_PHCN :false,
    TEXT_CACH_TAP_VAN_DONG_PHCN :'',
    VE_SINH_CA_NHAN :false,
    TEXT_VE_SINH_CA_NHAN :'',
    PHONG_LOET_TEO_CO :false,
    TEXT_PHONG_LOET_TEO_CO :'',
  }
  TRONG_DIEU_TRI = {
    BENH_LY_CHUYEN_KHOA :false,
    TEXT_BENH_LY_CHUYEN_KHOA :'',
    CHE_DO_DINH_DUONG :false,
    TEXT_CHE_DO_DINH_DUONG :'',
    CACH_DUNG_THUOC :false,
    TEXT_CACH_DUNG_THUOC :'',
    CACH_TAP_VAN_DONG_PHCN :false,
    TEXT_CACH_TAP_VAN_DONG_PHCN :'',
    VE_SINH_CA_NHAN :false,
    TEXT_VE_SINH_CA_NHAN :'',
    PHONG_LOET_TEO_CO :false,
    TEXT_PHONG_LOET_TEO_CO :'',
  }
  THU_TUC_RA_VIEN = false;
  TEXT_THU_TUC_RA_VIEN = '';
  DON_THUOC_GIAY_RA_VIEN = false;
  TEXT_DON_THUOC_GIAY_RA_VIEN = '';
  CHE_DO_DINH_DUONG_2 = false;
  TEXT_CHE_DO_DINH_DUONG_2 = '';
  CACH_CHAM_SOC_PHONG_BENH = false;
  TEXT_CACH_CHAM_SOC_PHONG_BENH = '';
  KHAM_LAI_THEO_DON = false;
  TEXT_KHAM_LAI_THEO_DON = '';
  code = '';
}

@Component({
  selector: 'app-phieu-giao-duc-suc-khoe',
  templateUrl: './phieu-giao-duc-suc-khoe.component.html',
  styleUrls: ['./phieu-giao-duc-suc-khoe.component.scss']
})
export class PhieuGiaoDucSucKhoeComponent extends GiayToLienQuanComponent implements OnInit, OnChanges {
  phieuGDSKNB = new PhieuGiaoDucSK();
  constructor(private shareDataService: ShareDataService) {
    super();
  }
  ngOnInit(): void {
    this.phieuGDSKNB.thoi_gian_tu_van_unix =Math.floor(Date.now()/1000);
    this.phieuGDSKNB.thoi_gian_danh_gia_ban_dau_unix =Math.floor(Date.now()/1000);
    const user_logged = localStorage.getItem('user_logged');
    if (user_logged) {
      let convertUser = JSON.parse(user_logged);
      const { full_name, user_signature_image, user_signature } = convertUser;
      this.phieuGDSKNB.NGUOI_TU_VAN = { full_name, user_signature_image, user_signature };
      this.phieuGDSKNB.nguoi_tu_van_name = convertUser.user_name + '-' + convertUser.full_name;
      this.phieuGDSKNB.TEN_NGUOI_DANH_GIA_BAN_DAU = convertUser.full_name;
    }
  }
  listDoiTuong = [
    {
      ID: "1",
      MA: "1",
      MO_TA: "Bệnh nhân"
    },
    {
      ID: "2",
      MA: "2",
      MO_TA: "Người nhà bệnh nhân"
    }
  ];
  listTriGiac = [
    {
      ID: "1",
      MA: "1",
      MO_TA: "Tỉnh táo"
    },
    {
      ID: "2",
      MA: "2",
      MO_TA: "Không tỉnh táo"
    }
  ];
  listTrinhDoVanHoa = [
    {
      ID: "1",
      MA: "1",
      MO_TA: "Biết đọc viết"
    },
    {
      ID: "2",
      MA: "2",
      MO_TA: "Mù chữ"
    }
  ];
  listKhaNangNghe = [
    {
      ID: "1",
      MA: "1",
      MO_TA: "Độc lập"
    },
    {
      ID: "2",
      MA: "2",
      MO_TA: "Phụ thuộc"
    }
  ];
  listKhaNangNhin = [
    {
      ID: "1",
      MA: "1",
      MO_TA: "Độc lập"
    },
    {
      ID: "2",
      MA: "2",
      MO_TA: "Phụ thuộc"
    }
  ];
  listKhaNangNoi = [
    {
      ID: "1",
      MA: "1",
      MO_TA: "Bình thường"
    },
    {
      ID: "2",
      MA: "2",
      MO_TA: "Khó khăn"
    }
  ];
  ngOnChanges(changes: SimpleChanges) {
    if (this.isCreateGiayToLienQuan) {
      this.phieuGDSKNB = new PhieuGiaoDucSK();
    }
    if (!this.isCreateGiayToLienQuan && this.checkNonEmpty(this.selectGiayToLienQuan)) {
      this.phieuGDSKNB = this.selectGiayToLienQuan;
    }
    console.log(this.selectGiayToLienQuan);
    this.shareDataService.pushData(this.phieuGDSKNB, 'phieu_giao_duc_suc_khoe_cho_nguoi_benh');
  }
  reset(title: string) {
    if (title === "TEXT_KHAC") {
      if (!this.phieuGDSKNB.KHAC) {
        this.phieuGDSKNB.TEXT_KHAC = "";
      }
    }
    if (title === "THU_TUC_NHAP_VIEN") {
      if (!this.phieuGDSKNB.KHI_TIEP_NHAN.THU_TUC_NHAP_VIEN) {
        this.phieuGDSKNB.KHI_TIEP_NHAN.TEXT_THU_TUC_NHAP_VIEN = "";
      }
    }
    if (title === "NOI_QUY_BENH_VIEN") {
      if (!this.phieuGDSKNB.KHI_TIEP_NHAN.NOI_QUY_BENH_VIEN) {
        this.phieuGDSKNB.KHI_TIEP_NHAN.TEXT_NOI_QUY_BENH_VIEN = "";
      }
    }
    if (title === "SU_DUNG_TTBYT") {
      if (!this.phieuGDSKNB.KHI_TIEP_NHAN.SU_DUNG_TTBYT) {
        this.phieuGDSKNB.KHI_TIEP_NHAN.TEXT_SU_DUNG_TTBYT = "";
      }
    }
    if (title === "BENH_LY_CHUYEN_KHOA_TIEP_NHAN") {
      if (!this.phieuGDSKNB.KHI_TIEP_NHAN.BENH_LY_CHUYEN_KHOA) {
        this.phieuGDSKNB.KHI_TIEP_NHAN.TEXT_BENH_LY_CHUYEN_KHOA = "";
      }
    }
    if (title === "CHE_DO_DINH_DUONG_TIEP_NHAN") {
      if (!this.phieuGDSKNB.KHI_TIEP_NHAN.CHE_DO_DINH_DUONG) {
        this.phieuGDSKNB.KHI_TIEP_NHAN.TEXT_CHE_DO_DINH_DUONG = "";
      }
    }
    if (title === "CACH_DUNG_THUOC_TIEP_NHAN") {
      if (!this.phieuGDSKNB.KHI_TIEP_NHAN.CACH_DUNG_THUOC) {
        this.phieuGDSKNB.KHI_TIEP_NHAN.TEXT_CACH_DUNG_THUOC = "";
      }
    }
    if (title === "CACH_TAP_VAN_DONG_PHCN_TIEP_NHAN") {
      if (!this.phieuGDSKNB.KHI_TIEP_NHAN.CACH_TAP_VAN_DONG_PHCN) {
        this.phieuGDSKNB.KHI_TIEP_NHAN.TEXT_CACH_TAP_VAN_DONG_PHCN = "";
      }
    }
    if (title === "VE_SINH_CA_NHAN_TIEP_NHAN") {
      if (!this.phieuGDSKNB.KHI_TIEP_NHAN.VE_SINH_CA_NHAN) {
        this.phieuGDSKNB.KHI_TIEP_NHAN.TEXT_VE_SINH_CA_NHAN = "";
      }
    }
    if (title === "PHONG_LOET_TEO_CO_TIEP_NHAN") {
      if (!this.phieuGDSKNB.KHI_TIEP_NHAN.PHONG_LOET_TEO_CO) {
        this.phieuGDSKNB.KHI_TIEP_NHAN.TEXT_PHONG_LOET_TEO_CO = "";
      }
    }
    if (title === "BENH_LY_CHUYEN_KHOA_DIEU_TRI") {
      if (!this.phieuGDSKNB.TRONG_DIEU_TRI.BENH_LY_CHUYEN_KHOA) {
        this.phieuGDSKNB.TRONG_DIEU_TRI.TEXT_BENH_LY_CHUYEN_KHOA = "";
      }
    }
    if (title === "CHE_DO_DINH_DUONG_DIEU_TRI") {
      if (!this.phieuGDSKNB.TRONG_DIEU_TRI.CHE_DO_DINH_DUONG) {
        this.phieuGDSKNB.TRONG_DIEU_TRI.TEXT_CHE_DO_DINH_DUONG = "";
      }
    }
    if (title === "CACH_DUNG_THUOC_DIEU_TRI") {
      if (!this.phieuGDSKNB.TRONG_DIEU_TRI.CACH_DUNG_THUOC) {
        this.phieuGDSKNB.TRONG_DIEU_TRI.TEXT_CACH_DUNG_THUOC = "";
      }
    }
    if (title === "CACH_TAP_VAN_DONG_PHCN_DIEU_TRI") {
      if (!this.phieuGDSKNB.TRONG_DIEU_TRI.CACH_TAP_VAN_DONG_PHCN) {
        this.phieuGDSKNB.TRONG_DIEU_TRI.TEXT_CACH_TAP_VAN_DONG_PHCN = "";
      }
    }
    if (title === "VE_SINH_CA_NHAN_DIEU_TRI") {
      if (!this.phieuGDSKNB.TRONG_DIEU_TRI.VE_SINH_CA_NHAN) {
        this.phieuGDSKNB.TRONG_DIEU_TRI.TEXT_VE_SINH_CA_NHAN = "";
      }
    }
    if (title === "PHONG_LOET_TEO_CO_DIEU_TRI") {
      if (!this.phieuGDSKNB.TRONG_DIEU_TRI.PHONG_LOET_TEO_CO) {
        this.phieuGDSKNB.TRONG_DIEU_TRI.TEXT_PHONG_LOET_TEO_CO = "";
      }
    }
    if (title === "CACH_DUNG_THUOC") {
      if (!this.phieuGDSKNB.CACH_DUNG_THUOC) {
        this.phieuGDSKNB.TEXT_CACH_DUNG_THUOC = "";
      }
    }
    if (title === "CACH_TAP_VAN_DONG_PHCN") {
      if (!this.phieuGDSKNB.CACH_TAP_VAN_DONG_PHCN) {
        this.phieuGDSKNB.TEXT_CACH_TAP_VAN_DONG_PHCN = "";
      }
    }
    if (title === "VE_SINH_CA_NHAN") {
      if (!this.phieuGDSKNB.VE_SINH_CA_NHAN) {
        this.phieuGDSKNB.TEXT_VE_SINH_CA_NHAN = "";
      }
    }
    if (title === "THU_TUC_RA_VIEN") {
      if (!this.phieuGDSKNB.THU_TUC_RA_VIEN) {
        this.phieuGDSKNB.TEXT_THU_TUC_RA_VIEN = "";
      }
    }
    if (title === "DON_THUOC_GIAY_RA_VIEN") {
      if (!this.phieuGDSKNB.DON_THUOC_GIAY_RA_VIEN) {
        this.phieuGDSKNB.TEXT_DON_THUOC_GIAY_RA_VIEN = "";
      }
    }
    if (title === "CHE_DO_DINH_DUONG_2") {
      if (!this.phieuGDSKNB.CHE_DO_DINH_DUONG_2) {
        this.phieuGDSKNB.TEXT_CHE_DO_DINH_DUONG_2 = "";
      }
    }
    if (title === "CACH_CHAM_SOC_PHONG_BENH") {
      if (!this.phieuGDSKNB.CACH_CHAM_SOC_PHONG_BENH) {
        this.phieuGDSKNB.TEXT_CACH_CHAM_SOC_PHONG_BENH = "";
      }
    }
    if (title === "KHAM_LAI_THEO_DON") {
      if (!this.phieuGDSKNB.KHAM_LAI_THEO_DON) {
        this.phieuGDSKNB.TEXT_KHAM_LAI_THEO_DON = "";
      }
    }
  }
}
