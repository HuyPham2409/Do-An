import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { GiayToLienQuanComponent } from '../../benh-an-emr/giay-to-lien-quan.component';
import { ReceptionService } from '../../../../services/reception.service';
import { ShareDataService } from '../../../../services/share-data.service';
import * as moment from 'moment';
import { DM } from '../../../../model/Patient_EMR';

class TOM_TAT_HSBA {
  LOAI_DIEU_TRI = new DM();
  NAM_SINH = 0;
  DIA_CHI = "";
  QUA_TRINH_BENH_LY = '';
  TOM_TAT_KET_QUA_CLS = '';
  PHUONG_PHAP_DIEU_TRI = '';
  TINH_TRANG_NGUOI_BENH_RA_VIEN = '';
  GHI_CHU = '';
  NGAY_RA_VIEN = moment();
  ngay_ra_vien: any;
  CHAN_DOAN_LUC_VAO_VIEN ='';
  CHAN_DOAN_LUC_RA_VIEN ='';
  NOI_CONG_TAC = '';
  THOI_GIAN_KY = moment();
  thoi_gian_ky: any;
  DAN_TOC = '';
  NGHE_NGHIEP = '';
  SO_CMND = '';
  CDVV_TEN_BENH = '';
  CDVV_MA_ICD = '';
  CDRV_TEN_BENH = '';
  CDRV_MA_ICD = '';
  LY_DO_VAO_VIEN = '';
  TIEN_SU_BENH = '';
  NOI_KHOA = new DM();
  TEXT_NOI_KHOA = '';
  PTTT = new DM();
  TEXT_PTTT = '';
  HUONG_DIEU_TRI = '';
  DAU_HIEU_LAM_SANG_DUOC_GHI_NHAN = '';
}

@Component({
  selector: 'app-tom-tat-ho-so-benh-an',
  templateUrl: './tom-tat-ho-so-benh-an.component.html',
  styleUrls: ['./tom-tat-ho-so-benh-an.component.scss']
})
export class TomTatHoSoBenhAnComponent extends GiayToLienQuanComponent implements OnInit, OnChanges {
  tomTatHSBA: TOM_TAT_HSBA = new TOM_TAT_HSBA();
  @Input() patientInfo: any;
  constructor(private receptionService: ReceptionService,
              private shareDataService: ShareDataService,) {
    super();
  }

