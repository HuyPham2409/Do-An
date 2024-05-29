import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { KhamBenhPhaco } from '../../../../model/emr/kham-benh/kham-benh-phaco';
import { ShareDataService } from '../../../../services/share-data.service';
import { BenhAnComponent } from '../../benh-an-emr/benh-an.component';
import { DM } from '../../../../model/Patient_EMR';
import { EmrPatientInfo } from '../../../../model/emr/patient/patient-info';

@Component({
  selector: 'app-kham-mat-phaco',
  templateUrl: './kham-mat-phaco.component.html',
  styleUrls: ['./kham-mat-phaco.component.scss'],
})
export class KhamMatPhacoComponent extends BenhAnComponent implements OnInit, OnChanges {
  khamBenhPhaco = new KhamBenhPhaco();

  resetDM = new DM();

  valueset_Co: DM = {
    ID: '1',
    MA: '1',
    MO_TA: 'Có',
  };

  valueset_Khong: DM = {
    ID: '2',
    MA: '2',
    MO_TA: 'Không',
  };

  list_QUAM_MI: DM[] = [
    {
      ID: '1',
      MA: '1',
      MO_TA: '1/3 trong',
    },
    {
      ID: '2',
      MA: '2',
      MO_TA: '1/3 giữa',
    },
    {
      ID: '3',
      MA: '3',
      MO_TA: '1/3 ngoài',
    },
    {
      ID: '4',
      MA: '4',
      MO_TA: 'Toàn bộ',
    },
  ];

  list_KHUYET_MI: DM[] = [
    {
      ID: '1',
      MA: '1',
      MO_TA: '1/3 trong',
    },
    {
      ID: '2',
      MA: '2',
      MO_TA: '1/3 giữa',
    },
    {
      ID: '3',
      MA: '3',
      MO_TA: '1/3 ngoài',
    },
  ];

  list_TUYEN_BO_MI: DM[] = [
    {
      ID: '1',
      MA: '1',
      MO_TA: 'Bình thường',
    },
    {
      ID: '2',
      MA: '2',
      MO_TA: 'Viêm tắc nhẹ',
    },
    {
      ID: '3',
      MA: '3',
      MO_TA: 'Viêm tắc vừa',
    },
    {
      ID: '4',
      MA: '4',
      MO_TA: 'Viêm tắc nặng',
    },
  ];

  list_MONG: DM[] = [
    {
      ID: '1',
      MA: '1',
      MO_TA: 'Bình thường',
    },
    {
      ID: '2',
      MA: '2',
      MO_TA: 'Mộng',
    },
  ];

  list_CUONG_TU: DM[] = [
    {
      ID: '1',
      MA: '1',
      MO_TA: 'Tỏa lan',
    },
    {
      ID: '2',
      MA: '2',
      MO_TA: 'Rìa',
    },
  ];

  list_CUONG_TU_2: DM[] = [
    {
      ID: '1',
      MA: '1',
      MO_TA: 'Ở KM nhãn cầu',
    },
    {
      ID: '2',
      MA: '2',
      MO_TA: 'Ở rìa',
    },
    {
      ID: '3',
      MA: '3',
      MO_TA: 'Toàn bộ',
    },
  ];

  list_CUNG_DO: DM[] = [
    {
      ID: '1',
      MA: '1',
      MO_TA: 'Bình thường',
    },
    {
      ID: '2',
      MA: '2',
      MO_TA: 'Cạn',
    },
    {
      ID: '3',
      MA: '3',
      MO_TA: 'Dính',
    },
  ];

  list_CHIEU_CAO_CAU_DINH: DM[] = [
    {
      ID: '1',
      MA: '1',
      MO_TA: 'Dính ở cùng đồ, chưa vào sụn',
    },
    {
      ID: '2',
      MA: '2',
      MO_TA: 'Dính ở cùng đồ, nhưng chưa hết chiều cao sụn',
    },
    {
      ID: '3',
      MA: '3',
      MO_TA: 'Dính hết chiều cao sụn mi',
    },
    {
      ID: '4',
      MA: '4',
      MO_TA: 'Dính cả bờ mi hoặc điểm lệ',
    },
  ];

  list_DO_RONG_CAU_DINH: DM[] = [
    {
      ID: '1',
      MA: '1',
      MO_TA: '≤ 1/3 chiều dài mi',
    },
    {
      ID: '2',
      MA: '2',
      MO_TA: '1/3 - 2/3 chiều dài mi',
    },
    {
      ID: '3',
      MA: '3',
      MO_TA: '≥ 2/3 chiều dài mi',
    },
  ];

