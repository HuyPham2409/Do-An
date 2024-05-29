import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DM } from '../../../../model/Patient_EMR';
import { ShareDataService } from '../../../../services/share-data.service';
import { GiayToLienQuanComponent } from '../../benh-an-emr/giay-to-lien-quan.component';
import moment, { Moment } from 'moment';
import { Address, DateTime } from '../../../../model/emr/global';
import { ReceptionService } from '../../../../services/reception.service';
import { PatientReception } from '../../../../model/reception/patient-reception';
import { CanBoYTe } from '../../../../model/emr/quan_ly_nguoi_benh';
import { LocalStorageService } from '@shared';
import { ServiceService } from '../../../../services/service.service';
import { CheckServicePriceResponse } from '../../../../model/service/response';
import { ToastrTranslateService } from '@shared/services/toastr-translate-service';
export class giay_de_nghi_KCBTYC {
  thongTinBenhNhan : any = {
    HO_TEN: '',
    patient_id: 0,
    GIOI_TINH: new DM(),
    address1: '',
    reception_queue_id: 0,
    DO_TUOI: 0,
    birthday: 0,
    parent_name: '',
    vao_vien_hoi: null,
    vao_vien_hoi_moment: null,
    in_patient: 0,
    identity_id: '',
  }
  kinhGui: string = '';
  ten: string = '';
  diaChi: string = '';
  CCCD: string = '';
  ngayCap_moment: Moment | null = null;
  ngayCap = new DateTime();
  dienThoai:  string ='';
  doiTuong: number | null = null;
  listDichVu: any[] = [];
  ngay_gio = new DateTime();
  ngay_gio_momment: Moment | null = moment();
  so_phieu: string = '';
  nguoi_tu_van: CanBoYTe | null = null;
  nam_sinh = new DateTime();
  gioi_tinh : number | null = null;
  CO_QUAN_CAP : string = '';
  SO_TIEN_UNG: number = 0;
}
export class patientType {
  "patient_type_id": number =0;
  "patient_type_code": string = '';
  "patient_type_name": string = '';
  "translate_id": string = '';
  "patient_type_type": string = '';
  "company_id": string = '';
  "active": string = '';
  "is_del": string = '';
  "is_default": string = '';
}

export enum DoiTuongKCBTYC {
  BenhNhan = 1, NguoiNha
}

@Component({
  selector: 'app-phieu-de-nghi-kham-chua-benh-theo-yeu-cau',
  templateUrl: './phieu-de-nghi-kham-chua-benh-theo-yeu-cau.component.html',
  styleUrls: ['./phieu-de-nghi-kham-chua-benh-theo-yeu-cau.component.scss']
})
export class PhieuDeNghiKhamChuaBenhTheoYeuCauComponent extends GiayToLienQuanComponent implements OnInit, OnChanges {

  giay_de_nghi: giay_de_nghi_KCBTYC = new giay_de_nghi_KCBTYC();

  PARAMS_GET_SERVICE: Record<string, any> = {};

