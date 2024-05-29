import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ShareDataService } from '../../../../services/share-data.service';
import { GiayToLienQuanComponent } from '../../benh-an-emr/giay-to-lien-quan.component';
import { FrontendConfigs } from '@shared';
import moment, { Moment } from 'moment';
import { ServiceService } from 'app/services/service.service';
import { HttpClient } from '@angular/common/http';
import { Globals } from 'app/app.globals';
import { TemplateExameService } from 'app/services/template/template-exam.service';
import { TemplateExam } from 'app/model/examination/template-exam';
import { ReceptionService } from 'app/services/reception.service';
import { PrintService } from 'app/services/print.service';
import { EmrService } from '../../../../services/emr.service';
import { ToastrTranslateService } from '@shared/services/toastr-translate-service';
import { FrontendConfigService } from '../../../../services/frontend-config/frontend-config.service';

class PhieuLapKeHoachChamSoc {
  chan_doan= "";
  type= "1";
  level_care=0;
  parent_name="";
  real_created_date: string = ""
  in_patient_room_name="";
  in_patient_bed_name="";
  phieu_dieu_tri_id= {
    current_day_time:"",
    datetime:""
  };
  tri_giac={
    tri_giac: "",
    tinh_hoan_toan: false,
    lo_mo: false,
    vat_va: false,
    hon_me: false
  };
  kha_nang_nghe={
    kha_nang_nghe: "",
    tot: false,
    kem: false,
    dung_cu_tro_thinh: false,
    kho_xac_dinh: false
  };
  kha_nang_nhin={
    kha_nang_nhin: "",
    tot: false,
    kem: false,
    kho_xac_dinh: false,
    khac: false,
    description: ""
  };
  kha_nang_nuot={
    kha_nang_nuot: "",
    tot: false,
    han_che: false,
    kho_khan: false,
    khac: false,
    description: ""
  };
  tuan_hoan_ngoai_vi={
    da: null,
    niem_mac: null,
    description: ""
  };
  kha_nang_noi={
    kha_nang_noi: "",
    binh_thuong: false,
    han_che: false,
    kho_khan: false,
    kho_danh_gia: false,
  };
  rang_mieng={
    rang_mieng: "",
    sach: false,
    ve_sinh_kem: false,
    rang_gia: false,
  };
  tinh_trang_toan_ven_cua_da={
    tinh_trang_toan_ven_cua_da: "",
    nguyen_ven: false,
    xuat_huyet_duoi_da: false,
    khong_lanh_lan: false,
  };
  vet_thuong_bong={
    vet_thuong_bong: "",
    khong: false,
    co: false,
    description: ""
  };
  loet_do_ty_de= {
    loet_do_ty_de: "",
    khong_loet: false,
    loet_do_I: false,
    loet_do_II: false,
    loet_do_III: false,
    loet_do_IV: false,
  };
  ho_hap= {
    ho_hap: "",
    tho_deu: false,
    kho_tho: false,
    ho: false,
    khac: false,
    description: ""
  };
  tinh_trang_bung= {
    tinh_trang_bung: "",
    bung_mem: false,
    bung_cung: false,
    dau_bung: false,
    buon_non: false,
    non: false,
    co_sonde_dd: false,
    mo_thong_dd: false,
    co_hmnt: false,
    khac: false,
    description: ""
  };
  dai_tien= {
    dai_tien: "",
    tu_chu:false,
    dung_thuoc_nhuan_trang:false,
    khac:false,
    description: ""
  };
  cam_giac_khi_an= {
    cam_giac_khi_an: "",
    ngon_mieng:false,
    binh_thuong:false,
    chan_an:false,
  };
  nuoi_duong= {
    nuoi_duong: "",
    duong_mieng:false,
    an_qua_sonde:false,
    tinh_mach:false,
  };
  he_tiet_nieu= {
    he_tiet_nieu: "",
    tu_chu: false,
    khong_tu_chu: false,
    ong_thong_tieu: false,
    khac: false,
    description: "",
    mau_sac: ""
  };
  he_xuong_khop_van_dong= {
    he_xuong_khop_van_dong: "",
    tot: false,
    giam_van_dong: false,
    liet: false,
    khac: false,
    liet_description: "",
    khac_description: ""
  };
  giac_ngu= {
    giac_ngu: "",
    ngu_du: false,
    ngu_it: false,
    mat_ngu: false,
    su_dung_thuoc_an_than: false,
  };
  dau= {
    dau: "",
    khong_dau: false,
    co_dau: false,
    description: ""
  };
  tien_su_benh= "";
  dien_bien_benh= "";
  nhan_dinh_khac= "";
  chan_doan_cs= "";
  lap_khcs= "";
  thuc_hien_khcs= "";
  danh_gia= "";
  dieu_duong = {name: "", user_signature_image: "", user_signature: ""};

