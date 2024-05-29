import { Component, Input, OnInit } from '@angular/core';
import { ShareDataService } from '../../../../services/share-data.service';
import moment, { Moment } from 'moment';
import { DM} from '../../../../model/Patient_EMR';
import { DateTime } from '../../../../model/emr/global';
import { ReceptionService } from '../../../../services/reception.service';

export class TU_CHOI_DIEU_TRI {
  NGAY_GIO= <number | null>null;
  ngay_gio= moment();
  DO_TUOI = 0;
  GIOI_TINH: DM[] = [];
  vao_vien_luc: Moment | null = moment();
  VAO_VIEN_LUC = new DateTime();
  DOI_TUONG = new DM();
  MQH_VOI_NGUOI_BENH = '';
  HO_TEN = '';
  DIA_CHI = '';
  SO_CMTND = '';
  ngay_cap: Moment | null = moment();
  NGAY_CAP = new DateTime();
  SDT_KHI_CAN_BAO_TIN = 0;
  CHAN_DOAN: DM[] = [];
  NGUYEN_VONG_DIEU_TRI_CUA_GIA_DINH = '';

}
@Component({
  selector: 'app-phieu-tu-choi-dieu-tri',
  templateUrl: './phieu-tu-choi-dieu-tri.component.html',
  styleUrls: ['./phieu-tu-choi-dieu-tri.component.scss']
})
export class PhieuTuChoiDieuTriComponent implements OnInit {
  tuChoiDieuTri = new TU_CHOI_DIEU_TRI();
  readonly FORM_NAME = 'FORM_TU_CHOI_DIEU_TRI';
  @Input() patientInfo: any;
  @Input() selectGiayToLienQuan: any;
  @Input() isCreateGiayToLienQuan: any;
  @Input() idGiayTo = 5095;
  @Input() patient?: any;
  isDisabled = true;
  filteredRooms: any = [];
  constructor( private shareDataService: ShareDataService,
               private receptionService: ReceptionService,) { }

  ngOnInit(): void {
  }
  listDoiTuong = [
    {
      ID: "1",
      MA: "1",
      MO_TA: "Bệnh nhân"
    },
    {
      ID: "2",
      MA: "2",
      MO_TA: "Người nhà bệnh nhân"
    }
  ];
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
  displayDMICD(value: any): string {
    return value && value.TEN ? value.TEN : '';
  }
  displayDMKDT(value: any): string {
    return value && value.TEN_KHOA_PHONG ? value.TEN_KHOA_PHONG : '';
  }
  ngOnChanges()  {
    console.log(">>>", this.patientInfo);
    let dataReturn = this.tuChoiDieuTri;
    if(this.selectGiayToLienQuan && ! this.isCreateGiayToLienQuan) {
      dataReturn = Object.assign(dataReturn, this.selectGiayToLienQuan);
    }
    this.shareDataService.pushData(dataReturn, 'tu_choi_dieu_tri');
  }

}
