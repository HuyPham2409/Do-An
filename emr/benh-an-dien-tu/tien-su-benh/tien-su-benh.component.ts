import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TienSuBenh, tienSuDe } from '../../../../model/emr/tien_su_benh';
import { EmrService } from '../../../../services/emr.service';
import { ShareDataService } from '../../../../services/share-data.service';
import { BenhAnComponent } from '../../benh-an-emr/benh-an.component';

@Component({
  selector: 'app-tien-su-benh',
  templateUrl: './tien-su-benh.component.html',
  styleUrls: ['./tien-su-benh.component.scss']
})
export class TienSuBenhComponent extends BenhAnComponent {
  tienSuBenh = new  TienSuBenh();
  showField: any;
  tienSuDe = [
    {
      ID: "1",
      MA: "01",
      MO_TA: "Đẻ thường"
    },
    {
      ID: "2",
      MA: "02",
      MO_TA: "Mổ đẻ"
    }
  ];

  /**
   * TODO: Dùng tên bệnh án thay vì ID bệnh án
   */
  private readonly componentName = 'tien_su_benh';

  constructor(private emrService: EmrService,
              private shareDataService: ShareDataService) {
    super();
  }

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
    if(this.patientInfo.idEMR && this.patientInfo.results && this.patientInfo.results.tien_su_benh){
      this.tienSuBenh = this.patientInfo.results.tien_su_benh;
    }
    console.log(this.tienSuBenh.TS_SINH_DE);
    this.shareDataService.pushData(this.tienSuBenh, "tien_su_benh");
  }
  newTienSuDe = new tienSuDe();
  addChildren() {
    this.tienSuBenh.TS_SINH_DE.push({...this.newTienSuDe});
    this.newTienSuDe = new tienSuDe();
  }
  removeChildren(index: any) {
    this.tienSuBenh.TS_SINH_DE.splice(index, 1)
  }
  resetBenhLy(key: string){
    if (key === "TS_BAN_THAN"){
      this.tienSuBenh.BENH_LY_BAN_THAN = "";
    }
    if (key === "TS_GIA_DINH"){
      this.tienSuBenh.BENH_LY_GIA_DINH = "";
    }
    if (key === "TS_MANG_THAI_CUA_ME"){
      this.tienSuBenh.BENH_LY_KHI_MANG_THAI = "";
    }
    if (key === "PHAT_TRIEN_TRI_TUE"){
      this.tienSuBenh.BENH_LY_PHAT_TRIEN_TRI_TUE = "";
    }
  }
}
