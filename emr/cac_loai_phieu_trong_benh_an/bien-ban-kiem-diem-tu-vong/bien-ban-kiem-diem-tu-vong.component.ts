import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { BBKDTV } from '../../../../model/emr/bien_ban_kiem_diem_tu_vong';
import * as moment from 'moment';
import { KhoaDieuTri } from '../../../../model/emr/quan_ly_nguoi_benh';
import { ReceptionService } from '../../../../services/reception.service';
import { ShareDataService } from '../../../../services/share-data.service';
import { GiayToLienQuanComponent } from '../../benh-an-emr/giay-to-lien-quan.component';

@Component({
  selector: 'app-bien-ban-kiem-diem-tu-vong',
  templateUrl: './bien-ban-kiem-diem-tu-vong.component.html',
  styleUrls: ['./bien-ban-kiem-diem-tu-vong.component.scss']
})
export class BienBanKiemDiemTuVongComponent extends GiayToLienQuanComponent implements OnInit, OnChanges {
  bienBanKiemDiemTuVong = new BBKDTV();
  resetKDT: KhoaDieuTri = new KhoaDieuTri();
  filteredRooms: any = [];
  constructor(private receptionService: ReceptionService,
              private shareDataService: ShareDataService) {
    super();
  }

  ngOnInit(): void {
  }
  displayDMKDT(value: any): string {
    return value && value.TEN_KHOA_PHONG ? value.TEN_KHOA_PHONG : '';
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
  onDate(event: any, title: string): void{
    if(title === "DATE_VAO_VIEN"){
      this.bienBanKiemDiemTuVong.VAO_VIEN_LUC_MOMENT = moment(event).unix();
    }
    if(title === "DATE_TU_VONG"){
      this.bienBanKiemDiemTuVong.TU_VONG_LUC_MOMENT = moment(event).unix();
    }
    if(title === "DATE_KIEM_DIEM_TU_VONG"){
      this.bienBanKiemDiemTuVong.KIEM_DIEM_TU_VONG_LUC_MOMENT = moment(event).unix();
    }
  }
  ngOnChanges() {
    if(this.isCreateGiayToLienQuan !== true && this.selectGiayToLienQuan && this.selectGiayToLienQuan.id){
      this.bienBanKiemDiemTuVong = this.selectGiayToLienQuan;
    } else {
      this.bienBanKiemDiemTuVong = new BBKDTV();
    }
    this.shareDataService.pushData(this.bienBanKiemDiemTuVong, "kdtv");
  }
}
