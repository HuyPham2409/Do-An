import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { GiayToLienQuanComponent } from '../../benh-an-emr/giay-to-lien-quan.component';
import { ReceptionService } from '../../../../services/reception.service';
import { ShareDataService } from '../../../../services/share-data.service';
import { DM } from '../../../../model/Patient_EMR';
import { CanBoYTe } from '../../../../model/emr/quan_ly_nguoi_benh';
import { Moment } from 'moment';
import * as moment from 'moment';
import { DateTime } from '../../../../model/emr/global';

export class PNDNBVV {
  SO_GIUONG = '';
  LY_DO_NHAP_VIEN = '';
  THOI_GIAN_VAO_VIEN_MOMENT: Moment | null = moment();
  THOI_GIAN_VAO_VIEN = new DateTime();
  GIAY_GIOI_THIEU = new DM();
  BHYT = new DM();
  SO_Y_BA = new DM();
  GIAY_BAN_GIAO_NGUOI_BENH: boolean = false;
  GIAY_TO_KHAC: boolean = false;
  TIEN_SU_GIA_DINH = '';
  TIEN_SU_CUA_NGUOI_BENH = '';
  DTD = '';
  NMCT = '';
  COPD = '';
  SUY_THAN = '';
  THA = '';
  HEN_PQ = '';
  LAO = '';
  GAN = '';
  BENH_KHAC = '';
  NB_TUAN_THU_DIEU_TRI = new DM();
  DI_CHUNG = new DM();
  TIEN_SU_DI_UNG = new DM();
  THUOC: boolean = false;
  THUC_AN: boolean = false;
  KHAC: boolean = false;
  YEU_TO_DICH_TE_LIEN_QUAN_DEN_BENH = new DM();
  Y_THUC = new DM();
  GLASGOW = '';
  M = '';
  T = '';
  HA = '';
  NHIP_THO = '';
  SPO2 = '';
  DA = new DM();
  NIEM_MAC = new DM();
  PHU = new DM();
  TEXT_DA = '';
  THO = new DM();
  HO = new DM();
  DOM = new DM();
  TEXT_HO_HAP = '';
  TIEU_HOA = new DM();
  SONDE_DA_DAY = new DM();
  TIEU_TIEN = new DM();
  CAU_BANG_QUANG = new DM();
  DA_CO_SONDE_TIEU = new DM();
  DAI_TIEN = '';
  TEXT_KHAC = '';
  DANH_GIA_DAU = new DM();
  TEXT_DAU = '';
  VI_TRI_DAU = '';
  TINH_CHAT_DAU = new DM();
  TEXT_TINH_CHAT_DAU = '';
  NHAN_DINH_KHAC = '';
  LOET = new DM();
  NGUY_CO_LOET = new DM();
  DIEM_DANH_GIA_LOET = 0;
  NGUY_CO_TE_NGA = new DM();
  DIEM_DANH_GIA_NGUY_CO_TE_NGA = 0;
  DIEU_DUONG_THUC_HIEN = new CanBoYTe();
  BTDNDCB: BTDNDCB = new BTDNDCB();
}
export class BTDNDCB {
  Y_THUC = new DM();
  GLASGOW = '';
  MAT = new DM();
  LOI_NOI = new DM();
  VAN_DONG = new DM();
  LOET = new DM();
  NGUY_CO_LOET = new DM();
  DIEM_DANH_GIA_LOET = '';
  CAM_GIAC_VAN_DONG = new DM();
  DO_AM_DA = new DM();
  MUC_DO_HOAT_DONG = new DM();
  DINH_DUONG = new DM();
  NGUY_CO_TE_NGA = new DM();
  DIEM_DANH_GIA_NGUY_CO_TE_NGA = '';
  TUOI = new DM();
  BAI_TIET = new DM();
  DUNG_THUOC = new DM();
  DI_CHUYEN_DI_LAI = new DM();
  TIEN_SU = new DM();
  NB_CO_CAN_THIEP = new DM();
  TINH_TRANG_THE_LUC = new DM();
  TINH_TRANG_TAM_THAN = new DM();
}
@Component({
  selector: 'app-phieu-nhan-dinh-nguoi-benh-vao-vien',
  templateUrl: './phieu-nhan-dinh-nguoi-benh-vao-vien.component.html',
  styleUrls: ['./phieu-nhan-dinh-nguoi-benh-vao-vien.component.scss']
})
export class PhieuNhanDinhNguoiBenhVaoVienComponent extends GiayToLienQuanComponent implements OnInit, OnChanges {
  phieuNhanDinhNguoiBenhVaoVien: PNDNBVV = new PNDNBVV();
  bangThangDiemNhanDinhCoBan: BTDNDCB = new BTDNDCB();
  //Tạo 1 mảng đổi tượng, trong đó id là id mảng và giá trị là các phần sẽ tính điểm trong mảng đó.
  sumByGroup = [{id: 1, value: ["MAT", "LOI_NOI", "VAN_DONG"]}];
  sumByGroup2 = [{id: 2, value: ["CAM_GIAC_VAN_DONG", "DO_AM_DA", "MUC_DO_HOAT_DONG", "DINH_DUONG"]}];
  sumByGroup3 = [{id: 3, value: ["TUOI", "BAI_TIET", "DUNG_THUOC", "DI_CHUYEN_DI_LAI","TIEN_SU", "NB_CO_CAN_THIEP", "TINH_TRANG_THE_LUC", "TINH_TRANG_TAM_THAN"]}, {id: 2, value: []}];
  constructor(private receptionService: ReceptionService,
              private shareDataService: ShareDataService) {
    super();
  }

