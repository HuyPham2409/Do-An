import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { GiayToLienQuanComponent } from '../../benh-an-emr/giay-to-lien-quan.component';
import {
  DoiTuongKCBTYC,
  giay_de_nghi_KCBTYC,
} from '../giay-de-nghi-kham-chua-benh-theo-yeu-cau/phieu-de-nghi-kham-chua-benh-theo-yeu-cau.component';
import { ShareDataService } from '../../../../services/share-data.service';
import { ReceptionService } from '../../../../services/reception.service';
import { LocalStorageService } from '@shared';
import { Address, DateTime } from '../../../../model/emr/global';
import { PatientReception } from '../../../../model/reception/patient-reception';

@Component({
  selector: 'app-giay-de-nghi-kham-chua-benh-theo-yeu-cau-khoa-san',
  templateUrl: './giay-de-nghi-kham-chua-benh-theo-yeu-cau-khoa-san.component.html',
  styleUrls: ['./giay-de-nghi-kham-chua-benh-theo-yeu-cau-khoa-san.component.scss'],
})
export class GiayDeNghiKhamChuaBenhTheoYeuCauKhoaSanComponent extends GiayToLienQuanComponent implements OnChanges {

  giay_de_nghi: giay_de_nghi_KCBTYC = new giay_de_nghi_KCBTYC();

  PARAMS_GET_SERVICE: Record<string, any> = {};

  readonly user_logged;

  constructor(private shareDataService: ShareDataService,
              private receptionService: ReceptionService,
              private storage: LocalStorageService) {
    super();
    const user_logged = this.storage.getUserLoggedSmall();
    this.user_logged = {
      ...user_logged,
      MA_NHAN_VIEN: user_logged.user_name,
      HO_TEN: user_logged.full_name,
      DIA_CHI_LIEN_HE: new Address(),
      SO_CHUNG_CHI_HANH_NGHE: ''
    };
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.selectGiayToLienQuan && !this.isCreateGiayToLienQuan){
      this.giay_de_nghi = this.selectGiayToLienQuan;
    }
    if(this.isCreateGiayToLienQuan || !this.giay_de_nghi){
      this.giay_de_nghi = new giay_de_nghi_KCBTYC();
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
    this.shareDataService.pushData(this.giay_de_nghi, 'phieu_de_nghi_kcbtyc_ksan');
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
}