  readonly user_logged;
  listDoiTuong:patientType[];
  patientTypeHis: any;
  constructor(private shareDataService: ShareDataService,
              private receptionService: ReceptionService,
              private storage: LocalStorageService,
              private service: ServiceService,
              private toastr: ToastrTranslateService) {
    super();
    const user_logged = this.storage.getUserLoggedSmall();
    this.user_logged = {
      ...user_logged,
      MA_NHAN_VIEN: user_logged.user_name,
      HO_TEN: user_logged.full_name,
      DIA_CHI_LIEN_HE: new Address(),
      SO_CHUNG_CHI_HANH_NGHE: ''
    };
    this.listDoiTuong = this.getUserLog().company_config.patient_type;
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.selectGiayToLienQuan && !this.isCreateGiayToLienQuan){
      this.giay_de_nghi = this.selectGiayToLienQuan;
    }
    if(this.isCreateGiayToLienQuan || !this.giay_de_nghi){
      this.giay_de_nghi = new giay_de_nghi_KCBTYC();
    }
    if (this.patientInfoHis && this.patientInfoHis.patient_type){
      this.patientTypeHis = this.patientInfoHis.patient_type;
    }
    if(this.patientInfo) {
      let info = (({HO_TEN, patient_id, GIOI_TINH, address1, reception_queue_id, DO_TUOI, parent_name, in_patient, birthday
                   }) => ({HO_TEN, patient_id, GIOI_TINH, address1, reception_queue_id, DO_TUOI, parent_name,in_patient, birthday
      }))(this.patientInfo)
      this.giay_de_nghi.thongTinBenhNhan = Object.assign({}, this.giay_de_nghi.thongTinBenhNhan, info)
      //#region hieulm - BVKCG-528: Lấy thông tin bệnh nhân nội trú
      this.receptionService.getPatientOut<PatientReception[]>(this.giay_de_nghi.thongTinBenhNhan.reception_queue_id).subscribe((res) => {
        if (res.results[0]) {
          this.initOrKeepValues(this.giay_de_nghi.thongTinBenhNhan, [
            {
              key: 'vao_vien_hoi',
              defaultValueFactory: () => res.results[0].parent_id_in
            },
            {
              key: 'identity_id',
              defaultValueFactory: () => res.results[0].identity_id
            },
            {
              key: 'phone_number',
              defaultValueFactory: () => res.results[0].phone_number
            },
          ]);
          this.initOrKeepValues(this.giay_de_nghi, [
            {
              key: 'nguoi_tu_van',
              defaultValueFactory: () => ({ ...this.user_logged }),
              isEmptyChecker: () => true
            },
          ]);
          this.PARAMS_GET_SERVICE['branch_id'] = res.results[0].branch_id;
          this.PARAMS_GET_SERVICE['patient_id'] = res.results[0].patient_id;
          this.PARAMS_GET_SERVICE['reception_queue_id'] = res.results[0].reception_queue_id;
          this.PARAMS_GET_SERVICE['patient_type_id'] = res.results[0].patient_type.patient_type_id;
        }
      });
      //#endregion
    }
    this.shareDataService.pushData(this.giay_de_nghi, 'phieu_de_nghi_kcbtyc');
  }

  add() {
    this.giay_de_nghi.listDichVu.push({});
  }
  remove(index: number) {
    this.giay_de_nghi.listDichVu.splice(index, 1);
  }

  handleChangeDoiTuong(doiTuong: DoiTuongKCBTYC) {
    if (doiTuong === DoiTuongKCBTYC.BenhNhan) {
      // hieulm - BVKCG-528: Đổ thông tin cập nhật của bệnh nhân
      this.giay_de_nghi.ten = this.giay_de_nghi.thongTinBenhNhan.HO_TEN;
      this.giay_de_nghi.diaChi = this.giay_de_nghi.thongTinBenhNhan.address1;
      this.giay_de_nghi.CCCD = this.giay_de_nghi.thongTinBenhNhan.identity_id;
      this.giay_de_nghi.dienThoai = this.giay_de_nghi.thongTinBenhNhan.phone_number;
      this.giay_de_nghi.nam_sinh = this.giay_de_nghi.thongTinBenhNhan.nam_sinh;
      this.giay_de_nghi.gioi_tinh = this.giay_de_nghi.thongTinBenhNhan.gioi_tinh
    } else {
      // hieulm - BVKCG-528: Clear thông tin cập nhật khi chuyển sang nhập thông tin người nhà
      this.giay_de_nghi.ten = '';
      this.giay_de_nghi.diaChi = '';
      this.giay_de_nghi.CCCD = '';
      this.giay_de_nghi.dienThoai = '';
      this.giay_de_nghi.nam_sinh = new DateTime();
      this.giay_de_nghi.gioi_tinh = null;
    }
  }
  private getCurrentRoom() {
    return this.storage.get('cache_phongban');
  }
  private getCurrentBrank() {
    return this.storage.get('cache_chinhanh');
  }
  private getUserLog() {
    return this.storage.get('user_logged');
  }
  getPriceService(index:number,patient_type:patientType){
    const patient_type_id = patient_type.patient_type_id
    const receptionQueueId = this.giay_de_nghi.thongTinBenhNhan.reception_queue_id;
    const room_selected = this.getCurrentRoom();
    const brank_selected = this.getCurrentBrank();
    this.service.getPriceService(receptionQueueId, {
      results: {
        "room_id_to_do": this.giay_de_nghi.listDichVu[index].room_id,
        "room_name_to_do": this.giay_de_nghi.listDichVu[index].room_name,
        "room_id": Number(room_selected.room_id),
        "room_name": room_selected.room_name,
        "service_id": this.giay_de_nghi.listDichVu[index].service_id,
        "branch_id": brank_selected.branch_id,
        "branch_name": brank_selected.branch_name,
        "company_id": this.user_logged.company_id,
        "quantity": 1,
        "quantity_cancelled": 0,
        "quantity_used": 0,
        "want_buy_more": 0,
        "patient_id": this.giay_de_nghi.thongTinBenhNhan.patient_id,
        "urgent": 0,
        "price": 0,
        // "barcode_group": item.barcode_group,
        "have_to_pay": 1,
        "multi_payment": 0,
        "re_examinate": 0,
        "multi_usage": 0,
        "note": "",
        "stay_in": 0,
        "patient_type_id_action":patient_type_id,
        "check_price": 1,
      }
    }).subscribe((data:any) => {
      if (data.status === true){
        if (data.results && data.results.service_price){
          this.toastr.clear();
          this.giay_de_nghi.listDichVu[index].service_price = data.results.service_price;
        } else {
          this.giay_de_nghi.listDichVu[index].patient_type = null;
          this.toastr.clear();
          this.toastr.error('Đổi loại giá', 'Loại giá đối tượng này không được phát hành');
        }
      } else {
        this.giay_de_nghi.listDichVu[index].patient_type = null;
        this.toastr.clear();
        this.toastr.error('Đổi loại giá', 'Loại giá đối tượng này không được phát hành');
      }
    })
  }
  OnselectService(index:number){
    this.giay_de_nghi.listDichVu[index].patient_type = this.listDoiTuong.find(item =>{
      return item.patient_type_id === this.patientTypeHis.patient_type_id;
    });
  }
}
