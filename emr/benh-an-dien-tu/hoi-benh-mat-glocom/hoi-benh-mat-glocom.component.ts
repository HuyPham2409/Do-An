import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ShareDataService } from '../../../../services/share-data.service';
import { BenhAnComponent } from '../../benh-an-emr/benh-an.component';
import { HoiBenhMatGlocom } from '../../../../model/emr/kham_mat_glocom';

export class newTestControl  {
  pharma = '';
  duong_dung = '';
  lieu_dung = '';
  thoi_gian_da_dung = '';
  note = '';
};

@Component({
  selector: 'app-hoi-benh-mat-glocom',
  templateUrl: './hoi-benh-mat-glocom.component.html',
  styleUrls: ['./hoi-benh-mat-glocom.component.scss']
})
export class HoiBenhMatGlocomComponent extends BenhAnComponent {
  hoiBenh = new HoiBenhMatGlocom();
  pharmaTestList: any[] = [];
  @Input() tenBenhAn = '';
  constructor(private shareDataService: ShareDataService) {
    super();
  }
  newTestControl = newTestControl;
  listLyDoDiKham = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "MP"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "MT"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "2 Mắt"
    }
  ];
  listNhucMat = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "dữ dội"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "vừa"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "nhẹ"
    },
    {
      ID:"4",
      MA: "4",
      MO_TA: "không"
    }
  ];
  listNhin = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "mờ đột ngột"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "mờ từng lúc"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "sương mù"
    },
    {
      ID:"4",
      MA: "4",
      MO_TA: "không mở"
    },
    {
      ID:"5",
      MA: "5",
      MO_TA: "mờ tăng dần"
    },
    {
      ID:"6",
      MA: "6",
      MO_TA: "nhìn thu hẹp"
    },
    {
      ID:"7",
      MA: "7",
      MO_TA: "quầng tán sắc"
    }
  ];
  list = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "có"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "không"
    }
  ];
  listToanThan = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "đau đầu"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "nôn"
    },
    {
      ID:"1",
      MA: "1",
      MO_TA: "buồn nôn"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "không"
    }
  ];
  listCoSoYTe = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "Huyện"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "Tỉnh"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "Trung ương"
    },
    {
      ID:"4",
      MA: "4",
      MO_TA: "Khác"
    }
  ];
  listPPDT = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "Phẫu thuật"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "Thuốc"
    },
    {
      ID: "3",
      MA: "3",
      MO_TA: "Laser"
    }
  ];
  listThuocHaNhanApDaDung = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "uống"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "tra mắt"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "tiêm"
    }
  ];
  listSoThuoc = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "1 thuốc"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "2 thuốc"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "3 thuốc"
    },
    {
      ID:"4",
      MA: "4",
      MO_TA: "4 thuốc"
    }
  ];
  listDuongDung = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "Tra mắt"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "Tiêm mắt"
    },
    {
      ID: "3",
      MA: "3",
      MO_TA: "Toàn thân"
    }
  ];
  listCachDungThuoc = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "- Theo chỉ định của bác sỹ"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "Bệnh nhân tự dùng thuốc"
    },
  ];
  listNewTestControl: newTestControl[] = []
  testControl = new newTestControl();
  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges) {
    this.listNewTestControl.push(this.testControl)
    if(this.patientInfo.idEMR && this.patientInfo.results && this.patientInfo.results.hoi_benh_glocom){
      this.hoiBenh = this.patientInfo.results.hoi_benh_glocom;
      this.listNewTestControl = this.hoiBenh.List_NEW_TEST_CONTROL;
    }
    this.hoiBenh.List_NEW_TEST_CONTROL = this.listNewTestControl;
    this.shareDataService.pushData(this.hoiBenh, "hoi_benh_glocom");
  }
  addPharmaTest() {
    this.listNewTestControl.push(new newTestControl());
  }
  deletePharmaTest(index: any) {
    this.listNewTestControl.splice(index,1)
  }
  reset(title: string) {
    if (title === "DA_PT_MAT") {
      if (!this.hoiBenh.DA_PT_MAT) {
        this.hoiBenh.TEXT_PT_MAT = "";
      }
    }
    if (title === "BENH_KHAC") {
      if (!this.hoiBenh.BENH_KHAC) {
        this.hoiBenh.TEXT_BENH_KHAC = "";
      }
    }
    if (title === "TIEN_SU_DUNG_CORTICOSTEROID") {
      if (!this.hoiBenh.TIEN_SU_DUNG_CORTICOSTEROID) {
        this.hoiBenh.TEXT_TIEN_SU_DUNG_CORTICOSTEROID = "";
      }
    }
    if (title === "BENH_KHAC_TT") {
      if (!this.hoiBenh.BENH_KHAC_TT) {
        this.hoiBenh.TEXT_BENH_KHAC_TT = "";
      }
    }
    // if (title === 'TIEN_SU_BENH_GLOCOM') {
    //   if (this.hoiBenh.TIEN_SU_BENH_GLOCOM === 1) {
    //     this.hoiBenh.ONG_BA = false;
    //   }
    // }
  }
}
