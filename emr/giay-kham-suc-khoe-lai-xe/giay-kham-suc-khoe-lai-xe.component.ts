import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { GiayToLienQuanComponent } from "../benh-an-emr/giay-to-lien-quan.component";
import { ShareDataService } from "app/services/share-data.service";
import { DateTime } from "app/model/emr/global";
import moment, { Moment } from 'moment';

class GiayKhamSKLaiXe {
  HO_TEN= "";
  GIOI_TINH = "";
  TUOI = 0;
  CMTND =  "";
  CMTND_CAP_NGAY: number |  null =  0 ;
  cmtnd_cap_ngay_moment: Moment | null = null;
  CMTND_CAP_TAI = "";
  CHO_O_HIEN_TAI = "";
  KSKLX_HANG = "";
  TIEN_SU_GIA_DINH= {
    co_mac_benh_hay_khong: null,
    neu_co: "",
  };
  TIEN_SU_BAN_THAN = {
    list_tien_su_ban_than: [
      {
        ID: "1",
        MO_TA: "Có bệnh hay bị thương trong 5 năm qua",
        VALUE: null
      },
      {
        ID: "2",
        MO_TA: "Có bệnh thần kinh hay bị thương ở đầu",
        VALUE: null
      },
      {
        ID: "3",
        MO_TA: "Bệnh mắt hoặc giảm thị lực (trừ trường hợp đeo kính thuốc)",
        VALUE: null
      },
      {
        ID: "4",
        MO_TA: "Bệnh ở tai, giảm sức nghe hoặc thăng bằng",
        VALUE: null
      },
      {
        ID: "5",
        MO_TA: "Bệnh ở tim, hoặc nhồi máu cơ tim, các bệnh tim mạch khác",
        VALUE: null
      },
      {
        ID: "6",
        MO_TA: "Phẫu thuật can thiệp tim - mạch (thay van, bắc cầu nối, tạo hình mạch, máy tạo nhịp, đặt stent mạch, ghép tim)",
        VALUE: null
      },
      {
        ID: "7",
        MO_TA: "Tăng huyết áp",
        VALUE: null
      },
      {
        ID: "8",
        MO_TA: "Khó thở",
        VALUE: null
      },
      {
        ID: "9",
        MO_TA: "Bệnh phổi, hen, khí phế thũng, viêm phế quản mạn tính",
        VALUE: null
      },
      {
        ID: "10",
        MO_TA: "Bệnh thận, lọc máu",
        VALUE: null
      },
      {
        ID: "11",
        MO_TA: "Đái tháo đường hoặc kiểm soát tăng đường huyết",
        VALUE: null
      },
      {
        ID: "12",
        MO_TA: "Bệnh tâm thần",
        VALUE: null
      },
      {
        ID: "13",
        MO_TA: "Mất ý thức, rối loạn ý thức",
        VALUE: null
      },
      {
        ID: "14",
        MO_TA: "Ngất, chóng mặt",
        VALUE: null
      },
      {
        ID: "15",
        MO_TA: "Bệnh tiêu hóa",
        VALUE: null
      },
      {
        ID: "16",
        MO_TA: "Rối loạn giấc ngủ, ngừng thở khi ngủ, ngủ rũ ban ngày, ngáy to",
        VALUE: null
      },
      {
        ID: "17",
        MO_TA: "Tai biến mạch máu não hoặc liệt",
        VALUE: null
      },
      {
        ID: "18",
        MO_TA: "Bệnh hoặc tổn thương cột sống",
        VALUE: null
      },
      {
        ID: "19",
        MO_TA: "Sử dụng rượu bia thường xuyên",
        VALUE: null
      },
      {
        ID: "20",
        MO_TA: "Sử dụng ma túy và chất gây nghiện",
        VALUE: null
      },
    ],
    neu_co: "",
  };
  CAU_HOI_KHAC = {
    co_dang_dieu_tri_benh: "",
    mang_thai_hoac_nuoi_con_nho: "",
  };
}

@Component({
  selector: 'app-giay-kham-suc-khoe-lai-xe',
  templateUrl: './giay-kham-suc-khoe-lai-xe.component.html',
  styleUrls: ['./giay-kham-suc-khoe-lai-xe.component.scss']
})

export class GiayKhamSucKhoeLaiXeComponent  extends GiayToLienQuanComponent  implements OnInit, OnChanges{
  giayKhamSKLaiXe = new GiayKhamSKLaiXe();

  @Input() patientInfo: any;
  @Input() isCreateGiayToLienQuan: any;
  @Input() selectGiayToLienQuan: any;

  constructor(private shareDataService: ShareDataService) {
    super();
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes:SimpleChanges) {
    if (this.isCreateGiayToLienQuan) {
      this.giayKhamSKLaiXe = new GiayKhamSKLaiXe();
    }
    if (!this.isCreateGiayToLienQuan && this.checkNonEmpty(this.selectGiayToLienQuan)) {
      this.giayKhamSKLaiXe = this.selectGiayToLienQuan;
    }
    this.shareDataService.pushData(this.giayKhamSKLaiXe, 'giay_kham_suc_khoe_lai_xe');
  }
}