  constructor() {

  }
}

@Component({
  selector: 'app-phieu-lap-ke-hoach-cham-soc',
  templateUrl: './phieu-lap-ke-hoach-cham-soc.component.html',
  styleUrls: ['./phieu-lap-ke-hoach-cham-soc.component.scss'],
})

export class PhieuLapKeHoachChamSocComponent extends GiayToLienQuanComponent implements OnInit, OnChanges {
  @Input() patientInfo: any;
  @Input() isCreateGiayToLienQuan: any;
  @Input() selectGiayToLienQuan: any;
  @Input() isEdit!:boolean
  @Input() saveTemplate: any;
  @Input() template: any;

  templateSelect: TemplateExam | null = null;
  listTemplate = [];
  totalTab= 0;
  isLoadingTab= false;
  showPaginatorTab= false;
  rowHover = true;
  rowStriped = false;
  showPaginator = false;
  rowSelectable = false;
  queryPage ={
    page: 1,
    per_page: 10,
  }
  currentDate: Moment = moment()
  dieu_duong_info: any = {}
  parent_info: any = {}
  parent_id = ''
  ten_dieu_duong = ""
  ID_HIS_PDT = 5003;
  listPDT: any = [];
  listYLenh: any = [];
  selectedPDT: any = undefined;
  pcs = new PhieuLapKeHoachChamSoc();
  pcsConfig: any = {};
  pdt_parent_id = "";
  listGiayTo = [];

  isEnabledForm = false

  protected variableGlobal: FrontendConfigs = {};

  protected getFrontendConfigValue(formName: string, defaultValue = 0) {
    return this.variableGlobal[formName] ? Number(this.variableGlobal[formName]?.value) : defaultValue;
  }

  constructor(
              private shareDataService: ShareDataService,
              private serviceService: ServiceService,
              private templateExameService: TemplateExameService,
              private receptionService: ReceptionService,
              proxy: FrontendConfigService,
              private http: HttpClient,
              private globals: Globals,
              private printService: PrintService,
              private emrService: EmrService,
              private toastr: ToastrTranslateService
  ) {
    super();
    this.variableGlobal = proxy.getFrontendConfig();
  }

