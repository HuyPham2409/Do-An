import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmActionComponent } from '../../../components/confirm-action/confirm-action.component';
import { ToastrTranslateService } from '@shared/services/toastr-translate-service';
import { GiayToLienQuanComponent } from '../../benh-an-emr/giay-to-lien-quan.component';
import { ShareDataService } from '../../../../services/share-data.service';
import { DATE_FORMAT } from '@shared/services/format';
import { CommonService } from '../../../../services/common.service';
import { ServiceService } from '../../../../services/service.service';
import { GetServiceUsedResponseResults } from '../../../../model/service/response';
import { ReceptionService } from '../../../../services/reception.service';
import { LocalStorageService } from '@shared';

interface NoiDungBanGiao {
  id: number;
  isKhoa: any;
  isOt: boolean;
  value?: string;
}

class BangkiemCBVaBanGiaoNBTruocPT {
  PHIEU_PHAU_THUAT_THU_THUAT:any = {};
  PHIEU_CHUC_NANG_SONG:any = {};
  patient = {
    fullname : '',
    birthday : 0,
    tuoi: '',
    patient_id : 0,
    hinhThucMo: '',
    chanDoan: '',
    ngayPhauThuat: 0,
    loaiPhauThuat: 0,
    nhietDo: 0,
    mach: 0,
    nhipTho: 0,
    huyetAp: '',
    chieuCao: 0,
    canNang: 0,
    nhomMau: '',
    phongMo: '',
    luuY: '',
    us: '',
    hc: '',
    hst: '',
    test_ks: '',
    ngayGioBanGiao: 0,
    khoa_dieu_tri: '',
    hinh_thuc_mo: '',
    phong_mo_ct: '',
    ngay_gio_ban_giao: moment().unix() as number | null,
    luu_y: ''
  };
  dieu_duong_chuan_bi: any = {};
  dieu_duong_tiep_nhan_nguoi_benh: any = {};
  noi_dung_ban_giao:NoiDungBanGiao[] = []
}

