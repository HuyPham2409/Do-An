import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmActionComponent } from '../../../components/confirm-action/confirm-action.component';
import { ToastrTranslateService } from '@shared/services/toastr-translate-service';
import { MatTabGroup } from '@angular/material/tabs';
import { GiayToLienQuanComponent } from '../../benh-an-emr/giay-to-lien-quan.component';
import { ShareDataService } from '../../../../services/share-data.service';
import { LocalStorageService } from '@shared';
import { EmrService } from '../../../../services/emr.service';
import { SiteName } from '../../../../model/site/site-name';
import { ShowForSitePipe } from '../../../../pipes/show-for-site/show-for-site.pipe';
import { ServiceService } from '../../../../services/service.service';
import { GetServiceUsedResponseResults } from '../../../../model/service/response';
import { CommonService } from '../../../../services/common.service';

class BangKiemAnToanPhauThuat {
  PHIEU_PHAU_THUAT_THU_THUAT:any = '';
  CHE_DO_PHAU_THUAT = '';
  CHAN_DOAN = '';
  EKIP_PHAU_THUAT = '';
  PHUONG_PHAP_PHAU_THUAT = '';
  PHUONG_PHAP_VO_CAM = '';
  PHAU_THUAT_PHIEN = false;
  TUOI = '';
  GIOI_TINH = '1';
  PHAU_THUAT_THEO_CHUONG_TRINH = false;
  PHAU_THUAT_CAP_CUU = false;
  PHAU_THUAT_THEO_YEU_CAU = false
  PHAN_LOAI_PT = '';
  TRUOC_GAY_ME_VO_CAM = {
    THOI_GIAN: <number | null>null,
    thoi_gian_moment: moment(),
    DM_1: false,
    DM_2: null,
    DM_2_MO_TA: '',
    DM_3: null,
    DM_3_MO_TA: '',
    DM_3_1: null,
    DM_3_1_MO_TA: '',
    DM_3_2: null,
    DM_3_3: null,
    DM_3_4: null,
    BS_PT_CHINH: null,
    DM_4: null,
    DM_5: null,
    DM_6_1: false,
    DM_6_1_MO_TA: '',
    DM_6_2: false,
    DM_6_2_MO_TA: '',
    DM_7: false,
    GAY_ME_CHINH: null
  };
  TRUOC_RACH_DA = {
    THOI_GIAN: <number | null>null,
    thoi_gian_moment: moment(),
    DM_1: false,
    DM_1_1: false,
    DM_1_2: false,
    DM_2: null,
    DM_2_1: <number | null>null,
    dm_2_1_moment: '',
    DM_2_2: '',
    DM_2_3: null,
    DM_2_4: null,
    DM_2_4_MO_TA: '',
    DM_2_5: null,
    DM_3: null,
    DM_3_1: null,
    DM_3_2: <number | null>null,
    dm_3_2_moment: moment(),
    DM_3_3: null,
    DM_4: null,
    DM_4_MO_TA: '',
    DM_5_1: null,
    DM_5_2: null,
    DM_5_2_MO_TA: '',
    GAY_ME_PHU: null,
    DD_VONG_NGOAI: null
  };
  TRUOC_DONG_VET_MO = {
    THOI_GIAN: <number | null>null,
    thoi_gian_moment: moment(),
    KIEM_TRA_VAT_TU: false,
  };
  TRUOC_NB_ROI_PHONG_PT = {
    THOI_GIAN: <number | null>null,
    thoi_gian_moment: moment(),
    DM_1: '',
    DM_1_1: null,
    DM_1_2: null,
    DM_1_2_MO_TA: '',
    DM_2: null,
    DM_2_1: false,
    DM_2_2: false,
    DM_3_1: false,
    DM_3: null,
    DM_3_MO_TA: '',
    DM_4: '',
    BS_PT_CHINH: null,
    GAY_ME_CHINH: null,
    DD_VONG_NGOAI: null,
    PHAU_THUAT_VIEN: null,
    NGUOI_THUC_HIEN: {}
  };
  /**
   * TODO: Nút "Hoàn tất giai đoạn", bởi account nào
   * TODO: Check form trong tab trước xong thì mới mở tab sau, không thì disable
   */
  stages?: {
    is_done: boolean
    updated_at: number
    updated_by: string
  }[];