  list_KICH_THUOC: DM[] = [
    {
      ID: '1',
      MA: '1',
      MO_TA: 'Bình thường',
    },
    {
      ID: '2',
      MA: '2',
      MO_TA: 'To',
    },
    {
      ID: '3',
      MA: '3',
      MO_TA: 'Nhỏ',
    },
  ];

  list_HINH_DANG: DM[] = [
    {
      ID: '1',
      MA: '1',
      MO_TA: 'Bình thường',
    },
    {
      ID: '2',
      MA: '2',
      MO_TA: 'Nón',
    },
    {
      ID: '3',
      MA: '3',
      MO_TA: 'Cầu',
    },
  ];

  list_PHU_BONG_BIEU_MO: DM[] = [
    {
      ID: '1',
      MA: '1',
      MO_TA: 'Nhẹ',
    },
    {
      ID: '2',
      MA: '2',
      MO_TA: 'Vừa',
    },
    {
      ID: '3',
      MA: '3',
      MO_TA: 'Nặng',
    },
  ];

  list_MAT_BIEU_MO: DM[] = [
    {
      ID: '1',
      MA: '1',
      MO_TA: '< 1/3 d.tích',
    },
    {
      ID: '2',
      MA: '2',
      MO_TA: '1/3-1/2 d.tích',
    },
    {
      ID: '3',
      MA: '3',
      MO_TA: '> 1.2 d.tích',
    },
  ];

  list_MAT_BIEU_MO_2: DM[] = [
    {
      ID: '1',
      MA: '1',
      MO_TA: 'Trung tâm',
    },
    {
      ID: '2',
      MA: '2',
      MO_TA: 'Lệch tâm',
    },
    {
      ID: '3',
      MA: '3',
      MO_TA: 'Sát rìa',
    },
  ];

  list_BO_TON_THUONG: DM[] = [
    {
      ID: '1',
      MA: '1',
      MO_TA: 'Nham nhở',
    },
    {
      ID: '2',
      MA: '2',
      MO_TA: 'Trơn nhẵn',
    },
    {
      ID: '3',
      MA: '3',
      MO_TA: 'Đào rãnh',
    },
  ];

  list_PHU: DM[] = [
    {
      ID: '1',
      MA: '1',
      MO_TA: 'Nhẹ',
    },
    {
      ID: '2',
      MA: '2',
      MO_TA: 'Vừa',
    },
    {
      ID: '3',
      MA: '3',
      MO_TA: 'Nặng',
    },
  ];

  list_THAM_LAU: DM[] = [
    {
      ID: '1',
      MA: '1',
      MO_TA: 'Nông',
    },
    {
      ID: '2',
      MA: '2',
      MO_TA: 'Sâu',
    },
    {
      ID: '3',
      MA: '3',
      MO_TA: 'Rất sâu',
    },
    {
      ID: '4',
      MA: '4',
      MO_TA: 'Khu trú',
    },
    {
      ID: '5',
      MA: '5',
      MO_TA: 'Lan tỏa',
    },
    {
      ID: '6',
      MA: '6',
      MO_TA: 'Nhiều ổ vệ tinh',
    },
  ];

  list_TIEU_MONG: DM[] = [
    {
      ID: '1',
      MA: '1',
      MO_TA: '< 1/2 ch dày',
    },
    {
      ID: '2',
      MA: '2',
      MO_TA: '> 1/2 ch dày',
    },
  ];

  list_TIEU_MONG_2: DM[] = [
    {
      ID: '1',
      MA: '1',
      MO_TA: 'Ở rìa',
    },
    {
      ID: '2',
      MA: '2',
      MO_TA: 'Lệch tâm',
    },
    {
      ID: '3',
      MA: '3',
      MO_TA: 'Ở trung tâm',
    },
  ];

  list_NEP_GAP: DM[] = [
    {
      ID: '1',
      MA: '1',
      MO_TA: 'Nhẹ',
    },
    {
      ID: '2',
      MA: '2',
      MO_TA: 'Vừa',
    },
    {
      ID: '3',
      MA: '3',
      MO_TA: 'Nặng',
    },
  ];

  list_NOI_MO_DESCEMET: DM[] = [
    {
      ID: '1',
      MA: '1',
      MO_TA: 'Tủa sắc tố mặt sau GM',
    },
    {
      ID: '2',
      MA: '2',
      MO_TA: 'Mủ mặt sau',
    },
    {
      ID: '3',
      MA: '3',
      MO_TA: 'Xuất tiết mặt sau',
    },
    {
      ID: '4',
      MA: '4',
      MO_TA: 'Guttata',
    },
    {
      ID: '5',
      MA: '5',
      MO_TA: 'Rạn màng Descemet',
    },
    {
      ID: '6',
      MA: '6',
      MO_TA: 'Cuộn Descemet',
    },
  ];

