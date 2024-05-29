import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ShareDataService } from '../../../../services/share-data.service';
import { KhamBenh, MAT_RANG, NHU_CAU_DIEU_TRI, TINH_TRANG_RANG, TOOTHS_SELECT } from '../../../../model/emr/kham_benh';
import { EmrService } from '../../../../services/emr.service';
import { XetNghiem } from '../../../../model/emr/global';
import * as moment from 'moment';
import { DM } from '../../../../model/Patient_EMR';
import { EmrPatientInfo } from '../../../../model/emr/patient/patient-info';
import { BenhAnComponent } from '../../benh-an-emr/benh-an.component';
import { LocalStorageService } from '@shared';
import { FormField } from '../../../templates/field-template-dialog/field-template-dialog.component';
import { FrontendConfigService } from '../../../../services/frontend-config/frontend-config.service';


@Component({
  selector: 'app-kham-benh',
  templateUrl: './kham-benh.component.html',
  styleUrls: ['./kham-benh.component.scss'],
})
export class KhamBenhComponent extends BenhAnComponent implements OnInit, OnChanges {
  @Input() formType: any;
  @Input() isCreatingNew: boolean = false;
  @Input() patientInfo: any;
  @Input() thongTinKhamBenh: any;
  @Input() ID_BENH_AN: any;

  /**
   * TODO: Dùng tên bệnh án thay vì ID bệnh án
   */
  private readonly componentName = 'kham_benh';
  @Input() counter_khamBenh = '';

  index = 0;
  khamBenh!: KhamBenh;
  showField: any;
  listMauDa = [
    {
      ID: '1',
      MA: '1',
      MO_TA: '1. Hồng hào',
    },
    {
      ID: '2',
      MA: '2',
      MO_TA: '2. Xanh tái',
    },
    {
      ID: '3',
      MA: '3',
      MO_TA: '3. Vàng',
    },
    {
      ID: '4',
      MA: '4',
      MO_TA: '4. Tím',
    },
    {
      ID: '5',
      MA: '5',
      MO_TA: '5. Khác',
    },
  ];
  listXNCLSCanLam: XetNghiem[] = [
    {
      'TEN': 'Huyết đồ',
      TOM_TAT: '1',
      NOI_DUNG: '',
    },
    {
      'TEN': 'Tủy đồ',
      TOM_TAT: '2',
      NOI_DUNG: '',
    },
    {
      'TEN': 'Sinh thiết tủy',
      TOM_TAT: '3',
      NOI_DUNG: '',
    },
    {
      'TEN': 'Sinh thiết hạch',
      TOM_TAT: '4',
      NOI_DUNG: '',
    },
    {
      'TEN': 'Đông máu toàn bộ',
      TOM_TAT: '5',
      NOI_DUNG: '',
    },
    {
      'TEN': 'Định lượng yếu tố đông máu',
      TOM_TAT: '6',
      NOI_DUNG: '',
    },
    {
      'TEN': 'Điện di HST',
      TOM_TAT: '7',
      NOI_DUNG: '',
    },
    {
      'TEN': 'Nhiễm sắc thể',
      TOM_TAT: '8',
      NOI_DUNG: '',
    },
  ];
  listXNCLSCanLam2: XetNghiem[] = [
    {
      'TEN': 'Nhóm máu',
      TOM_TAT: '',
      NOI_DUNG: '',
    },
    {
      'TEN': 'Coombs test',
      TOM_TAT: '',
      NOI_DUNG: '',
    },
    {
      'TEN': 'Kháng thể bất thường',
      TOM_TAT: '',
      NOI_DUNG: '',
    },
  ];
  listChiDinhNhapVien = [
    {
      ID: '1',
      MA: '1',
      MO_TA: 'Nội trú',
    },
    {
      ID: '2',
      MA: '2',
      MO_TA: 'Ngoại trú',
    },
  ];
  listChuyenChuyenKhoa = [
    {
      ID: '1',
      MA: '1',
      MO_TA: 'Nha chu',
    },
    {
      ID: '2',
      MA: '2',
      MO_TA: 'Chữa răng',
    },
    {
      ID: '3',
      MA: '3',
      MO_TA: 'Phục hình',
    },
    {
      ID: '4',
      MA: '4',
      MO_TA: 'Nhổ răng',
    },
    {
      ID: '5',
      MA: '5',
      MO_TA: 'Răng trẻ em',
    },
    {
      ID: '6',
      MA: '6',
      MO_TA: 'Chỉnh hình răng mặt',
    },
    {
      ID: '7',
      MA: '7',
      MO_TA: 'Lão nha',
    },
    {
      ID: '8',
      MA: '8',
      MO_TA: 'Cấy ghép răng',
    },
    {
      ID: '9',
      MA: '9',
      MO_TA: 'PTHM',
    },
    {
      ID: '10',
      MA: '10',
      MO_TA: 'VP-THHM',
    },

  ];
  listXNCLSCanLam3: XetNghiem[] = [
    {
      'TEN': 'Sinh hóa',
      TOM_TAT: '',
      NOI_DUNG: '',
    },
    {
      'TEN': 'GPB',
      TOM_TAT: '',
      NOI_DUNG: '',
    },
    {
      'TEN': 'Vi sinh',
      TOM_TAT: '',
      NOI_DUNG: '',
    },
    {
      'TEN': 'X quang',
      TOM_TAT: '',
      NOI_DUNG: '',
    },
  ];
  listBacCO = [
    {
      ID: '1',
      MA: '1',
      MO_TA: 'I',
    },
    {
      ID: '2',
      MA: '2',
      MO_TA: 'II',
    },
    {
      ID: '3',
      MA: '3',
      MO_TA: 'III',
    },
    {
      ID: '4',
      MA: '4',
      MO_TA: 'IV',
    },
    {
      ID: '5',
      MA: '5',
      MO_TA: 'V',
    },
  ];

