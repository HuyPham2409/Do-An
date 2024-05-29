import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MY_FORMATS_DATE_PICKER } from '../../../../model/format_date_picker';
import { ReceptionService } from '../../../../services/reception.service';
import { DM, Patient_EMR } from '../../../../model/Patient_EMR';
import { LocalStorageService } from '@shared';
import { ShareDataService } from '../../../../services/share-data.service';
import { EmrService } from '../../../../services/emr.service';
import { HisPatientInfo } from '../../../../model/emr/patient/patient-info';

@Component({
  selector: 'app-hanh-chinh',
  templateUrl: './hanh-chinh.component.html',
  styleUrls: ['./hanh-chinh.component.scss'],
  providers : [
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS_DATE_PICKER}
  ]
})
export class HanhChinhComponent implements OnInit  {
  @Input() patientInfo: any;
  @Input() patientInfoHis!: HisPatientInfo;
  @Input() ID_BENH_AN: any;

  /**
   * TODO: Dùng tên bệnh án thay vì ID bệnh án
   */
  @Input() tenBenhAn = '';
  private readonly componentName = 'hanh_chinh';

  patientHanhChinh!: Patient_EMR;
  filteredPositions : any[] = [];
  filteredEthnics: any[] = [];
  filteredCountrys : any[] = [];
  filteredTowns: any[] = [];
  filteredProvinces: any[] = [];
  filteredDistricts: any[] = [];
  resetDM: DM = new DM();
  date1: any;
  user_logged: any;
  showField : any;
  listDT = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "1. BHYT"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "2. Thu phí"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "3. Miễn"
    },
    {
      ID:"4",
      MA: "4",
      MO_TA: "4. Khác"
    }
  ];
  listNoiGioiThieu = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "Y tế"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "Tự đến"
    }
  ];
  listGiayCNKhuyetTat = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "Không có"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "Có"
    }
  ];
  nhomMau = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "A"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "B"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "AB"
    },
    {
      ID:"4",
      MA: "4",
      MO_TA: "O"
    },
  ]
  yeuToRh = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "Không xác định"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "Dương tính"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "Âm tính"
    },
  ]
  constructor(private receptionService: ReceptionService,
              private localStorageService : LocalStorageService,
              private shareDataService: ShareDataService,
              private emrService: EmrService
              ) {}
  ngOnInit(): void {
    if (!this.patientHanhChinh) {
      this.patientHanhChinh = new Patient_EMR();
    }

    this.user_logged = this.localStorageService.get("user_logged");
    /**
     * TODO: Nếu dùng name thì không dùng ID_BENH_AN
     */
    if (this.tenBenhAn) {
      this.emrService.getShowFieldComponentByConfig_new(this.componentName, this.tenBenhAn).then((dataReturn: any) => {
        this.showField = dataReturn
      }
      );
    } else {
      this.emrService.getShowFieldComponentByConfig(this.componentName, this.ID_BENH_AN.toString()).then((dataReturn: any) => {
        this.showField = dataReturn
      });
    }

    this.emrService.getDM('doi_tuong_tai_chinh')
      .subscribe((res) => this.listDT = res);
  }

  onDate(event: any, title: string): void{
    if(title === "GT_THE_DEN"){
      this.patientHanhChinh.GT_THE_DEN = moment(event).format("DD/MM/YYYY");
    }
    if(title === "NGAY_SINH"){
      this.patientHanhChinh.NGAY_SINH = moment(event).format("DD/MM/YYYY");
      this.patientHanhChinh.DO_TUOI = moment().diff(event, 'years');
    }
    if(title === "NGAY_SINH_ME"){
      this.patientHanhChinh.NGAY_SINH_ME = moment(event).format("DD/MM/YYYY");
    }
    if(title === "NGAY_SINH_BO"){
      this.patientHanhChinh.NGAY_SINH_BO = moment(event).format("DD/MM/YYYY");
    }
    if(title === "THOI_DIEM_DEN_KHAM_BENH"){
      this.patientHanhChinh.THOI_DIEM_DEN_KHAM_BENH.DATE = moment(event).format("DD/MM/YYYY");
      this.patientHanhChinh.THOI_DIEM_DEN_KHAM_BENH.TIME = moment(event).format("HH:mm")
    }
    if (title === 'vao_vien_hoi') {
      this.patientHanhChinh.VAO_VIEN_HOI.DATE = moment(event).format('DD/MM/YYYY');
      this.patientHanhChinh.VAO_VIEN_HOI.TIME = moment(event).format('HH:mm');
    }
  }
  filterPosition(value: any) : void {
    if (value || value === "") {
      this.receptionService.filterCategorySystem(value,"position").subscribe(dataReturn => {
        if(dataReturn.status === true){
          this.filteredPositions = this.receptionService.convertDM("position", dataReturn.results) as any[];
        }else{
          this.filteredPositions = [];
        }
      });
    }
  }

  filterEthnic(value: any) : void {
    if (value || value === "") {
      this.receptionService.filterCategoryEthnic(value).subscribe(dataReturn => {
        if(dataReturn.status === true){
          this.filteredEthnics = this.receptionService.convertDM("ethnic", dataReturn.results) as any[];
        }else{
          this.filteredEthnics = [];
        }
      });
    }
  }

  filterCountry(value: any) : void {
    if (value || value === "") {
      this.receptionService.filterCategoryCountry(value).subscribe(dataReturn => {
        if(dataReturn.status === true){
          this.filteredCountrys = this.receptionService.convertDM("country", dataReturn.results) as any[];
        }else{
          this.filteredCountrys = [];
        }
      });
    }
  }

  filterProvince(value: any) : void {
    if (value || value === "") {
      this.receptionService.filterCategoryProvince(value, this.patientHanhChinh.QUOC_TICH ? this.patientHanhChinh.QUOC_TICH.ID : this.user_logged.company_config.country[0].country_id ).subscribe(dataReturn => {
        if(dataReturn.status === true){
          this.filteredProvinces = this.receptionService.convertDM("province", dataReturn.results) as any[];
        }else{
          this.filteredProvinces = [];
        }
      });
    }
  }

  filterDistrict(value: any) : void {
    if (value || value === "") {
      this.receptionService.filterCategoryDistrict(value, this.patientHanhChinh.TINH_THANH ? this.patientHanhChinh.TINH_THANH.ID : this.user_logged.company_config.province[0].province_id ).subscribe(dataReturn => {
        if(dataReturn.status === true){
          this.filteredDistricts = this.receptionService.convertDM("district", dataReturn.results) as any[];
        }else{
          this.filteredDistricts = [];
        }
      });
    }
  }

  filterTown(value: any) : void {
    if (value || value === "") {
      this.receptionService.filterCategoryTown(value, this.patientHanhChinh.QUAN_HUYEN.ID ).subscribe(dataReturn => {
        if(dataReturn.status === true){
          this.filteredTowns = this.receptionService.convertDM("town", dataReturn.results) as any[];
        }else{
          this.filteredTowns = [];
        }
      });
    }
  }

  displayDM(value: any): string {
    return value && value.MO_TA ? value.MO_TA : '';
  }
  changeRadioSex(event: any) {
    this.patientHanhChinh.GIOI_TINH = {
      ID: event + "",
      MA: event + "",
      MO_TA: event === '1' ? "Nam" : (event === '2' ? "Nữ" : "")
    }
  }
  changeRadioNhomMau(event: any) {
    this.patientHanhChinh.NHOM_MAU_ME.NHOM_MAU = {
      ID: event + "",
      MA: event + "",
      MO_TA: event === '1' ? "A" : (event === '2' ? "B" : (event === '3' ? "AB" : (event === '4' ? "O" : "")))
    }
  }

  ngOnChanges(){
    if(this.patientInfo && !this.patientInfo.idEMR){
      //todo: tạo mới EMR
      this.patientHanhChinh = this.patientInfo;
    }
    if(this.patientInfo.results && this.patientInfo.idEMR && this.patientInfo.results.hc){
      //todo: sửa emr
      this.patientHanhChinh = this.patientInfo.results.hc;
      this.patientHanhChinh.until_health_insurance = moment(this.patientHanhChinh.GT_THE_DEN, "DD/MM/YYYY");
      // this.patientHanhChinh.birthdayString = moment(this.patientHanhChinh.NGAY_SINH, "DD/MM/YYYY");
    }
    this.shareDataService.pushData(this.patientHanhChinh, "hc");
  }
  reset(title: string) {
    if (title === "GIAY_CN_KHUYET_TAT") {
      if (this.patientHanhChinh.LIST_GIAY_CN_KHUYET_TAT.ID === "1") {
        this.patientHanhChinh.DANG_KHUYET_TAT= "";
        this.patientHanhChinh.MUC_DO_KHUYET_TAT= "";
      }
    }
  }
}