  list_TINH_TRANG: DM[] = [
    {
      ID: '1',
      MA: '1',
      MO_TA: 'Dọa thủng',
    },
    {
      ID: '2',
      MA: '2',
      MO_TA: 'Kẹt mống mắt',
    },
  ];

  list_THUNG_GIAC_MAC: DM[] = [
    {
      ID: '1',
      MA: '1',
      MO_TA: 'Trung tâm',
    },
    {
      ID: '2',
      MA: '2',
      MO_TA: 'Lệch tâm',
    },
    {
      ID: '3',
      MA: '3',
      MO_TA: 'Sát rìa',
    },
  ];

  list_LOAI_THUNG: DM[] = [
    {
      ID: '1',
      MA: '1',
      MO_TA: 'Thủng bít',
    },
    {
      ID: '2',
      MA: '2',
      MO_TA: 'Không bít',
    },
  ];

  list_CAM_GIAC_GIAC_MAC: DM[] = [
    {
      ID: '1',
      MA: '1',
      MO_TA: 'Mất',
    },
    {
      ID: '2',
      MA: '2',
      MO_TA: 'Giảm',
    },
    {
      ID: '3',
      MA: '3',
      MO_TA: 'Bình thường',
    },
  ];

  list_TAN_MACH: DM[] = [
    {
      ID: '1',
      MA: '1',
      MO_TA: 'Nông, hướng tâm',
    },
    {
      ID: '2',
      MA: '2',
      MO_TA: 'Ly tâm',
    },
    {
      ID: '3',
      MA: '3',
      MO_TA: 'Sâu',
    },
  ];

  list_MUC_DO: DM[] = [
    {
      ID: '1',
      MA: '1',
      MO_TA: '≤ 1/3 chu vi',
    },
    {
      ID: '2',
      MA: '2',
      MO_TA: '1/3-2/3 chu vi',
    },
    {
      ID: '3',
      MA: '3',
      MO_TA: '≥ 2/3 chu vi',
    },
  ];

  list_TINH_TRANG_VIEM: DM[] = [
    {
      ID: '1',
      MA: '1',
      MO_TA: 'Nốt',
    },
    {
      ID: '2',
      MA: '2',
      MO_TA: 'Lan tỏa',
    },
    {
      ID: '3',
      MA: '3',
      MO_TA: 'Áp xe',
    },
  ];

  list_DO_SAU_VIEM: DM[] = [
    {
      ID: '1',
      MA: '1',
      MO_TA: 'Nông',
    },
    {
      ID: '2',
      MA: '2',
      MO_TA: 'Sâu',
    },
  ];

  list_TINH_TRANG_CUNG_MAC: DM[] = [
    {
      ID: '1',
      MA: '1',
      MO_TA: 'Giãn lồi',
    },
    {
      ID: '2',
      MA: '2',
      MO_TA: 'Tiêu mỏng',
    },
    {
      ID: '3',
      MA: '3',
      MO_TA: 'Hoại tử',
    },
  ];

  list_TINH_TRANG_TIEN_PHONG: DM[] = [
    {
      ID: '1',
      MA: '1',
      MO_TA: 'Bình thường',
    },
    {
      ID: '2',
      MA: '2',
      MO_TA: 'Nông',
    },
    {
      ID: '3',
      MA: '3',
      MO_TA: 'Mất TP',
    },
    {
      ID: '3',
      MA: '3',
      MO_TA: 'Sâu',
    },
  ];

  list_TINH_TRANG_MONG_MAT: DM[] = [
    {
      ID: '1',
      MA: '1',
      MO_TA: 'Nâu xốp',
    },
    {
      ID: '2',
      MA: '2',
      MO_TA: 'Xơ teo',
    },
    {
      ID: '3',
      MA: '3',
      MO_TA: 'Cương tụ',
    },
    {
      ID: '4',
      MA: '4',
      MO_TA: 'Tân mạch',
    },
    {
      ID: '5',
      MA: '5',
      MO_TA: 'Phòi',
    },
    {
      ID: '6',
      MA: '6',
      MO_TA: 'Kẹt',
    },
    {
      ID: '7',
      MA: '7',
      MO_TA: 'Khuyết',
    },
  ];

  list_HINH_DANG_DONG_TU: DM[] = [
    {
      ID: '1',
      MA: '1',
      MO_TA: 'Tròn',
    },
    {
      ID: '2',
      MA: '2',
      MO_TA: 'Méo',
    },
  ];

