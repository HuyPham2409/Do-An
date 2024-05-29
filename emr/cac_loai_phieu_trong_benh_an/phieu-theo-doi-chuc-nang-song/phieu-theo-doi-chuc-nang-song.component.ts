import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ShareDataService } from '../../../../services/share-data.service';
import { GiayToLienQuanComponent } from '../../benh-an-emr/giay-to-lien-quan.component';
import moment from 'moment';
import { SelectionModel } from '@angular/cdk/collections';
import { LocalStorageService } from '@shared';
import { CanBoYTe } from '../../../../model/emr/quan_ly_nguoi_benh';
import { Address } from '../../../../model/emr/global';
import { BloodPressurePTDCNS } from '../../../../model/giay_to_dinh_kem_emr/phieu_theo_doi_chuc_nang_song';
import { LabratoryMenuService, MenuViewModeEnum } from 'app/services/laboratory/labratory-menu.service';

class PTDCNS {
  result = {
    blood_pressure: <BloodPressurePTDCNS[]>[],
  };
  tieu_de_1= "";
  tieu_de_2= "";
  tieu_de_3= ""
}
class newParent {
  parent_name:string='';
  listPTDCNS: BloodPressurePTDCNS[] =[];
}

@Component({
  selector: 'app-phieu-theo-doi-chuc-nang-song',
  templateUrl: './phieu-theo-doi-chuc-nang-song.component.html',
  styleUrls: ['./phieu-theo-doi-chuc-nang-song.component.scss']
})
export class PhieuTheoDoiChucNangSongComponent extends GiayToLienQuanComponent implements OnInit, OnChanges {
  @Output() disabledChange = new EventEmitter<boolean>();
  @Input() isEdit!:boolean
  phieuTDCNS!: PTDCNS;
  displayListTDCNS: BloodPressurePTDCNS[] = [];
  displayListParent: any = [];
  listParent: newParent[] = [];
  listPTD: BloodPressurePTDCNS[] = [];
  bloodPressureSelect = new SelectionModel<number>(false, []);
  selectedBloodPressure = new BloodPressurePTDCNS();
  user_logged!: CanBoYTe;
  isNewBloodPressure: boolean = false

  public selectedPTDCNSId = 0;

  constructor(private shareDataService: ShareDataService,
              private storageService: LocalStorageService,
              private menuService: LabratoryMenuService
              ) {
    super();
  }

  calBMI(weight: number, height: number){
    this.selectedBloodPressure.bmi = Number(GiayToLienQuanComponent.calcBMI(weight, height));
  }

  ngOnInit(): void {
    this.disabledChange.emit(false)
    const user_logged = this.storageService.getUserLoggedSmall();
    this.user_logged = {
      ...user_logged,
      MA_NHAN_VIEN: user_logged.user_name,
      HO_TEN: user_logged.full_name,
      DIA_CHI_LIEN_HE: new Address(),
      SO_CHUNG_CHI_HANH_NGHE: ''
    };
    this.selectedBloodPressure.dieu_duong = { ...this.user_logged };
  }

  ngOnChanges(changes:SimpleChanges) {
    if(this.selectGiayToLienQuan.results === undefined) {
      this.newParent.listPTDCNS = []
    }
    if(!this.isEdit) {
      this.disabledChange.emit(false)
    } else {
      this.menuService.changeViewMode(MenuViewModeEnum.Editing)
    }
    if (this.listParent.length > 0){
      this.listParent.splice(0,this.listParent.length);
    }
    if (!this.isCreateGiayToLienQuan && this.selectGiayToLienQuan) {
      this.phieuTDCNS = this.selectGiayToLienQuan;
      // this.selectBloodPressure(this.bloodPressureSelect.selected[0]);

      // Sắp xếp phiếu theo thời gian
      this.phieuTDCNS.result.blood_pressure.sort((a: any, b: any) => {
        const dateA = moment(a.time_moment);
        const dateB = moment(b.time_moment);
        return Math.abs(dateB.diff(moment(), 'milliseconds')) - Math.abs(dateA.diff(moment(), 'milliseconds'));
      });

      this.phieuTDCNS.result.blood_pressure.forEach(item => {
        if (this.listParent.length === 0){
          this.addNewParent(item);
        } else {
          let checkParent = false;
          for (let parent of this.listParent){
            if (item.parent_name === parent.parent_name){
              checkParent = true;
              parent.listPTDCNS.push(item);
            }
          }
          if (checkParent === false){
            this.addNewParent(item);
          }
        }
      })
    }
    if(this.isCreateGiayToLienQuan || !this.phieuTDCNS){
      this.isNewBloodPressure = true
      this.phieuTDCNS = new PTDCNS();
    } else {
      this.isNewBloodPressure = false
    }
    this.redrawList();
    this.shareDataService.pushData(this.phieuTDCNS, "phieu_theo_doi_chuc_nang_song");
  }
  addNewParent(ptd:BloodPressurePTDCNS){
    let parent = new newParent();
    parent.parent_name = ptd.parent_name;
    parent.listPTDCNS.push(ptd)
    this.listParent.push(parent);
  }

