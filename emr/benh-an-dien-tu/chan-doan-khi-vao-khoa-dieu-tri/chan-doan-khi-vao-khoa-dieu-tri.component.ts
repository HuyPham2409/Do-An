import { Component, Input, OnInit, SimpleChanges, OnChanges} from '@angular/core';
import { CD_KhoaDT } from '../../../../model/emr/chan_doan';
import { DM } from '../../../../model/Patient_EMR';
import { ExaminationService } from '../../../../services/examination.service';
import { ReceptionService } from '../../../../services/reception.service';
import { ShareDataService } from '../../../../services/share-data.service';
import { Subscription } from 'rxjs';
import { EmrService } from '../../../../services/emr.service';

@Component({
  selector: 'app-chan-doan-khi-vao-khoa-dieu-tri',
  templateUrl: './chan-doan-khi-vao-khoa-dieu-tri.component.html',
  styleUrls: ['./chan-doan-khi-vao-khoa-dieu-tri.component.scss']
})
export class ChanDoanKhiVaoKhoaDieuTriComponent implements OnInit,OnChanges {
  @Input() patientInfo: any;
  @Input() ID_BENH_AN: any;
  @Input() isCreatingNew: any
  @Input() thongTinChanDoan: any
  chanDoanDieuTri : CD_KhoaDT = new CD_KhoaDT();
  filteredICDs : any = [];
  resetDM: DM = new DM();
  showField: any;
  subsChanDoan: Subscription = new Subscription();//todo: chẩn đoán

  /**
   * TODO: Dùng tên bệnh án thay vì ID bệnh án
   */
  @Input() tenBenhAn = '';
  private readonly componentName = 'chan_doan_khi_vao_khoa_dieu_tri';

  @Input() counter_chanDoanKhiVaoKhoaDieuTri = 'X. ';

  constructor(private examinationService: ExaminationService,
              private receptionService: ReceptionService,
              private shareDataService: ShareDataService,
              private emrService: EmrService
  ) { }

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
    if(changes.patientInfo && this.patientInfo) {
      let value = this.patientInfo.results?.chan_doan_kdt;
      if(value) {
        this.chanDoanDieuTri.CHAN_DOAN_BENH_CHINH = value.CHAN_DOAN_BENH_CHINH || new DM();
        this.chanDoanDieuTri.CHAN_DOAN_BENH_PHU = value.CHAN_DOAN_BENH_PHU || new DM();
        this.chanDoanDieuTri.CHAN_DOAN_BENH_KEM_THEO = value.CHAN_DOAN_BENH_KEM_THEO || [];
        this.chanDoanDieuTri.CHAN_DOAN_PHAN_BIET = value.CHAN_DOAN_PHAN_BIET || new DM();
        this.chanDoanDieuTri.TNM_GIAI_DOAN = value.TNM_GIAI_DOAN || new DM();
      }
    }
    // Link thong tin chan doan khoa dieu tri tu Quan li noi tru khi tao moi
    if(changes.thongTinChanDoan && this.thongTinChanDoan && this.isCreatingNew === true) {
      let tempArr: DM[] = []
      let tempCDBC: DM = new DM();
      this.thongTinChanDoan.examining_service_icd.forEach((item: any, index: number) => {
        if(index === 0) {
          tempCDBC.ID = item.service_id
          tempCDBC.MA = item.service_code
          tempCDBC.MO_TA = item.service_name
        } else {
          tempArr.push({
            ID: item.service_id,
            MA: item.service_code,
            MO_TA: item.service_name,
          })
        }
      })
      this.chanDoanDieuTri.CHAN_DOAN_BENH_CHINH = tempCDBC
      this.chanDoanDieuTri.CHAN_DOAN_BENH_KEM_THEO = tempArr
      this.createBenhPhuString()
    }

    // this.subsChanDoan = this.shareDataService.pullData("chan_doan_kdt").subscribe(value => {
    //   if (!value){
    //     // console.log('no value')
    //     return;
    //   }
    //   this.chanDoanDieuTri.CHAN_DOAN_BENH_CHINH = value.CHAN_DOAN_BENH_CHINH || new DM();
    //   this.chanDoanDieuTri.CHAN_DOAN_BENH_PHU = value.CHAN_DOAN_BENH_PHU || new DM();
    //   this.chanDoanDieuTri.CHAN_DOAN_BENH_KEM_THEO = value.CHAN_DOAN_BENH_KEM_THEO || [];
    //   this.chanDoanDieuTri.CHAN_DOAN_PHAN_BIET = value.CHAN_DOAN_PHAN_BIET || new DM();
    //   this.chanDoanDieuTri.TNM_GIAI_DOAN = value.TNM_GIAI_DOAN || new DM();
    // });

    this.shareDataService.pushData(this.chanDoanDieuTri, "chan_doan_kdt");
  }
  createBenhPhuString() {
    if(this.chanDoanDieuTri.CHAN_DOAN_BENH_KEM_THEO.length > 0) {
      this.chanDoanDieuTri.text_chan_doan_kdt = this.chanDoanDieuTri.CHAN_DOAN_BENH_KEM_THEO.map(item => item.MO_TA).join(', ')
      this.chanDoanDieuTri.text_ma_icd_chan_doan_kdt = this.chanDoanDieuTri.CHAN_DOAN_BENH_KEM_THEO.map(item => item.MA).join(', ')
    }
  }
  handleChangeBenhPhu ($event: any) {
    if($event.items.length > 0) {
      this.chanDoanDieuTri.text_chan_doan_kdt = ""
      this.createBenhPhuString()
    }
  }
  displayDMICD(value: any): string {
    return value && value.MO_TA ? value.MA + " - " + value.MO_TA : '';
  }
  filterICD(textSearch: any) {
    this.examinationService.filterICD(textSearch).subscribe(dataReturn => {
      if(dataReturn.status === true){
        this.filteredICDs = this.receptionService.convertDM("service", dataReturn.results);
      }
    });
  }
}