  list_PHAN_XA_DONG_TU: DM[] = [
    {
      ID: '1',
      MA: '1',
      MO_TA: 'Tốt',
    },
    {
      ID: '2',
      MA: '2',
      MO_TA: 'Kém',
    },
    {
      ID: '3',
      MA: '3',
      MO_TA: 'Mất',
    },
  ];

  list_IOL: DM[] = [
    {
      ID: '1',
      MA: '1',
      MO_TA: 'Cân',
    },
    {
      ID: '2',
      MA: '2',
      MO_TA: 'Lệch',
    },
    {
      ID: '3',
      MA: '3',
      MO_TA: 'Trong TP',
    },
    {
      ID: '4',
      MA: '4',
      MO_TA: 'Trong HP',
    },
  ];

  list_ANH_DONG_TU: DM[] = [
    {
      ID: '1',
      MA: '1',
      MO_TA: 'Hồng',
    },
    {
      ID: '2',
      MA: '2',
      MO_TA: 'Xám',
    },
    {
      ID: '3',
      MA: '3',
      MO_TA: 'Không soi được',
    },
  ];

  list_TINH_TRANG_DICH_KINH: DM[] = [
    {
      ID: '1',
      MA: '1',
      MO_TA: 'Sạch',
    },
    {
      ID: '2',
      MA: '2',
      MO_TA: 'Đục',
    },
    {
      ID: '3',
      MA: '3',
      MO_TA: 'Xuất huyết',
    },
  ];

  list_TINH_TRANG_DIA_THI: DM[] = [
    {
      ID: '1',
      MA: '1',
      MO_TA: 'Không soi được',
    },
    {
      ID: '2',
      MA: '2',
      MO_TA: 'Bình thường',
    },
    {
      ID: '3',
      MA: '3',
      MO_TA: 'Lõm teo gai',
    },
    {
      ID: '4',
      MA: '4',
      MO_TA: 'Phù gai',
    },
    {
      ID: '5',
      MA: '5',
      MO_TA: 'Bạc màu gai thi',
    },
  ];

  constructor(private shareDataService: ShareDataService) {
    super();
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.patientInfo?.currentValue) {
      const patientInfo = changes.patientInfo.currentValue as EmrPatientInfo;

      if (patientInfo.results?.kbphaco) {
        // Load dữ liệu đã lưu
        this.khamBenhPhaco = patientInfo.results?.kbphaco;
      }
    }
    this.shareDataService.pushData(this.khamBenhPhaco, 'kbphaco');
  }

  reset_HINH_DANG_2(field: Record<string, any>) {
    field.HINH_DANG_2.PHU_BONG_BIEU_MO = new DM();
    field.HINH_DANG_2.MAT_BIEU_MO = new DM();
    field.HINH_DANG_2.MAT_BIEU_MO_2 = new DM();
    field.HINH_DANG_2.BO_TON_THUONG = new DM();
    field.HINH_DANG_2.TON_THUONG_DANG_CHAM =
      field.HINH_DANG_2.THOAI_HOA_DAI_BANG =
        field.HINH_DANG_2.LANG_DONG_THUOC = false;
    field.HINH_DANG_2.TON_THUONG_KHAC = '';
  }

  reset_NHU_MO(field: Record<string, any>) {
    field.NHU_MO.PHU = new DM();
    field.NHU_MO.THAM_LAU = new DM();
    field.NHU_MO.TIEU_MONG = new DM();
    field.NHU_MO.TIEU_MONG_2 = new DM();
    field.NHU_MO.TON_THUONG_KHAC = '';
  }

  reset_NOI_MO_DESCEMET(field: Record<string, any>) {
    field.NOI_MO_DESCEMET.NEP_GAP = new DM();
    field.NOI_MO_DESCEMET.TINH_TRANG = new DM();
    field.NOI_MO_DESCEMET.TON_THUONG_KHAC = '';
  }

  reset_CUNG_MAC(field: Record<string, any>) {
    field.TINH_TRANG_VIEM = new DM();
    field.DO_SAU_VIEM = new DM();
    field.VIEM_THUONG_CUNG_MAC = false;
    field.TINH_TRANG = new DM();
  }

  reset_TIEN_PHONG(field: Record<string, any>) {
    field.MU = 0;
    field.TYNDAL_POSITIVE = false;
    field.MANG_XUAT_TIET = false;
    field.MAU = 0;
    field.TON_THUONG_KHAC = '';
  }

  reset_THUY_TINH_THE(field: Record<string, any>) {
    field.DUC_BAO_SAU = false;
    field.LECH = false;
    field.TON_THUONG_KHAC = '';
  }
}
