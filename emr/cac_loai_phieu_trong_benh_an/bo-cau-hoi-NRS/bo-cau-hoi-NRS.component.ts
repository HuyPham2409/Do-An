import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { GiayToLienQuanComponent } from '../../benh-an-emr/giay-to-lien-quan.component';
import { fakeAsync } from '@angular/core/testing';
import { ReceptionService } from '../../../../services/reception.service';
import { ShareDataService } from '../../../../services/share-data.service';
import { ToastrTranslateService } from '@shared/services/toastr-translate-service';

export class BoCauHoiNRS{
  chieuCao: number = 0;
  thongTin: {
    id: number,
    canNang_label: string,
    canNang: number,
    bmi: number,
    giamCan: number
  }[] = [
    {
      id: 0,
      canNang_label: "Cân nặng hiện tại",
      canNang: 0,
      bmi: 0,
      giamCan: 0
    },
    {
      id: 1,
      canNang_label: "Cân nặng 1 tháng trước",
      canNang: 0,
      bmi: 0,
      giamCan: 0
    },
    {
      id: 2,
      canNang_label: "Cân nặng 2 tháng trước",
      canNang: 0,
      bmi: 0,
      giamCan: 0
    },
    {
      id: 3,
      canNang_label: "Cân nặng 3 tháng trước",
      canNang: 0,
      bmi: 0,
      giamCan: 0
    },
  ]
  luongAn: number = 0;
  diLaiBinhThuong: number = 0;
  benhLy: {
    id: number,
    ten: string,
    loai: number,
    thongTin: any
    coBenh?: boolean,
  }[] = [ //type 1 là radio type 2 là text
    {
      id: 0,
      ten: "Nặng",
      loai: 1,
      thongTin: [] = [
        {
          id: 0,
          noiDung: "Chấn thương nặng",
          value: 0
        },
        {
          id: 1,
          noiDung: "Chăm sóc TC",
          value: 0
        },
        {
          id: 2,
          noiDung: "Ung thư máu",
          value: 0
        },
        {
          id: 3,
          noiDung: "Ghép tủy xương",
          value: 0
        }
      ]
    },
    {
      id: 1,
      ten: "Trung bình",
      loai: 1,
      thongTin: [] = [
        {
          id: 0,
          noiDung: "Đại phẫu",
          value: 0
        },
        {
          id: 1,
          noiDung: "Đột quỵ",
          value: 0
        },
        {
          id: 2,
          noiDung: "Nk nặng",
          value: 0
        },
        {
          id: 3,
          noiDung: "Ung thư",
          value: 0
        }
      ]
    },
    {
      id: 2,
      ten: "Nhẹ - Không",
      loai: 0,
      coBenh: false,
      thongTin: ""
    }
  ];
  NRS: {
    id: number,
    ten: string,
    noiDung:string,
    giaTri: number
  }[]  = [
    {
      id: 0,
      ten: "Nặng",
      noiDung: "Chấn thương đầu gối, ghép tủy xương, bệnh nhân hồi sức (APACHE > 10)",
      giaTri: 0
    },
    {
      id: 1,
      ten: "Trung bình",
      noiDung: "PT lớn vùng bụng, đột quỵ, viêm phổi nặng, ung thư máu",
      giaTri: 1
    },
    {
      id: 2,
      ten: "Nhẹ",
      noiDung: "Gãy xương đùi/ Bệnh lý mãn tính ở những bệnh nhân có biến chứng cấp: Sơ gan, COPD, Lọc máu, ĐTĐ...",
      giaTri: 2
    },
    {
      id: 3,
      ten: "Không",
      noiDung: "",
      giaTri: 3
    }
  ];
  benhNhanLonTuoi: number = 0;
  nrsValue = '-1';
}

@Component({
  selector: 'app-bo-cau-hoi-nrs',
  templateUrl: './bo-cau-hoi-NRS.component.html',
  styleUrls: ['./bo-cau-hoi-NRS.component.scss'],
})
export class BoCauHoiNRSComponent extends GiayToLienQuanComponent implements OnInit, OnChanges {

  boCauHoi = new BoCauHoiNRS();

  constructor(private receptionService: ReceptionService,
              private toastrTranslateService : ToastrTranslateService,
              private shareDataService: ShareDataService) {
                super()
              }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.patientInfo) {
      this.patientInfo = this.patientInfo
      this.setAge(this.patientInfo.birthday);
    }
    if (!this.isCreateGiayToLienQuan && this.checkNonEmpty(this.selectGiayToLienQuan)) {
      this.boCauHoi = this.selectGiayToLienQuan;
    }
    this.shareDataService.pushData(this.boCauHoi, 'bo_cau_hoi_nrs');
  }

  calculate(id: number){
    // lấy id cần điền

    let index = -1;
    this.boCauHoi.thongTin.forEach(
      (thongTin) => {
        if(thongTin.id == id)
          index = this.boCauHoi.thongTin.indexOf(thongTin);
      }
    )
    //clear toast
    if(this.boCauHoi.chieuCao && this.boCauHoi.thongTin[0].canNang)
      this.toastrTranslateService.clear()
    //BMI
      if (this.boCauHoi.chieuCao == 0 || !this.boCauHoi.chieuCao) {
        this.toastrTranslateService.warning("Vui lòng nhập chiều cao bệnh nhân");
        return;
      }
      this.boCauHoi.thongTin[index].bmi = Number((this.boCauHoi.thongTin[index].canNang / (this.boCauHoi.chieuCao * this.boCauHoi.chieuCao / 10000)).toFixed(2));
    // %giam Can
      if (this.boCauHoi.thongTin[0].canNang == 0 || !this.boCauHoi.thongTin[0].canNang) {
        this.toastrTranslateService.warning("Vui lòng nhập cân nặng hiện tại của bệnh nhân");
        return;
      }
      this.boCauHoi.thongTin[index].giamCan = ((this.boCauHoi.thongTin[index].canNang - this.boCauHoi.thongTin[0].canNang) / this.boCauHoi.thongTin[index].canNang) * 100 ;
  }

  clear(){
    this.boCauHoi.benhLy[2].thongTin = ""
  }

  //todo: Chỉ được chọn 1 bệnh lý
  setBenhLy(benhLySlt: number) {
      this.boCauHoi.benhLy.forEach(
        (benhLy: any) => {
          if (benhLy.id != benhLySlt) {
            Array.isArray(benhLy.thongTin) ?
            benhLy.thongTin.forEach((noiDung: any) => noiDung.value = 0) :
              (benhLy.thongTin = '', benhLy.coBenh = false);
          }
        }
      )
    }

    setAge(birthday: number){
      ((new Date()).getTime() - birthday * 1000) / (1000 * 60 * 60 * 24 * 365)  < 70 ? this.boCauHoi.benhNhanLonTuoi = 1 : this.boCauHoi.benhNhanLonTuoi = 2
    }

}