@Component({
  selector: 'app-bang-kiem-chuan-bi-va-ban-giao-nguoi-benh',
  templateUrl: './bang-kiem-chuan-bi-va-ban-giao-nguoi-benh.component.html',
  styleUrls: ['./bang-kiem-chuan-bi-va-ban-giao-nguoi-benh.component.scss'],
})
export class BangKiemChuanBiVaBanGiaoNguoiBenhComponent extends GiayToLienQuanComponent implements OnInit, OnChanges {
  bang_kiem:BangkiemCBVaBanGiaoNBTruocPT = new BangkiemCBVaBanGiaoNBTruocPT();
  isShowThongSo = false;
  nd_ban_giao:any = [
    {
      id: 1,
      content: 'Hỏi kiểm tra thông tin người bệnh',
      isKhoa: 0,
      isOt: false
    },
    {
      id: 2,
      content: 'Kiểm tra vòng đeo tay',
      isKhoa: 0,
      isOt: false
    },
    {
      id: 3,
      content: 'Đã kiêm tra giấy đồng ý phẫu thuật thủ thuật điều trị và đúng',
      isKhoa: 0,
      isOt: false
    },
    {
      id: 4,
      content: 'Đã khám tiền mê và đã kí phiếu đồng ý gây mê, phiếu có trong hồ sơ bệnh án BBHC',
      isKhoa: 0,
      isOt: false
    },
    {
      id: 5,
      content: 'Đã hoàn thành bệnh án trước mô theo yêu cầu, có trong hồ sơ bệnh án',
      isKhoa: 0,
      isOt: false
    },
    {
      id: 6,
      content: 'Đã có kế hoạch chăm sóc trước mổ trong hồ sơ bệnh án',
      isKhoa: 0,
      isOt: false
    },
    {
      id: 7,
      content: 'Kết quả xét nghiệm đã được kiểm tra và có trong hồ sơ bệnh án',
      isKhoa: 0,
      isOt: false
    },
    {
      id: 8,
      content: 'Phim X-quang - siêu âm đã được kiểm tra và kết quả có trong hồ sơ bệnh án',
      isKhoa: 0,
      isOt: false
    },
    {
      id: 9,
      content: 'Người bệnh nhịn ăn từ',
      isKhoa: 0,
      isOt: false,
      value: ''
    },
    {
      id: 10,
      content: 'Thụt tháo sạch',
      isKhoa: 0,
      isOt: false,
      value: ''
    },
    {
      id: 11,
      content: 'Hướng dẫn NB tắm bằng xà phòng',
      isKhoa: 0,
      isOt: false,
    },
    {
      id: 12,
      content: 'Dị ứng',
      isKhoa: 0,
      isOt: false,
      value: ''
    },
    {
      id: 13,
      content: 'Đã đánh dấu vị trí môi /CT. Sát khuẩn và băng vùng mô (Đối với nha khoa, phim X-quang/sơ đồ răng đã được dánh dấu và đinh kèm)',
      isKhoa: 0,
      isOt: false,
    },
    {
      id: 14,
      content: 'Đã kiểm tra tình trạng nguyên vẹn da (mụn, nhọt, vết xây sát)',
      isKhoa: 0,
      isOt: false,
    },
    {
      id: 15,
      content: 'Tóc đã được gội sạch và làm gọn',
      isKhoa: 0,
      isOt: false,
    },
    {
      id: 16,
      content: 'Đã vệ sinh da cạo lông vùng can thiệp',
      isKhoa: 0,
      isOt: false,
    },
    {
      id: 17,
      content: 'Kiểm tra lại vệ sinh cá nhân, thay quần áo sạch',
      isKhoa: 0,
      isOt: false,
    },
    {
      id: 18,
      content: 'Người bệnh có thiết bị cấy ghép, thay thế như: khớp háng, khớp gối hoặc máy tạo nhịp tim trong cơ thể không?',
      isKhoa: 0,
      isOt: false,
    },
    {
      id: 19,
      content: 'Đã cắt ngắn và làm sạch móng tay, chân',
      isKhoa: 0,
      isOt: false,
    },
    {
      id: 20,
      content: 'Đã làm sạch son phấn-trang điểm',
      isKhoa: 0,
      isOt: false,
    },
    {
      id: 21,
      content: 'Cho người bệnh đi tiểu',
      isKhoa: 0,
      isOt: false,
    },
    {
      id: 22,
      content: 'Các đồ trang sức, phụ kiện: tóc giả, kẹp tóc, kính áp tròng, kính mắt, chân tay giả đã được tháo bỏ',
      isKhoa: 0,
      isOt: false,
    },
    {
      id: 23,
      content: 'Các hàm răng giả (cả hàm trên, cả hàm dưới) đã được tháo ra',
      isKhoa: 0,
      isOt: false,
    },
    {
      id: 24,
      content: 'Người bệnh có chụp răng (bọc răng)/ mất răng không? Nếu có ghi rõ số răng',
      isKhoa: 0,
      isOt: false,
      value: ''
    },
    {
      id: 25,
      content: 'Dùng thuốc tiền mê theo chỉ định',
      isKhoa: 0,
      isOt: false,
    },
    {
      id: 26,
      content: 'Người bệnh được đặt đường truyền tĩnh mạch',
      isKhoa: 0,
      isOt: false,
    },
    {
      id: 27,
      content: 'Khác/Others',
      isKhoa: 0,
      isOt: false,
      value: ''
    }
  ];
  listPttt:any = [];
  phieuQLNT:any = {};
  userLogged: any = {};
  constructor(private shareDataService: ShareDataService,
              private commonService: CommonService,
              private serviceService: ServiceService,
              private receptionService: ReceptionService,
              private localStorageService: LocalStorageService) {
    super();
  }