  ngOnInit(): void {
    this.convert()
  }
  ngOnChanges(changes: SimpleChanges) {
    if (!this.isCreateGiayToLienQuan && this.selectGiayToLienQuan) {
      this.tomTatHSBA = this.selectGiayToLienQuan
    }
    if(!this.tomTatHSBA.LOAI_DIEU_TRI){
      this.tomTatHSBA.LOAI_DIEU_TRI = new DM();
    }
    if(!this.tomTatHSBA.NOI_KHOA){
      this.tomTatHSBA.NOI_KHOA = new DM();
    }
    if(!this.tomTatHSBA.PTTT){
      this.tomTatHSBA.PTTT = new DM();
    }
    if (this.isCreateGiayToLienQuan || !this.tomTatHSBA) {
      this.tomTatHSBA = new TOM_TAT_HSBA();
      if (this.patientInfo) {
        this.convert();
      }
    }
    this.shareDataService.pushData(this.tomTatHSBA, 'tom_tat_hsba');
  }
  listLoaiDieuTri = [
    {
      ID: '1',
      MA: '1',
      MO_TA: 'Điều trị nội trú',
    },
    {
      ID: '2',
      MA: '2',
      MO_TA: 'Điều trị nội trú ban ngày',
    },
    {
      ID: '3',
      MA: '3',
      MO_TA: 'Điều trị ngoại trú',
    },
  ];
  listPPDieuTri = [
    {
      ID: '1',
      MA: '1',
      MO_TA: 'Không',
    },
    {
      ID: '2',
      MA: '2',
      MO_TA: 'Có',
    }
  ];
  convert(){
    let diachi = this.patientInfo.DIA_CHI;
    if(diachi && diachi.CHI_TIET != undefined && diachi.XA_PHUONG != undefined && diachi.QUAN_HUYEN != undefined && diachi.TINH_THANH != undefined) {
      this.tomTatHSBA.DIA_CHI += diachi.CHI_TIET + ", " + diachi.XA_PHUONG.MO_TA + ", " + diachi.QUAN_HUYEN.MO_TA + ", " + diachi.TINH_THANH.MO_TA
    }
    this.tomTatHSBA.NAM_SINH = (new Date(this.patientInfo.birthday * 1000 )).getFullYear();
    this.tomTatHSBA.NGAY_RA_VIEN = (this.patientInfoHis.exam_done_info && this.patientInfoHis.exam_done_info.exam_done_time) ? moment(this.patientInfoHis.exam_done_info.exam_done_time * 1000 ): moment();
    this.tomTatHSBA.CHAN_DOAN_LUC_VAO_VIEN = this.patientInfoHis.examining_diagnosis;
    this.tomTatHSBA.CHAN_DOAN_LUC_RA_VIEN = this.patientInfoHis.exam_done_diagnosis;
    this.tomTatHSBA.DAN_TOC = this.patientInfo.DAN_TOC.MO_TA;
    this.tomTatHSBA.NGHE_NGHIEP = this.patientInfo.NGHE_NGHIEP.MO_TA;
    this.tomTatHSBA.CDVV_TEN_BENH = this.patientInfo.examining_diagnosis;
    let ICD = ""
    if(Array.isArray(this.patientInfoHis.examining_service_icd)){
      this.patientInfoHis.examining_service_icd.forEach(
        (icd) => ICD += icd.service_icd_code + ", "
      )
    }
    this.tomTatHSBA.CDVV_MA_ICD = ICD.slice(0, -2);
    console.log(this.patientInfoHis);
    this.tomTatHSBA.CDRV_TEN_BENH = this.patientInfoHis.exam_done_diagnosis;
    let ICD_RA_VIEN = ""
    if(Array.isArray(this.patientInfoHis.exam_done_service_icd)){
      this.patientInfoHis.exam_done_service_icd.forEach(
        (icd_ra_vien) => ICD_RA_VIEN += icd_ra_vien.service_icd_code + ", "
      )
    }
    this.tomTatHSBA.CDRV_MA_ICD = ICD_RA_VIEN.slice(0, -2);
    console.log(this.patientInfoHis.exam_done_state.states.result);
    if (this.patientInfoHis.exam_done_state.states.result == 1) {
      this.tomTatHSBA.TINH_TRANG_NGUOI_BENH_RA_VIEN = "Khỏi"
    }
    if (this.patientInfoHis.exam_done_state.states.result == 2) {
      this.tomTatHSBA.TINH_TRANG_NGUOI_BENH_RA_VIEN = "Đỡ"
    }
    if (this.patientInfoHis.exam_done_state.states.result == 3) {
      this.tomTatHSBA.TINH_TRANG_NGUOI_BENH_RA_VIEN = "Không thay đổi"
    }
    if (this.patientInfoHis.exam_done_state.states.result == 4) {
      this.tomTatHSBA.TINH_TRANG_NGUOI_BENH_RA_VIEN = "Nặng hơn"
    }
    if (this.patientInfoHis.exam_done_state.states.result == 5) {
      this.tomTatHSBA.TINH_TRANG_NGUOI_BENH_RA_VIEN = "Tiên lượng nặng xin về"
    }
    if (this.patientInfoHis.exam_done_state.states.result == 6) {
      this.tomTatHSBA.TINH_TRANG_NGUOI_BENH_RA_VIEN = "Tử vong"
    }
    if (this.patientInfoHis.exam_done_state.states.result == 7) {
      this.tomTatHSBA.TINH_TRANG_NGUOI_BENH_RA_VIEN = "Chưa xác định"
    }
    if (this.patientInfoHis.exam_done_state.states.result == 8) {
      this.tomTatHSBA.TINH_TRANG_NGUOI_BENH_RA_VIEN = "Tử vong ngoại viện"
    }
  }
  reset(title: string) {
    if (title === 'NOI_KHOA') {
      if(this.tomTatHSBA.NOI_KHOA.ID === "1") {
        this.tomTatHSBA.TEXT_NOI_KHOA = '';
      }
    }
    if (title === 'PTTT') {
      if(this.tomTatHSBA.PTTT.ID === "1") {
        this.tomTatHSBA.TEXT_PTTT = '';
      }
    }
  }
}
