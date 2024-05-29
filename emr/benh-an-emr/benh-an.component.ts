import { Directive, Input, SimpleChanges } from '@angular/core';
import { EmrPatientInfo, HisPatientInfo } from '../../../model/emr/patient/patient-info';
import { KhamBenh } from '../../../model/emr/kham_benh';
import { TongKetBenhAn } from '../../../model/emr/tong_ket_benh_an';
import { QLNB } from '../../../model/emr/quan_ly_nguoi_benh';
import { Chan_doan } from '../../../model/emr/chan_doan';
import { LyDo } from '../../../model/emr/benh_an';
import { HoiBenh } from '../../../model/emr/hoi_benh';
import { PatientInfo } from '../../../model/patient/patient-info';
import { PatientInformation } from '../../medicament/thuoc-lanh-dao-duyet/thuoc-lanh-dao-duyet.component';

@Directive()
export class BenhAnComponent {
  @Input() patientInfo: any;
  @Input() patientInfoHis!: HisPatientInfo;


  @Input() quanLyNguoiBenh!: QLNB;
  @Input() chanDoan!: Chan_doan;
  @Input() lyDoVaoVienNgoaiTru!: LyDo;
  @Input() hoibenhNgoaiTru!: HoiBenh;
  @Input() ketquakb!: KhamBenh;
  @Input() ketquaCLS!: TongKetBenhAn;

  @Input() ID_BENH_AN!: number;

  /**
   * TODO: Dùng tên bệnh án thay vì ID bệnh án
   */
  @Input() tenBenhAn = '';

  /**
   * Kiểm tra các trường có dữ liệu chưa, nếu chưa thì dùng hàm để tạo giá trị mặc định
   */
  protected initOrKeepValues<T>(model: T, fields: {
    key: string,
    defaultValueFactory: () => any | Promise<any>,
    isEmptyChecker?: (x: any) => boolean
  }[]) {
    fields.forEach(field => {
      if (!model || typeof model !== 'object') { // check if obj is null or not an object
        return undefined;
      }

      let currentObj: any = model;
      const keys = field.key.split('.');
      for (let i = 0; i < keys.length - 1; i++) { // iterate over all but the last key
        currentObj = currentObj[keys[i]];
        if (!currentObj) {
          return undefined;
        }
      }

      if (!field.isEmptyChecker) {
        field.isEmptyChecker = (x: any) => !x;
      }

      if (field.isEmptyChecker(currentObj[keys[keys.length - 1]]) && field.defaultValueFactory !== undefined) { // if a value was provided, set the value and return it
        new Promise((resolve, reject) => {
          try {
            resolve(field.defaultValueFactory());
          }
          catch (err) {
            resolve(undefined);
          }
        }).then((defaultValue) => {
          currentObj[keys[keys.length - 1]] = defaultValue;
        });
        return currentObj[keys[keys.length - 1]];
      } else { // otherwise, return the current value
        return currentObj[keys[keys.length - 1]];
      }
    });
  }

  /**
   * Lưu danh sách mảng động vào EMR. Đặt trong ngOnChanges.
   */
  protected mapList<T>(changes: SimpleChanges, keyOnServer: string, listOnClient: T[],
                          component: BenhAnComponent, keyOnClient: string) {
    let currentObj: any = {};

    if (changes.patientInfo?.currentValue) {
      currentObj = changes.patientInfo.currentValue as EmrPatientInfo;

      const keys = keyOnServer.split('.');
      for (let i = 0; i < keys.length - 1; i++) { // iterate over all but the last key
        currentObj = currentObj[keys[i]];
        if (!currentObj) {
          break;
        }
      }

      if (currentObj) {
        const dataOnServer = currentObj[keys[keys.length - 1]];

        if (Array.isArray(dataOnServer)) {
          listOnClient.length = 0;
          listOnClient.push(...dataOnServer);
        }
      }
    }

    currentObj = component;
    const keys = keyOnClient.split('.');
    for (let i = 0; i < keys.length - 1; i++) { // iterate over all but the last key
      currentObj = currentObj[keys[i]];
      if (!currentObj) {
        return;
      }
    }
    currentObj[keys[keys.length - 1]] = listOnClient;
  }
}