  list_TINH_TRANG_OI: DM[] = [
    {
      ID: '1',
      MA: '1',
      MO_TA: 'Ối phồng',
    },
    {
      ID: '2',
      MA: '2',
      MO_TA: 'Ối dẹt',
    },
    {
      ID: '3',
      MA: '3',
      MO_TA: 'Ối quả lê',
    },
  ];

  list_TINH_TRANG_OI_VO: DM[] = [
    {
      ID: '1',
      MA: '1',
      MO_TA: 'Tự nhiên',
    },
    {
      ID: '2',
      MA: '2',
      MO_TA: 'Bấm ối',
    },
  ];

  list_DO_LOT: DM[] = [
    {
      ID: '1',
      MA: '1',
      MO_TA: 'Cao',
    },
    {
      ID: '2',
      MA: '2',
      MO_TA: 'Chúc',
    },
    {
      ID: '3',
      MA: '3',
      MO_TA: 'Chặt',
    },
    {
      ID: '4',
      MA: '4',
      MO_TA: 'Lọt',
    },
  ];
  listTriGiac = [
    {
      ID: "1",
      MA: "1",
      MO_TA: "1. Tỉnh"
    },
    {
      ID: "2",
      MA: "2",
      MO_TA: "2. Li bì"
    },
    {
      ID: "3",
      MA: "3",
      MO_TA: "3. Hôn mê"
    }
  ];
  listTiengTim = [
    {
      ID: "1",
      MA: "1",
      MO_TA: "Rõ"
    },
    {
      ID: "2",
      MA: "2",
      MO_TA: "Mờ"
    },
    {
      ID: "3",
      MA: "3",
      MO_TA: "gallop"
    },
    {
      ID: "4",
      MA: "4",
      MO_TA: "Âm thổi (ghi rõ)"
    }
  ];
  listHoHap = [
    {
      ID: "1",
      MA: "1",
      MO_TA: "Cơn ngưng thở"
    },
    {
      ID: "2",
      MA: "2",
      MO_TA: "Thở bụng"
    },
    {
      ID: "3",
      MA: "3",
      MO_TA: "Thở nông"
    },
    {
      ID: "4",
      MA: "4",
      MO_TA: "Khò khè"
    },
    {
      ID: "5",
      MA: "5",
      MO_TA: "Thở rít thanh quản"
    },
    {
      ID: "6",
      MA: "6",
      MO_TA: "Rút lõm ngực"
    }
  ];
  variableGlobal: any;
  KHAMRANG: any;
  tinh_trang_rang : Array<TINH_TRANG_RANG> = new Array<TINH_TRANG_RANG>();
  mat_rang: Array<MAT_RANG> = new Array<MAT_RANG>();
  nhu_cau_dieu_tri : Array<NHU_CAU_DIEU_TRI> = new Array<NHU_CAU_DIEU_TRI>();
  // FORM_CONFIG_CAC_CO_QUAN:FormField[] = [
  //   {
  //     label: 'hoi_benh_noi_khoa.kham_benh.tuan_hoan',
  //     name: 'KHAM_HE_TUAN_HOAN',
  //   },
  //   {
  //     label: 'hoi_benh_san_khoa.kham_benh.ho_hap',
  //     name: 'KHAM_HE_HO_HAP',
  //   },
  //   {
  //     label: 'hoi_benh_noi_khoa.kham_benh.tieu_hoa',
  //     name: 'KHAM_HE_TIEU_HOA',
  //   },
  //   {
  //     label: 'hoi_benh_noi_khoa.kham_benh.than_tiet_nieu_sinh_duc',
  //     name: 'KHAM_THAN_TIET_NIEU_SINH_DUC',
  //   },
  //   {
  //     label: 'hoi_benh_noi_khoa.kham_benh.co_xuong_khop',
  //     name: 'KHAM_CO_XUONG_KHOP',
  //   },
  //   {
  //     label: 'hoi_benh_noi_khoa.kham_benh.tai_mui_hong',
  //     name: 'KHAM_TAI_MUI_HONG',
  //   },
  //   {
  //     label: 'hoi_benh_noi_khoa.kham_benh.rang_ham_mat',
  //     name: 'KHAM_RANG_HAM_MAT',
  //   },
  //   {
  //     label: 'hoi_benh_noi_khoa.kham_benh.noi_tiet_dinh_duong',
  //     name: 'KHAM_CO_QUAN_KHAC',
  //   }
  // ];
  constructor(private shareDataService: ShareDataService,
              private proxyService: FrontendConfigService,
              private emrService: EmrService) {
    super();
    this.variableGlobal = this.proxyService.getFrontendConfig();
    this.KHAMRANG = this.variableGlobal['KHAM_RANG'].value;
    this.mat_rang = this.KHAMRANG.mat_rang;
    this.nhu_cau_dieu_tri = this.KHAMRANG.nhu_cau_dieu_tri;
    this.tinh_trang_rang = this.KHAMRANG.tinh_trang_rang;
  }