  constructor() {
    this.TRUOC_GAY_ME_VO_CAM.THOI_GIAN = this.TRUOC_GAY_ME_VO_CAM.thoi_gian_moment.unix();
    this.TRUOC_RACH_DA.THOI_GIAN = this.TRUOC_RACH_DA.thoi_gian_moment.unix();
    this.TRUOC_RACH_DA.DM_3_2 = this.TRUOC_RACH_DA.dm_3_2_moment.unix();
    this.TRUOC_NB_ROI_PHONG_PT.THOI_GIAN = this.TRUOC_NB_ROI_PHONG_PT.thoi_gian_moment.unix();
  }
}

type TypeName = 'datetime' | 'divider' | 'checkbox' | 'checkbox_with_text' | 'radio'
  | 'label' | 'cbyt' | 'radio_with_text' | 'text';

type BySiteOrDefault<T> = T | Partial<Record<SiteName, T>>;

interface Schema extends Partial<any> {
  description?: string;
  key?: BySiteOrDefault<string>;
  key_unix?: BySiteOrDefault<string>;
  type: BySiteOrDefault<TypeName>;
  label?: BySiteOrDefault<string>;
  true_label?: BySiteOrDefault<string>;
  false_label?: BySiteOrDefault<string>;
  text_label?: string;
  hide_for_sites?: Partial<Record<SiteName, boolean>>;
  required?: BySiteOrDefault<boolean>; // Currently only checking if false
}

const DIVIDER = {type: 'divider' as const};

function Radio(cfg: {key: string, label: string,
  hide_for_sites: Partial<Record<SiteName, boolean>>}): Schema {
  return {
    ...cfg,
    type: 'radio',
    true_label: 'emr.co',
    false_label: 'emr.khong'
  }
}

function RadioWithText(cfg: { key: string, key_text: string, label: BySiteOrDefault<string>,
  hide_for_sites?: Partial<Record<SiteName, boolean>>}): Schema {
  return {
    ...cfg,
    type: 'radio_with_text',
    true_label: 'Có:',
    false_label: 'emr.khong'
  }
}

function Cbyt(cfg: {key: string, label: string, class: string,
  hide_for_sites: Partial<Record<SiteName, boolean>>}): Schema {
  return {
    ...cfg,
    type: 'cbyt',
    true_label: 'emr.co',
    false_label: 'emr.khong'
  }
}

@Component({
  selector: 'app-bang-kiem-an-toan-phau-thuat',
  templateUrl: './bang-kiem-an-toan-phau-thuat.component.html',
  styleUrls: ['./bang-kiem-an-toan-phau-thuat.component.scss'],
})
export class BangKiemAnToanPhauThuatComponent extends GiayToLienQuanComponent implements OnInit, OnChanges {
  bangKiemAnToanPhauThuat!: BangKiemAnToanPhauThuat;

  @ViewChild(MatTabGroup) tabGroup!: MatTabGroup;

  @Output() save = new EventEmitter();

  showFields: Record<string, any> = {};
  siteName: SiteName = 'default';
  listPttt:any = [];
  listTest:any = [];
  tabListLength = 0;

  readonly TABS_FOR_SITE: Record<SiteName, string[]> = {
    app_67: ['TRUOC_GAY_ME_VO_CAM', 'TRUOC_RACH_DA', 'TRUOC_DONG_VET_MO', 'TRUOC_NB_ROI_PHONG_PT'],
    app_11: ['TRUOC_GAY_ME_VO_CAM', 'TRUOC_RACH_DA', 'TRUOC_DONG_VET_MO', 'TRUOC_NB_ROI_PHONG_PT'],
    default: ['TRUOC_GAY_ME_VO_CAM', 'TRUOC_RACH_DA', 'TRUOC_NB_ROI_PHONG_PT']
  };

