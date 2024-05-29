import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { EmrRoutingModule } from './emr-routing.module';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MtxGridModule } from '@ng-matero/extensions/grid';
import { MatChipsModule } from '@angular/material/chips';
import { MtxLoaderModule } from '@ng-matero/extensions/loader';
import { SharedModule } from '@shared';
import { MatExpansionModule } from '@angular/material/expansion';
// import { PhieuThuPhanUngThuocComponent } from './phieu-thu-phan-ung-thuoc/phieu-thu-phan-ung-thuoc.component';
import { BienBanHoiChanComponent } from './cac_loai_phieu_trong_benh_an/bien-ban-hoi-chan/bien-ban-hoi-chan.component';

// import { GiayChungNhanThuThuatComponent } from './giay-chung-nhan-thu-thuat/giay-chung-nhan-thu-thuat.component';
import { GiayChuyenVienComponent } from './cac_loai_phieu_trong_benh_an/giay-chuyen-vien/giay-chuyen-vien.component';
// import { PhieuKhamGayMeTruocMoComponent } from './phieu-kham-gay-me-truoc-mo/phieu-kham-gay-me-truoc-mo.component';
import { BaoCaoTuVongComponent } from './bao-cao-tu-vong/bao-cao-tu-vong.component';
// import { PhieuThamKhamTaiKhoaComponent } from './phieu-tham-kham-tai-khoa/phieu-tham-kham-tai-khoa.component';
// import { TaoMoiHoiBenhComponent } from './tao-moi-hoi-benh/tao-moi-hoi-benh.component';
import { PhieuDemGacMecheDungCuComponent } from './phieu-dem-gac-meche-dung-cu/phieu-dem-gac-meche-dung-cu.component';
// import { NguoiTruongThanhComponent } from './phieu-danh-gia-tinh-trang-dinh-duong/nguoi-truong-thanh/nguoi-truong-thanh.component';
// import { GiayRaVienComponent } from './giay-ra-vien/giay-ra-vien.component';
// import { PhieuKhamTruocMoComponent } from './phieu-kham-truoc-mo/phieu-kham-truoc-mo.component';
import { HanhChinhComponent } from './benh-an-dien-tu/hanh-chinh/hanh-chinh.component';
import { HoiBenhComponent } from './benh-an-dien-tu/hoi-benh/hoi-benh.component';
import { BenhAnNoiKhoaComponent } from './benh-an-emr/benh-an-noi-khoa/benh-an-noi-khoa.component';
import { BenhAnNgoaiKhoaComponent } from './benh-an-emr/benh-an-ngoai-khoa/benh-an-ngoai-khoa.component';
import { BenhAnSanKhoaComponent } from './benh-an-emr/benh-an-san-khoa/benh-an-san-khoa.component';
import { EmrComponent } from './emr/emr.component';
import { ChanDoanComponent } from './benh-an-dien-tu/chan-doan/chan-doan.component';
import { KhamBenhComponent } from './benh-an-dien-tu/kham-benh/kham-benh.component';
import { ChanDoanKhiVaoKhoaDieuTriComponent } from './benh-an-dien-tu/chan-doan-khi-vao-khoa-dieu-tri/chan-doan-khi-vao-khoa-dieu-tri.component';
import { TongKetBenhAnComponent } from './benh-an-dien-tu/tong-ket-benh-an/tong-ket-benh-an.component';
import { ShareDataService } from '../../services/share-data.service';
import { QuanLyNguoiBenhComponent } from './benh-an-dien-tu/quan-ly-nguoi-benh/quan-ly-nguoi-benh.component';
import { TinhTrangRaVienComponent } from './benh-an-dien-tu/tinh-trang-ra-vien/tinh-trang-ra-vien.component';
import { ChanDoanNgoaikhoaComponent } from './benh-an-emr/benh-an-ngoai-khoa/chan-doan-ngoaikhoa/chan-doan-ngoaikhoa.component';
import { LyDoVaoVienComponent } from './benh-an-dien-tu/ly-do-vao-vien/ly-do-vao-vien.component';
import { TinhTrangRaVienNgoaikhoaComponent } from './benh-an-emr/benh-an-ngoai-khoa/tinh-trang-ra-vien-ngoaikhoa/tinh-trang-ra-vien-ngoaikhoa.component';
import { NgxMatDateFormats, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { TienLuongComponent } from './benh-an-dien-tu/tien-luong/tien-luong.component';
import { OfficeService } from '../../services/office.service';
import { LaboratoryService } from '../laboratory/laboratory.service';
import { PrintService } from '../../services/print.service';
import { ServiceService } from '../../services/service.service';
import { OverlayModule } from '@angular/cdk/overlay';
import { PhieuPhauThuatThuThuatEmrComponent } from './cac_loai_phieu_trong_benh_an/phieu-phau-thuat-thu-thuat-emr/phieu-phau-thuat-thu-thuat-emr.component';
import { BenhAnNhiKhoaComponent } from './benh-an-emr/benh-an-nhi-khoa/benh-an-nhi-khoa.component';
import { BenhAnDaLieuComponent } from './benh-an-emr/benh-an-da-lieu/benh-an-da-lieu.component';
import { BenhAnNgoaiTruRhmComponent } from './benh-an-emr/benh-an-ngoai-tru-rhm/benh-an-ngoai-tru-rhm.component';
import { BenhAnRangHamMatComponent } from './benh-an-emr/benh-an-rang-ham-mat/benh-an-rang-ham-mat.component';
import { BenhAnTaiMuiHongComponent } from './benh-an-emr/benh-an-tai-mui-hong/benh-an-tai-mui-hong.component';
import { BenhAnNgoaiTruTmhComponent } from './benh-an-emr/benh-an-ngoai-tru-tmh/benh-an-ngoai-tru-tmh.component';
// @ts-ignore
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ThuPhanUngThuocComponent } from './cac_loai_phieu_trong_benh_an/thu-phan-ung-thuoc/thu-phan-ung-thuoc.component';
import { GiayChungNhanPhauThuatComponent } from './cac_loai_phieu_trong_benh_an/giay-chung-nhan-phau-thuat/giay-chung-nhan-phau-thuat.component';
import { LaboratoryModule } from '../laboratory/laboratory.module';
import { HoSoChamSocNguoiBenhCuaDieuDuongComponent } from './cac_loai_phieu_trong_benh_an/ho-so-cham-soc-nguoi-benh-cua-dieu-duong/ho-so-cham-soc-nguoi-benh-cua-dieu-duong.component';
import { PhieuTruyenMauComponent } from './cac_loai_phieu_trong_benh_an/phieu-truyen-mau/phieu-truyen-mau.component';
import { SoKetDieuTriComponent } from './cac_loai_phieu_trong_benh_an/so-ket-dieu-tri/so-ket-dieu-tri.component';
import { PhieuDieuTriComponent } from './cac_loai_phieu_trong_benh_an/phieu-dieu-tri/phieu-dieu-tri.component';
import { BenhAnIvfComponent } from './benh-an-emr/benh-an-ivf/benh-an-ivf.component';
import { GiayChungNhanThuongTichComponent } from './cac_loai_phieu_trong_benh_an/giay-chung-nhan-thuong-tich/giay-chung-nhan-thuong-tich.component';
import { BienBanKiemDiemTuVongComponent } from './cac_loai_phieu_trong_benh_an/bien-ban-kiem-diem-tu-vong/bien-ban-kiem-diem-tu-vong.component';
import { BenhAnIuiComponent } from './benh-an-emr/benh-an-iui/benh-an-iui.component';
import { PhieuClsComponent } from './cac_loai_phieu_trong_benh_an/phieu-cls/phieu-cls.component';
import { BenhAnSanPhuKhoaComponent } from './benh-an-emr/benh-an-san-phu-khoa/benh-an-san-phu-khoa.component';
import { LuongGiaChucNangVaSuThamGiaComponent } from './cac_loai_phieu_trong_benh_an/luong-gia-chuc-nang-va-su-tham-gia/luong-gia-chuc-nang-va-su-tham-gia.component';
import { ChiDinhDieuTriPhcnComponent } from './cac_loai_phieu_trong_benh_an/chi-dinh-dieu-tri-phcn/chi-dinh-dieu-tri-phcn.component';
import { ThucHienKyThuatPhcnComponent } from './cac_loai_phieu_trong_benh_an/thuc-hien-ky-thuat-phcn/thuc-hien-ky-thuat-phcn.component';
import { PhieuXetNghiemComponent } from './cac_loai_phieu_trong_benh_an/phieu-xet-nghiem/phieu-xet-nghiem.component';
// import { PhieuGiaiPhauBenhComponent } from './cac_loai_phieu_trong_benh_an/phieu-giai-phau-benh/phieu-giai-phau-benh.component';
import { BenhAnMatComponent } from './benh-an-emr/benh-an-mat/benh-an-mat.component';
import { PhieuTheoDoiDiUngComponent } from './cac_loai_phieu_trong_benh_an/phieu-theo-doi-di-ung/phieu-theo-doi-di-ung.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { PhieuTruyenDichComponent } from './cac_loai_phieu_trong_benh_an/phieu-truyen-dich/phieu-truyen-dich.component';
import { PhieuTheoDoiTruyenDichComponent } from './cac_loai_phieu_trong_benh_an/phieu-theo-doi-truyen-dich/phieu-theo-doi-truyen-dich.component';
// import { BenhAnYHocCoTruyenComponent } from './benh-an-emr/benh-an-y-hoc-co-truyen/benh-an-y-hoc-co-truyen.component';
// import { TongKetBenhAnYHocCoTruyenComponent } from './benh-an-emr/benh-an-y-hoc-co-truyen/tong-ket-benh-an-y-hoc-co-truyen/tong-ket-benh-an-y-hoc-co-truyen/tong-ket-benh-an-y-hoc-co-truyen.component';
import { BenhAnNgoaiTruChungComponent } from './benh-an-emr/benh-an-ngoai-tru-chung/benh-an-ngoai-tru-chung.component';
import { DocumentExamComponent } from './document-exam/document-exam.component';
import { PhieuYeuCauQuanLyKhangSinhComponent } from './phieu-yeu-cau-quan-ly-khang-sinh/phieu-yeu-cau-quan-ly-khang-sinh.component';
import { PhieuKhaiThacTienSuDungThuocComponent } from './phieu-khai-thac-tien-su-dung-thuoc/phieu-khai-thac-tien-su-dung-thuoc.component';
import { BenhAnSoSinhComponent } from './benh-an-emr/benh-an-so-sinh/benh-an-so-sinh.component';
import { BenhAnTruyenNhiemComponent } from './benh-an-emr/benh-an-truyen-nhiem/benh-an-truyen-nhiem.component';
import { BenhAnPhuKhoaComponent } from './benh-an-emr/benh-an-phu-khoa/benh-an-phu-khoa.component';
import { HoiBenhSoSinhComponent } from './benh-an-dien-tu/hoi-benh-so-sinh/hoi-benh-so-sinh.component';
import { KhamBenhCoQuanKhacSoSinhComponent } from './benh-an-dien-tu/kham-benh-co-quan-khac-so-sinh/kham-benh-co-quan-khac-so-sinh.component';
import { BenhAnHuyetHocTruyenMauComponent } from './benh-an-emr/benh-an-huyet-hoc-truyen-mau/benh-an-huyet-hoc-truyen-mau.component';
import { BenhAnTamThanComponent } from './benh-an-emr/benh-an-tam-than/benh-an-tam-than.component';
import { BenhAnDieuDuongPHCNComponent } from './benh-an-emr/benh-an-dieu-duong-phcn/benh-an-dieu-duong-phcn.component';
import { BenhAnBongComponent } from './benh-an-emr/benh-an-bong/benh-an-bong.component';
import { TienThaiParaComponent } from './components/tien-thai-para/tien-thai-para.component';
import { BenhAnPhacoComponent } from './benh-an-emr/benh-an-phaco/benh-an-phaco.component';
import { HoiBenhPhacoComponent } from './benh-an-dien-tu/hoi-benh-phaco/hoi-benh-phaco.component';
import { MultiSelectComponent } from './components/multi-select/multi-select.component';
import { BenhAnMatDayMatComponent } from './benh-an-emr/benh-an-mat-day-mat/benh-an-mat-day-mat.component';
import { KhamMatComponent } from './benh-an-dien-tu/kham-mat/kham-mat.component';
import { BenhAnUngBuouComponent } from './benh-an-emr/benh-an-ung-buou/benh-an-ung-buou.component';
import { TMNGiaiDoanComponent } from './benh-an-dien-tu/t-m-n-giai-doan/t-m-n-giai-doan.component';
import { BenhAnMatLacSupMiComponent } from './benh-an-emr/benh-an-mat-lac-sup-mi/benh-an-mat-lac-sup-mi.component';
import { KhamMatPhacoComponent } from './benh-an-dien-tu/kham-mat-phaco/kham-mat-phaco.component';
import { BenhAnTuyenXaPhuongComponent } from './benh-an-emr/benh-an-tuyen-xa-phuong/benh-an-tuyen-xa-phuong.component';
import { BenhAnPhauThuatKhucXaComponent } from './benh-an-emr/benh-an-phau-thuat-khuc-xa/benh-an-phau-thuat-khuc-xa.component';
import { HoiBenhBenhAnKhucXaComponent } from './benh-an-dien-tu/hoi-benh-benh-an-khuc-xa/hoi-benh-benh-an-khuc-xa.component';
import { KhamMatBenhAnPhauThuatKhucXaComponent } from './benh-an-dien-tu/kham-mat-benh-an-phau-thuat-khuc-xa/kham-mat-benh-an-phau-thuat-khuc-xa.component';
import { BenhAnMatChanThuongComponent } from './benh-an-emr/benh-an-mat-chan-thuong/benh-an-mat-chan-thuong.component';
import { KhamBenhMatChanThuongComponent } from './benh-an-dien-tu/kham-benh-mat-chan-thuong/kham-benh-mat-chan-thuong.component';
import { BenhAnMatTreEmComponent } from './benh-an-emr/benh-an-mat-tre-em/benh-an-mat-tre-em.component';
import { TienSuBenhComponent } from './benh-an-dien-tu/tien-su-benh/tien-su-benh.component';
import { ThiLucComponent } from './benh-an-dien-tu/thi-luc/thi-luc.component';
import { KhamMatTreEmComponent } from './benh-an-dien-tu/kham-mat-tre-em/kham-mat-tre-em.component';
import { DienBienBenhYLenhComponent } from './benh-an-dien-tu/dien-bien-benh-y-lenh/dien-bien-benh-y-lenh.component';
import { ThiLucRaVienComponent } from './benh-an-dien-tu/thi-luc-ra-vien/thi-luc-ra-vien.component';
import { BenhAnNaoPhaThaiComponent } from './benh-an-emr/benh-an-nao-pha-thai/benh-an-nao-pha-thai.component';
import { EmrDateRangeComponent } from './components/emr-date-range/emr-date-range.component';
import { BenhAnChanTayMiengComponent } from './benh-an-emr/benh-an-chan-tay-mieng/benh-an-chan-tay-mieng.component';
import { EmrYearComponent } from './components/emr-year/emr-year.component';
import { EmrAgeComponent } from './components/emr-age/emr-age.component';
import { BenhAnYhctNoiTruComponent } from './benh-an-emr/benh-an-yhct-noi-tru/benh-an-yhct-noi-tru.component';
import { YHCTComponent } from './benh-an-dien-tu/yhct/yhct.component';
import { PhieuGayMeHoiSuc } from './cac_loai_phieu_trong_benh_an/phieu-gay-me-hoi-suc/phieu-gay-me-hoi-suc.component';
import { GiayDongYThucHienPtttComponent } from './giay-dong-y-thuc-hien-pttt/giay-dong-y-thuc-hien-pttt.component';
import { PhieuTheoDoiChucNangSongComponent } from './cac_loai_phieu_trong_benh_an/phieu-theo-doi-chuc-nang-song/phieu-theo-doi-chuc-nang-song.component';
import { PhieuChamSocYTaComponent } from './cac_loai_phieu_trong_benh_an/phieu_cham_soc_y_ta/phieu-cham-soc-y-ta.component';
import { BangKiemAnToanPhauThuatComponent } from './cac_loai_phieu_trong_benh_an/bang-kiem-an-toan-phau-thuat/bang-kiem-an-toan-phau-thuat.component';
import { BenhAnNgoaiTruHamMatComponent } from './benh-an-emr/benh-an-ngoai-tru-ham-mat/benh-an-ngoai-tru-ham-mat.component';
import { BenhAnNgoaiTruRangComponent } from './benh-an-emr/benh-an-ngoai-tru-rang/benh-an-ngoai-tru-rang.component';
import { BienBanHoiChanPhauThuatComponent } from './cac_loai_phieu_trong_benh_an/bien-ban-hoi-chan-phau-thuat/bien-ban-hoi-chan-phau-thuat.component';
import { BenhAnNgoaiTruThanNhanTaoComponent } from './benh-an-emr/benh-an-ngoai-tru-tnt/benh-an-ngoai-tru-than-nhan-tao.component';
import { PhieuDanhGiaDinhDuongTreEmComponent } from './phieu-danh-gia-dinh-duong-tre-em/phieu-danh-gia-dinh-duong-tre-em.component';
import { BenhAnNgoaiTruPhcnComponent } from './benh-an-emr/benh-an-ngoai-tru-phcn/benh-an-ngoai-tru-phcn.component';
import { GiayToBhytModule } from '../giay-to-bhyt/giay-to-bhyt.module';
import { DocumentExamListComponent } from './components/document-exam-list/document-exam-list.component';
import { PhieuGiaoDucSucKhoeComponent } from './cac_loai_phieu_trong_benh_an/phieu-giao-duc-suc-khoe/phieu-giao-duc-suc-khoe.component';
import { HsbaCsDtHivAidsComponent } from './cac_loai_phieu_trong_benh_an/hsba-cs-dt-hiv-aids/hsba-cs-dt-hiv-aids.component';
import { PapersOtherModule } from '../papers-other/papers-other.module';
import { PipeModule } from '../../pipes/pipe.module';
import { PhieuTuChoiDieuTriComponent } from './cac_loai_phieu_trong_benh_an/phieu-tu-choi-dieu-tri/phieu-tu-choi-dieu-tri.component';
import { GiayCamKetNguoiBenhNamNoiChuComponent } from './giay-cam-ket-nguoi-benh-nam-noi-chu/giay-cam-ket-nguoi-benh-nam-noi-chu.component';
import { PhieuDuyetMoComponent } from './cac_loai_phieu_trong_benh_an/phieu-duyet-mo/phieu-duyet-mo.component';
import { BangDanhGiaThangDiemGlasgowComponent } from './cac_loai_phieu_trong_benh_an/bang-danh-gia-thang-diem-glasgow/bang-danh-gia-thang-diem-glasgow.component';
import { PhieuTheoDoiGiamDauSauMoComponent } from './cac_loai_phieu_trong_benh_an/phieu-theo-doi-giam-dau-sau-mo/phieu-theo-doi-giam-dau-sau-mo.component';
import { PhieuDeNghiKhamChuaBenhTheoYeuCauComponent } from './cac_loai_phieu_trong_benh_an/giay-de-nghi-kham-chua-benh-theo-yeu-cau/phieu-de-nghi-kham-chua-benh-theo-yeu-cau.component';
import { TemplateExamComponent } from './template-exam/template-exam.component';
import { TemplateExameService } from '../../services/template/template-exam.service';
import { PhieuChamSocSoSinhComponent } from './cac_loai_phieu_trong_benh_an/phieu-cham-soc-so-sinh/phieu-cham-soc-so-sinh.component';
import { BenhAnMatGlocomComponent } from './benh-an-emr/benh-an-mat-glocom/benh-an-mat-glocom.component';
import { HoiBenhMatGlocomComponent } from './benh-an-dien-tu/hoi-benh-mat-glocom/hoi-benh-mat-glocom.component';
import { KhamMatGlocomComponent } from './benh-an-dien-tu/kham-mat-glocom/kham-mat-glocom.component';
import { ChanDoanBenhAnMatComponent } from './benh-an-dien-tu/chan-doan-benh-an-mat/chan-doan-benh-an-mat.component';
import { CheckStatusPipe } from '../medicament/check-status.pipe';
import { BangTheoDoiBenhNhanEcmoComponent } from './cac_loai_phieu_trong_benh_an/bang-theo-doi-benh-nhan-ecmo/bang-theo-doi-benh-nhan-ecmo.component';
import { BangKiemChuanBiVaBanGiaoNguoiBenhComponent } from './cac_loai_phieu_trong_benh_an/bang_kiem_chuan_bi_va_ban_giao_nguoi_bnh/bang-kiem-chuan-bi-va-ban-giao-nguoi-benh.component';
import { BoCauHoiNRSComponent } from './cac_loai_phieu_trong_benh_an/bo-cau-hoi-NRS/bo-cau-hoi-NRS.component';
import { PhieuTheoDoiBenhNhanLocMauLienTucComponent } from './cac_loai_phieu_trong_benh_an/phieu-theo-doi-benh-nhan-loc-mau-lien-tuc/phieu-theo-doi-benh-nhan-loc-mau-lien-tuc.component';
import { TomTatHoSoBenhAnComponent } from './cac_loai_phieu_trong_benh_an/tom-tat-ho-so-benh-an/tom-tat-ho-so-benh-an.component';
import { PhieuDanhGiaDinhDuongPhuNuMangThaiComponent } from './cac_loai_phieu_trong_benh_an/phieu-danh-gia-dinh-duong-phu-nu-mang-thai/phieu-danh-gia-dinh-duong-phu-nu-mang-thai.component';
import { TemplatesModule } from '../templates/templates.module';
import { PhieuLocMauLienTucComponent } from './cac_loai_phieu_trong_benh_an/phieu-loc-mau-lien-tuc/phieu-loc-mau-lien-tuc.component';
import { SyntheticClsComponent } from './components/synthetic-cls/synthetic-cls.component';
import { PhieuThongTinTuVanComponent } from './cac_loai_phieu_trong_benh_an/phieu-thong-tin-tu-van/phieu-thong-tin-tu-van.component';
import { BoCauHoiTreEmComponent } from './cac_loai_phieu_trong_benh_an/bo-cau-hoi-tre-em/bo-cau-hoi-tre-em.component';
import { GiayDeNghiKhamChuaBenhTheoYeuCauKhoaSanComponent } from './cac_loai_phieu_trong_benh_an/giay-de-nghi-kham-chua-benh-theo-yeu-cau-khoa-san/giay-de-nghi-kham-chua-benh-theo-yeu-cau-khoa-san.component';
import { GiayKhamSucKhoeLaiXeComponent } from './giay-kham-suc-khoe-lai-xe/giay-kham-suc-khoe-lai-xe.component';
import { PhieuLapKeHoachChamSocComponent } from './cac_loai_phieu_trong_benh_an/phieu-lap-ke-hoach-cham-soc/phieu-lap-ke-hoach-cham-soc.component';
import { PhieuTienMeComponent } from './phieu-tien-me/phieu-tien-me.component';
import { GiayCamDoanChapNhanPhauThuatThuThuatComponent } from './cac_loai_phieu_trong_benh_an/giay-cam-doan-chap-nhan-phau-thuat-thu-thuat/giay-cam-doan-chap-nhan-phau-thuat-thu-thuat.component';
import { PhieuTuNguyenComponent } from './cac_loai_phieu_trong_benh_an/phieu-tu-nguyen/phieu-tu-nguyen.component';
import { PhieuNhanDinhNguoiBenhVaoVienComponent } from './cac_loai_phieu_trong_benh_an/phieu-nhan-dinh-nguoi-benh-vao-vien/phieu-nhan-dinh-nguoi-benh-vao-vien.component';
import { PhieuTheoDoiTienSuDiUngComponent } from './cac_loai_phieu_trong_benh_an/phieu-theo-doi-tien-su-di-ung/phieu-theo-doi-tien-su-di-ung.component';
import { QuanLyBenhAnComponent } from './quan-ly-benh-an/quan-ly-benh-an.component';
const MY_DATE_FORMATS: NgxMatDateFormats = {
  parse: {
    dateInput: 'HH:mm DD/MM/YYYY',
  },
  display: {
    dateInput: 'HH:mm DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [
    ThuPhanUngThuocComponent,
    PhieuDieuTriComponent,
    BienBanHoiChanComponent,
    PhieuPhauThuatThuThuatEmrComponent,
    GiayChungNhanPhauThuatComponent,
    // GiayChungNhanThuThuatComponent,
    GiayChuyenVienComponent,
    // PhieuKhamGayMeTruocMoComponent,
    BaoCaoTuVongComponent,
    HoSoChamSocNguoiBenhCuaDieuDuongComponent,
    PhieuTruyenMauComponent,
    // PhieuThamKhamTaiKhoaComponent,
    // TaoMoiHoiBenhComponent,
    PhieuDemGacMecheDungCuComponent,
    // NguoiTruongThanhComponent,
    // GiayRaVienComponent,
    // PhieuKhamTruocMoComponent,
    HanhChinhComponent,
    HoiBenhComponent,
    BenhAnNoiKhoaComponent,
    BenhAnNgoaiKhoaComponent,
    BenhAnNhiKhoaComponent,
    BenhAnRangHamMatComponent,
    BenhAnTaiMuiHongComponent,
    BenhAnDaLieuComponent,
    BenhAnIuiComponent,
    EmrComponent,
    BenhAnSanKhoaComponent,
    KhamBenhComponent,
    ChanDoanKhiVaoKhoaDieuTriComponent,
    ChanDoanComponent,
    TongKetBenhAnComponent,
    KhamBenhComponent,
    QuanLyNguoiBenhComponent,
    ChanDoanComponent,
    TinhTrangRaVienComponent,
    ChanDoanNgoaikhoaComponent,
    ChanDoanKhiVaoKhoaDieuTriComponent,
    LyDoVaoVienComponent,
    TienLuongComponent,
    TinhTrangRaVienNgoaikhoaComponent,
    BenhAnNgoaiTruRhmComponent,
    BenhAnNgoaiTruTmhComponent,
    // PhieuGiaiPhauBenhComponent,
    SoKetDieuTriComponent,
    PhieuClsComponent,
    BienBanKiemDiemTuVongComponent,
    BenhAnIvfComponent,
    GiayChungNhanThuongTichComponent,
    BenhAnSanPhuKhoaComponent,
    LuongGiaChucNangVaSuThamGiaComponent,
    ChiDinhDieuTriPhcnComponent,
    ThucHienKyThuatPhcnComponent,
    BenhAnMatComponent,
    PhieuTheoDoiDiUngComponent,
    PhieuXetNghiemComponent,
    UploadFileComponent,
    PhieuTruyenDichComponent,
    // BenhAnYHocCoTruyenComponent,
    BenhAnNgoaiTruChungComponent,
    DocumentExamComponent,
    PhieuYeuCauQuanLyKhangSinhComponent,
    PhieuKhaiThacTienSuDungThuocComponent,
    BenhAnSoSinhComponent,
    BenhAnPhuKhoaComponent,
    BenhAnSoSinhComponent,
    BenhAnTruyenNhiemComponent,
    HoiBenhSoSinhComponent,
    KhamBenhCoQuanKhacSoSinhComponent,
    BenhAnUngBuouComponent,
    BenhAnTruyenNhiemComponent,
    BenhAnHuyetHocTruyenMauComponent,
    BenhAnTamThanComponent,
    BenhAnDieuDuongPHCNComponent,
    TienThaiParaComponent,
    BenhAnBongComponent,
    MultiSelectComponent,
    TMNGiaiDoanComponent,
    BenhAnPhacoComponent,
    HoiBenhPhacoComponent,
    MultiSelectComponent,
    TMNGiaiDoanComponent,
    KhamMatPhacoComponent,
    BenhAnTuyenXaPhuongComponent,
    BenhAnMatDayMatComponent,
    KhamMatComponent,
    BenhAnMatLacSupMiComponent,
    BenhAnNaoPhaThaiComponent,
    BenhAnMatLacSupMiComponent,
    BenhAnPhauThuatKhucXaComponent,
    HoiBenhBenhAnKhucXaComponent,
    KhamMatBenhAnPhauThuatKhucXaComponent,
    BenhAnMatChanThuongComponent,
    KhamBenhMatChanThuongComponent,
    BenhAnMatTreEmComponent,
    TienSuBenhComponent,
    ThiLucComponent,
    KhamMatTreEmComponent,
    DienBienBenhYLenhComponent,
    ThiLucRaVienComponent,
    EmrDateRangeComponent,
    EmrYearComponent,
    EmrAgeComponent,
    BenhAnChanTayMiengComponent,
    BenhAnYhctNoiTruComponent,
    YHCTComponent,
    PhieuGayMeHoiSuc,
    GiayDongYThucHienPtttComponent,
    PhieuTheoDoiChucNangSongComponent,
    PhieuChamSocYTaComponent,
    PhieuTheoDoiTruyenDichComponent,
    BangKiemAnToanPhauThuatComponent,
    BenhAnNgoaiTruHamMatComponent,
    BenhAnNgoaiTruRangComponent,
    BienBanHoiChanPhauThuatComponent,
    BenhAnNgoaiTruThanNhanTaoComponent,
    PhieuDanhGiaDinhDuongTreEmComponent,
    BenhAnNgoaiTruPhcnComponent,
    DocumentExamListComponent,
    PhieuGiaoDucSucKhoeComponent,
    DocumentExamListComponent,
    HsbaCsDtHivAidsComponent,
    PhieuDuyetMoComponent,
    BangDanhGiaThangDiemGlasgowComponent,
    PhieuDeNghiKhamChuaBenhTheoYeuCauComponent,
    GiayDeNghiKhamChuaBenhTheoYeuCauKhoaSanComponent,
    PhieuTuChoiDieuTriComponent,
    PhieuTheoDoiGiamDauSauMoComponent,
    GiayCamKetNguoiBenhNamNoiChuComponent,
    TemplateExamComponent,
    PhieuYeuCauQuanLyKhangSinhComponent,
    PhieuChamSocSoSinhComponent,
    BangKiemChuanBiVaBanGiaoNguoiBenhComponent,
    BoCauHoiNRSComponent,
    PhieuDanhGiaDinhDuongPhuNuMangThaiComponent,
    BenhAnMatGlocomComponent,
    HoiBenhMatGlocomComponent,
    KhamMatGlocomComponent,
    ChanDoanBenhAnMatComponent,
    CheckStatusPipe,
    BangTheoDoiBenhNhanEcmoComponent,
    PhieuTheoDoiBenhNhanLocMauLienTucComponent,
    TomTatHoSoBenhAnComponent,
    PhieuLocMauLienTucComponent,
    SyntheticClsComponent,
    PhieuThongTinTuVanComponent,
    BoCauHoiTreEmComponent,
    GiayKhamSucKhoeLaiXeComponent,
    PhieuLapKeHoachChamSocComponent,
    PhieuTienMeComponent,
    GiayCamDoanChapNhanPhauThuatThuThuatComponent,
    PhieuTuNguyenComponent,
    PhieuNhanDinhNguoiBenhVaoVienComponent,
    PhieuTheoDoiTienSuDiUngComponent,
    QuanLyBenhAnComponent
  ],
  imports: [
    CommonModule,
    EmrRoutingModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    TranslateModule,
    FormsModule, ReactiveFormsModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatTableModule,
    MatTabsModule,
    MatDatepickerModule,
    MtxGridModule,
    MatChipsModule,
    MtxLoaderModule,
    SharedModule,
    MatExpansionModule,
    NgxMatTimepickerModule,
    OverlayModule,
    LaboratoryModule,
    PdfViewerModule,
    CKEditorModule,
    GiayToBhytModule,
    PapersOtherModule,
    PipeModule,
    TemplatesModule
  ],
  exports: [
    PhieuYeuCauQuanLyKhangSinhComponent,
    MultiSelectComponent,
    EmrDateRangeComponent,
    CheckStatusPipe,
    UploadFileComponent,
  ],
  providers: [ShareDataService, OfficeService, LaboratoryService,
    PrintService, ServiceService, TemplateExameService,
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    }],
})
export class EmrModule { }