  listGGT = [
    {
      ID: "1",
      MA: "1",
      MO_TA: "Có"
    },
    {
      ID: "2",
      MA: "2",
      MO_TA: "Không"
    }
  ]
  listDau = [
    {
      ID: "1",
      MA: "1",
      MO_TA: "Không"
    },
    {
      ID: "2",
      MA: "2",
      MO_TA: "Đau nhẹ"
    },
    {
      ID: "3",
      MA: "3",
      MO_TA: "Đau vừa"
    },
    {
      ID: "4",
      MA: "4",
      MO_TA: "Rất đau"
    }
  ]
  listAge = [
    {
      ID: "1",
      MA: "1",
      MO_TA: "1. 60-69"
    },
    {
      ID: "2",
      MA: "2",
      MO_TA: "2. 70-79"
    },
    {
      ID: "3",
      MA: "3",
      MO_TA: "3. 80 trở lên"
    }
  ]
  listBaiTiet = [
    {
      ID: "2",
      MA: "2",
      MO_TA: "2. Không kiểm soát"
    },
    {
      ID: "3",
      MA: "3",
      MO_TA: "3. Tiểu vội/ nhiều lần"
    },
    {
      ID: "4",
      MA: "4",
      MO_TA: "4. Tiểu vội nhiều lần và không kiểm soát"
    }
  ]
  listDungThuoc = [
    {
      ID: "4",
      MA: "4",
      MO_TA: "4. 1 loại"
    },
    {
      ID: "5",
      MA: "5",
      MO_TA: "5. 2 loại trở lên"
    },
    {
      ID: "6",
      MA: "6",
      MO_TA: "6. Sử dụng thuốc an thần trong vòng 24 giờ"
    }
  ]
  listDiChuyen = [
    {
      ID: "4",
      MA: "4",
      MO_TA: "4. Dựa vào đồ đạc/tường"
    },
    {
      ID: "3",
      MA: "3",
      MO_TA: "3. Sử dụng thiết bị trợ giúp"
    },
    {
      ID: "2",
      MA: "2",
      MO_TA: "2. Giảm thị lực/thính lực"
    }
  ]
  listTienSu = [
    {
      ID: "6",
      MA: "6",
      MO_TA: "6. Ngã từ 1 lần trở lên trong vòng 6 tháng"
    }
  ]
  listNBCoCanThiep = [
    {
      ID: "1",
      MA: "1",
      MO_TA: "1. Có 1"
    },
    {
      ID: "2",
      MA: "2",
      MO_TA: "2. Có 2"
    },
    {
      ID: "3",
      MA: "3",
      MO_TA: "3. Có >=3"
    }
  ]
  listTinhTrangTheLuc= [
    {
      ID: "2",
      MA: "2",
      MO_TA: "2. Có chóng mặt/hoặc động kinh"
    }
  ]
  listTinhTrangTamThan= [
    {
      ID: "1",
      MA: "1",
      MO_TA: "1. Thay đổi nhận thức về môi trường vật xung quanh"
    },
    {
      ID: "2",
      MA: "2",
      MO_TA: "2. Bốc đồng"
    },
    {
      ID: "3",
      MA: "3",
      MO_TA: "3. Thiếu kiến thức những giới hạn vật lý và nhận thức"
    }
  ]
  listCanThiep = [
    {
      ID: "1",
      MA: "1",
      MO_TA: "2. Không kiểm soát"
    },
    {
      ID: "2",
      MA: "2",
      MO_TA: "3. Tiểu vội/ nhiều lần"
    },
    {
      ID: "3",
      MA: "3",
      MO_TA: "4. Tiểu vội nhiều lần và không kiểm soát"
    }
  ]
  listCamGiacVanDong = [
    {
      ID: "2",
      MA: "2",
      MO_TA: "2. Bình thường"
    },
    {
      ID: "3",
      MA: "3",
      MO_TA: "3. Giảm nhẹ"
    },
    {
      ID: "3",
      MA: "4",
      MO_TA: "3. Giảm nhiều"
    },
    {
      ID: "1",
      MA: "1",
      MO_TA: "1. Mất cảm giác vận động"
    }
  ]
  listMat = [
    {
      ID: "4",
      MA: "4",
      MO_TA: "4. Mở mắt tự nhiên"
    },
    {
      ID: "3",
      MA: "3",
      MO_TA: "3. Mở mắt khi gọi"
    },
    {
      ID: "2",
      MA: "2",
      MO_TA: "2. Mở mắt khi gây đau"
    },
    {
      ID: "1",
      MA: "1",
      MO_TA: "1. Không mở mắt"
    }
  ]
  listLoiNoi = [
    {
      ID: "5",
      MA: "5",
      MO_TA: "5. Trả lời đúng"
    },
    {
      ID: "4",
      MA: "4",
      MO_TA: "4. Trả lời hạn chế"
    },
    {
      ID: "3",
      MA: "3",
      MO_TA: "3. Trả lời lộn xộn"
    },
    {
      ID: "2",
      MA: "2",
      MO_TA: "2. Không rõ nói gì"
    },
    {
      ID: "1",
      MA: "1",
      MO_TA: "1. Không nói"
    }
  ]
  listVanDong = [
    {
      ID: "6",
      MA: "6",
      MO_TA: "6. Làm đúng theo lệnh"
    },
    {
      ID: "5",
      MA: "5",
      MO_TA: "5. Gạt khi kích thích đau"
    },
    {
      ID: "4",
      MA: "4",
      MO_TA: "4. Co chi, cử động không tự chủ"
    },
    {
      ID: "3",
      MA: "3",
      MO_TA: "3. Co cứng mất vỏ (chi trên gập cứng)"
    },
    {
      ID: "2",
      MA: "2",
      MO_TA: "2. Duỗi cứng mất não (tứ chi duỗi thẳng)"
    },
    {
      ID: "1",
      MA: "1",
      MO_TA: "1. Không đáp ứng"
    }
  ]
  listDoAmDa = [
    {
      ID: "4",
      MA: "4",
      MO_TA: "4. Khô, sạch"
    },
    {
      ID: "3",
      MA: "3",
      MO_TA: "3. Ẩm ướt ít"
    },
    {
      ID: "2",
      MA: "2",
      MO_TA: "2. Ẩm ướt nhiều"
    },
    {
      ID: "1",
      MA: "1",
      MO_TA: "1. Ẩm ướt liên tục"
    }
  ]
  listMucDoHoatDong = [
    {
      ID: "4",
      MA: "4",
      MO_TA: "4. Bình thường"
    },
    {
      ID: "3",
      MA: "3",
      MO_TA: "3. Hạn chế"
    },
    {
      ID: "2",
      MA: "2",
      MO_TA: "2. Ngồi hạn chế"
    },
    {
      ID: "1",
      MA: "1",
      MO_TA: "1. Nằm tại giường"
    }
  ]
  listDinhDuong = [
    {
      ID: "4",
      MA: "4",
      MO_TA: "4. Tốt"
    },
    {
      ID: "3",
      MA: "3",
      MO_TA: "3. Vừa đủ"
    },
    {
      ID: "2",
      MA: "2",
      MO_TA: "2. Thiếu"
    },
    {
      ID: "1",
      MA: "1",
      MO_TA: "1. Kém"
    }
  ]
  listTinhChatDau = [
    {
      ID: "1",
      MA: "1",
      MO_TA: "Nhói"
    },
    {
      ID: "2",
      MA: "2",
      MO_TA: "Đau âm ỉ"
    },
    {
      ID: "3",
      MA: "3",
      MO_TA: "Nóng rát"
    },
    {
      ID: "4",
      MA: "4",
      MO_TA: "Như dao đâm"
    }
  ]
  listDa = [
    {
      ID: "1",
      MA: "1",
      MO_TA: "Bình thường"
    },
    {
      ID: "2",
      MA: "2",
      MO_TA: "Bất thường"
    }
  ]
  listAnUong = [
    {
      ID: "1",
      MA: "1",
      MO_TA: "Bình thường"
    },
    {
      ID: "2",
      MA: "2",
      MO_TA: "Nuốt sặc"
    }
  ]
  listSondeDaDay = [
    {
      ID: "1",
      MA: "1",
      MO_TA: "Tắc"
    },
    {
      ID: "2",
      MA: "2",
      MO_TA: "Thông"
    }
  ]
  listTieuTien = [
    {
      ID: "1",
      MA: "1",
      MO_TA: "Tự chủ"
    },
    {
      ID: "2",
      MA: "2",
      MO_TA: "Không tự chủ"
    },
    {
      ID: "3",
      MA: "3",
      MO_TA: "Bí đái"
    }
  ]
  listNiemMac = [
    {
      ID: "1",
      MA: "1",
      MO_TA: "Hồng"
    },
    {
      ID: "2",
      MA: "2",
      MO_TA: "Nhợt"
    }
  ]
  listTho = [
    {
      ID: "1",
      MA: "1",
      MO_TA: "Bình thường"
    },
    {
      ID: "2",
      MA: "2",
      MO_TA: "Cần hỗ trợ"
    }
  ]
  listYThuc = [
    {
      ID: "1",
      MA: "1",
      MO_TA: "Tỉnh"
    },
    {
      ID: "2",
      MA: "2",
      MO_TA: "Vật vã"
    },
    {
      ID: "3",
      MA: "3",
      MO_TA: "Kích thích"
    },
    {
      ID: "4",
      MA: "4",
      MO_TA: "Lơ mơ"
    },
    {
      ID: "5",
      MA: "5",
      MO_TA: "Hôn mê"
    }
  ];
  ngOnInit(): void {
    this.convert();
  }
  ngOnChanges(changes: SimpleChanges) {
    if (!this.isCreateGiayToLienQuan && this.checkNonEmpty(this.selectGiayToLienQuan)) {
      this.phieuNhanDinhNguoiBenhVaoVien = this.selectGiayToLienQuan
    }
    if (this.isCreateGiayToLienQuan || !this.phieuNhanDinhNguoiBenhVaoVien) {
      this.phieuNhanDinhNguoiBenhVaoVien = new PNDNBVV();
      if (this.patientInfo) {
        this.convert();
      }
    }
    this.shareDataService.pushData(this.phieuNhanDinhNguoiBenhVaoVien, 'phieu_nhan_dinh_nguoi_benh_vao_vien');
  }
  convert(){
    this.phieuNhanDinhNguoiBenhVaoVien.SO_GIUONG = this.patientInfo.in_patient_bed_name
    this.phieuNhanDinhNguoiBenhVaoVien.THOI_GIAN_VAO_VIEN = this.patientInfo.date_start_parent_in
  }
  reset(title: string) {
    if (title === 'TIEN_SU_DI_UNG') {
      if(this.phieuNhanDinhNguoiBenhVaoVien.TIEN_SU_DI_UNG.ID === "2"){
        this.phieuNhanDinhNguoiBenhVaoVien.THUOC = false;
        this.phieuNhanDinhNguoiBenhVaoVien.THUC_AN = false;
        this.phieuNhanDinhNguoiBenhVaoVien.KHAC = false;
      }
    }
  }

