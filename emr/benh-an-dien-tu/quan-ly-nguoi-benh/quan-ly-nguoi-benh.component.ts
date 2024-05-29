import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { dieuTri, KhoaDieuTri, QLNB } from '../../../../model/emr/quan_ly_nguoi_benh';
import * as moment from 'moment';
import { ReceptionService } from '../../../../services/reception.service';
import { DM } from '../../../../model/Patient_EMR';
import { ShareDataService } from '../../../../services/share-data.service';
import { EmrService } from '../../../../services/emr.service';
import { EmrPatientInfo } from '../../../../model/emr/patient/patient-info';
import { DT } from '../../../../model/emr/global';

@Component({
  selector: 'app-quan-ly-nguoi-benh',
  templateUrl: './quan-ly-nguoi-benh.component.html',
  styleUrls: ['./quan-ly-nguoi-benh.component.scss']
})
export class QuanLyNguoiBenhComponent implements OnInit, OnChanges {
  @Input() patientInfo: any;
  @Input() quanLyNguoiBenh: any;
  @Input() ID_BENH_AN: any;

  /**
   * TODO: Dùng tên bệnh án thay vì ID bệnh án
   */
  @Input() tenBenhAn = '';
  private readonly componentName = 'quan_ly_nguoi_benh';

  listNoiVaoVien: Array<DM> = new Array<DM>();
  listNoiGioiThieu: Array<DM> = new Array<DM>();
  qlnb: QLNB = new QLNB(); //quan ly nguoi benh
  filteredRooms: any = [];
  filteredHospitals: any = [];
  resetKDT: KhoaDieuTri = new KhoaDieuTri();
  showField : any;
  resetDM: DM = new DM();

  list_HINH_THUC_RA_VIEN: DM[] = [];
  dieuTri: dieuTri = new dieuTri();
  dieuTriList: dieuTri[] = [];
  LICH_SU_DIEU_TRI: DT[] = [];

  constructor(private receptionService: ReceptionService,
              private emrService: EmrService,
              private shareDataService: ShareDataService) { }

  ngOnInit(): void {
    this.emrService.getDMNoiGioiThieu().subscribe(data => {
      this.listNoiGioiThieu = data;
    })
    this.emrService.getDMNoiVaoVien().subscribe(data => {
      this.listNoiVaoVien = data;
    })
    if(this.patientInfo.in_patient === 1){
      this.emrService.getDMNoiVaoVien().subscribe(data => {
        this.listNoiVaoVien = data;
      })
    }
    /**
     * TODO: Nếu dùng name thì không dùng ID_BENH_AN
     */
    if (this.tenBenhAn) {
      this.emrService.getShowFieldComponentByConfig_new(this.componentName, this.tenBenhAn).then((dataReturn: any) => this.showField = dataReturn);
    } else {
      this.emrService.getShowFieldComponentByConfig(this.componentName, this.ID_BENH_AN.toString()).then((dataReturn: any) => this.showField = dataReturn);
    }

    // Radio
    switch (this.tenBenhAn) {
      case 'EMR_BENH_AN_YHCT_NOI_TRU': {
        this.list_HINH_THUC_RA_VIEN = [
          {
            ID: '1',
            MA: '',
            MO_TA: '1. Ra viện'
          },
          {
            ID: '2',
            MA: '',
            MO_TA: '2. Xin về'
          },
          {
            ID: '3',
            MA: '',
            MO_TA: '3. Bỏ về'
          }
        ];
        break;
      }
      default: {
        this.list_HINH_THUC_RA_VIEN = [
          {
            ID: '1',
            MA: '',
            MO_TA: '1. Ra viện'
          },
          {
            ID: '2',
            MA: '',
            MO_TA: '2. Xin về'
          },
          {
            ID: '3',
            MA: '',
            MO_TA: '3. Bỏ về'
          },
          {
            ID: '4',
            MA: '',
            MO_TA: '4. Đưa về'
          },
        ];
      }
    }
  }

  onDate(event: any, title: string, index?: number): void{
    if(title === "thoi_diem_vao_vien"){
      this.qlnb.VAO_VIEN.THOI_DIEM_VAO_VIEN.DATE = moment(event).format("DD/MM/YYYY");
      this.qlnb.VAO_VIEN.THOI_DIEM_VAO_VIEN.TIME = moment(event).format("HH:mm");
    }
    if(title === "THOI_DIEM_BAT_DAU" && index !== undefined){
      this.qlnb.DIEU_TRI.LICH_SU_KHOA_DIEU_TRI[index].THOI_DIEM_BAT_DAU.DATE = moment(event).format("DD/MM/YYYY");
    }
    if(title === "NGAY_RA_VIEN"){
      const ngay_ra_vien = moment(event);
      this.qlnb.RA_VIEN.NGAY_RA_VIEN.DATE = ngay_ra_vien.format("DD/MM/YYYY");
      this.qlnb.RA_VIEN.NGAY_RA_VIEN.TIME = ngay_ra_vien.format("HH:mm");

      const firstNgayVaoVien = this.qlnb.DIEU_TRI.LICH_SU_KHOA_DIEU_TRI[0]?.thoi_diem_vao_khoa;
      if (firstNgayVaoVien) {
        this.qlnb.TONG_SO_NGAY_DTRI = ngay_ra_vien.diff(firstNgayVaoVien, 'days');
      }
    }
  }