  // Map các lần theo dõi để hiển thị
  private redrawList() {
    this.displayListTDCNS = [...this.phieuTDCNS.result.blood_pressure];
  }

  private findBloodPressure(id: number): BloodPressurePTDCNS | undefined {
    return this.phieuTDCNS.result.blood_pressure.find(bp => bp.id === id);
  }

  selectBloodPressure(id: number) {
    this.bloodPressureSelect.select(id);
    this.selectedBloodPressure = this.findBloodPressure(id) || new BloodPressurePTDCNS();
    this.selectedPTDCNSId = this.selectedBloodPressure.id;
  }
  selectPTDCNS(indexParent: number,indexPTD:number){
    this.selectedBloodPressure = this.listParent[indexParent].listPTDCNS[indexPTD];
    this.selectedPTDCNSId = this.selectedBloodPressure.id;
  }
  newParent = new newParent();
  latest = 0;
  addBloodPressure() {
    // let newBP = new BloodPressurePTDCNS(true);
    // const time_unix = newBP.time_unix;
    // if (this.phieuTDCNS.listParent.length > 0){
    //   for (let parent of this.phieuTDCNS.listParent){
    //     for (let item of parent.listPTDCNS){
    //       if (item.time_unix > this.latest){
    //         this.latest = item.time_unix;
    //         newBP = item;
    //       }
    //     }
    //   }
    // }
    // newBP.time_unix = time_unix;
    // newBP.dieu_duong = this.user_logged;
    this.isNewBloodPressure = true
    let newBP = new BloodPressurePTDCNS(true);
    let tmp =  {};
    //todo: Tạo phiếu mới dựa theo dữ liệu phiếu cũ gần nhất.
    try {
      let arrayParentLength = this.listParent.length; //Lấy ra khoa điều trị gần nhất
      let arrayLength = this.listParent[arrayParentLength - 1].listPTDCNS.length; //Lấy ra phiếu cũ gần nhất
      tmp = Object.assign({}, this.listParent[arrayParentLength - 1].listPTDCNS[arrayLength - 1])
    }catch (e) { //Nếu xảy ra lỗi thì gán dữ liệu phiếu mới là mới hoàn toàn
      tmp = new BloodPressurePTDCNS()
    }
    newBP = Object.assign(newBP, tmp); // merge dữ liệu với thông tin phiếu cũ.
    newBP.id = Number(moment()); //cập nhật ID cho dữ liệu mới.
    newBP.time_unix = moment().unix(); //Cập nhật time unix
    newBP.dieu_duong = { ...this.user_logged } // Cập nhật điều dưỡng chăm sóc

    if (this.patientInfo.parent_name){ //lấy khoa theo khoa hiện tại
      newBP.parent_name = this.patientInfo.parent_name;
    }
    if (!this.phieuTDCNS.result) {
      this.phieuTDCNS.result = {blood_pressure: []};
    }
    this.phieuTDCNS.result.blood_pressure.push(newBP);
    this.selectBloodPressure(newBP.id);
    newBP.created_by = this.storageService.getUserLogged().user_name;

    // Tạo danh sách khoa
    if (this.patientInfo.parent_name){
      this.newParent.parent_name = this.patientInfo.parent_name
    }
    this.newParent.listPTDCNS.push(newBP);
    if (this.listParent.length <1){
      this.listParent.push({
        ...this.newParent,
        listPTDCNS: [...this.newParent.listPTDCNS]
      })
    } else {
      let checkParent =false;
      for (let parent of this.listParent){
        if (parent.parent_name === this.patientInfo.parent_name){
          parent.listPTDCNS.push(newBP);
          checkParent = true;
          break;
        }
        else {checkParent = false;}
      }
      if (checkParent === false){
        this.listParent.push({
          ...this.newParent,
          listPTDCNS: [...this.newParent.listPTDCNS]
        })
      }
    }
    this.redrawList();
  }

  removeBloodPressure(indexParent:number, indexPDT: number,ptd:BloodPressurePTDCNS) {
    this.listParent[indexParent].listPTDCNS.splice(indexPDT,1);
    if(this.listParent[indexParent].listPTDCNS.length === 0){
      this.listParent.splice(indexParent,1);
    }
    this.phieuTDCNS.result.blood_pressure = this.phieuTDCNS.result.blood_pressure.filter(item => {
      return item.id !== ptd.id;
    });
  }
}