  readonly SCHEMAS: Record<string, Schema[]> = {
    TRUOC_GAY_ME_VO_CAM: [
      {
        description: 'Thời gian',
        type: 'datetime',
        key: 'thoi_gian_moment',
        key_unix: 'THOI_GIAN'
      },
      DIVIDER,
      {
        key: 'DM_1',
        type: 'checkbox',
        label: {
          app_67: '1. BSGM tiến hành nhận dạng đúng người bệnh (sử dụng ít nhất 2 yếu tố nhận dạng)',
          default: '1. Người bệnh đã được nhận dạng, vị trí mổ, phương pháp phẫu thuật và đồng ý phẫu thuật'
        },
        true_label: {
          app_67: 'Đúng với HSBA',
          default: 'emr.co'
        }
      },
      DIVIDER,
      {
        key: 'DM_2',
        key_text: 'DM_2_MO_TA',
        type: {
          app_67: 'checkbox_with_text',
          default: 'radio'
        },
        label: {
          app_67: '2. NB được đánh dấu vùng mổ theo đúng biên bản phẫu thuật?',
          default: '2. Vùng mổ được đánh dấu'
        },
        true_label: {
          app_67: 'Đúng ở đâu:',
          default: 'emr.co'
        },
        false_label: 'emr.khong_ap_dung'
      },
      DIVIDER,
      {
        type: 'label',
        label: '3. Người bệnh: (khám, quan sát, hỏi, kiểm tra)',
        hide_for_sites: { app_67: true }
      },
      {
        description: 'Tiền sử dị ứng',
        key: {
          app_67: 'DM_3',
          default: 'DM_3_1'
        },
        key_text: 'DM_3_MO_TA',
        type: {
          app_67: 'radio_with_text',
          default: 'radio'
        },
        label: {
          app_67: '3. BSGM xác nhận lại tiền sử dị ứng của người bệnh?',
          default: '3.1. Tiền sử dị ứng'
        },
        true_label: 'emr.co',
        false_label: 'emr.khong',
        text_label: 'Dị nguyên'
      },
      {...DIVIDER, hide_for_sites: {app_67: false}},
      {
        description: 'Đường thở',
        key: {
          app_67: 'DM_4',
          default: 'DM_3_2'
        },
        type: 'radio',
        label: {
          app_67: '4. BSGM đánh giá tình trạng đường thở?',
          default: '3.2. Đường thở khó / nguy cơ sặc'
        },
        true_label: {
          app_67: 'Đúng với HSBA',
          default: 'emr.co'
        },
        false_label: {
          app_67: 'Khó / có nguy cơ và có sẵn thiết bị hỗ trợ',
          default: 'emr.khong'
        }
      },
      {...DIVIDER, hide_for_sites: {app_67: false}},
      {
        description: 'Nguy cơ mất máu trên 500ml',
        key: {
          app_67: 'DM_5',
          default: 'DM_3_3'
        },
        type: 'radio',
        label: {
          app_67: '5. BSGM đánh giá nguy cơ mất máu >500ml',
          default: '3.3. Nguy cơ mất máu trên 500ml (7ml/kg ở trẻ em)'
        },
        true_label: {
          app_67: 'Có, hai túi dịch và dụng cụ tiếp cận trung tâm',
          default: 'emr.co'
        },
        true_label_class: {
          app_67: 'col-5'
        },
        false_label: {
          app_67: 'Khó / có nguy cơ và có sẵn thiết bị hỗ trợ',
          default: 'emr.khong'
        }
      },
      {...DIVIDER, hide_for_sites: {app_67: false}},
      {
        key: 'DM_3_4',
        type: 'radio',
        label: '3.4. Phương án xử trí mất máu',
        true_label: 'emr.co',
        false_label: 'emr.khong',
        hide_for_sites: { app_67: true }
      },
      { ...DIVIDER,
        hide_for_sites: { app_67: true } },
      {
        key: 'BS_PT_CHINH',
        type: 'cbyt',
        label: 'bang_kiem_an_toan_phau_thuat.bs_phau_thuat_chinh',
        hide_for_sites: { app_67: true }
      },
      {
        description: "Thuốc và thiết bị đã được kiểm tra đầy đủ",
        key: {
          app_67: 'DM_6_1',
          default: 'DM_4'
        },
        key_text: 'DM_6_1_MO_TA',
        type: {
          app_67: 'checkbox_with_text',
          default: 'checkbox'
        },
        label: {
          app_67: '6. Tình trạng thuốc và thiết bị đã được chuẩn bị đầy đủ?; Có cần trang thiết bị đặc biệt không?',
          default: '4. Thuốc và thiết bị gây mê đã được kiểm tra đầy đủ'
        },
        true_label: {
          app_67: 'Đầy đủ và sẵn sàng:',
          default: 'emr.co'
        }
      },
      {
        description: "Máy đo độ bão hòa Oxy trong máu có gắn trên NB và hoạt động bình thường",
        key: {
          app_67: 'DM_6_2',
          default: 'DM_5'
        },
        key_text: 'DM_6_2_MO_TA',
        type: {
          app_67: 'checkbox_with_text',
          default: 'checkbox'
        },
        label: {
          app_67: '- Máy đo độ bão hòa Oxy trong máu có gắn trên người bệnh và hoạt động bình thường',
          default: '5. Máy đo độ bão hòa oxy trong máu có gắn trên NB và hoạt động bình thường'
        },
        true_label: 'emr.co',
        text_label: 'Thông số Huyết áp - SPO2'
      },
      {...DIVIDER, hide_for_sites: {app_67: false, default: true}},
      {
        description: "Kíp phẫu thuật đã có mặt đầy đủ",
        key: 'DM_7',
        type: 'checkbox',
        label: '7. Kíp phẫu thuật đã có mặt đầy đủ',
        true_label: 'emr.co',
        hide_for_sites: { default: true }
      },
      {
        key: 'GAY_ME_CHINH',
        type: 'cbyt',
        label: 'bang_kiem_an_toan_phau_thuat.gay_me_chinh',
        hide_for_sites: { app_67: true }
      },
      DIVIDER,
    ],
    TRUOC_RACH_DA: [
      {
        description: 'Thời gian',
        type: 'datetime',
        key: 'thoi_gian_moment',
        key_unix: 'THOI_GIAN'
      },
      DIVIDER,
      {
        key: 'DM_1_1',
        type: 'checkbox',
        label: '1. Xác nhận thông tin:',
        true_label: 'Các thành viên trong nhóm PT giới thiệu tên và nhiệm vụ',
        hide_for_sites: {app_67: true},
        required: false,
      },
      {
        key: {
          app_67: 'DM_1',
          default: 'DM_1_2'
        },
        type: 'checkbox',
        label: {
          app_67: '1. PTV tiến hành nhận dạng đúng người bệnh và vị trí mổ (ít nhất 2 yếu tố nhận dạng)',
          default: ' '
        },
        true_label: {
          app_67: 'Đúng với HSBA - NB và Ekip xác nhận',
          default: 'Xác nhận lại tên NB, phương pháp PT và vị trí đường rạch'
        },
        required: false,
      },
      DIVIDER,
      {
        type: 'label',
        label: '2. PTV dự kiến ca mổ',
        hide_for_sites: {default: true}
      },
      {
        key: 'DM_2',
        type: 'radio',
        label: '2. Kháng sinh dự phòng có được thực hiện trong khoảng 60 phút trước gây mê không?',
        true_label: 'emr.co',
        false_label: 'emr.khong_ap_dung',
        hide_for_sites: {app_67: true}
      },
      { ...DIVIDER, hide_for_sites: {app_67: true} },
      {
        type: 'label',
        label: '3. Bác sĩ phẫu thuật chính:',
        hide_for_sites: {app_67: true}
      },
      {
        key: 'DM_3_1',
        type: 'radio',
        label: '3.1. Dự kiến những bất thường có thể xảy ra',
        true_label: 'emr.co',
        false_label: 'emr.khong',
        hide_for_sites: {app_67: true}
      },
      {
        type: 'label',
        label: '3.2. Thời gian PT',
        hide_for_sites: {app_67: true}
      },
      {
        description: '3.2. Thời gian PT',
        type: {
          app_67: 'text',
          default: 'datetime'
        },
        key: {
          app_67: 'dm_2_1_moment',
          default: 'dm_3_2_moment'
        },
        key_unix: {
          app_67: 'DM_2_1',
          default: 'DM_3_2'
        },
        label: {
          app_67: 'Dự kiến thời gian (phút)',
          default: ' '
        }
      },
      {
        key: 'DM_2_2',
        type: 'text',
        label: 'Các bất thường',
        hide_for_sites: {default: true}
      },
      {
        key: {
          app_67: 'DM_2_3',
          default: 'DM_3_3'
        },
        type: 'radio',
        label: {
          app_67: '+ Tiên lượng mất máu:',
          default: '3.3. Tiên lượng mất máu trên 500ml'
        },
        true_label: {
          app_67: 'Có, hai túi dịch và dụng cụ tiếp cận trung tâm.',
          default: 'emr.co'
        },
        true_label_class: {
          app_67: 'col-5'
        },
        false_label: 'emr.khong'
      },
      RadioWithText({
        key: 'DM_2_4',
        key_text: 'DM_2_4_MO_TA',
        label: '+ Các trang thiết bị đặc biệt',
        hide_for_sites: {default: true}
      }),
      Radio({
        key: 'DM_2_5',
        label: '+ Hiển thị hình ảnh thiết yếu:',
        hide_for_sites: {default: true}
      }),
      DIVIDER,
      Radio({
        key: 'DM_3',
        label: '3. Bệnh nhân có được sử dụng KS dự phòng?',
        hide_for_sites: {default: true}
      }),
      { ...DIVIDER, hide_for_sites: {default: true} },
      RadioWithText({
        key: 'DM_4',
        key_text: 'DM_4_MO_TA',
        label: {
          app_67: '4. BSGM xác định các vấn đề đặc biệt cần chú ý đối với người bệnh',
          default: '4. Gây mê chính: Có vấn đề đặc biệt về NB cần chú ý không?'
        }
      }),
      { ...DIVIDER, hide_for_sites: {app_67: true} },
      {
        type: 'label',
        label: '5. Gây mê chính, ĐD vòng trong',
        hide_for_sites: {app_67: true}
      },
      Radio({
        key: 'DM_5_1',
        label: '5.1. Các dụng cụ, phương tiện có đảm bảo vô khuẩn không?',
        hide_for_sites: {app_67: true}
      }),
      RadioWithText({
        key: 'DM_5_2',
        key_text: 'DM_5_2_MO_TA',
        label: '5.2. Có vấn đề gì về chất lượng thiết bị không?',
        hide_for_sites: {app_67: true}
      }),
      { ...DIVIDER, hide_for_sites: {app_67: true} },
      Cbyt({
        key: 'GAY_ME_PHU',
        label: 'bang_kiem_an_toan_phau_thuat.gay_me_phu',
        class: 'col-6',
        hide_for_sites: {app_67: true}
      }),
      Cbyt({
        key: 'DD_VONG_NGOAI',
        label: 'bang_kiem_an_toan_phau_thuat.dd_vong_ngoai',
        class: 'col-6',
        hide_for_sites: {app_67: true}
      }),
      { ...DIVIDER, hide_for_sites: {app_67: true} },
    ],
    TRUOC_DONG_VET_MO: [
      {
        description: 'Thời gian',
        type: 'datetime',
        key: 'thoi_gian_moment',
        key_unix: 'THOI_GIAN'
      },
      DIVIDER,
      {
        key: 'KIEM_TRA_VAT_TU',
        type: 'checkbox',
        label: 'PTV và KTV dụng cụ xác nhận bằng lời việc kiểm tra kim khâu, gạc, dụng cụ:',
        true_label: 'Đúng và đủ so với số lượng ban đầu'
      },
      DIVIDER,
    ],
    TRUOC_NB_ROI_PHONG_PT: [
      {
        description: 'Thời gian',
        type: 'datetime',
        key: 'thoi_gian_moment',
        key_unix: 'THOI_GIAN'
      },
      DIVIDER,
      {
        key: 'DM_1',
        type: 'text',
        label: '1. Xác nhận lại bằng lời phương pháp PT',
        hide_for_sites: {default: true},
        required: true
      },
      {
        type: 'label',
        label: '1. BS phẫu thuật chính, ĐD vòng trong xác định bằng miệng trước khi khâu đóng vết mổ:',
        hide_for_sites: {app_67: true}
      },
      Radio({
        key: 'DM_1_1',
        label: '1.1. Hoàn tất việc đếm kim, gạc và dụng cụ PT',
        hide_for_sites: {app_67: true}
      }),
      RadioWithText({
        key: 'DM_1_2',
        key_text: 'DM_1_2_MO_TA',
        label: '1.2. Vấn đề gì về dụng cụ cần giải quyết',
        hide_for_sites: {app_67: true}
      }),
      DIVIDER,
      {
        description: 'Dán nhãn bệnh phẩm',
        key: {
          app_67: 'DM_2',
          default: 'DM_2_1'
        },
        type: {
          app_67: 'radio',
          default: 'checkbox'
        },
        label: {
          app_67: '2. Có bệnh phẩm không?',
          default: '2. ĐD vòng ngoài thực hiện trước khi chuyển NB (nếu có):'
        },
        true_label: {
          app_67: 'Có, đã dán nhãn và điền đầy đủ thông tin; xác nhận lại bằng lời tên người bệnh và bệnh phẩm',
          default: 'Dán nhãn bệnh phẩm (đọc to nhãn bệnh phẩm, gồm có thông tin NB)'
        },
        true_label_class: {
          app_67: 'col-12'
        },
        false_label: 'emr.khong',
        required: {
          app_67: true,
          default: false,
        }
      },
      {
        key: 'DM_2_2',
        type: 'checkbox',
        label: ' ',
        true_label: 'Đảm bảo an toàn và vô khuẩn các hệ thống dẫn lưu',
        required: false,
        hide_for_sites: {app_67: true}
      },
      DIVIDER,
      Radio({
        key: 'DM_3',
        label: '3. Có vấn đề gì về trang thiết bị không?',
        hide_for_sites: {default: true}
      }),
      {
        key: 'DM_3_1',
        type: 'checkbox',
        label: '3. BS phẫu thuật chính, Gây mê chính ghi rõ:',
        true_label: 'Những vấn đề cần quan tâm về hồi sức và chăm sóc NB sau mổ:',
        hide_for_sites: {app_67: true}
      },
      RadioWithText({
        key: 'DM_3',
        key_text: 'DM_3_MO_TA',
        label: ' ',
        hide_for_sites: {app_67: true}
      }),
      DIVIDER,
      {
        key: 'DM_4',
        type: 'text',
        label: '4. Kíp PT và GM thảo luận về những vấn đề hồi phục, chăm sóc sau mổ',
        hide_for_sites: {default: true},
        required: true
      },
      { ...DIVIDER, hide_for_sites: {app_67: true} },
      Cbyt({
        key: 'PHAU_THUAT_VIEN',
        label: 'Phẫu thuật viên',
        class: 'col-6',
        hide_for_sites: {default: true}
      }),
      Cbyt({
        key: 'NGUOI_THUC_HIEN',
        label: 'Người thực hiện',
        class: 'col-6',
        hide_for_sites: {default: true}
      }),
      Cbyt({
        key: 'BS_PT_CHINH',
        label: 'bang_kiem_an_toan_phau_thuat.bs_phau_thuat_chinh',
        class: 'col-4',
        hide_for_sites: {app_67: true}
      }),
      Cbyt({
        key: 'GAY_ME_CHINH',
        label: 'bang_kiem_an_toan_phau_thuat.gay_me_chinh',
        class: 'col-4',
        hide_for_sites: {app_67: true}
      }),
      Cbyt({
        key: 'DD_VONG_NGOAI',
        label: 'bang_kiem_an_toan_phau_thuat.dd_vong_ngoai',
        class: 'col-4',
        hide_for_sites: {app_67: true}
      }),
      DIVIDER
    ]
  };