  calculate(id: number){
    let total: number | undefined = 0 ;
    const tmp = this.sumByGroup.find(
      (group) => group.id == id
    )
    setTimeout(() => {
      if (Array.isArray(tmp?.value)) {
        total = tmp?.value.reduce((acc, value) => {
          // @ts-ignore
          if (this.phieuNhanDinhNguoiBenhVaoVien.BTDNDCB[value]) {
            // @ts-ignore
            return acc + this.phieuNhanDinhNguoiBenhVaoVien.BTDNDCB[value].ID * 1;
          }
          return acc;
        }, 0);
        // @ts-ignore
        this.phieuNhanDinhNguoiBenhVaoVien.BTDNDCB.GLASGOW = total;
      }
    }, 200);
  }
  calculate2(id:number) {
    let total2: number | undefined = 0 ;
    const tmp2 = this.sumByGroup2.find(
      (group) => group.id == id
    )
    setTimeout(() => {
      if (Array.isArray(tmp2?.value)) {
        total2 = tmp2?.value.reduce((acc, value) => {
          // @ts-ignore
          if (this.phieuNhanDinhNguoiBenhVaoVien.BTDNDCB[value]) {
            // @ts-ignore
            return acc + this.phieuNhanDinhNguoiBenhVaoVien.BTDNDCB[value].ID * 1;
          }
          return acc;
        }, 0);
        // @ts-ignore
        this.phieuNhanDinhNguoiBenhVaoVien.BTDNDCB.DIEM_DANH_GIA_LOET = total2;
      }
    }, 200);
  }
  calculate3(id:number) {
    let total3: number | undefined = 0 ;
    const tmp3 = this.sumByGroup3.find(
      (group) => group.id == id
    )
    setTimeout(() => {
      if (Array.isArray(tmp3?.value)) {
        total3 = tmp3?.value.reduce((acc, value) => {
          // @ts-ignore
          if (this.phieuNhanDinhNguoiBenhVaoVien.BTDNDCB[value]) {
            // @ts-ignore
            return acc + this.phieuNhanDinhNguoiBenhVaoVien.BTDNDCB[value].ID * 1;
          }
          return acc;
        }, 0);
        // @ts-ignore
        this.phieuNhanDinhNguoiBenhVaoVien.BTDNDCB.DIEM_DANH_GIA_NGUY_CO_TE_NGA = total3;
      }
    }, 200);
  }
}
