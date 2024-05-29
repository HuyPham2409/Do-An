import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { GiayToLienQuanComponent } from '../../benh-an-emr/giay-to-lien-quan.component';
import moment, { Moment } from 'moment';
import { DateTime } from '../../../../model/emr/global';
import { ShareDataService } from '../../../../services/share-data.service';
import { ReceptionService } from '../../../../services/reception.service';
import { LocalStorageService } from '@shared';
import { DM } from '../../../../model/Patient_EMR';
import { CategoryGenaralService } from '../../../../services/category-genaral.service';
import { Globals } from '../../../../app.globals';

export  class PHIEU_CHAM_SOC_SO_SINH {
  HO_TEN_ME_CON = '';
  GIOI_TINH = new DM();
  NGAY_GIO_DE = new DateTime();
  ngau_gio_de : Moment | null = null;
  BUONG = '';
  GIUONG = '';
  CHAN_DOAN = '';
  MSBA = '';
  LIST_CHAM_SOC_SO_SINH = <CHAM_SOC_SO_SINH[]>[];
}
export class CHAM_SOC_SO_SINH {
  THOI_GIAN = new DateTime();
  thoi_gian : Moment | null = null;
  TOAN_TRANG = '';
  DA_NIEM_MAC = '';
  NHIP_THO = 0;
  NHIET_DO = 0;
  PHAN_XA = '';
  TRUONG_LUC_CO = '';
  BU_ME = '';
  NON_TRO = '';
  PHAN_XU = '';
  NUOC_TIEU = '';
  THUOC = '';
  TRUYEN_DICH = '';
  CHAM_SOC_KHAC = '';
  Y_LENH_BS = '';
  BAC_SI_DIEU_TRI = '';
  SIGNATURE_IMAGE_URL?: string = '';
  domain:string ="";
  DANH_GIA = '';
  TEN_DD_HS = '';
  CHU_KY = '';
  created_by = '';
  time_unix: number | null;
  time_moment: Moment;
  id = 0;

  constructor(isAddedByUser?: boolean) {
    const now = moment();
    const nowUnix = now.unix();
    this.time_unix = nowUnix;
    this.time_moment = moment(now);
    if (isAddedByUser) {
      this.id = nowUnix;
    }
  }
}

@Component({
  selector: 'app-phieu-cham-soc-so-sinh',
  templateUrl: './phieu-cham-soc-so-sinh.component.html',
  styleUrls: ['./phieu-cham-soc-so-sinh.component.scss']
})
export class PhieuChamSocSoSinhComponent extends GiayToLienQuanComponent implements OnInit, OnChanges {
  newChamSoc = new CHAM_SOC_SO_SINH();
  patient: any;
  @Input() showSearch = true;
  chamSocSelect = new SelectionModel<number>(false,[]);
  PHIEU_CHAM_SOC_SO_SINH = new PHIEU_CHAM_SOC_SO_SINH();
  listCSSS: CHAM_SOC_SO_SINH [] = [];
  constructor(private shareDataService: ShareDataService,
              private receptionService: ReceptionService,
              private storageService: LocalStorageService,
              private categoryService: CategoryGenaralService,
              private globals: Globals,) {
    super();
  }

  ngOnInit(): void {
    this.newChamSoc.SIGNATURE_IMAGE_URL = this.convert()
  }

  displayDM(value: any): string {
    return value && value.MO_TA ? value.MO_TA : '';
  }
  displayDMICD(value: any): string {
    return value && value.TEN ? value.TEN : '';
  }
  changeRadioSex(event: any) {
    this.PHIEU_CHAM_SOC_SO_SINH.GIOI_TINH = {
      ID: event + "",
      MA: event + "",
      MO_TA: event === '1' ? "Nam" : (event === '2' ? "Nữ" : "")
    }
  }
  async addChamsoc() {
    let newCS = new CHAM_SOC_SO_SINH(true);
    if(this.selectGiayToLienQuan){
      if(this.selectGiayToLienQuan.LIST_CHAM_SOC_SO_SINH) {
        let length = this.selectGiayToLienQuan.LIST_CHAM_SOC_SO_SINH.length
        newCS = Object.assign(  {},this.selectGiayToLienQuan.LIST_CHAM_SOC_SO_SINH[length -1])
        newCS.time_unix = moment().unix();
        newCS.time_moment = moment();
        newCS.id = Number(moment());
      }
      const user_logged = localStorage.getItem('user_logged');
      if (user_logged) {
        let convertUser = JSON.parse(user_logged);
        newCS.TEN_DD_HS = convertUser.full_name;
        newCS.CHU_KY = convertUser.user_signature_image;
      }
    }

    if(this.patientInfo){
      newCS.BAC_SI_DIEU_TRI = this.patientInfo.examining_by_fullname;
    }
    if (this.PHIEU_CHAM_SOC_SO_SINH.LIST_CHAM_SOC_SO_SINH !== undefined) {
      this.PHIEU_CHAM_SOC_SO_SINH.LIST_CHAM_SOC_SO_SINH.push(newCS);
    }
    else {
      this.PHIEU_CHAM_SOC_SO_SINH.LIST_CHAM_SOC_SO_SINH = <CHAM_SOC_SO_SINH[]>[]
    }
    this.selectChamSoc(newCS.id);
    newCS.created_by = this.storageService.getUserLogged().user_name;
    newCS.domain = this.globals.API_DOMAIN;
    this.redrawList();

    await this.categoryService.getCategoryGenaral(
      {user_id: this.patientInfo.examining_by_id}, 0, 0, 'user').subscribe(res => {
      if(res.status == true){
        newCS.SIGNATURE_IMAGE_URL = res.results[0]?.signature_image_url
      }
    })
  }
  selectChamSoc(id: number) {
    this.chamSocSelect.select(id);
    if(id)
      this.newChamSoc = this.findChamSoc(id);
  }
  private findChamSoc(id: number): CHAM_SOC_SO_SINH {
    let tmp =  this.PHIEU_CHAM_SOC_SO_SINH.LIST_CHAM_SOC_SO_SINH.find(bp => bp.id === id)
    if(tmp)
      return tmp
    return new CHAM_SOC_SO_SINH();
  }
  private redrawList() {
    this.listCSSS = [...this.PHIEU_CHAM_SOC_SO_SINH.LIST_CHAM_SOC_SO_SINH];
  }
  removeChamSoc(id: number) {
    const index = this.PHIEU_CHAM_SOC_SO_SINH.LIST_CHAM_SOC_SO_SINH.findIndex(bp => bp.id === id);
    if (index > -1) {
      this.PHIEU_CHAM_SOC_SO_SINH.LIST_CHAM_SOC_SO_SINH.splice(index, 1);
      this.redrawList();
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    if (this.isCreateGiayToLienQuan) {
      this.PHIEU_CHAM_SOC_SO_SINH = new PHIEU_CHAM_SOC_SO_SINH();
    }
    if (!this.isCreateGiayToLienQuan && this.selectGiayToLienQuan) {
      this.PHIEU_CHAM_SOC_SO_SINH = this.selectGiayToLienQuan;
    }
    if (this.patientInfo) {
      this.convert();
    }
    this.shareDataService.pushData(this.PHIEU_CHAM_SOC_SO_SINH, 'phieu_cham_soc_so_sinh');
  }
    convert(){
      this.newChamSoc.BAC_SI_DIEU_TRI = this.patientInfo.examining_by_fullname;
   return "";
  }
}