  ngOnInit(): void {
    this.isCreatingNew = false
    if (!this.khamBenh) {
      this.khamBenh = new KhamBenh();
    }
    /**
     * TODO: Nếu dùng name thì không dùng ID_BENH_AN
     */
    if(!this.listToothSelect[0]){
      this.listToothSelect[0] = {
        "tinh_trang_rang": this.tinh_trang_rang,
        "mat_rang": this.mat_rang,
        "nhu_cau_dieu_tri": this.nhu_cau_dieu_tri,
      };
    }
    if (this.tenBenhAn) {
      this.emrService.getShowFieldComponentByConfig_new(this.componentName, this.tenBenhAn).then((dataReturn: any) => this.showField = dataReturn);
    } else {
      this.emrService.getShowFieldComponentByConfig(this.componentName, this.ID_BENH_AN.toString()).then((dataReturn: any) => this.showField = dataReturn);
    }
    this.getData();
  }

  handleLinkKhamBenhData() {
    if(this.thongTinKhamBenh.xet_toan_than) {
      this.khamBenh.KHAM_TOAN_THAN.TOAN_TRANG = this.thongTinKhamBenh.xet_toan_than
    }
    let tempStr = ""
    if(this.thongTinKhamBenh.benh_su) {
      tempStr += "- Quá trình bệnh lý/bệnh sử: " + this.thongTinKhamBenh.benh_su + "\n"
    }
    if(this.thongTinKhamBenh.tien_su_benh) {
      tempStr += this.thongTinKhamBenh.tien_su_benh + "\n"
    }
    if(this.thongTinKhamBenh.xet_toan_than) {
      tempStr += "- Khám xét toàn thân: " + this.thongTinKhamBenh.xet_toan_than + "\n"
    }
    if(this.thongTinKhamBenh.xet_bo_phan) {
      tempStr += "- Khám xét bộ phần: " + this.thongTinKhamBenh.xet_bo_phan
    }
    this.khamBenh.TOM_TAT_BENH_AN = tempStr
  }
  ngOnChanges(changes: SimpleChanges) {
    if (this.patientInfo && !this.patientInfo.idEMR) {
      this.khamBenh = this.ketquakb;
    }
    if (this.patientInfo.results && this.patientInfo.idEMR && this.patientInfo.results.kb) {
      this.khamBenh = this.patientInfo.results.kb;
    }
    this.mapList(
      changes, 'results.kb.CAC_XET_NGHIEM_HUYET_HOC',
      this.listXNCLSCanLam,
      this, 'khamBenh.CAC_XET_NGHIEM_HUYET_HOC'
    );
    this.mapList(
      changes, 'results.kb.CAC_XET_NGHIEM_TRUYEN_MAU',
      this.listXNCLSCanLam2,
      this, 'khamBenh.CAC_XET_NGHIEM_TRUYEN_MAU'
    );
    this.mapList(
      changes, 'results.kb.CAC_XET_NGHIEM_LIEN_QUAN',
      this.listXNCLSCanLam3,
      this, 'khamBenh.CAC_XET_NGHIEM_LIEN_QUAN'
    );
    if(changes.thongTinKhamBenh && this.thongTinKhamBenh && this.isCreatingNew === true) {
      this.handleLinkKhamBenhData()
    }

    if(this.isCreatingNew === true) {
      // Link thông tin từ phiếu chức năng sống
      this.emrService.getListBA(1, this.patientInfo.patient_id, this.patientInfo.reception_queue_id, 'FORM_PHIEU_THEO_DOI_CHUC_NANG_SONG', this.patientInfo.medical_record_no).subscribe(data => {
          if(data.status === true){
            const chuc_nang_song_data = data.results[0].results.result.blood_pressure[0]
            this.khamBenh.CHI_SO_SINH_TON.CHIEU_CAO = chuc_nang_song_data.chieu_cao
            this.khamBenh.CHI_SO_SINH_TON.CAN_NANG = chuc_nang_song_data.can_nang
            this.khamBenh.CHI_SO_SINH_TON.MACH = chuc_nang_song_data.mach
            this.khamBenh.CHI_SO_SINH_TON.NHIET_DO = chuc_nang_song_data.nhiet_do
            this.khamBenh.CHI_SO_SINH_TON.HUYET_AP.TAM_THU = chuc_nang_song_data.huyet_ap_tam_thu
            this.khamBenh.CHI_SO_SINH_TON.HUYET_AP.TAM_TRUONG = chuc_nang_song_data.huyet_ap_tam_truong
            this.khamBenh.CHI_SO_SINH_TON.NHIP_THO = chuc_nang_song_data.nhip_tho
          }
      });
    }
    this.shareDataService.pushData(this.khamBenh, 'kb');
  }
  reset( title: string) {
    if (title === "TIM") {
      if (!this.khamBenh.BENH_AN_CHAN_TAY_MIENG.TIM) {
        this.khamBenh.BENH_AN_CHAN_TAY_MIENG.SPO2 = 0;
      }
    }
    if (title === "TIENG_TIM") {
      if (this.khamBenh.BENH_AN_CHAN_TAY_MIENG.TIENG_TIM.ID === "1") {
        this.khamBenh.BENH_AN_CHAN_TAY_MIENG.AM_THOI = "";
      }
    }
    if (title === "TIENG_TIM") {
      if (this.khamBenh.BENH_AN_CHAN_TAY_MIENG.TIENG_TIM.ID === "2") {
        this.khamBenh.BENH_AN_CHAN_TAY_MIENG.AM_THOI = "";
      }
    }
    if (title === "TIENG_TIM") {
      if (this.khamBenh.BENH_AN_CHAN_TAY_MIENG.TIENG_TIM.ID === "3") {
        this.khamBenh.BENH_AN_CHAN_TAY_MIENG.AM_THOI = "";
      }
    }
    if (title === "RAN_PHOI") {
      if (!this.khamBenh.BENH_AN_CHAN_TAY_MIENG.RAN_PHOI) {
        this.khamBenh.BENH_AN_CHAN_TAY_MIENG.TEXT_RAN_PHOI = "";
      }
    }
    if (title === "QUANH_CHOP") {
      if (!this.khamBenh.QUANH_CHOP) {
        this.khamBenh.TEXT_QUANH_CHOP = "";
      }
    }
    if (title === "KHAC") {
      if (!this.khamBenh.KHAC) {
        this.khamBenh.TEXT_KHAC = "";
      }
    }
    if (title === "GAN_TO") {
      if (!this.khamBenh.BENH_AN_CHAN_TAY_MIENG.GAN_TO) {
        this.khamBenh.BENH_AN_CHAN_TAY_MIENG.TEXT_GAN_TO = 0;
      }
    }
    if (title === "BENH_LY_TOAN_THAN") {
      if (this.khamBenh.KHAM_TOAN_THAN.KHAM_BENH_LY.BENH_LY === 1) {
        this.khamBenh.KHAM_TOAN_THAN.KHAM_BENH_LY.TEN_BENH_LY = "";
      }
    }
  }