  private showForSitePipe = new ShowForSitePipe();

  constructor(private shareDataService: ShareDataService,
              private dialog: MatDialog, private toast: ToastrTranslateService,
              private storage: LocalStorageService,
              private emrService: EmrService,
              private serviceService: ServiceService,
              private commonService: CommonService) {
    super();
    this.siteName = this.emrService.getSite()?.name || 'default';
  }

  ngOnInit(): void {
    this.bangKiemAnToanPhauThuat = new BangKiemAnToanPhauThuat();
    this.getDataFromPTTT();
    this.emrService.getShowFieldComponentBySite(this.loaiGiayToLienQuan.MA).subscribe((res) => {
      this.showFields = res;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.isCreateGiayToLienQuan && changes.selectGiayToLienQuan?.currentValue) {
      this.bangKiemAnToanPhauThuat = this.selectGiayToLienQuan;
    }
    if (this.isCreateGiayToLienQuan) {
      this.bangKiemAnToanPhauThuat = new BangKiemAnToanPhauThuat();
      let userLogged = localStorage.getItem('user_logged');
      if (userLogged){
        let userObj = JSON.parse(userLogged);
        this.bangKiemAnToanPhauThuat.TRUOC_NB_ROI_PHONG_PT.NGUOI_THUC_HIEN = {
          MA_NHAN_VIEN: userObj.user_name,
          HO_TEN: userObj.full_name,
          signature: userObj.signature,
        }
      }
    }
    if (!this.bangKiemAnToanPhauThuat){
      this.bangKiemAnToanPhauThuat = new BangKiemAnToanPhauThuat();
    }
    if (this.patientInfo){
      this.bangKiemAnToanPhauThuat.TUOI = this.commonService.calculatorAge(this.patientInfo.birthday, Date.now()/1000);
      this.bangKiemAnToanPhauThuat.GIOI_TINH = this.patientInfo.GIOI_TINH.ID?this.patientInfo.GIOI_TINH.ID.toString():"1";
    }
    this.tabListLength = this.TABS_FOR_SITE[this.siteName].length;
    this.shareDataService.pushData(this.bangKiemAnToanPhauThuat, 'bang_kiem_an_toan_pt');
  }

  private getLabel(key: string) {
    return this.showForSitePipe.transform(key, this.siteName, this.showFields);
  }

  endCurrentStage(isSaveTemp ?: boolean) {
    // Check null
    if (this.tabGroup.selectedIndex === null) {
      return;
    }

    let errorAtGroup = '';
    let errorAtField = '';

    // TODO: Check form của các tab (từ tab đầu đến hiện tại) đã xong hay chưa
    (() => {
      for (let i = 0; i < this.tabGroup.selectedIndex + 1; i++) {
        const group = this.TABS_FOR_SITE[this.siteName][i];
        for (let j = 0; j < this.SCHEMAS[group].length; j++) {
          const field: any = this.SCHEMAS[group][j];

          let required = true;
          if (field.required?.[this.siteName] !== undefined) {
            required = field.required[this.siteName];
          } else if (field.required?.default !== undefined) {
            required = field.required.default;
          } else {
            required = field.required;
          }
          if (required === false) {
            continue;
          }
          if (field.hide_for_sites?.[this.siteName] === true ? true :
            // hide_for_sites does not mention siteName or is false
            (field.hide_for_sites?.[this.siteName] === false || field.hide_for_sites?.default === false)) {
            continue;
          }
          const value = (<any>this.bangKiemAnToanPhauThuat)[group][field.key?.[this.siteName] || field.key?.default || field.key];
          const label = field.label?.[this.siteName] || field.label?.default || field.label;
          const true_label = field.true_label?.[this.siteName] || field.true_label?.default || field.true_label;
          switch(field.type?.[this.siteName] || field.type?.default || field.type as TypeName) {
            case 'divider':
            case 'label':
            {
              break;
            }
            case 'datetime': {
              if (!value){
                errorAtGroup = group;
                errorAtField = "emr.time";
                return;
              }
              break;
            }
            case 'checkbox':
            case 'checkbox_with_text': {
              if (!value){
                errorAtGroup = group;
                errorAtField = label === ' ' ? true_label : label;
                return;
              }
              break;
            }
            case 'radio':
            case 'radio_with_text':
            case 'cbyt':
            {
              if (value === null){
                errorAtGroup = group;
                errorAtField = label;
                return;
              }
              break;
            }
            default: {
              if (!value) {
                errorAtGroup = group;
                errorAtField = label;
                return;
              }
            }
          }
        }
      }
    })();
    if (errorAtGroup || errorAtField) {
      this.toast.error(
        this.getLabel(errorAtField),
        this.getLabel(errorAtGroup),
      );
      return;
    }

    this.dialog.open<ConfirmActionComponent, {title: string, content: string, contentClass: string}>(ConfirmActionComponent, {
      data: {
        title: 'dialog.title.confirm',
        content: 'dialog.content.hoan_tat_giai_doan',
        contentClass: 'text-left'
      },
      panelClass: ['dialog-v3', 'confirm']
    }).afterClosed().subscribe((isConfirm: boolean) => {
      if (!isConfirm) {
        return;
      }
      // TODO: Hoàn tất giai đoạn
      if (!this.bangKiemAnToanPhauThuat.stages) {
        this.bangKiemAnToanPhauThuat.stages = [];
      }
      if (this.tabGroup.selectedIndex !== null) {
        this.bangKiemAnToanPhauThuat.stages[this.tabGroup.selectedIndex] = {
          is_done: true,
          updated_at: moment().unix(),
          updated_by: this.storage.getUserLogged().full_name
        };
      }

      
      // Lưu
      if(isSaveTemp){
        this.save.emit();
      }
      //todo: Nếu là bước cuối cùng thì lưu
      if(this.tabGroup.selectedIndex == this.tabListLength - 1){
        this.save.emit();
      } else {
        let index = this.tabGroup.selectedIndex != null ? this.tabGroup.selectedIndex + 1 : 0
        this.tabGroup.selectedIndex = index;
        this.tabGroup.animationDuration = 1500;
      }

    });
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
      res.results.forEach((cap1) => {
        cap1.data.forEach((cap2) => {
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

  comparePPTTT(p1: any, p2: any) {
    return p1.operate_no === p2.operate_no;
  }

  public loadDataFromSelectedPttt(value:any) {
    this.bangKiemAnToanPhauThuat.PHIEU_PHAU_THUAT_THU_THUAT = value;
    this.bangKiemAnToanPhauThuat.CHAN_DOAN = value.operate_info.operate_after_diagnosis ? value.operate_info.operate_after_diagnosis : "";
    this.bangKiemAnToanPhauThuat.EKIP_PHAU_THUAT = value.operate_staff[0].fullname ? value.operate_staff[0].fullname:"";
    if (value.operate_info.classify && value.operate_info.classify.operate_category_name) {
      this.bangKiemAnToanPhauThuat.PHAN_LOAI_PT = value.operate_info.classify.operate_category_name ? value.operate_info.classify.operate_category_name : "";
    }
    this.bangKiemAnToanPhauThuat.PHUONG_PHAP_VO_CAM = value.operate_info.operate_method.anesthetic_method_name ? value.operate_info.operate_method.anesthetic_method_name : "";
    this.bangKiemAnToanPhauThuat.PHUONG_PHAP_PHAU_THUAT = value.operate_info.recommendations[0].service_name ? value.operate_info.recommendations[0].service_name : "";
    this.bangKiemAnToanPhauThuat.CHE_DO_PHAU_THUAT = value.operate_info.operate_serfdom ? value.operate_info.operate_serfdom : "";
    this.bangKiemAnToanPhauThuat.TRUOC_NB_ROI_PHONG_PT.PHAU_THUAT_VIEN = value.operate_staff[0] ? value.operate_staff[0] : "";
  }

  cancelEndCurrentStage() {
    this.dialog.open<ConfirmActionComponent, {title: string, content: string, contentClass: string}>(ConfirmActionComponent, {
      data: {
        title: 'dialog.title.confirm',
        content: 'dialog.content.cancel_hoan_tat_giai_doan',
        contentClass: 'text-left'
      },
      panelClass: ['dialog-v3', 'confirm']
    }).afterClosed().subscribe((isConfirm: boolean) => {
      if (!isConfirm) {
        return;
      }
      // TODO: Bỏ hoàn tất giai đoạn
      if (!this.bangKiemAnToanPhauThuat.stages) {
        this.bangKiemAnToanPhauThuat.stages = [];
      }
      // Cancel stage i -> cancel all stages after i
      if (this.tabGroup.selectedIndex !== null) {
        for (let i = this.tabGroup.selectedIndex; i < this.bangKiemAnToanPhauThuat.stages.length; i++) {
          this.bangKiemAnToanPhauThuat.stages[i] = {
            is_done: false,
            updated_at: moment().unix(),
            updated_by: this.storage.getUserLogged().full_name
          };
        }
      }

      // Lưu
      this.save.emit();
    });
  }
}
