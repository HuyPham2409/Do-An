import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { benhan_YHCT_noi_tru } from '../../../../model/emr/benh-an-YHCT-noitru';
import { ShowFieldByComponentConfig } from '../../../../model/emr/config/show-field-by-component-config';
import { EmrPatientInfo } from '../../../../model/emr/patient/patient-info';
import { ShareDataService } from '../../../../services/share-data.service';
import { DM } from '../../../../model/Patient_EMR';

@Component({
  selector: 'app-yhct',
  templateUrl: './yhct.component.html',
  styleUrls: ['./yhct.component.scss']
})
export class YHCTComponent implements OnInit {
  benhan_YHCT_noi_tru: benhan_YHCT_noi_tru = new benhan_YHCT_noi_tru();
  @Input() patientInfo: any;
  showField: ShowFieldByComponentConfig = {};
  constructor(private shareDataService: ShareDataService,) { }
  listHinhThai = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "1.Gầy"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "2.Béo"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "3.Cân đối"
    },
    {
      ID:"4",
      MA: "4",
      MO_TA: "4.Nằm co"
    },
    {
      ID:"5",
      MA: "5",
      MO_TA: "5.Ưa tĩnh"
    },
    {
      ID:"6",
      MA: "6",
      MO_TA: "6.Nằm duỗi"
    },
    {
      ID:"7",
      MA: "7",
      MO_TA: "7.Hiếu động"
    },
    {
      ID:"8",
      MA: "8",
      MO_TA: "8.Khác"
    },
  ];
  listCheDoDinhDuong = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "1. Lỏng"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "2. Đặc"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "3. Kiêng"
    },
    {
      ID:"4",
      MA: "4",
      MO_TA: "4. Khác"
    }
  ];
  listCheDoChamSoc = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "1. Cấp I"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "2. Cấp II"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "3. Cấp III"
    }
  ];
  listThan = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "1. Còn thần"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "2. Không còn thần"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "3. Khác"
    },
  ];
  listSac = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "1. Bệch (trắng)"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "2. Đỏ"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "3. Vàng"
    },
    {
      ID:"4",
      MA: "4",
      MO_TA: "4. Xanh"
    },
    {
      ID:"5",
      MA: "5",
      MO_TA: "5. Đen"
    },
    {
      ID:"6",
      MA: "6",
      MO_TA: "6. Bình thường"
    },
    {
      ID:"7",
      MA: "7",
      MO_TA: "7. Khác"
    },
  ];
  listTrach = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "1. Tươi nhuận"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "2. Khô"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "3. Khác"
    }

  ];
  listChatLuoi = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "1. Bình thường"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "2. Bệu"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "3. Gầy mỏng"
    },
    {
      ID:"4",
      MA: "4",
      MO_TA: "4. Nứt"
    },
    {
      ID:"5",
      MA: "5",
      MO_TA: "5. Cứng"
    },
    {
      ID:"6",
      MA: "6",
      MO_TA: "6. Loét"
    },
    {
      ID:"7",
      MA: "7",
      MO_TA: "7. lệch"
    },
    {
      ID:"8",
      MA: "8",
      MO_TA: "8. Rụt"
    },
    {
      ID:"9",
      MA: "9",
      MO_TA: "9. Khác"
    },
  ];
  listSacLuoi = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "1. Hồng"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "2. Nhợt"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "3. Đỏ"
    },
    {
      ID:"4",
      MA: "4",
      MO_TA: "4. Đỏ sẫm"
    },
    {
      ID:"5",
      MA: "5",
      MO_TA: "5. Xanh tím"
    },
    {
      ID:"6",
      MA: "6",
      MO_TA: "6. Đám ứ huyết"
    },
    {
      ID:"7",
      MA: "7",
      MO_TA: "7. Khô"
    },
    {
      ID:"8",
      MA: "8",
      MO_TA: "8. Nhuận"
    },
    {
      ID:"9",
      MA: "9",
      MO_TA: "9. Khác"
    },
  ];
  listReuLuoi = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "1. Có"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "2. Không"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "3. Bong"
    },
    {
      ID:"4",
      MA: "4",
      MO_TA: "4. Dầy"
    },
    {
      ID:"5",
      MA: "5",
      MO_TA: "5. Mỏng"
    },
    {
      ID:"6",
      MA: "6",
      MO_TA: "6. Ướt"
    },
    {
      ID:"7",
      MA: "7",
      MO_TA: "7. Khô"
    },
    {
      ID:"8",
      MA: "8",
      MO_TA: "8. Dính"
    },
    {
      ID:"9",
      MA: "9",
      MO_TA: "9. Trắng"
    },
    {
      ID:"10",
      MA: "10",
      MO_TA: "10. Vàng"
    },
    {
      ID:"11",
      MA: "11",
      MO_TA: "11. Đen"
    },
    {
      ID:"12",
      MA: "12",
      MO_TA: "12. Khác"
    },
  ];
  listTiengNoi = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "1. Bình thường"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "2. To"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "3. Nhỏ"
    },
    {
      ID:"4",
      MA: "4",
      MO_TA: "4. Đứt quãng"
    },
    {
      ID:"5",
      MA: "5",
      MO_TA: "5. Khàn"
    },
    {
      ID:"6",
      MA: "6",
      MO_TA: "6. Ngọng"
    },
    {
      ID:"7",
      MA: "7",
      MO_TA: "7. Mất"
    },
    {
      ID:"8",
      MA: "8",
      MO_TA: "8. Khác"
    },
  ];
  listHoiTho = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "1. Bình thường"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "2. Đứt quãng"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "3. Ngắn"
    },
    {
      ID:"4",
      MA: "4",
      MO_TA: "4. Mạnh"
    },
    {
      ID:"5",
      MA: "5",
      MO_TA: "5. Yếu"
    },
    {
      ID:"6",
      MA: "6",
      MO_TA: "6. Thô"
    },
    {
      ID:"7",
      MA: "7",
      MO_TA: "7. Rít"
    },
    {
      ID:"8",
      MA: "8",
      MO_TA: "8. Khò khè"
    },
    {
      ID:"9",
      MA: "9",
      MO_TA: "9. Chậm"
    },
    {
      ID:"10",
      MA: "10",
      MO_TA: "10. Gấp"
    },
    {
      ID:"11",
      MA: "11",
      MO_TA: "11. Khác"
    },
  ];
  listHo = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "Có"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "Không"
    }
  ];
  listKieuHo = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "1. Ho liên tục"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "2. Cơn"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "3. Ít"
    },
    {
      ID:"4",
      MA: "4",
      MO_TA: "4. Nhiều"
    },
    {
      ID:"5",
      MA: "5",
      MO_TA: "5. Khan"
    },
    {
      ID:"6",
      MA: "6",
      MO_TA: "6. Có đờm"
    },
    {
      ID:"7",
      MA: "7",
      MO_TA: "7. Khác"
    }

  ];
  listO = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "Có"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "Không"
    }
  ];
  listNac = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "Có"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "Không"
    }
  ];
  listMuiCoThe = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "Có"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "Không"
    }
  ];
  listKieuMui = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "1. Chua"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "2. Khắm"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "3. Tanh"
    },
    {
      ID:"4",
      MA: "4",
      MO_TA: "4. Thối"
    },
    {
      ID:"5",
      MA: "5",
      MO_TA: "5. Hôi"
    },
    {
      ID:"6",
      MA: "6",
      MO_TA: "6. Khác"
    },
  ];
  listChatThaiBieuHienBenhLy = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "Có"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "Không"
    }
  ];
  listKieuChatThai = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "1. Đờm"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "2. Chất nôn"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "3. Phân"
    },
    {
      ID:"4",
      MA: "4",
      MO_TA: "4. Nước tiểu"
    },
    {
      ID:"5",
      MA: "5",
      MO_TA: "5. Khí hư"
    },
    {
      ID:"6",
      MA: "6",
      MO_TA: "6. Kinh nguyệt"
    },
    {
      ID:"7",
      MA: "7",
      MO_TA: "7. Khác"
    }
  ];
  listBieuHienHanNhiet = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "1. Bình thường"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "2. Hàn"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "3. Nhiệt"
    },
    {
      ID:"4",
      MA: "4",
      MO_TA: "4. Khác"
    },
  ];
  listHanNhiet = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "1. Thích nóng"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "2. Sợ nóng"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "3. Thích mát"
    },
    {
      ID:"4",
      MA: "4",
      MO_TA: "4. Sợ lạnh"
    },
    {
      ID:"5",
      MA: "5",
      MO_TA: "5. Trong người nóng"
    },
    {
      ID:"6",
      MA: "6",
      MO_TA: "6. Trong người lạnh"
    },
    {
      ID:"7",
      MA: "7",
      MO_TA: "7. Rét run"
    },
    {
      ID:"8",
      MA: "8",
      MO_TA: "8. Hàn nhiệt vãng lai"
    },
    {
      ID:"9",
      MA: "9",
      MO_TA: "9. Khác"
    },
  ];
  listMoHoi = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "1. Bình thường"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "2. Không có mồ hôi"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "3. Tự hãn"
    },
    {
      ID:"4",
      MA: "4",
      MO_TA: "4. Đạo hãn"
    },
    {
      ID:"5",
      MA: "5",
      MO_TA: "5. Nhiều"
    },
    {
      ID:"6",
      MA: "6",
      MO_TA: "6. Ít"
    },
    {
      ID:"7",
      MA: "7",
      MO_TA: "7. Khác"
    }
  ];
  listDauMat = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "Có"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "Không"
    }
  ];
  listMat = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "9. Hoa mắt chóng mặt"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "10. Nhìn không rõ"
    }
  ];
  listDauDau = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "1. Một chỗ"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "2. Nửa đầu"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "3. Cả đầu"
    },
    {
      ID:"4",
      MA: "4",
      MO_TA: "4. Di chuyển"
    },
    {
      ID:"5",
      MA: "5",
      MO_TA: "5. Ê ẩm như bị buộc lại"
    },
    {
      ID:"6",
      MA: "6",
      MO_TA: "6. Nhói"
    },
    {
      ID:"7",
      MA: "7",
      MO_TA: "7. Căng"
    },
    {
      ID:"8",
      MA: "8",
      MO_TA: "8. Nặng đầu"
    },
  ];
  listTai = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "11. Ù"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "12. Điếc"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "13. Nặng"
    },
    {
      ID:"4",
      MA: "4",
      MO_TA: "14. Đau"
    },
  ];
  listMui = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "15. Ngạt"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "16. Chảy nước"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "17. Chảy máu cam"
    },
    {
      ID:"4",
      MA: "4",
      MO_TA: "18. Đau"
    },
  ];
  listHong = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "19. Đau"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "20. Khô"
    },
  ];
  listCoVai = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "21. Mỏi"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "22. Đau"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "23. Khó vận động"
    },
    {
      ID:"4",
      MA: "4",
      MO_TA: "24. Khác"
    },
  ];
  listLung = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "1. Có"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "2. Không"
    },
  ];
  listDauLung = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "1. Đau"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "2. Khó vận động"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "3. Co cứng cơ"
    },
    {
      ID:"4",
      MA: "4",
      MO_TA: "4. Khác"
    },
  ];
  listBHBLBungNguc = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "1. Có"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "2. Không"
    },
  ];
  listNgu = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "1. Có"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "2. Không"
    },
  ];
  listKinhNguyet = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "1. Có"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "2. Không"
    },
  ];
  listDieuKienXuatHienBenh = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "1. Có"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "2. Không"
    },
  ];
  listRoiLoanKhaNangSinhDuc = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "1. Có"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "2. Không"
    },
  ];
  listKieuDauNguc = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "1. Tức"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "2. Đau"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "3. Sôi"
    },
    {
      ID:"4",
      MA: "4",
      MO_TA: "4. Nóng ruột"
    },
    {
      ID:"5",
      MA: "5",
      MO_TA: "5. Đầy trướng"
    },
    {
      ID:"6",
      MA: "6",
      MO_TA: "6. Ngột ngạt khó thở"
    },
    {
      ID:"7",
      MA: "7",
      MO_TA: "7. Đau tức cạnh sườn"
    },
    {
      ID:"8",
      MA: "8",
      MO_TA: "8. Bồn chồn không yên"
    },
    {
      ID:"9",
      MA: "9",
      MO_TA: "9. Đánh trống ngực"
    },
    {
      ID:"10",
      MA: "10",
      MO_TA: "10. Khác"
    },
  ];
  listChanTay = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "1. Có"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "2. Không"
    },
  ];
  listUong = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "1. Có"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "2. Không"
    },
  ];
  listBHBLAn = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "1. Có"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "2. Không"
    },
  ];
  listAn = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "1. Thích nóng"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "2. Thích mát"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "3. Ăn nhiều"
    },
    {
      ID:"4",
      MA: "4",
      MO_TA: "4. Ăn ít"
    },
    {
      ID:"5",
      MA: "5",
      MO_TA: "5. Đắng miệng"
    },
    {
      ID:"6",
      MA: "6",
      MO_TA: "6. Nhạt miệng"
    },
    {
      ID:"7",
      MA: "7",
      MO_TA: "7. Thèm ăn"
    },
    {
      ID:"8",
      MA: "8",
      MO_TA: "8. Chán ăn"
    },
    {
      ID:"9",
      MA: "9",
      MO_TA: "9. Ăn vào bụng chướng"
    },
    {
      ID:"10",
      MA: "10",
      MO_TA: "10. Khác"
    },
  ];
  listTieuTien = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "1.Vàng"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "2.Đỏ"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "3.Đục"
    },
    {
      ID:"4",
      MA: "4",
      MO_TA: "4.Buốt"
    },
    {
      ID:"5",
      MA: "5",
      MO_TA: "5.Dắt"
    },
    {
      ID:"6",
      MA: "6",
      MO_TA: "6.Không tự chủ"
    },
    {
      ID:"7",
      MA: "7",
      MO_TA: "7.Bí"
    },
    {
      ID:"8",
      MA: "8",
      MO_TA: "8.Khác"
    },
  ];
  listDaiTien = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "1.Táo"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "2.Nhão"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "3.Sống"
    },
    {
      ID:"4",
      MA: "4",
      MO_TA: "4.Toàn nước"
    },
    {
      ID:"5",
      MA: "5",
      MO_TA: "5.Nhầy mũi"
    },
    {
      ID:"6",
      MA: "6",
      MO_TA: "6.Bí"
    },
    {
      ID:"7",
      MA: "7",
      MO_TA: "7.Khác"
    },
  ];
  listKieuNgu = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "1. Khó vào giấc ngủ"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "2. Hay tỉnh"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "3. Dậy sớm"
    },
    {
      ID:"4",
      MA: "4",
      MO_TA: "4. Hay mơ"
    },
    {
      ID:"5",
      MA: "5",
      MO_TA: "5. Khác"
    },
  ];
  listBungNguc = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "1. Có"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "2. Không"
    },
  ];
  listDaiTieuTien = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "1. Có"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "2. Không"
    },
  ];
  listThongKinh = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "1. Đau trước kỳ"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "2. Đau trong kỳ"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "3. Đau sau kỳ"
    },
    {
      ID:"4",
      MA: "4",
      MO_TA: "4. Khác"
    },
  ];
  listRoiLoanKinhNguyet = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "1. Đến trước kỳ"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "2. Đến sau kỳ"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "3. Lúc đến trước kỳ lúc đến sau kỳ"
    },
    {
      ID:"4",
      MA: "4",
      MO_TA: "4. Tắc kinh"
    },
    {
      ID:"5",
      MA: "5",
      MO_TA: "5. Khác"
    },
  ];
  listDoiHa = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "1. Vàng"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "2. Trắng"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "3. Hôi"
    },
    {
      ID:"4",
      MA: "4",
      MO_TA: "4. Hồng"
    },
    {
      ID:"5",
      MA: "5",
      MO_TA: "5. Khác"
    },
  ];
  listKieuUong = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "1. Mát"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "2. Ấm nóng"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "3. Nhiều"
    },
    {
      ID:"4",
      MA: "4",
      MO_TA: "4. Ít"
    },
    {
      ID:"5",
      MA: "5",
      MO_TA: "5. Khác"
    },
  ];
  listNam = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "1. Yếu khi giao hợp"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "2. Liệt dương"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "3. Di tinh"
    },
    {
      ID:"4",
      MA: "4",
      MO_TA: "4. Hoạt tinh"
    },
    {
      ID:"5",
      MA: "5",
      MO_TA: "5. Mộng tinh"
    },
    {
      ID:"6",
      MA: "6",
      MO_TA: "6. Lãnh tinh"
    },
  ];
  listNu = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "7. Không thụ thai"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "8. Sẩy thai/động thai"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "9. Sảy thai liên tiếp"
    },
    {
      ID:"4",
      MA: "4",
      MO_TA: "10. Khác"
    },
  ];
  listMoHoiThietChan = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "1. Toàn thân"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "2. Trán"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "3. Tay chân"
    },
    {
      ID:"4",
      MA: "4",
      MO_TA: "4. Khác"
    },
  ];
  listDa = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "1. Bình thường"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "2. Khô"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "3. Nóng"
    },
    {
      ID:"4",
      MA: "4",
      MO_TA: "4. Lạnh"
    },
    {
      ID:"5",
      MA: "5",
      MO_TA: "5. Ướt"
    },
    {
      ID:"6",
      MA: "6",
      MO_TA: "6. Chân tay nóng"
    },
    {
      ID:"7",
      MA: "7",
      MO_TA: "7. Chân tay lạnh"
    },
    {
      ID:"8",
      MA: "8",
      MO_TA: "8. Ấn lõm"
    },
    {
      ID:"9",
      MA: "9",
      MO_TA: "9. Ấn đau"
    },
    {
      ID:"10",
      MA: "10",
      MO_TA: "10. Cục cứng"
    },
    {
      ID:"11",
      MA: "11",
      MO_TA: "11. Khác"
    },
  ];
  listCoXuongKhop = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "1. Săn chắc"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "2. Mềm"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "3. Căng cứng"
    },
    {
      ID:"4",
      MA: "4",
      MO_TA: "4. Co cơ ấn đau"
    },
    {
      ID:"5",
      MA: "5",
      MO_TA: "5. Gân đau"
    },
    {
      ID:"6",
      MA: "6",
      MO_TA: "6. Xương khớp đau"
    },
    {
      ID:"7",
      MA: "7",
      MO_TA: "7. Khác"
    },
  ];
  listBung = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "1. Mềm"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "2. Chướng"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "3. Cổ chướng"
    },
    {
      ID:"4",
      MA: "4",
      MO_TA: "4. Có hòn cục"
    },
    {
      ID:"5",
      MA: "5",
      MO_TA: "5. Đau thiện án"
    },
    {
      ID:"6",
      MA: "6",
      MO_TA: "6. Đau cự án"
    },
    {
      ID:"7",
      MA: "7",
      MO_TA: "7. Khác"
    },
  ];
  listMachChan = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "1. Phù"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "2. Trầm"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "3. Trì"
    },
    {
      ID:"4",
      MA: "4",
      MO_TA: "4. Sác"
    },
    {
      ID:"5",
      MA: "5",
      MO_TA: "5. Tế"
    },
    {
      ID:"6",
      MA: "6",
      MO_TA: "6. Huyền"
    },
    {
      ID:"7",
      MA: "7",
      MO_TA: "7. Hoạt"
    },
    {
      ID:"8",
      MA: "8",
      MO_TA: "8. Vô lực"
    },
    {
      ID:"9",
      MA: "9",
      MO_TA: "9. Có lực"
    },
    {
      ID:"10",
      MA: "10",
      MO_TA: "10. Khác"
    },
  ];
  listViKhanTrai = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "Thốn"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "Quan"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "Xích"
    },
  ];
  listViKhanPhai = [
    {
      ID:"1",
      MA: "1",
      MO_TA: "Thốn"
    },
    {
      ID:"2",
      MA: "2",
      MO_TA: "Quan"
    },
    {
      ID:"3",
      MA: "3",
      MO_TA: "Xích"
    },
  ];

  get resetDM() {
    return new DM();
  }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.patientInfo?.currentValue) {
      const patientInfo = changes.patientInfo.currentValue as EmrPatientInfo;

      // Load
      if (patientInfo.idEMR && patientInfo.results && patientInfo.results.yhct) {
        this.benhan_YHCT_noi_tru = patientInfo.results?.yhct;
      }
    }

    this.shareDataService.pushData(this.benhan_YHCT_noi_tru, 'yhct_noi_tru');
  }

  reset_DAU_MAT() {
    this.benhan_YHCT_noi_tru.KIEU_DAU_DAU = new DM();
    this.benhan_YHCT_noi_tru.MAT = new DM();
    this.benhan_YHCT_noi_tru.TAI = new DM();
    this.benhan_YHCT_noi_tru.MUI = new DM();
    this.benhan_YHCT_noi_tru.HONG = new DM();
    this.benhan_YHCT_noi_tru.CO_VAI = new DM();
  }

  reset_DAI_TIEU_TIEN() {
    this.benhan_YHCT_noi_tru.TIEU_TIEN = new DM();
    this.benhan_YHCT_noi_tru.DAI_TIEN = new DM();
  }

  reset_KINH_NGUYET() {
    this.benhan_YHCT_noi_tru.ROI_LOAN_KINH_NGUYET = new DM();
    this.benhan_YHCT_noi_tru.THONG_KINH = new DM();
    this.benhan_YHCT_noi_tru.DOI_HA = new DM();
  }

  reset_ROI_LOAN_KHA_NANG_SINH_DUC() {
    this.benhan_YHCT_noi_tru.NAM = new DM();
    this.benhan_YHCT_noi_tru.NU = new DM();
  }
}
