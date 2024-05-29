import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { KhamMat } from '../../../../model/emr/kham_mat';
import { ShowFieldByComponentConfig } from '../../../../model/emr/config/show-field-by-component-config';
import { EmrService } from '../../../../services/emr.service';
import { ShareDataService } from '../../../../services/share-data.service';
import { DB } from '../../../../model/emr/benh_an_san_phu_khoa';
import { DM } from '../../../../model/Patient_EMR';
import { EmrPatientInfo } from '../../../../model/emr/patient/patient-info';

@Component({
  selector: 'app-kham-mat',
  templateUrl: './kham-mat.component.html',
  styleUrls: ['./kham-mat.component.scss']
})
export class KhamMatComponent implements OnInit {
  @Input() patientInfo: any;
  @Input() ID_BENH_AN: any;
  @Input() ketquakb: any;
  showField: ShowFieldByComponentConfig = {};
  khammat: KhamMat = new KhamMat();
  listMiMat = [
    {
      ID: "1",
      MA: "1",
      MO_TA: "Bình thường"
    },
    {
      ID: "2",
      MA: "2",
      MO_TA: "Phù nề"
    },
    {
      ID: "3",
      MA: "3",
      MO_TA: "Phản ứng thể mi"
    }
  ];
  listKetMac = [
    {
      ID: "1",
      MA: "1",
      MO_TA: "Bình thường"
    },
    {
      ID: "2",
      MA: "2",
      MO_TA: "Phản ứng thể mi"
    },
    {
      ID: "3",
      MA: "3",
      MO_TA: "Cương tụ sâu"
    }
  ];
  listGiacMac = [
    {
      ID: "1",
      MA: "1",
      MO_TA: "- Trong"
    },
    {
      ID: "2",
      MA: "2",
      MO_TA: "Sẹo"
    },
    {
      ID: "3",
      MA: "3",
      MO_TA: "Phù"
    }
  ];
  listTuaGiacMac = [
    {
      ID: "1",
      MA: "1",
      MO_TA: "Tủa mới"
    },
    {
      ID: "2",
      MA: "2",
      MO_TA: "Tủa mỡ cừu"
    },
    {
      ID: "3",
      MA: "3",
      MO_TA: "Tủa sắc tố"
    },
    {
      ID: "4",
      MA: "4",
      MO_TA: "Tủa cũ"
    }
  ];
  listCungMac = [
    {
      ID: "1",
      MA: "1",
      MO_TA: "Bình thường"
    },
    {
      ID: "2",
      MA: "2",
      MO_TA: "Sẹo CM"
    }
  ];
  listTienPhong = [
    {
      ID: "1",
      MA: "1",
      MO_TA: "Sâu sạch"
    },
    {
      ID: "2",
      MA: "2",
      MO_TA: "Xẹp tiền phòng"
    }
  ];
  listGocTienPhong = [
    {
      ID: "1",
      MA: "1",
      MO_TA: "Dính"
    },
    {
      ID: "2",
      MA: "2",
      MO_TA: "Sắc tố"
    },
    {
      ID: "3",
      MA: "3",
      MO_TA: "Tân mạch"
    }
  ];
  listMongMat = [
    {
      ID: "1",
      MA: "1",
      MO_TA: "Bình thường"
    },
    {
      ID: "2",
      MA: "2",
      MO_TA: "Thoái hóa"
    }
  ];
  listMat = [
    {
      ID: "1",
      MA: "1",
      MO_TA: "Tròn"
    },
    {
      ID: "2",
      MA: "2",
      MO_TA: "Méo"
    },
    {
      ID: "3",
      MA: "3",
      MO_TA: "Dính"
    }
  ];
  listPXDT = [
    {
      ID: "1",
      MA: "1",
      MO_TA: "Có"
    },
    {
      ID: "2",
      MA: "2",
      MO_TA: "Không"
    },
    {
      ID: "3",
      MA: "3",
      MO_TA: "Giãn liệt"
    }
  ];
  listTheThuyTinh = [
    {
      ID: "1",
      MA: "1",
      MO_TA: "Trong"
    },
    {
      ID: "2",
      MA: "2",
      MO_TA: "Đục"
    },
    {
      ID: "3",
      MA: "3",
      MO_TA: "Đục vỡ thủy tinh thể"
    },
    {
      ID: "4",
      MA: "4",
      MO_TA: "Sa lệch"
    },
    {
      ID: "5",
      MA: "5",
      MO_TA: "Ra tiền phòng"
    },
    {
      ID: "6",
      MA: "6",
      MO_TA: "Vào buồng dịch kính"
    },
    {
      ID: "7",
      MA: "7",
      MO_TA: "Viêm mủ"
    },
    {
      ID: "8",
      MA: "8",
      MO_TA: "Dính sắc tố mặt trước thể thủy tinh"
    }
  ];
  listDichKinh = [
    {
      ID: "1",
      MA: "1",
      MO_TA: "Sạch"
    },
    {
      ID: "2",
      MA: "2",
      MO_TA: "Tyndall"
    }
  ];
  listDichKinh2 = [
    {
      ID: "1",
      MA: "1",
      MO_TA: "Xuất huyết"
    },
    {
      ID: "2",
      MA: "2",
      MO_TA: "Tổ chức hóa"
    },
    {
      ID: "3",
      MA: "3",
      MO_TA: "Bong dịch kính sau"
    }
  ];
  listTanMachHacMac = [
    {
      ID: "1",
      MA: "1",
      MO_TA: "dưới HĐ"
    },
    {
      ID: "2",
      MA: "2",
      MO_TA: "Ngoài HĐ"
    },
  ];
  listDiaThi = [
    {
      ID: "1",
      MA: "1",
      MO_TA: "Bình thường"
    },
    {
      ID: "2",
      MA: "2",
      MO_TA: "Phù"
    },
    {
      ID: "3",
      MA: "3",
      MO_TA: "Teo"
    },
    {
      ID: "4",
      MA: "4",
      MO_TA: "Bạc màu"
    },
  ];
  listTanMach = [
    {
      ID: "1",
      MA: "1",
      MO_TA: "< 1/4 gai"
    },
    {
      ID: "2",
      MA: "2",
      MO_TA: "1/4 -1/2 gai"
    },
    {
      ID: "3",
      MA: "3",
      MO_TA: "> 1/2 gai"
    }
  ];
  listHoangDiem1 = [
    {
      ID: "1",
      MA: "1",
      MO_TA: "Bình thường"
    },
    {
      ID: "2",
      MA: "2",
      MO_TA: "Mất ánh HĐ"
    }
  ];
  listPhu = [
    {
      ID: "1",
      MA: "1",
      MO_TA: "Khu trú"
    },
    {
      ID: "2",
      MA: "2",
      MO_TA: "Tỏa lan"
    }
  ];
  listLo = [
    {
      ID: "1",
      MA: "1",
      MO_TA: "lỗ lớp"
    },
    {
      ID: "2",
      MA: "2",
      MO_TA: "giả lỗ"
    }
  ];
  listSeoHD = [
    {
      ID: "1",
      MA: "1",
      MO_TA: "có"
    },
    {
      ID: "2",
      MA: "2",
      MO_TA: "không"
    }
  ];
  listThoaiHoaVM = [
    {
      ID: "1",
      MA: "1",
      MO_TA: "chu biên"
    },
    {
      ID: "2",
      MA: "2",
      MO_TA: "trung tâm"
    }
  ];
  listXuatHuyet = [
    {
      ID: "1",
      MA: "1",
      MO_TA: "VM nông"
    },
    {
      ID: "2",
      MA: "2",
      MO_TA: "VM sâu"
    },
    {
      ID: "3",
      MA: "3",
      MO_TA: "Hắc mạc"
    }
  ];
  listXuatTiet = [
    {
      ID: "1",
      MA: "1",
      MO_TA: "Cứng"
    },
    {
      ID: "2",
      MA: "2",
      MO_TA: "Dạng bông"
    }
  ];
  listOViemHacMac = [
    {
      ID: "1",
      MA: "1",
      MO_TA: "Hoạt tính"
    },
    {
      ID: "2",
      MA: "2",
      MO_TA: "Sẹo"
    }
  ];
  listHocMat = [
    {
      ID: "1",
      MA: "1",
      MO_TA: "Bình thường"
    },
    {
      ID: "2",
      MA: "2",
      MO_TA: "Bệnh lý"
    }
  ];
  listVanNhan = [
    {
      ID: "1",
      MA: "1",
      MO_TA: "Bình thường"
    },
    {
      ID: "2",
      MA: "2",
      MO_TA: "Bệnh lý"
    }
  ];
  listVanNhanNoiTaiMP = [
    {
      ID: "1",
      MA: "1",
      MO_TA: "MP Bình thường"
    },
    {
      ID: "2",
      MA: "2",
      MO_TA: "Bệnh lý"
    }
  ];
  listVanNhanNoiTaiMT = [
    {
      ID: "1",
      MA: "1",
      MO_TA: "MT Bình thường"
    },
    {
      ID: "2",
      MA: "2",
      MO_TA: "Bệnh lý"
    }
  ];
  listRungGiatNhanCau = [
    {
      ID: "1",
      MA: "1",
      MO_TA: "Không"
    },
    {
      ID: "2",
      MA: "2",
      MO_TA: "Có"
    }
  ];
  listGocHam = [
    {
      ID: "1",
      MA: "1",
      MO_TA: "Không"
    },
    {
      ID: "2",
      MA: "2",
      MO_TA: "Có"
    }
  ];
  listThuNghiemCheMat = [
    {
      ID: "1",
      MA: "1",
      MO_TA: "Trả trong ra"
    },
    {
      ID: "2",
      MA: "2",
      MO_TA: "Trả ngoài vào"
    },
    {
      ID: "3",
      MA: "3",
      MO_TA: "Trả chéo"
    }
  ];
  listTinhTrangThiGiac = [
    {
      ID: "1",
      MA: "1",
      MO_TA: "Đồng thị"
    },
    {
      ID: "2",
      MA: "2",
      MO_TA: "Hợp thị"
    },
    {
      ID: "3",
      MA: "3",
      MO_TA: "Phù thị"
    }
  ];
  listTuongUngVongMac = [
    {
      ID: "1",
      MA: "1",
      MO_TA: "Bình thường"
    },
    {
      ID: "2",
      MA: "2",
      MO_TA: "Bất bình thường"
    }
  ];
  listSongThi = [
    {
      ID: "1",
      MA: "1",
      MO_TA: "Không"
    },
    {
      ID: "2",
      MA: "2",
      MO_TA: "Có"
    }
  ];
  listTuTheBuTru = [
    {
      ID: "1",
      MA: "1",
      MO_TA: "Không"
    },
    {
      ID: "2",
      MA: "2",
      MO_TA: "Có"
    }
  ];
  listMiMat2 = [
    {
      ID: "1",
      MA: "1",
      MO_TA: "Bình thường"
    },
    {
      ID: "2",
      MA: "2",
      MO_TA: "Bệnh lý"
    }
  ];
  listMucDoSupMi = [
    {
      ID: "1",
      MA: "1",
      MO_TA: "Độ 1"
    },
    {
      ID: "2",
      MA: "2",
      MO_TA: "Độ 2"
    },
    {
      ID: "3",
      MA: "3",
      MO_TA: "Độ 3"
    }
  ];
  listEpicanthus = [
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
  ];
  listChucNangCoNangMi = [
    {
      ID: "1",
      MA: "1",
      MO_TA: "Tốt"
    },
    {
      ID: "2",
      MA: "2",
      MO_TA: "Trung bình"
    },
    {
      ID: "3",
      MA: "3",
      MO_TA: "Kém"
    }
  ];
  listMarcusGunn = [
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
  ];
  listDauHieuBell = [
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
  ];
  listKetMac2 = [
    {
      ID: "1",
      MA: "1",
      MO_TA: "Bình thường"
    },
    {
      ID: "2",
      MA: "2",
      MO_TA: "Bệnh lý"
    }
  ];
  listPhanTruocNhanCau = [
    {
      ID: "1",
      MA: "1",
      MO_TA: "Bình thường"
    },
    {
      ID: "2",
      MA: "2",
      MO_TA: "Bệnh lý"
    }
  ];
  listPhanSauNhanCau = [
    {
      ID: "1",
      MA: "1",
      MO_TA: "Bình thường"
    },
    {
      ID: "2",
      MA: "2",
      MO_TA: "Bệnh lý"
    }
  ];
  listDinhThi = [
    {
      ID: "1",
      MA: "1",
      MO_TA: "Trung tâm"
    },
    {
      ID: "2",
      MA: "2",
      MO_TA: "Cạnh tâm"
    },
    {
      ID: "3",
      MA: "3",
      MO_TA: "Ngoại tâm"
    }
  ];