  rangeLoop(numBegin: number, numLength: number) : number[]{
    return this.emrService.rangeLoop(numBegin, numLength);
  }
  listToothSelect: any = {} ;
  numberToothChoice: number = 0;
  choiceTooth(numberTooth: number){
    this.numberToothChoice = numberTooth;
    if(!this.listToothSelect[numberTooth]){
      this.listToothSelect[numberTooth] = {
        "tinh_trang_rang": JSON.parse(JSON.stringify(this.KHAMRANG.tinh_trang_rang)),
        "mat_rang": JSON.parse(JSON.stringify(this.KHAMRANG.mat_rang)),
        "nhu_cau_dieu_tri": JSON.parse(JSON.stringify(this.KHAMRANG.nhu_cau_dieu_tri)),
      };
    }
  }

  editChanDoanRang (numberToothChoice: number, index: number,  type: number, checked: boolean){
    if(type === 1){
      this.listToothSelect[numberToothChoice].tinh_trang_rang[index].value = checked;
    }
    if(type === 2){
      this.listToothSelect[numberToothChoice].mat_rang[index].value = checked;
    }
    if(type === 3){
      this.listToothSelect[numberToothChoice].nhu_cau_dieu_tri[index].value = checked;
    }

    this.khamBenh.CHAN_DOAN = this.createStrRangDieuTri();

  }