  listMauPhieu = [
    {
      value: '1',
      label: 'Mẫu 1'
    },
    {value: '2', label: 'Mẫu 2'},
    {value: '3', label: 'Mẫu sơ sinh'}
  ]
  listDa=[
    {
      "id": "1",
      "name": "Hồng"
    },
    {
      "id": "2",
      "name": "Vàng"
    },
    {
      "id": "3",
      "name": "Tái xanh"
    },
    {
      "id": "4",
      "name": "Tím"
    },
    {
      "id": "5",
      "name": "Xanh"
    },
    {
      "id": "6",
      "name": "Xạm"
    }
  ];
  get filteredDa() {
    return this.listDa.filter(item => item.id !== '6');
  }
  listNiemMac = [
    {
      "id": "1",
      "name": "Hồng"
    },
    {
      "id": "2",
      "name": "Nhợt"
    },
    {
      "id": "3",
      "name": "Xanh"
    }
  ]
  listTriGiac = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "Tỉnh hoàn toàn"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "Lơ mơ"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "Vật vã, kích thích"
    },
    {
      ID:"4",
      MA: "4",
      MO_TA: "Hôn mê"
    }
  ];
  listKhaNangNghe = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "Tốt"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "Kém"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "Dụng cụ trợ thính"
    },
    {
      ID:"4",
      MA: "4",
      MO_TA: "Khó xác định"
    }
  ];
  listKhaNangNhin = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "Tốt"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "Kém"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "Khó xác định"
    },
    {
      ID:"4",
      MA: "4",
      MO_TA: "Khác"
    }
  ];
  listKhaNangNuot = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "Tốt"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "Hạn chế"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "Khó khăn"
    },
    {
      ID:"4",
      MA: "4",
      MO_TA: "Khác"
    },
  ];
  listKhaNangNoi = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "Bình thường"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "Hạn chế"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "Khó khăn"
    },
    {
      ID:"4",
      MA: "4",
      MO_TA: "Khó đánh giá"
    },
  ];
  listRangMieng = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "Sạch"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "Vệ sinh kém"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "Răng giả"
    },
  ];
  listTinhTrangToanVenCuaDa = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "Nguyên vẹn"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "Xuất huyết dưới da"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "Không lành lặn"
    },
  ];

  listVetThuongBong = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "Không"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "Có"
    },
  ];

  listLoetDoTyDe= [
    {
      ID:"1",
      MA: "1",
      MO_TA: "Không loét"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "Loét độ I"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "Loét độ II"
    },
    {
      ID:"4",
      MA: "4",
      MO_TA: "Loét độ III"
    },
    {
      ID:"5",
      MA: "5",
      MO_TA: "Loét độ IV"
    },
  ];

  listHoHap = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "Thở đều"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "Khó thở"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "Ho"
    },
    {
      ID:"4",
      MA: "4",
      MO_TA: "Khác"
    },
  ];

  listTinhTrangBung = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "Bụng mềm"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "Bụng cứng"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "Đau bụng"
    },
    {
      ID:"4",
      MA: "4",
      MO_TA: "Buồn nôn"
    },
    {
      ID:"5",
      MA: "5",
      MO_TA: "Nôn"
    },
    {
      ID:"6",
      MA: "6",
      MO_TA: "Có Sonde dd"
    },
    {
      ID:"7",
      MA: "7",
      MO_TA: "Mở thông dd"
    },
    {
      ID:"8",
      MA: "8",
      MO_TA: "Có HMNT"
    },
    {
      ID:"9",
      MA: "9",
      MO_TA: "Khác"
    },
  ];

  listDaiTien = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "Tự chủ"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "Dùng thuốc nhuận tràng"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "Khác"
    },
  ];

  listCamGiacKhiAn = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "Ngon miệng"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "Bình thường"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "Chán ăn"
    },
  ];

  listNuoiDuong = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "Đường miệng"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "Ăn qua sonde"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "Tĩnh mạch"
    },
  ];

  listHeTietNieu = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "Tự chủ"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "Không tự chủ"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "Ống thông tiểu"
    },
    {
      ID:"4",
      MA: "4",
      MO_TA: "Khác"
    },
  ];

  listHeXuongKhopVanDong = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "Tốt"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "Giảm vận động"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "Liệt"
    },
    {
      ID:"4",
      MA: "4",
      MO_TA: "Khác"
    },
  ];

  listGiacNgu = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "Ngủ đủ"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "Ngủ ít"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "Mất ngủ"
    },
    {
      ID:"4",
      MA: "4",
      MO_TA: "Sử dụng thuốc an thần"
    },
  ];

  listDau = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "Không đau"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "Đau"
    },
  ];


  checkNgayNhapVien(ngay_nhap_vien: number):boolean {
    const providedDate = new Date(ngay_nhap_vien*1000);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    providedDate.setHours(0, 0, 0, 0);
    return providedDate.getTime() === today.getTime();
  }
  async initPCSConfig() {
    this.pcsConfig = this.getFrontendConfigValue("PCS")
  }

  handleSelectCheckbox<T extends keyof PhieuLapKeHoachChamSoc>(
    model: T,
    subModel: keyof PhieuLapKeHoachChamSoc[T],
    label: string,
    checked: boolean
  ) {
    let property = this.pcs[model][subModel];
    if (typeof property === 'boolean') {
      this.pcs[model][subModel] = checked as unknown as PhieuLapKeHoachChamSoc[T][keyof PhieuLapKeHoachChamSoc[T]];
    } else if (typeof property === 'string') {
      if (checked) {
        if (property === '') {
          this.pcs[model][subModel] = (property + label) as unknown as PhieuLapKeHoachChamSoc[T][keyof PhieuLapKeHoachChamSoc[T]];
        } else {
          if (!this.checkSubString(property, label)) {
            this.pcs[model][subModel] = (this.mergeString(property, label)) as unknown as PhieuLapKeHoachChamSoc[T][keyof PhieuLapKeHoachChamSoc[T]];
          }
        }
      } else {
        if (property.includes(label)) {
          const labelsToRemove = label.split(', ');
          let labelsArray = property.split(', ');
          labelsToRemove.forEach(label => {
            const indexToRemove = labelsArray.indexOf(label);
            if (indexToRemove !== -1) {
                labelsArray.splice(indexToRemove, 1);
            }
          });
          this.pcs[model][subModel] = labelsArray.join(', ') as unknown as PhieuLapKeHoachChamSoc[T][keyof PhieuLapKeHoachChamSoc[T]];
        }
      }
    } else {
      console.error('The property is neither a string nor a boolean type');
    }
  }

  checkSubString(mainString: string, subString: string):boolean {
    return mainString.includes(subString)
  }
  mergeString(string1: string, string2: string):string {
    let stringArr = [string1, string2].join(', ').split(', ');
    const newArray = stringArr.filter(element => element !== "Khác").concat(stringArr.filter(element => element === "Khác"));

    return newArray.join(', ');
  }

  onPDTSelectionChange() {
    let allowSelectPDT = true;
    if (!this.selectedPDT) {
      allowSelectPDT = false;
    }
    this.listGiayTo.forEach((giayTo:any) => {
      if (allowSelectPDT && giayTo.phieu_dieu_tri_id
        && giayTo.phieu_dieu_tri_id.current_day_time == this.selectedPDT.used_at_action) {
        this.toastr.warning('Phiếu điều trị đã được lập kế hoạch chăm sóc');
        return;
      }
    })
    if (!allowSelectPDT) {
      this.selectedPDT = undefined;
      this.pcs.phieu_dieu_tri_id = {
        current_day_time:"",
        datetime:""
      };
      return;
    };
    let pdtLength = this.listYLenh.length;
    if(this.selectedPDT === this.listYLenh[pdtLength - 1]) { // Chọn mẫu phiếu theo y lệnh đầu tiên của bệnh nhân khi vào viện
      this.pcs.type = "1"
    } else {
      this.pcs.type = "2"
    }
    this.pcs.phieu_dieu_tri_id.datetime = this.selectedPDT.datetime
    this.pcs.phieu_dieu_tri_id.current_day_time = this.selectedPDT.used_at_action
    this.pcs.level_care = this.selectedPDT.level_care.level_care_id
  }

  handleChangeDate($event: any) {
    this.pcs.real_created_date = $event.format("HH:mm DD/MM/YYYY")
  }
  // handleGetListYLenh (results: any[]) {
  //   let tempArr: any = []
  //   results.forEach((result: any) =>{
  //     result.data[0].exams[0].services.forEach((service: any) => {
  //       let createdAtValue = service.services.created_at;
  //       service.services.datetime = moment.unix(createdAtValue).format('HH:mm:ss DD/MM/YYYY');
  //       tempArr.push(service.services);
  //     })
  //   })

  //   this.listYLenh = tempArr
  // }

  handleGetListYLenh (results: any[]) {
    let tempArr: any = []
    results.forEach((result: any) =>{
      if(this.pdt_parent_id !== result.data[0].exams[0].services[0].services.parent_id) {
        this.pdt_parent_id = result.data[0].exams[0].services[0].services.parent_id
      }
      result.data[0].exams[0].services.forEach((service: any) => {
        service.services.results.forEach((_result: any) => {
          let createdAtValue = _result.used_at_action;
          _result.datetime = moment.unix(createdAtValue).format('HH:mm:ss DD/MM/YYYY');
          _result.object_id = service.services._id.$id;
          if(_result.level_care && typeof _result.level_care === 'object' && _result.level_care.level_care_id){
            tempArr.push(_result);
          }
        })
      })
      // result.data[0].exams[0].services[0].services.results.forEach((service: any) => {
      //   let createdAtValue = service.used_at_action;
      //   service.datetime = moment.unix(createdAtValue).format('HH:mm:ss DD/MM/YYYY');
      //   service.object_id = result.data[0].exams[0].services[0].services._id.$id;
      //   if(service.level_care && typeof service.level_care === 'object' && service.level_care.level_care_id){
      //     tempArr.push(service);
      //   }
      // })
    })
    tempArr.sort((a: any, b: any) => { // Sắp xếp y lệnh theo ngày tạo
      const dateA: any = new Date(a.datetime);
      const dateB: any = new Date(b.datetime);
      return dateB - dateA;
    });

    this.listYLenh = tempArr
  }

  handleViewPDT () {
    if(!this.selectedPDT || !this.patientInfo) {
      return
    }
      const printModel = {
        results: {
          birthday_string: this.patientInfo.DO_TUOI.toString() + " Tuổi",
          domain: this.globals.API_DOMAIN,
          format: "pdf",
          list_examination_prescription_code: `{$match:{ 'results.examination_prescription_code': {$in: [${this.selectedPDT.examination_prescription_code}]}}},`,
          list_id: `{\"$oid\":\"${this.selectedPDT.object_id}\"}`,
          parent_id: this.pdt_parent_id,
          reception_queue_id: this.patientInfo.reception_queue_id,
          report_router: '/reports/' + this.globals.prefix_report + '/NoiTru/Print/PhieuDieuTri',
          supply_id: 1
        },
      };
      this.printService.printReport(printModel)
  }

  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
  }
  getPDT(){
    this.serviceService.getServiceUsed(
      this.patientInfo.patient_id,
      this.patientInfo.reception_queue_id,
      this.patientInfo.in_patient,
      [{"parent_id": parseInt(this.parent_id)},{"service_category_parent_id": 6}],
      {"key_level_1": "current_day_time"},
      null
    ).subscribe((dataReturn:any) => {
      if(dataReturn.status == true){
        const results = dataReturn.results;
        if(results.length !== 0){
          results.forEach((obj: any) => {
            // Lấy giá trị của trường created_at
            let createdAtValue = obj.data[0].exams[0].services[0].services.created_at;
            // Thêm trường datetime vào
            obj._id.datetime = moment.unix(createdAtValue).format('HH:mm:ss DD/MM/YYYY');
          });
        }
        this.handleGetListYLenh(results)
      }
    })
  }


  ngOnInit(): void {
    this.getListGiayTo();
    this.getTemplateGiayTo('');
    this.currentDate = moment()
    this.dieu_duong_info = localStorage.getItem('user_logged')
    this.parent_info = localStorage.getItem('cache_phongban')
    this.ten_dieu_duong = JSON.parse(this.dieu_duong_info).full_name;
    this.parent_id = JSON.parse(this.parent_info).room_id;
    this.pcs.dieu_duong = {name: JSON.parse(this.dieu_duong_info).full_name, user_signature_image: JSON.parse(this.dieu_duong_info).user_signature_image, user_signature: JSON.parse(this.dieu_duong_info).user_signature}
    this.ID_HIS_PDT = this.getFrontendConfigValue("ID_HIS_PDT", 5003);
    this.initPCSConfig()
    if(this.patientInfo && this.patientInfo.patient_id && this.parent_id){
      this.getPDT();
      this.getChuanDoanPDT()
    }
  }

  resetPhieuChamSoc():void {
    this.pcs = new PhieuLapKeHoachChamSoc()
  }

  handleDefaultSelectedPDT () {
    const pdt = this.listYLenh.find((yLenh: any) => {
    const { current_day_time, datetime } = yLenh;
    return current_day_time === this.pcs.phieu_dieu_tri_id.current_day_time && datetime === this.pcs.phieu_dieu_tri_id.datetime;
  });
    return pdt
  }

  ngOnChanges() {
    if(this.isEdit || this.isCreateGiayToLienQuan) {
      this.isEnabledForm = true
    } else {
      this.isEnabledForm = false
    }
    if(this.patientInfo && this.patientInfo.patient_id && this.parent_id){
      this.getPDT();
      this.getChuanDoanPDT()
    }
    if(this.pcs.real_created_date != "") {
      this.currentDate = moment(this.pcs.real_created_date)
    }
    if (this.isCreateGiayToLienQuan) {
      this.currentDate = moment()
      this.resetPhieuChamSoc()
      this.pcs.real_created_date = this.currentDate.format("HH:mm DD/MM/YYYY")
      if(this.template){
        this.resetTemplate(this.selectGiayToLienQuan)
      }
    }
    if (!this.isCreateGiayToLienQuan && this.checkNonEmpty(this.selectGiayToLienQuan)) {
      this.resetPhieuChamSoc()

      this.pcs = this.selectGiayToLienQuan;

      this.selectedPDT = this.pcs.phieu_dieu_tri_id ? this.pcs.phieu_dieu_tri_id : undefined;
      this.currentDate = moment(this.pcs.real_created_date, 'HH:mm DD/MM/YYYY')
      // if(this.pcs.phieu_dieu_tri_id) {
      //     this.selectedPDT = this.handleDefaultSelectedPDT()
      // } else {
      //   this.selectedPDT = {}
      // }
    }

    this.shareDataService.pushData(this.pcs, 'phieu_lap_ke_hoach_cham_soc');
  }

  getChuanDoanPDT(){
    this.receptionService.getPatientOut(this.patientInfo.reception_queue_id).subscribe((dataReturn: any) => {
      if(dataReturn.status  == true){
        const result = dataReturn.results[0]
        if(result){
          this.pcs.chan_doan = result.examining_diagnosis;
          this.pcs.in_patient_bed_name = result.in_patient_bed_name;
          this.pcs.in_patient_room_name = result.in_patient_room_name;
          this.pcs.parent_name = result.parent_name;
        }
      }
    })
  }

  getTemplateGiayTo(query: string, is_refesh = false){
    setTimeout(()=> {
      if(this.loaiGiayToLienQuan.ID != 0){
        this.isLoadingTab = true;
        this.templateExameService.getTemplates(query, this.loaiGiayToLienQuan.ID).subscribe((data: any) => {
          if (data.status == true) {
            this.listTemplate = data.results;
            this.totalTab = data.total;
            if (this.totalTab > this.queryPage.per_page) {
              this.showPaginatorTab = true;
            } else {
              this.showPaginatorTab = false;
            }
          } else {
            this.totalTab = 0;
          }
          this.isLoadingTab = false;
        })
      }
    }, ((is_refesh) ? 2000 : 0))
  }

  resetTemplate(template: any) {
    this.pcs.chan_doan_cs = template.chan_doan_cs;
    this.pcs.lap_khcs = template.lap_khcs;
    this.pcs.thuc_hien_khcs = template.thuc_hien_khcs;
    this.pcs.danh_gia = template.danh_gia;
  }

  choiceTemplate(event: any){
    this.templateExameService.loadTemplate(event._id).subscribe((dataTemplate: any) =>{
      if(dataTemplate.status == true){
        const temp = dataTemplate.results[0].results;
        this.resetTemplate(temp)
      }
    })
  }

  handleSelectMauPhieu(event: any) {
    // if(event.value !== '1') {
    //   this.listDa = this.listDa.filter((da: any) => da.id !== '6')
    // }
  }
  getListGiayTo() {
    this.emrService.getListBA(1, this.patientInfo.patient_id, this.parent_info.reception_queue_id
      , "FORM_PHIEU_LAP_KE_HOACH_CHAM_SOC", undefined).subscribe((data)=>{
      if (data.status && data.results && data.results.length > 0) {
        this.listGiayTo = data.results[0].results;
      }
    })
  }
}