  /**
   * TODO: Dùng tên bệnh án thay vì ID bệnh án
   */
  @Input() tenBenhAn = '';
  private readonly componentName = 'kham_mat';

  constructor(private shareDataService: ShareDataService,
              private emrService: EmrService) {
  }

  ngOnInit(): void {
    /**
     * TODO: Nếu dùng name thì không dùng ID_BENH_AN
     */
    if (this.tenBenhAn) {
      this.emrService.getShowFieldComponentByConfig_new(this.componentName, this.tenBenhAn).then((dataReturn: any) => this.showField = dataReturn);
    } else {
      this.emrService.getShowFieldComponentByConfig(this.componentName, this.ID_BENH_AN.toString()).then((dataReturn: any) => this.showField = dataReturn);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.patientInfo?.currentValue) {
      const patientInfo = changes.patientInfo.currentValue as EmrPatientInfo;

      // Load
      if (patientInfo.idEMR && patientInfo.results && patientInfo.results.kb.KHAM_MAT_DAY_MAT) {
        this.khammat = patientInfo.results.kb.KHAM_MAT_DAY_MAT;
      }
    }

    this.shareDataService.pushData(this.khammat, "kham_mat_day_mat");
  }

  reset(title: string) {
    if (title === "LIST_MAT_PHAI") {
      if (this.khammat.BENH_AN_MAT_LAC_SUP_MI.LIST_MAT_PHAI.ID === "1") {
        this.khammat.BENH_AN_MAT_LAC_SUP_MI.BENH_LY_MAT_PHAI = "";
      }
    }
    if (title === "LIST_MAT_TRAI") {
      if (this.khammat.BENH_AN_MAT_LAC_SUP_MI.LIST_MAT_TRAI.ID === "1") {
        this.khammat.BENH_AN_MAT_LAC_SUP_MI.BENH_LY_MAT_TRAI = "";
      }
    }
    if (title === "LIST_RUNG_GIAT_NHAN_CAU") {
      if (this.khammat.BENH_AN_MAT_LAC_SUP_MI.LIST_RUNG_GIAT_NHAN_CAU.ID === "1") {
        this.khammat.BENH_AN_MAT_LAC_SUP_MI.TEXT_RUNG_GIAT_NHAN_CAU = "";
      }
    }
    if (title === "TINH_TRANG_THI_GIAC") {
      if (this.khammat.BENH_AN_MAT_LAC_SUP_MI.LIST_TINH_TRANG_THI_GIAC.ID === "1") {
        this.khammat.BENH_AN_MAT_LAC_SUP_MI.PHU_THI = "";
      }
    }
    if (title === "TINH_TRANG_THI_GIAC") {
      if (this.khammat.BENH_AN_MAT_LAC_SUP_MI.LIST_TINH_TRANG_THI_GIAC.ID === "2") {
        this.khammat.BENH_AN_MAT_LAC_SUP_MI.PHU_THI = "";
      }
    }
    if (title === "SONG_THI") {
      if (this.khammat.BENH_AN_MAT_LAC_SUP_MI.LIST_SONG_THI.ID === "1") {
        this.khammat.BENH_AN_MAT_LAC_SUP_MI.TEXT_SONG_THI = "";
      }
    }
    if (title === "TU_THE_BU_TRU") {
      if (this.khammat.BENH_AN_MAT_LAC_SUP_MI.LIST_TU_THE_BU_TRU.ID === "1") {
        this.khammat.BENH_AN_MAT_LAC_SUP_MI.TEXT_TU_THE_BU_TRU = "";
      }
    }
    if (title === "LIST_KET_MAC_PHAI") {
      if (this.khammat.BENH_AN_MAT_LAC_SUP_MI.KHAM_MAT_PHAI.LIST_KET_MAC.ID === "1") {
        this.khammat.BENH_AN_MAT_LAC_SUP_MI.KHAM_MAT_PHAI.TEXT_BENH_LY_KET_MAC = "";
      }
    }
    if (title === "LIST_KET_MAC_TRAI") {
      if (this.khammat.BENH_AN_MAT_LAC_SUP_MI.KHAM_MAT_TRAI.LIST_KET_MAC.ID === "1") {
        this.khammat.BENH_AN_MAT_LAC_SUP_MI.KHAM_MAT_TRAI.TEXT_BENH_LY_KET_MAC = "";
      }
    }
    if (title === "LIST_PHAN_TRUOC_NHAN_CAU_PHAI") {
      if (this.khammat.BENH_AN_MAT_LAC_SUP_MI.KHAM_MAT_PHAI.LIST_PHAN_TRUOC_NHAN_CAU.ID === "1") {
        this.khammat.BENH_AN_MAT_LAC_SUP_MI.KHAM_MAT_PHAI.TEXT_PHAN_TRUOC_NHAN_CAU = "";
      }
    }
    if (title === "LIST_PHAN_TRUOC_NHAN_CAU_TRAI") {
      if (this.khammat.BENH_AN_MAT_LAC_SUP_MI.KHAM_MAT_TRAI.LIST_PHAN_TRUOC_NHAN_CAU.ID === "1") {
        this.khammat.BENH_AN_MAT_LAC_SUP_MI.KHAM_MAT_TRAI.TEXT_PHAN_TRUOC_NHAN_CAU = "";
      }
    }
    if (title === "LIST_PHAN_SAU_NHAN_CAU_PHAI") {
      if (this.khammat.BENH_AN_MAT_LAC_SUP_MI.KHAM_MAT_PHAI.LIST_PHAN_SAU_NHAN_CAU.ID === "1") {
        this.khammat.BENH_AN_MAT_LAC_SUP_MI.KHAM_MAT_PHAI.TEXT_PHAN_SAU_NHAN_CAU = "";
      }
    }
    if (title === "LIST_PHAN_SAU_NHAN_CAU_TRAI") {
      if (this.khammat.BENH_AN_MAT_LAC_SUP_MI.KHAM_MAT_TRAI.LIST_PHAN_SAU_NHAN_CAU.ID === "1") {
        this.khammat.BENH_AN_MAT_LAC_SUP_MI.KHAM_MAT_TRAI.TEXT_PHAN_SAU_NHAN_CAU = "";
      }
    }
    if (title === "LIST_KET_MAC") {
      if (!this.khammat.MAT_PHAI.KET_MAC_PHAI.XUAT_HUYET) {
        this.khammat.MAT_PHAI.KET_MAC_PHAI.TEXT_XUAT_HUYET = "";
      }
    }
    if (title === "LIST_KET_MAC") {
      if (!this.khammat.MAT_TRAI.KET_MAC_TRAI.XUAT_HUYET) {
        this.khammat.MAT_TRAI.KET_MAC_TRAI.TEXT_XUAT_HUYET = "";
      }
    }
    if (title === "LIST_SEO_KET_MAC") {
      if (!this.khammat.MAT_PHAI.KET_MAC_PHAI.SEO_KM) {
        this.khammat.MAT_PHAI.KET_MAC_PHAI.TEXT_SEO_KM = "";
      }
    }
    if (title === "LIST_SEO_KET_MAC") {
      if (!this.khammat.MAT_TRAI.KET_MAC_TRAI.SEO_KM) {
        this.khammat.MAT_TRAI.KET_MAC_TRAI.TEXT_SEO_KM = "";
      }
    }
    if (title === "LIST_XUAT_HUYET") {
      if (!this.khammat.MAT_PHAI.TIEN_PHONG_PHAI.XUAT_HUYET) {
        this.khammat.MAT_PHAI.TIEN_PHONG_PHAI.TEXT_XUAT_HUYET = "";
      }
    }
    if (title === "LIST_XUAT_HUYET") {
      if (!this.khammat.MAT_TRAI.TIEN_PHONG_TRAI.XUAT_HUYET) {
        this.khammat.MAT_TRAI.TIEN_PHONG_TRAI.TEXT_XUAT_HUYET = "";
      }
    }
    if (title === "LIST_XUAT_TIET") {
      if (!this.khammat.MAT_PHAI.TIEN_PHONG_PHAI.MU_XUAT_TIET) {
        this.khammat.MAT_PHAI.TIEN_PHONG_PHAI.TEXT_MU_XUAT_TIET = "";
      }
    }
    if (title === "LIST_XUAT_TIET") {
      if (!this.khammat.MAT_TRAI.TIEN_PHONG_TRAI.MU_XUAT_TIET) {
        this.khammat.MAT_TRAI.TIEN_PHONG_TRAI.TEXT_MU_XUAT_TIET = "";
      }
    }
    if (title === "TYNDALL") {
      if (!this.khammat.MAT_PHAI.TIEN_PHONG_PHAI.TYNDALL) {
        this.khammat.MAT_PHAI.TIEN_PHONG_PHAI.TEXT_TYNDALL = "";
      }
    }
    if (title === "TYNDALL") {
      if (!this.khammat.MAT_TRAI.TIEN_PHONG_TRAI.TYNDALL) {
        this.khammat.MAT_TRAI.TIEN_PHONG_TRAI.TEXT_TYNDALL = "";
      }
    }
    if (title === "TAN_MACH_MONG_MAT") {
      if (!this.khammat.MAT_PHAI.MONG_MAT_PHAI.TAN_MACH_MONG_MAT) {
        this.khammat.MAT_PHAI.MONG_MAT_PHAI.TEXT_TAN_MACH_MONG_MAT = "";
      }
    }
    if (title === "TAN_MACH_MONG_MAT") {
      if (!this.khammat.MAT_TRAI.MONG_MAT_TRAI.TAN_MACH_MONG_MAT) {
        this.khammat.MAT_TRAI.MONG_MAT_TRAI.TEXT_TAN_MACH_MONG_MAT = "";
      }
    }
    if (title === "HOAT_KOEPPI") {
      if (!this.khammat.MAT_PHAI.MONG_MAT_PHAI.HOAT_KOEPPI) {
        this.khammat.MAT_PHAI.MONG_MAT_PHAI.TEXT_HOAT_KOEPPI = "";
      }
    }
    if (title === "HOAT_KOEPPI") {
      if (!this.khammat.MAT_TRAI.MONG_MAT_TRAI.HOAT_KOEPPI) {
        this.khammat.MAT_TRAI.MONG_MAT_TRAI.TEXT_HOAT_KOEPPI = "";
      }
    }
    if (title === "VIEM_MU") {
      if (!this.khammat.MAT_PHAI.DICH_KINH_PHAI.VIEM_MU) {
        this.khammat.MAT_PHAI.DICH_KINH_PHAI.TEXT_VIEM_MU = "";
      }
    }
    if (title === "VIEM_MU") {
      if (!this.khammat.MAT_TRAI.DICH_KINH_TRAI.VIEM_MU) {
        this.khammat.MAT_TRAI.DICH_KINH_TRAI.TEXT_VIEM_MU = "";
      }
    }
    if (title === "BENH_LY_KHAC") {
      if (!this.khammat.MAT_PHAI.VONG_MAC_PHAI.BENH_LY_KHAC) {
        this.khammat.MAT_PHAI.VONG_MAC_PHAI.TEXT_BENH_LY_KHAC = "";
      }
    }
    if (title === "BENH_LY_KHAC") {
      if (!this.khammat.MAT_TRAI.VONG_MAC_TRAI.BENH_LY_KHAC) {
        this.khammat.MAT_TRAI.VONG_MAC_TRAI.TEXT_BENH_LY_KHAC = "";
      }
    }
    if (title === "BONG_VONG_MAC") {
      if (!this.khammat.MAT_PHAI.VONG_MAC_PHAI.BONG_VONG_MAC) {
        this.khammat.MAT_PHAI.VONG_MAC_PHAI.TEXT_BONG_VONG_MAC = "";
      }
    }
    if (title === "BONG_VONG_MAC") {
      if (!this.khammat.MAT_TRAI.VONG_MAC_TRAI.BONG_VONG_MAC) {
        this.khammat.MAT_TRAI.VONG_MAC_TRAI.TEXT_BONG_VONG_MAC = "";
      }
    }
    if (title === "RACH_VONG_MAC") {
      if (!this.khammat.MAT_PHAI.VONG_MAC_PHAI.RACH_VONG_MAC) {
        this.khammat.MAT_PHAI.VONG_MAC_PHAI.TEXT_RACH_VONG_MAC = 0;
      }
    }
    if (title === "RACH_VONG_MAC") {
      if (!this.khammat.MAT_TRAI.VONG_MAC_TRAI.RACH_VONG_MAC) {
        this.khammat.MAT_TRAI.VONG_MAC_TRAI.TEXT_RACH_VONG_MAC = 0;
      }
    }
    if (title === "HAT_BUSACA") {
      if (!this.khammat.MAT_PHAI.MONG_MAT_PHAI.HAT_BUSACA) {
        this.khammat.MAT_PHAI.MONG_MAT_PHAI.TEXT_HAT_BUSACA = "";
      }
    }
    if (title === "HAT_BUSACA") {
      if (!this.khammat.MAT_TRAI.MONG_MAT_TRAI.HAT_BUSACA) {
        this.khammat.MAT_TRAI.MONG_MAT_TRAI.TEXT_HAT_BUSACA = "";
      }
    }
    if (title === "TAN_MACH") {
      if (!this.khammat.MAT_PHAI.TAN_MACH) {
        this.khammat.MAT_PHAI.VONG_MAC_PHAI.TAN_MACH.ID = "";
      }
    }
    if (title === "TAN_MACH") {
      if (!this.khammat.MAT_TRAI.TAN_MACH) {
        this.khammat.MAT_TRAI.VONG_MAC_TRAI.TAN_MACH.ID = "";
      }
    }
    if (title === "HOC_MAT_PHAI") {
      if (this.khammat.MAT_PHAI.HOC_MAT_PHAI.LIST_HOC_MAT.ID === '2') {
        this.khammat.MAT_PHAI.HOC_MAT_PHAI.MO_TA_HOC_MAT = "";
      }
    }
    if (title === "HOC_MAT_TRAI") {
      if (this.khammat.MAT_TRAI.HOC_MAT_TRAI.LIST_HOC_MAT.ID === '2') {
        this.khammat.MAT_TRAI.HOC_MAT_TRAI.MO_TA_HOC_MAT = "";
      }
    }
    if (title === "VAN_NHAN_PHAI") {
      if (this.khammat.MAT_PHAI.HOC_MAT_PHAI.LIST_VAN_NHAN.ID === '2') {
        this.khammat.MAT_PHAI.HOC_MAT_PHAI.MO_TA_VAN_NHAN = "";
      }
    }
    if (title === "VAN_NHAN_TRAI") {
      if (this.khammat.MAT_TRAI.HOC_MAT_TRAI.LIST_VAN_NHAN.ID === '2') {
        this.khammat.MAT_TRAI.HOC_MAT_TRAI.MO_TA_VAN_NHAN = "";
      }
    }
  }
}
