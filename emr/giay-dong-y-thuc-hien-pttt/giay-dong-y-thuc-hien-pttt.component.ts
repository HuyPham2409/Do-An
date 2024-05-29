import { Component, OnChanges, OnInit,SimpleChanges } from '@angular/core';
import { GiayToLienQuanComponent } from '../benh-an-emr/giay-to-lien-quan.component';
import moment, { Moment } from 'moment';
import { DateTime } from '../../../model/emr/global';
import { DM } from '../../../model/Patient_EMR';
import { ShareDataService } from '../../../services/share-data.service';
import { firstValueFrom } from 'rxjs';
import { EmrService } from '../../../services/emr.service';
import { CanBoYTe } from '../../../model/emr/quan_ly_nguoi_benh';
import { Globals } from '../../../app.globals';

export class GiayDongYThucHienPTTT {
  BENH_NHAN = new BenhNhan();
  NGUOI_THAN = new NguoiThan();
  KHOA = '';
  BSPT = new CanBoYTe();
  NGAY_DONG_Y_TH_PTTT = new DateTime();
  ngay_dong_y_th_pttt : Moment | null = null;
  CHAN_DOAN_TRUOC_PT = '';
  PPPT = '';
  TRIEU_CHUNG_BIEN_CHUNG = {
    SUNG: false,
    DAU: false,
    CHAY_MAU: false,
    NHIEM_TRUNG: false,
    DI_UNG_VAT_LIEU: false,
    HAN_CHE_VAN_DONG_HAM: false,
    CHAM_LANH_THUONG: false,
    TE_DI_CAM: false,
    LIET_TAM_THOI: false,
    LIET_CAM_GIAC: false
  };
  MOT_SO_BIEN_CHUNG_KHAC = '';
  DONG_Y_LAM_CAC_XN = false;
  DONG_Y_CHO_SD_HINH_ANH = false;
  XAC_NHAN_PTTT = new DM();
}
export class BenhNhan {
  HO_TEN = '';
  ngay_sinh: Moment | null = null;
  NGAY_SINH = new DateTime();
  GIOI_TINH = {
    ID: "1",
    MA: "",
    MO_TA : ""
  };
  DIA_CHI = '';
  SO_CCCD = '';
  CHAN_DOAN = '';
  CHI_DINH_DV_PT:any = '';
  KHOA = '';
  ngay_nhap_vien: any;
  NGAY_NHAP_VIEN:Moment | null = null;
}
export class NguoiThan {
  HO_TEN = '';
  ngay_sinh: Moment | null = null;
  NGAY_SINH = new DateTime();
  GIOI_TINH = {
    ID: "1",
    MA: "",
    MO_TA : ""
  };
  DIA_CHI = '';
  SO_CCCD = '';
  QUAN_HE_VOI_BENH_NHAN = '';
  SO_DT = '';
}
@Component({
  selector: 'app-giay-dong-y-thuc-hien-pttt',
  templateUrl: './giay-dong-y-thuc-hien-pttt.component.html',
  styleUrls: ['./giay-dong-y-thuc-hien-pttt.component.scss']
})
export class GiayDongYThucHienPtttComponent extends GiayToLienQuanComponent implements OnInit, OnChanges {
  GIAY_DONG_Y_THUC_HIEN_PTTT!: GiayDongYThucHienPTTT;
  site!: string;

  luaChonLamPhauThuat = [
    {
      "ID": "1",
      "MA": "1",
      "MO_TA": "Đồng ý phẫu thuật, thủ thuật và để giấy này làm bằng"
    },
    {
      "ID": "2",
      "MA": "2",
      "MO_TA": "Không đồng ý phẫu thuật, thủ thuật và để giấy này làm bằng"
    }
  ]
  constructor(private shareDataService: ShareDataService,
              private emrService: EmrService,
              private globals: Globals) {
    super();
    this.site = globals.prefix_report || 'ehos';
  }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log("patientInfoHis",this.patientInfoHis);
    if (!this.isCreateGiayToLienQuan && this.checkNonEmpty(this.selectGiayToLienQuan)) {
      this.GIAY_DONG_Y_THUC_HIEN_PTTT = this.selectGiayToLienQuan;
    }
    if (this.isCreateGiayToLienQuan || !this.GIAY_DONG_Y_THUC_HIEN_PTTT) {
      this.GIAY_DONG_Y_THUC_HIEN_PTTT = new GiayDongYThucHienPTTT();
    }
    //#region Makeshift patching
    if (!this.GIAY_DONG_Y_THUC_HIEN_PTTT.BENH_NHAN) {
      this.GIAY_DONG_Y_THUC_HIEN_PTTT.BENH_NHAN = new BenhNhan();
    }
    //#endregion
    if (this.patientInfoHis) {
      this.initOrKeepValues(this.GIAY_DONG_Y_THUC_HIEN_PTTT.BENH_NHAN, [
        {
          key: 'HO_TEN',
          defaultValueFactory: () => this.patientInfoHis.patient_fullname
        },
        {
          key: 'ngay_sinh',
          defaultValueFactory: () => this.patientInfoHis.birthday ?
            moment.unix(this.patientInfoHis.birthday) : null
        },
        {
          key: 'GIOI_TINH',
          defaultValueFactory: () => firstValueFrom(this.emrService.getSexDM(this.patientInfoHis.sex)),
          isEmptyChecker: (dm: DM) => dm.ID === '0'
        },
        {
          key: 'DIA_CHI',
          defaultValueFactory: () => this.patientInfoHis.address1
        },
        {
          key: 'KHOA',
          defaultValueFactory: () => this.patientInfoHis.parent_name
        },
        {
          key: 'CHAN_DOAN',
          defaultValueFactory: () => this.patientInfoHis.examining_diagnosis
        },
        {
          key: 'SO_CCCD',
          defaultValueFactory: () => this.patientInfoHis.identity_id
        },
        {
          key: 'ngay_nhap_vien',
          defaultValueFactory: () =>  this.patientInfoHis.parent_id_in
        }
      ]);
    }
    this.shareDataService.pushData(this.GIAY_DONG_Y_THUC_HIEN_PTTT, 'giay_dong_y_thuc_hien_pttt');
  }
  changeRadioSex(event: any) {
    this.GIAY_DONG_Y_THUC_HIEN_PTTT.BENH_NHAN.GIOI_TINH = {
      ID: event + "",
      MA: event + "",
      MO_TA: event === '1' ? "Nam" : (event === '2' ? "Nữ" : "")
    }
  }
  changeRadioSexNguoithan(event: any) {
    this.GIAY_DONG_Y_THUC_HIEN_PTTT.NGUOI_THAN.GIOI_TINH = {
      ID: event + "",
      MA: event + "",
      MO_TA: event === '1' ? "Nam" : (event === '2' ? "Nữ" : "")
    }
  }
  changeRadioPT(event: any) {
    this.GIAY_DONG_Y_THUC_HIEN_PTTT.XAC_NHAN_PTTT = {
      ID: event + "",
      MA: event + "",
      MO_TA: event === '1' ? "Đồng ý phẫu thuật, thủ thuật và để giấy này làm bằng" : (event === '2' ? "Không đồng ý phẫu thuật, thủ thuật và để giấy này làm bằng" : "")
    }
  }

  loadDataFromSelectedPttt(value:any){
    this.GIAY_DONG_Y_THUC_HIEN_PTTT.BENH_NHAN.CHI_DINH_DV_PT = value;
  }

}
