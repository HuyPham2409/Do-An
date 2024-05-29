import { Component, Input, OnInit } from '@angular/core';
import { ShareDataService } from '../../../../services/share-data.service';
import { ReceptionService } from '../../../../services/reception.service';
import { DM } from '../../../../model/Patient_EMR';
import moment, { Moment } from 'moment';
import { SelectionModel } from '@angular/cdk/collections';
import { LocalStorageService } from '@shared';
import { EhosResponse } from '../../../../model/api/response';

export class THEO_DOI_GIAM_DAU_SAU_MO {
  height = 0;
  weight = 0;
  NGHE_NGHIEP = new DM();
  CHAN_DOAN = '';
  PHAU_THUAT = '';
  PP_VO_CAM = '';
  PP_GIAM_DAU = '';
  VI_TRI_CHOC_KIM = '';
  KHOANG_CACH_DA = 0;
  DO_DAI_CATHETER = 0;
  result = {
    list_theo_doi: <TheoDoiGiamDauSauMo[]>[]
  };
}
class TheoDoiGiamDauSauMo {
  TOAN_TRANG = '';
  DIEM_VAS = '';
  TOC_DO_TRUYEN = '';
  MACH = '';
  HUYET_AP = '';
  NHIP_THO = '';
  SPO2 = '';
  BUON_NON = '';
  RUN = '';
  NGUA = '';
  VD_CHI_DUOI = '';
  CG_CHI_DUOI = '';
  BI_TIEU = '';
  TD_PHU_KHAC = '';
  DD_KY = '';
  created_by = ''; // user_name
  time_unix: number | null;
  time_moment: Moment;
  id = 0;
  constructor(isAddedByUser?: boolean) {
    const now = moment();
    const nowUnix = now.unix();
    this.time_unix = nowUnix;
    this.time_moment = moment(now);
    if (isAddedByUser) {
      this.id = nowUnix;
    }
  }
}
@Component({
  selector: 'app-phieu-theo-doi-giam-dau-sau-mo',
  templateUrl: './phieu-theo-doi-giam-dau-sau-mo.component.html',
  styleUrls: ['./phieu-theo-doi-giam-dau-sau-mo.component.scss']
})
export class PhieuTheoDoiGiamDauSauMoComponent implements OnInit {
  tdGiamDauSauMo = new THEO_DOI_GIAM_DAU_SAU_MO();
  bloodPressureSelect = new SelectionModel<number>(false, []);
  TheoDoiGiamDauSauMo = new TheoDoiGiamDauSauMo();
  displayListTDGDSM: TheoDoiGiamDauSauMo[] = [];
  readonly FORM_NAME = 'FORM_THEO_DOI_GIAM_DAU_SAU_MO';
  @Input() patientInfo: any;
  @Input() selectGiayToLienQuan: any;
  @Input() isCreateGiayToLienQuan: any;
  @Input() idGiayTo = 5098;
  @Input() patient?: any;

  isDisabled = true;
  resetDM: DM = new DM();
  positions: DM[] = [];
  constructor(private shareDataService: ShareDataService,
              private receptionService: ReceptionService,
              private storageService: LocalStorageService) {
    this.filterPosition();
  }

  ngOnInit(): void {
  }
  filterPosition(query = '') {
    this.receptionService.filterCategorySystem(query, 'position').subscribe((res: Partial<EhosResponse<any[]>>) => {
      if (res.status) {
        this.positions = this.receptionService.convertDM('position', res.results);
      } else {
        this.positions = [];
      }
    });
  }
  displayDM(value: any): string {
    return value && value.MO_TA ? value.MO_TA : '';
  }
  displayDMICD(value: any): string {
    return value && value.TEN ? value.TEN : '';
  }
  addBloodPressure() {
    const newBP = new TheoDoiGiamDauSauMo(true);
    this.tdGiamDauSauMo.result.list_theo_doi.push(newBP);
    this.selectBloodPressure(newBP.id);
    newBP.created_by = this.storageService.getUserLogged().user_name;
    this.redrawList();
  }
  selectBloodPressure(id: number) {
    this.bloodPressureSelect.select(id);
    this.TheoDoiGiamDauSauMo = this.findBloodPressure(id) || new TheoDoiGiamDauSauMo();
  }
  private findBloodPressure(id: number): TheoDoiGiamDauSauMo | undefined {
    return this.tdGiamDauSauMo.result.list_theo_doi.find(bp => bp.id === id);
  }
  private redrawList() {
    this.displayListTDGDSM = [...this.tdGiamDauSauMo.result.list_theo_doi];
  }
  removeBloodPressure(id: number) {
    const index = this.tdGiamDauSauMo.result.list_theo_doi.findIndex(bp => bp.id === id);
    if (index > -1) {
      this.tdGiamDauSauMo.result.list_theo_doi.splice(index, 1);
      this.redrawList();
    }
  }
  ngOnChanges() {
    // console.log(">>>", this.patientInfo);
    let dataReturn = this.tdGiamDauSauMo;
    if(this.selectGiayToLienQuan && ! this.isCreateGiayToLienQuan) {
      dataReturn = Object.assign(dataReturn, this.selectGiayToLienQuan);
      this.selectBloodPressure(this.bloodPressureSelect.selected[0]);
    }
    if(this.isCreateGiayToLienQuan || !this.tdGiamDauSauMo){
      this.tdGiamDauSauMo = new THEO_DOI_GIAM_DAU_SAU_MO();
    }
    this.redrawList();
    this.shareDataService.pushData(dataReturn, 'td_giam_dau_sau_mo');
  }
}