  calDate(event: any, title: string, index: number){
    if(title === "SO_NGAY_DIEU_TRI"){
      this.qlnb.DIEU_TRI.LICH_SU_KHOA_DIEU_TRI[index].THOI_DIEM_KET_THUC.DATE = moment(moment(this.qlnb.DIEU_TRI.LICH_SU_KHOA_DIEU_TRI[index].thoi_diem_vao_khoa).add(event, "days")).format("DD/MM/YYYY");
      this.qlnb.DIEU_TRI.LICH_SU_KHOA_DIEU_TRI[index].THOI_DIEM_KET_THUC.TIME = this.qlnb.DIEU_TRI.LICH_SU_KHOA_DIEU_TRI[index].THOI_DIEM_BAT_DAU.TIME;
    }
  }
  displayDMKDT(value: any): string {
    return value && value.TEN_KHOA_PHONG ? value.TEN_KHOA_PHONG : '';
  }
  displayDM(value: any): string {
    return value && value.MO_TA ? value.MO_TA : '';
  }
  filterRoom(value: any){
    var objParam = {
      active: 1,
      query: value,
      room_type_id: 568
    }
    this.receptionService.filterRoom(objParam).subscribe(dataReturn =>{
      if(dataReturn.status === true){
        this.filteredRooms = this.receptionService.convertKDT(dataReturn.results);
      }else{
        this.filteredRooms = [];
      }
    })
  }
  filterHospital(value: any){
    this.receptionService.filterHospital(value).subscribe(dataReturn => {
      if(dataReturn.status === true){
        this.filteredHospitals = this.receptionService.convertDM("hospital", dataReturn.results);
      }else{
        this.filteredHospitals = [];
      }
    })
  }

  private static convertDataToServer(data: any, key: 'time' | 'name' | 'description') {
    switch (key) {
      case 'time': {
        return {
          DATE: data ? moment(data).format('DD/MM/YYYY') : '',
          TIME: data ? moment(data).format('HH:mm') : '',
          TIME_ZONE: data,
        };
      }
      case 'name': {
        return {
          HO: data,
          TEN: data,
          CHUC_DANH: data,
        };
      }
      case 'description': {
        return data;
      }
    }
  }

  addDieuTri() {
    this.dieuTriList.push({...this.dieuTri});
    this.qlnb.LICH_SU_DIEU_TRI.push({
      THOI_GIAN: QuanLyNguoiBenhComponent.convertDataToServer(this.dieuTri.thoi_gian,'time'),
      DOT_DIEU_TRI: QuanLyNguoiBenhComponent.convertDataToServer(this.dieuTri.dot,'description'),
      DIEU_TRI_NGOAI_TRU: QuanLyNguoiBenhComponent.convertDataToServer(this.dieuTri.ngoai_tru, 'description'),
      DT_Noidung: QuanLyNguoiBenhComponent.convertDataToServer(this.dieuTri.DT_Noidung, 'description'),
    })
    this.dieuTri = new dieuTri();
  }
  handleChange = (data: any, key: string, index: number) => {
    switch (key) {
      case 'time': {
        this.qlnb.LICH_SU_DIEU_TRI[index].THOI_GIAN = QuanLyNguoiBenhComponent.convertDataToServer(data, 'time');
        break;
      }
      case 'description': {
        this.qlnb.LICH_SU_DIEU_TRI[index].DIEU_TRI_NGOAI_TRU = QuanLyNguoiBenhComponent.convertDataToServer(data, 'description');
        break;
      }
      case 'dot': {
        this.qlnb.LICH_SU_DIEU_TRI[index].DOT_DIEU_TRI = QuanLyNguoiBenhComponent.convertDataToServer(data, 'description');
        break;
      }
    }
  };

  removePtHis(index: any) {
    this.dieuTriList.splice(index, 1);
    this.qlnb.LICH_SU_DIEU_TRI.splice(index, 1);
  }

  ngOnChanges(changes: SimpleChanges){
    if (changes.patientInfo?.currentValue) {
      const patientInfo = changes.patientInfo.currentValue as EmrPatientInfo;

      // Load
      if(patientInfo.idEMR && patientInfo.results && patientInfo.results.qlnb) {
        // Backwards compatibility
        if (!Array.isArray(patientInfo.results.qlnb.DIEU_TRI.LICH_SU_KHOA_DIEU_TRI)) {
          patientInfo.results.qlnb.DIEU_TRI.LICH_SU_KHOA_DIEU_TRI = [patientInfo.results.qlnb.DIEU_TRI.LICH_SU_KHOA_DIEU_TRI];
        }
        this.qlnb = patientInfo.results.qlnb;

        if (!this.qlnb.LICH_SU_DIEU_TRI) {
          this.qlnb.LICH_SU_DIEU_TRI = [];
        }
        this.dieuTriList = this.qlnb.LICH_SU_DIEU_TRI.map((item) => {
          return {
            thoi_gian: moment(`${item.THOI_GIAN.DATE} ${item.THOI_GIAN.TIME}`, 'DD/MM/YYYY HH:mm'),
            dot: item.DOT_DIEU_TRI,
            ngoai_tru: item.DIEU_TRI_NGOAI_TRU,
            DT_Noidung: item.DT_Noidung,
          };
        });
      }
      // Default
      else if (!patientInfo.idEMR && changes.quanLyNguoiBenh?.currentValue) {
        this.qlnb = changes.quanLyNguoiBenh?.currentValue;
      }
    }
    this.shareDataService.pushData(this.qlnb, "qlnb");
  }
}
