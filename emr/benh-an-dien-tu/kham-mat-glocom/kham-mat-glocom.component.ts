import { Component, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { KHAM_MAT_GLOCOM } from '../../../../model/emr/kham_mat_glocom';
import { BenhAnComponent } from '../../benh-an-emr/benh-an.component';
import { ShareDataService } from '../../../../services/share-data.service';

@Component({
  selector: 'app-kham-mat-glocom',
  templateUrl: './kham-mat-glocom.component.html',
  styleUrls: ['./kham-mat-glocom.component.scss']
})
export class KhamMatGlocomComponent extends BenhAnComponent{
  khamMatGlocom = new KHAM_MAT_GLOCOM();
  constructor(private shareDataService: ShareDataService) {
    super();
  }
  bongDo = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "Tốt"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "Dẹt"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "Xơ"
    },
    {
      ID:"4",
      MA: "4",
      MO_TA: "Mỏng"
    },
    {
      ID:"5",
      MA: "5",
      MO_TA: "Quá phát"
    }
  ];
  tinh_tran_trong_suot = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "Trong"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "Sẹo"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "Loạn dưỡng"
    },
    ];
  phanXa = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "Bình thường"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "Giảm"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "Mất"
    }
  ];
  theThuyTinh = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "Trong"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "Đục"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "Khác"
    }
  ];
  machMau = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "Bình thường"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "Chuyển hướng"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "Gập góc"
    }
  ];
  nhanCau = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "Bình thường"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "Dãn lồi"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "To"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "Nhỏ"
    }
  ];
  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges) {
    if(this.patientInfo.idEMR && this.patientInfo.results && this.patientInfo.results.kham_mat_glocom){
      this.khamMatGlocom = this.patientInfo.results.kham_mat_glocom;
    }
    this.shareDataService.pushData(this.khamMatGlocom, "kham_mat_glocom");
  }
  reset(title: string) {
    if (title === 'SEO_MO_CU_KET_MAC_PHAI') {
      if(this.khamMatGlocom.MAT_PHAI.KET_MAC.SEO_MO_CU === 2){
        this.khamMatGlocom.MAT_PHAI.KET_MAC.VI_TRI_SEO_MO_CU = "";
      }
    }
    if (title === 'SEO_MO_CU_KET_MAC_TRAI') {
      if(this.khamMatGlocom.MAT_TRAI.KET_MAC.SEO_MO_CU === 2){
        this.khamMatGlocom.MAT_TRAI.KET_MAC.VI_TRI_SEO_MO_CU = "";
      }
    }
    if (title === 'PHU_NE_GIAC_MAC_PHAI') {
      if(this.khamMatGlocom.MAT_PHAI.GIAC_MAC.PHU_NE_BONG_BIEU_MO === 2){
        this.khamMatGlocom.MAT_PHAI.GIAC_MAC.MUC_DO_PHU_NE = "";
      }
    }
    if (title === 'PHU_NE_GIAC_MAC_TRAI') {
      if(this.khamMatGlocom.MAT_TRAI.GIAC_MAC.PHU_NE_BONG_BIEU_MO === 2){
        this.khamMatGlocom.MAT_TRAI.GIAC_MAC.MUC_DO_PHU_NE = "";
      }
    }
    if (title === 'SEO_MO_CUNG_MAC_PHAI') {
      if(this.khamMatGlocom.MAT_PHAI.CUNG_MAC.SEO_MO === 2){
        this.khamMatGlocom.MAT_PHAI.CUNG_MAC.VI_TRI_SEO_MO = "";
      }
    }
    if (title === 'SEO_MO_CUNG_MAC_TRAI') {
      if(this.khamMatGlocom.MAT_TRAI.CUNG_MAC.SEO_MO === 2){
        this.khamMatGlocom.MAT_TRAI.CUNG_MAC.VI_TRI_SEO_MO = "";
      }
    }
    if (title === 'TTTH_MONG_MAT_PHAI') {
      if(this.khamMatGlocom.MAT_PHAI.MONG_MAT.TINH_TRANG_THAI_HOA === 2){
        this.khamMatGlocom.MAT_PHAI.MONG_MAT.MUC_DO_THAI_HOA = "";
      }
    }
    if (title === 'TTTH_MONG_MAT_TRAI') {
      if(this.khamMatGlocom.MAT_TRAI.MONG_MAT.TINH_TRANG_THAI_HOA === 2){
        this.khamMatGlocom.MAT_TRAI.MONG_MAT.MUC_DO_THAI_HOA = "";
      }
    }
  }
}
