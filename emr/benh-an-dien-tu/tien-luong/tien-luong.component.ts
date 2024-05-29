import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ShareDataService } from '../../../../services/share-data.service';
import { BenhAn } from '../../../../model/emr/benh_an';
import { TaiLieu, TruyenMau } from '../../../../model/emr/global';
import { EmrService } from '../../../../services/emr.service';
import { BenhAnComponent } from '../../benh-an-emr/benh-an.component';

@Component({
  selector: 'app-tien-luong',
  templateUrl: './tien-luong.component.html',
  styleUrls: ['./tien-luong.component.scss']
})
export class TienLuongComponent extends BenhAnComponent implements OnInit, OnChanges {
  @Input() tienluong: any;
  @Input() isBenhAnNoiKhoa: any;
  benhAn : BenhAn = new BenhAn();
  /**
   * TODO: Dùng tên bệnh án thay vì ID bệnh án
   */
  private readonly componentName = 'tien_luong';

  @Input() counter_tienLuong = 'X. ';
  @Input() counter_huongDieuTri = 'X. ';

  constructor(private shareDataService: ShareDataService,
              private emrService: EmrService) {
    super();
  }
  showField: any;
  listTruyenMau: TruyenMau[] = [
    {
      'TEN': '1. Khối hồng cầu:',
      'SO_LAN': 0,
      TOM_TAT: '',
      NOI_DUNG: '',
    },
    {
      'TEN': '2. Hồng cầu rửa:',
      'SO_LAN': 0,
      TOM_TAT: '',
      NOI_DUNG: '',
    },
    {
      'TEN': '3. Khối tiểu cầu:',
      'SO_LAN': 0,
      TOM_TAT: '',
      NOI_DUNG: '',
    },
    {
      'TEN': '4. Khối bạch cầu hạt:',
      'SO_LAN': 0,
      TOM_TAT: '',
      NOI_DUNG: '',
    },
    {
      'TEN': '5. Huyết tương:',
      'SO_LAN': 0,
      TOM_TAT: '',
      NOI_DUNG: '',
    },
    {
      'TEN': '6. Huyết tương tươi đông lạnh:',
      'SO_LAN': 0,
      TOM_TAT: '',
      NOI_DUNG: '',
    },
    {
      'TEN': '7. Tủa VIII:',
      'SO_LAN': 0,
      TOM_TAT: '',
      NOI_DUNG: '',
    },
    {
      'TEN': '8. Truyền máu toàn phần:',
      'SO_LAN': 0,
      TOM_TAT: '',
      NOI_DUNG: '',
    },
  ];
  ngOnInit(): void {
    /**
     * TODO: Nếu dùng name thì không dùng ID_BENH_AN
     */
    if (this.tenBenhAn) {
      this.emrService.getShowFieldComponentByConfig_new(this.componentName, this.tenBenhAn).then((dataReturn: any) => this.showField = dataReturn);
    } else {
      this.emrService.getShowFieldComponentByConfig(this.componentName, this.ID_BENH_AN.toString()).then((dataReturn: any) => this.showField = dataReturn);
    }
    if(this.patientInfo.results &&
      this.patientInfo.results.tien_luong &&
      this.patientInfo.results.tien_luong.TIEN_LUONG){
      this.benhAn.TIEN_LUONG = this.patientInfo.results.tien_luong.TIEN_LUONG;
    }
    if(this.patientInfo.results &&
      this.patientInfo.results.tien_luong &&
      this.patientInfo.results.tien_luong.HUONG_DIEU_TRI){
      this.benhAn.HUONG_DIEU_TRI = this.patientInfo.results.tien_luong.HUONG_DIEU_TRI;
    }
    if(this.patientInfo.results &&
      this.patientInfo.results.tien_luong &&
      this.patientInfo.results.tien_luong.CHE_DO_AN_UONG){
      this.benhAn.CHE_DO_AN_UONG = this.patientInfo.results.tien_luong.CHE_DO_AN_UONG;
    }
    if(this.patientInfo.results &&
      this.patientInfo.results.tien_luong &&
      this.patientInfo.results.tien_luong.CHE_DO_CHAM_SOC){
      this.benhAn.CHE_DO_CHAM_SOC = this.patientInfo.results.tien_luong.CHE_DO_CHAM_SOC;
    }
    if(this.patientInfo.results &&
      this.patientInfo.results.tien_luong &&
      this.patientInfo.results.tien_luong.CAC_VAN_DE_KHIEM_KHUYET){
      this.benhAn.CAC_VAN_DE_KHIEM_KHUYET = this.patientInfo.results.tien_luong.CAC_VAN_DE_KHIEM_KHUYET;
    }
    if(this.patientInfo.results &&
      this.patientInfo.results.tien_luong &&
      this.patientInfo.results.tien_luong.MUC_DICH_DIEU_TRI_PHCN){
      this.benhAn.MUC_DICH_DIEU_TRI_PHCN = this.patientInfo.results.tien_luong.MUC_DICH_DIEU_TRI_PHCN;
    }
    if(this.patientInfo.results &&
      this.patientInfo.results.tien_luong &&
      this.patientInfo.results.tien_luong.OXY){
      this.benhAn.OXY = this.patientInfo.results.tien_luong.OXY;
    }
    if(this.patientInfo.results &&
      this.patientInfo.results.tien_luong &&
      this.patientInfo.results.tien_luong.CHONG_SOC){
      this.benhAn.CHONG_SOC = this.patientInfo.results.tien_luong.CHONG_SOC;
    }
    if(this.patientInfo.results &&
      this.patientInfo.results.tien_luong &&
      this.patientInfo.results.tien_luong.DIEU_TRI_CAO_HA){
      this.benhAn.DIEU_TRI_CAO_HA = this.patientInfo.results.tien_luong.DIEU_TRI_CAO_HA;
    }
    if(this.patientInfo.results &&
      this.patientInfo.results.tien_luong &&
      this.patientInfo.results.tien_luong.AN_THAN){
      this.benhAn.AN_THAN = this.patientInfo.results.tien_luong.AN_THAN;
    }
    if(this.patientInfo.results &&
      this.patientInfo.results.tien_luong &&
      this.patientInfo.results.tien_luong.OXY){
      this.benhAn.Y_GLOBULIN = this.patientInfo.results.tien_luong.Y_GLOBULIN;
    }
    if(this.patientInfo.results &&
      this.patientInfo.results.tien_luong &&
      this.patientInfo.results.tien_luong.NHAP_ICU){
      this.benhAn.NHAP_ICU = this.patientInfo.results.tien_luong.NHAP_ICU;
    }
    if(this.patientInfo.results &&
      this.patientInfo.results.tien_luong &&
      this.patientInfo.results.tien_luong.BAC_SI_LAM_BENH_AN){
      this.benhAn.BAC_SI_LAM_BENH_AN = this.patientInfo.results.tien_luong.BAC_SI_LAM_BENH_AN;
    }
    this.shareDataService.pushData(this.benhAn, "tien_luong");

    this.initOrKeepValues(
      this.benhAn,
      [
        {
          key: 'CAC_PHAN_UNG_KHI_TRUYEN_MAU',
          defaultValueFactory: () => this.patientInfo.results?.tien_luong.CAC_PHAN_UNG_KHI_TRUYEN_MAU
        },
        {
          key: 'MAN_NGUA',
          defaultValueFactory: () => this.patientInfo.results?.tien_luong.MAN_NGUA
        },
        {
          key: 'SOT_RET_RUN',
          defaultValueFactory: () => this.patientInfo.results?.tien_luong.SOT_RET_RUN
        },
        {
          key: 'CHOANG_PHAN_VE',
          defaultValueFactory: () => this.patientInfo.results?.tien_luong.CHOANG_PHAN_VE
        },
        {
          key: 'KHAC',
          defaultValueFactory: () => this.patientInfo.results?.tien_luong.KHAC
        },
        {
          key: 'PHUONG_PHAP_CHINH',
          defaultValueFactory: () => this.patientInfo.results?.tien_luong.PHUONG_PHAP_CHINH
        },
      ]
    );
  };

  handle = (checked: boolean) => {
    if(checked === false){
      this.benhAn.MAN_NGUA = false;
      this.benhAn.SOT_RET_RUN = false;
      this.benhAn.CHOANG_PHAN_VE = false;
      this.benhAn.KHAC = false;
    }
  };

  ngOnChanges(changes: SimpleChanges) {
    this.mapList(
      changes, 'results.tien_luong.TRUYEN_MAU',
      this.listTruyenMau,
      this, 'benhAn.TRUYEN_MAU'
    );
  }
}