  ngOnInit() {
    this.userLogged = this.localStorageService.getUserLogged();
  }
  ngOnChanges(changes: SimpleChanges) {
    this.getInforInPatient();
    if (this.checkNonEmpty(this.selectGiayToLienQuan) &&  !this.selectGiayToLienQuan.DANH_SACH_GAC) {
      this.selectGiayToLienQuan.bang_kiem = new BangkiemCBVaBanGiaoNBTruocPT();
    }
    if (!this.isCreateGiayToLienQuan && this.checkNonEmpty(this.selectGiayToLienQuan)) {
      this.bang_kiem = this.selectGiayToLienQuan;
      Object.assign(this.nd_ban_giao, this.bang_kiem.noi_dung_ban_giao);
    }
    if (this.patientInfo) {
      this.bang_kiem.patient.fullname = this.patientInfo.HO_TEN;
      this.bang_kiem.patient.patient_id = this.patientInfo.patient_id;
      this.bang_kiem.patient.birthday = this.patientInfo.birthday;
      this.bang_kiem.patient.tuoi = this.commonService.calculatorAge(this.bang_kiem.patient.birthday, Math.floor(Date.now() / 1000));
    }
    this.loadDataToBangKiem();
    this.shareDataService.pushData(this.bang_kiem, 'bang_kiem_chuan_bi_va_ban_giao_nguoi_benh');
  }

  loadDataToBangKiem () {
    if (this.nd_ban_giao){
      Object.assign(this.bang_kiem.noi_dung_ban_giao, this.nd_ban_giao);
    }
  }

  public loadDataFromSelectedPttt(value:any) {
    if (Object.keys(value).length > 0) {
      this.bang_kiem.PHIEU_PHAU_THUAT_THU_THUAT = value;
      this.bang_kiem.patient.chanDoan = value.operate_info.operate_after_diagnosis ? value.operate_info.operate_after_diagnosis : "";
      this.bang_kiem.patient.hinh_thuc_mo = value.operate_info.operate_serfdom ? value.operate_info.operate_serfdom : "";
      this.bang_kiem.patient.khoa_dieu_tri = value.operate_info.room_name_to_do ? value.operate_info.room_name_to_do : "";
    }
  }

  public loadChucNangSong(value:any) {
    if (value) {
      this.bang_kiem.PHIEU_CHUC_NANG_SONG = value;
      this.bang_kiem.patient.mach = value.mach?value.mach:"";
      this.bang_kiem.patient.nhipTho = value.nhip_tho?value.nhip_tho:"";
      this.bang_kiem.patient.huyetAp = value.huyet_ap_tam_thu?value.huyet_ap_tam_thu + "/":""  + value.huyet_ap_tam_truong?value.huyet_ap_tam_truong:"" ;
      this.bang_kiem.patient.nhietDo = value.nhiet_do?value.nhiet_do:"";
      this.bang_kiem.patient.canNang = value.can_nang?value.can_nang:"";
      this.bang_kiem.patient.chieuCao = value.chieu_cao?value.chieu_cao:"";
    }
  }

  private getInforInPatient() {
    this.receptionService.getPatientOut(this.patientInfo.reception_queue_id).subscribe(data => {
      if (data.status == true && data.results) {
        this.phieuQLNT = data.results[0];
        this.bang_kiem.patient.chanDoan = this.phieuQLNT.examining_diagnosis ? this.phieuQLNT.examining_diagnosis : "";
        this.bang_kiem.patient.phong_mo_ct = this.phieuQLNT.in_patient_room_name ? this.phieuQLNT.in_patient_room_name : "";
        // this.patient.parent_id_in = data.results[0].parent_id_in;
        // this.patient.examining_by_fullname = data.results[0].examining_by_fullname;
      }
      // this.patientChange.emit(this.patient);
    });
    // this.isPatientListOpen = false;
  }

  /**
   *
   * @param type 1 is dieu_duong_chuan_bi | 2 is dieu_duong_tiep_nhan_nguoi_benh
   */
  changeUserLogged(type: 1 | 2) {
    if (type === 1) {
      this.bang_kiem.dieu_duong_chuan_bi = {
        full_name: this.userLogged.full_name,
        user_signature_image: this.userLogged.user_signature_image,
        user_name: this.userLogged.user_name
      }
    } else {
      this.bang_kiem.dieu_duong_tiep_nhan_nguoi_benh = {
        full_name: this.userLogged.full_name,
        user_signature_image: this.userLogged.user_signature_image,
        user_name: this.userLogged.user_name
      }
    }
  }
}
