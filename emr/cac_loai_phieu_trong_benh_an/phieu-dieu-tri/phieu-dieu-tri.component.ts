import { Component, Input, OnChanges, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ShareDataService } from '../../../../services/share-data.service';
import { LDT, PDT } from '../../../../model/emr/phieu_dieu_tri';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { KhoaDieuTri } from '../../../../model/emr/quan_ly_nguoi_benh';
import { ReceptionService } from '../../../../services/reception.service';

@Component({
  selector: 'app-phieu-dieu-tri',
  templateUrl: './phieu-dieu-tri.component.html',
  styleUrls: ['./phieu-dieu-tri.component.scss']
})
export class PhieuDieuTriComponent implements OnInit, OnChanges {
  @Input() patientInfo: any;
  @Input() selectGiayToLienQuan: any;
  public editor = ClassicEditor;
  filteredRooms: any = [];
  resetKDT: KhoaDieuTri = new KhoaDieuTri();
  newKhoaDieuTri: KhoaDieuTri = new KhoaDieuTri()
  phieuDieuTri: LDT = new LDT();
  pdt: any = {
    emr: new Array<PDT>()
  };

  constructor(private shareDataService: ShareDataService,
              private receptionService: ReceptionService) { }

  ngOnInit(): void {
    if(this.patientInfo && this.patientInfo.in_patient !== 1){
      this.newKhoaDieuTri.TEN_KHOA_PHONG = "Khoa khám bệnh"
    }
  }

  onDate(event: any, title: string, obj: any): void{
    if(title === "DATE_DIEU_TRI"){
      this.phieuDieuTri.USED_AT_ACTION_MOMENT = moment(event).unix();
      this.phieuDieuTri.Ngaygio.DATE = moment(event).format("DD/MM/YYYY");
      this.phieuDieuTri.Ngaygio.TIME = moment(event).format("HH:mm");
    }
    if(title === "DATE_DIEU_TRI" && obj){
      obj.USED_AT_ACTION_MOMENT = moment(event).unix();
      obj.Ngaygio.DATE = moment(event).format("DD/MM/YYYY");
      obj.Ngaygio.TIME = moment(event).format("HH:mm");
    }
  }

  createDieuTri(objCreate: any, newKhoaDieuTri: any){
    // this.pdt.emr.DT_Noidung.push(objCreate);
    let index : number = this.pdt.emr.findIndex((emr: any) =>{
      return newKhoaDieuTri.TEN_KHOA_PHONG === emr.DT_Khoa.TEN_KHOA_PHONG;
    })
    if(index !== -1){
      this.pdt.emr[index].DT_Noidung.push(objCreate);
    }else{
      if(this.pdt.emr[0] && this.pdt.emr[0].DT_Noidung && this.pdt.emr[0].DT_Noidung.length >  0){
        this.pdt.emr[0].DT_Noidung.push(objCreate);
      } else {
        this.pdt.emr[0] = new PDT();
        this.pdt.emr[0].DT_Noidung = [objCreate];
      }
    }
    this.phieuDieuTri = new LDT();
  }
  removeDieuTri(indexOfelement: number, indexOfelementParent: number){
    this.pdt[indexOfelementParent].DT_Noidung.splice(indexOfelement, 1);
    if(this.pdt.emr.DT_Noidung.length === 0){
      this.pdt.emr.splice(indexOfelementParent, 1);
    }
  }

  ngOnChanges() {
    if(this.selectGiayToLienQuan && this.selectGiayToLienQuan.emr){
      //todo: trường hợp nội trú -> lấy về dữ liệu khác vs ngoại trú
      this.pdt = this.selectGiayToLienQuan
    }
    // if(this.selectGiayToLienQuan && this.patientInfo.in_patient !== 1){
    //   this.pdt = this.selectGiayToLienQuan.emr
    // }
    this.shareDataService.pushData(this.pdt, "phieu_dieu_tri");
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
  displayDMKDT(value: any): string {
    return value && value.TEN_KHOA_PHONG ? value.TEN_KHOA_PHONG : '';
  }
}
