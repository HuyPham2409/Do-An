import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { GiayToLienQuanComponent } from '../benh-an-emr/giay-to-lien-quan.component';
import { ShareDataService } from '../../../services/share-data.service';
import { CanBoYTe, KhoaDieuTri } from '../../../model/emr/quan_ly_nguoi_benh';
import { DateTime } from '../../../model/emr/global';
import moment, { Moment } from 'moment';
import { GetServiceUsedResponseResults } from '../../../model/service/response';
import { ServiceService } from '../../../services/service.service';

export class PhieuDemGac {
  PHAU_THUAT_VIEN? = new CanBoYTe();
  DUNG_CU_VIEN? = new CanBoYTe();
  PHONG_MO? = new KhoaDieuTri();
  ngay_danh_gia: Moment | null = moment();
  NGAY_DANH_GIA = new DateTime();
  CACH_THUC_PHAU_THUAT = '';
  CAN_NANG = 0;
  CHIEU_CAO = 0;
  BMI = '';
  CHAN_DOAN = '';
  DANH_SACH_GAC = INIT_DANH_SACH_GAC;
  DANH_SACH_DUNG_CU = INIT_DANH_SACH_DUNG_CU;
  PHIEU_PHAU_THUAT_THU_THUAT:any = '';
}

const INIT_DANH_SACH_GAC = [
  {
    LOAI_GAC: 'Gạc to',
    XUAT: '',
    THU_VE: '',
    KET_LUAN: '',
  },
  {
    LOAI_GAC: 'Mèche',
    XUAT: '',
    THU_VE: '',
    KET_LUAN: '',
  },
  {
    LOAI_GAC: 'Gạc con',
    XUAT: '',
    THU_VE: '',
    KET_LUAN: '',
  },
  {
    LOAI_GAC: 'Củ ấu',
    XUAT: '',
    THU_VE: '',
    KET_LUAN: '',
  },
  {
    LOAI_GAC: 'Bông sọ não',
    XUAT: '',
    THU_VE: '',
    KET_LUAN: '',
  },
];
const INIT_DANH_SACH_DUNG_CU = [
  {
    LOAI_DUNG_CU: 'Kim khâu',
    XUAT: '',
    THU_VE: '',
    KET_LUAN: '',
  },
  {
    LOAI_DUNG_CU: 'Dụng cụ',
    XUAT: '',
    THU_VE: '',
    KET_LUAN: '',
  },
];
@Component({
  selector: 'app-phieu-dem-gac-meche-dung-cu',
  templateUrl: './phieu-dem-gac-meche-dung-cu.component.html',
  styleUrls: ['./phieu-dem-gac-meche-dung-cu.component.scss'],
})
export class PhieuDemGacMecheDungCuComponent extends GiayToLienQuanComponent implements OnInit, OnChanges {
  phieuDemGac = new PhieuDemGac();
  listPttt: any = [];

  constructor(private shareDataService: ShareDataService,
              private serviceService: ServiceService) {
    super();
  }

  ngOnInit(): void {
    this.getDataFromPTTT();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.selectGiayToLienQuan && !this.selectGiayToLienQuan.DANH_SACH_GAC) {
      this.selectGiayToLienQuan.DANH_SACH_GAC = INIT_DANH_SACH_GAC;
    }
    if (!this.isCreateGiayToLienQuan && this.selectGiayToLienQuan) {
      this.phieuDemGac = this.selectGiayToLienQuan;
    }

    this.shareDataService.pushData(this.phieuDemGac, 'dem_gac');
  }

  calcBMI(weight: number, height: number) {
    this.phieuDemGac.BMI = GiayToLienQuanComponent.calcBMI(weight, height);
  }

  private getDataFromPTTT() {
    this.serviceService.getServiceUsed<GetServiceUsedResponseResults<
      '_id', 'service_category_parent_id', 'service_category_id'>>(
      this.patientInfo.patient_id,
      this.patientInfo.reception_queue_id,
      this.patientInfo.in_patient,
      [
        {service_category_id: {$in: [7, 8]}},
        {service_category_parent_id: {$in: [7, 8]}},
      ],
      {key_level_1: '_id'},
      undefined,
      this.patientInfo.medical_record_no,
      {
        service_category_id: '$service_category_id',
        results: '$results'
      }
    ).subscribe((res)=>{
      if (!res.status) {
        return;
      }
      res.results.forEach((cap1: any) => {
        cap1.data.forEach((cap2: any) => {
          cap2.exams.forEach( (cap3:any) => {
            cap3.services.forEach((cap4:any) => {
              this.listPttt.push(cap4.services.results)
            })
          })
        })
      })
      this.listPttt = this.listPttt.reduce((acc:any, val:any) => acc.concat(val), []);
    })
  }

  public comparePPTTT(p1: any, p2: any) {
    return p1.operate_no === p2.operate_no;
  }

  public loadDataFromSelectedPttt(value:any) {
    this.phieuDemGac.PHIEU_PHAU_THUAT_THU_THUAT = value;
    this.phieuDemGac.CHAN_DOAN = value.operate_info.operate_after_diagnosis ? value.operate_info.operate_after_diagnosis : "";
    this.phieuDemGac.CACH_THUC_PHAU_THUAT = value.operate_info.recommendations[0].service_name ? value.operate_info.recommendations[0].service_name : "";
    if (this.phieuDemGac.PHAU_THUAT_VIEN) {
      console.log(value.operate_staff[0]);
      this.phieuDemGac.PHAU_THUAT_VIEN.MA_NHAN_VIEN =value.operate_staff[0].user.user_id ? value.operate_staff[0].user.user_id:"";
      this.phieuDemGac.PHAU_THUAT_VIEN.HO_TEN =value.operate_staff[0].fullname ? value.operate_staff[0].fullname:"";
      this.phieuDemGac.PHAU_THUAT_VIEN.SIGNATURE_IMAGE_URL = value.operate_staff[0].user.signature_image_url ?value.operate_staff[0].user.signature_image_url: "";
    }
    if (this.phieuDemGac.DUNG_CU_VIEN) {
      if (value.operate_staff[5].user){
        this.phieuDemGac.DUNG_CU_VIEN.MA_NHAN_VIEN =value.operate_staff[5].user.user_id ? value.operate_staff[5].user.user_id:"";
        this.phieuDemGac.DUNG_CU_VIEN.HO_TEN =value.operate_staff[5].fullname ? value.operate_staff[5].fullname:"";
        this.phieuDemGac.DUNG_CU_VIEN.SIGNATURE_IMAGE_URL = value.operate_staff[5].user.signature_image_url ?value.operate_staff[5].user.signature_image_url: "";
      }
    }
    if (this.phieuDemGac.PHONG_MO) this.phieuDemGac.PHONG_MO.TEN_KHOA_PHONG =value.operate_info.room_name_to_do ? value.operate_info.room_name_to_do:"";
  }
}