   createStrRangDieuTri  () : string{
    let strDieuTri = "";
    //todo: tự ghép chẩn đoán răng khi tick chọn các chỉ số răng
    for(var key in  this.listToothSelect){
      let strEachTooth = "";
      let strSubTinhTrangRang = "";
      let strTinhTrangRang = ""
      this.listToothSelect[key].tinh_trang_rang.forEach((ttr: any) => {
        if(ttr.value === true){
          strSubTinhTrangRang += ttr.name + ",";
        }
      });
      if(strSubTinhTrangRang != ""){
        strTinhTrangRang  = "Tình trạng răng: " + strSubTinhTrangRang;
      }
      var strSubMatRang = "";
      var strMatRang = ""
      this.listToothSelect[key].mat_rang.forEach((ttr: any) =>{
        if(ttr.value === true){
          strSubMatRang += ttr.name + ",";
        }
      });
      if(strSubMatRang != ""){
        strMatRang  = "Mặt răng: " + strSubMatRang;
      }
      var strSubNhuCauDieuTri = "";
      var strNhuCauDieuTri = ""
      this.listToothSelect[key].nhu_cau_dieu_tri.forEach( (ttr: any) =>{
        if(ttr.value === true){
          strSubNhuCauDieuTri += ttr.name + ",";
        }
      });
      if(strSubNhuCauDieuTri != ""){
        strNhuCauDieuTri  = "Nhu cầu điều trị: " + strSubNhuCauDieuTri;
      }
      if( strTinhTrangRang!= "" || strMatRang != "" || strNhuCauDieuTri != ""){
        //todo: 1 trong 3 trạng thái răng tồn tại -> thì nối str vào răng
        strEachTooth  = "R" + key + ": " + strTinhTrangRang + strMatRang + strNhuCauDieuTri + "\n";
      }
      if(strEachTooth != ""){
        strDieuTri += strEachTooth;
      }
    };
    return strDieuTri;
  }

  getData(){ //Link dữ liệu từ màn phiếu chăm sóc điều dưỡng : form_id 5084
    this.emrService.getExDocument(5084,
      this.patientInfo.patient_id,
      this.patientInfo.reception_queue_id).subscribe((dataReturn) =>{
        if(!dataReturn.status)
          return;
        else{
          let tmp = dataReturn.results[0];
          let chiSo = tmp.results[tmp.results.length - 1].chiSo
          this.khamBenh.CHI_SO_SINH_TON.CAN_NANG = chiSo.CAN_NANG
          this.khamBenh.CHI_SO_SINH_TON.MACH = chiSo.MACH
          this.khamBenh.CHI_SO_SINH_TON.NHIET_DO = chiSo.NHIET_DO
          this.khamBenh.CHI_SO_SINH_TON.NHIP_THO = chiSo.NHIP_THO
          this.khamBenh.CHI_SO_SINH_TON.CHIEU_CAO = chiSo.CHIEU_CAO
          this.khamBenh.CHI_SO_SINH_TON.HUYET_AP.TAM_THU = chiSo.HUYET_AP_TAM_THU
          this.khamBenh.CHI_SO_SINH_TON.HUYET_AP.TAM_TRUONG = chiSo.HUYET_AP_TAM_TRUONG
          this.khamBenh.CHI_SO_SINH_TON.BMI = chiSo.BMI
          this.khamBenh.CHI_SO_SINH_TON.SP_O2 = chiSo.SPO2
        }
    })
  }
}
