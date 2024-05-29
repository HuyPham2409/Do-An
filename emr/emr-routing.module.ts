import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { PhieuThuPhanUngThuocComponent } from './phieu-thu-phan-ung-thuoc/phieu-thu-phan-ung-thuoc.component';
// import { PhieuDieuTriComponent } from './phieu-dieu-tri/phieu-dieu-tri.component';
import { BienBanHoiChanComponent } from './cac_loai_phieu_trong_benh_an/bien-ban-hoi-chan/bien-ban-hoi-chan.component';
import { GiayChungNhanPhauThuatComponent} from './cac_loai_phieu_trong_benh_an/giay-chung-nhan-phau-thuat/giay-chung-nhan-phau-thuat.component';
// import { GiayChungNhanThuThuatComponent } from './giay-chung-nhan-thu-thuat/giay-chung-nhan-thu-thuat.component';
import { GiayChuyenVienComponent } from './cac_loai_phieu_trong_benh_an/giay-chuyen-vien/giay-chuyen-vien.component';
// import { PhieuKhamGayMeTruocMoComponent } from './phieu-kham-gay-me-truoc-mo/phieu-kham-gay-me-truoc-mo.component';
import { BaoCaoTuVongComponent } from './bao-cao-tu-vong/bao-cao-tu-vong.component';
// import { PhieuThamKhamTaiKhoaComponent } from './phieu-tham-kham-tai-khoa/phieu-tham-kham-tai-khoa.component';
// import { TaoMoiHoiBenhComponent } from './tao-moi-hoi-benh/tao-moi-hoi-benh.component';
import { PhieuDemGacMecheDungCuComponent } from './phieu-dem-gac-meche-dung-cu/phieu-dem-gac-meche-dung-cu.component';
// import { GiayRaVienComponent } from './giay-ra-vien/giay-ra-vien.component';
// import { NguoiTruongThanhComponent } from './phieu-danh-gia-tinh-trang-dinh-duong/nguoi-truong-thanh/nguoi-truong-thanh.component';
// import { PhieuKhamTruocMoComponent } from './phieu-kham-truoc-mo/phieu-kham-truoc-mo.component';
import { HanhChinhComponent } from './benh-an-dien-tu/hanh-chinh/hanh-chinh.component';
import { BenhAnNoiKhoaComponent } from './benh-an-emr/benh-an-noi-khoa/benh-an-noi-khoa.component';
import {BenhAnSanKhoaComponent} from "./benh-an-emr/benh-an-san-khoa/benh-an-san-khoa.component";
import { EmrComponent } from './emr/emr.component';
import { HoiBenhComponent} from "./benh-an-dien-tu/hoi-benh/hoi-benh.component";
import { ChanDoanComponent} from "./benh-an-dien-tu/chan-doan/chan-doan.component";
import {KhamBenhComponent} from "./benh-an-dien-tu/kham-benh/kham-benh.component";
import { TongKetBenhAnComponent} from "./benh-an-dien-tu/tong-ket-benh-an/tong-ket-benh-an.component";
import { ChanDoanNgoaikhoaComponent} from "./benh-an-emr/benh-an-ngoai-khoa/chan-doan-ngoaikhoa/chan-doan-ngoaikhoa.component";
import { QuanLyNguoiBenhComponent} from "./benh-an-dien-tu/quan-ly-nguoi-benh/quan-ly-nguoi-benh.component";
import { ChanDoanKhiVaoKhoaDieuTriComponent} from "./benh-an-dien-tu/chan-doan-khi-vao-khoa-dieu-tri/chan-doan-khi-vao-khoa-dieu-tri.component";
import { TinhTrangRaVienNgoaikhoaComponent} from "./benh-an-emr/benh-an-ngoai-khoa/tinh-trang-ra-vien-ngoaikhoa/tinh-trang-ra-vien-ngoaikhoa.component";
import { PhieuPhauThuatThuThuatEmrComponent} from "./cac_loai_phieu_trong_benh_an/phieu-phau-thuat-thu-thuat-emr/phieu-phau-thuat-thu-thuat-emr.component";
import { HoSoChamSocNguoiBenhCuaDieuDuongComponent } from './cac_loai_phieu_trong_benh_an/ho-so-cham-soc-nguoi-benh-cua-dieu-duong/ho-so-cham-soc-nguoi-benh-cua-dieu-duong.component';
// import { PhieuGiaiPhauBenhComponent} from "./cac_loai_phieu_trong_benh_an/phieu-giai-phau-benh/phieu-giai-phau-benh.component";
// import { PhieuChamSocComponent} from "./cac_loai_phieu_trong_benh_an/phieu-cham-soc/phieu-cham-soc.component";
import { SoKetDieuTriComponent} from './cac_loai_phieu_trong_benh_an/so-ket-dieu-tri/so-ket-dieu-tri.component';
import { BenhAnIvfComponent} from './benh-an-emr/benh-an-ivf/benh-an-ivf.component';
import { GiayChungNhanThuongTichComponent} from './cac_loai_phieu_trong_benh_an/giay-chung-nhan-thuong-tich/giay-chung-nhan-thuong-tich.component';
import { PhieuTruyenMauComponent} from './cac_loai_phieu_trong_benh_an/phieu-truyen-mau/phieu-truyen-mau.component';
import { BienBanKiemDiemTuVongComponent} from './cac_loai_phieu_trong_benh_an/bien-ban-kiem-diem-tu-vong/bien-ban-kiem-diem-tu-vong.component';
import { PhieuTruyenDichComponent } from './cac_loai_phieu_trong_benh_an/phieu-truyen-dich/phieu-truyen-dich.component';
import { DocumentExamComponent } from './document-exam/document-exam.component';
import { PhieuTheoDoiTruyenDichComponent } from './cac_loai_phieu_trong_benh_an/phieu-theo-doi-truyen-dich/phieu-theo-doi-truyen-dich.component';
import { PhieuDeNghiKhamChuaBenhTheoYeuCauComponent } from './cac_loai_phieu_trong_benh_an/giay-de-nghi-kham-chua-benh-theo-yeu-cau/phieu-de-nghi-kham-chua-benh-theo-yeu-cau.component';
import { TomTatHoSoBenhAnComponent } from './cac_loai_phieu_trong_benh_an/tom-tat-ho-so-benh-an/tom-tat-ho-so-benh-an.component';
import { QuanLyBenhAnComponent } from './quan-ly-benh-an/quan-ly-benh-an.component';
const routes: Routes = [
  // {path:"phieu_thu_phan_ung_thuoc",component: PhieuThuPhanUngThuocComponent},
  // {path:"phieu_dieu_tri",component: PhieuDieuTriComponent},
  {path:"bien_ban_hoi_chan",component: BienBanHoiChanComponent},
  {path:"giay_chung_nhan_phau_thuat",component: GiayChungNhanPhauThuatComponent},
  // {path:"giay_chung_nhan_thu_thuat",component: GiayChungNhanThuThuatComponent},
  {path:"giay_chuyen_vien",component: GiayChuyenVienComponent},
  // {path:"phieu_kham_gay_me_truoc_mo",component: PhieuKhamGayMeTruocMoComponent },
  {path:"bao_cao_tu_vong",component: BaoCaoTuVongComponent},
  {path:"ho_so_cham_soc_nguoi_benh_cua_dieu_duong",component: HoSoChamSocNguoiBenhCuaDieuDuongComponent},
  // {path:"phieu_tham_kham_tai_khoa",component: PhieuThamKhamTaiKhoaComponent},
  // {path:"tao_moi_hoi_benh",component: TaoMoiHoiBenhComponent},
  {path:"phieu_dem_gac_meche_dung_cu",component: PhieuDemGacMecheDungCuComponent},
  {path:"phieu_theo_doi_truyen_dich",component: PhieuTheoDoiTruyenDichComponent},
  // {path:"giay_ra_vien",component: GiayRaVienComponent},
  // {path:"nguoi_truong_thanh", component: NguoiTruongThanhComponent},
  // {path:"phieu_kham_truoc_mo",component: PhieuKhamTruocMoComponent },
  {path:"hanh_chinh",component: HanhChinhComponent},
  {path:"benh-an-noi-khoa",component: BenhAnNoiKhoaComponent},
  {path:"benh-an-san-khoa",component: BenhAnSanKhoaComponent},
  {path: "emr",component: EmrComponent},
  {path: "hoi_benh",component: HoiBenhComponent},
  {path: "chan_doan",component: ChanDoanComponent},
  {path: "kham_benh",component: KhamBenhComponent},
  {path: "tong_ket_benh_an",component:TongKetBenhAnComponent},
  {path: "chan_doan_ngoaikhoa",component: ChanDoanNgoaikhoaComponent},
  {path: "quan_ly_nguoi_benh",component: QuanLyNguoiBenhComponent},
  {path: "chan_doan_khi_vao_khoa_dieu_tri",component: ChanDoanKhiVaoKhoaDieuTriComponent},
  {path: "tinh_trang_ra_vien_ngoaikhoa", component: TinhTrangRaVienNgoaikhoaComponent},
  {path: "phieu_phau_thuat_thu_thuat_emr", component: PhieuPhauThuatThuThuatEmrComponent},
  {path: "benh_an_ivf", component: BenhAnIvfComponent},
  {path: "giay_chung_nhan_thuong_tich", component: GiayChungNhanThuongTichComponent},

  {path: "so_ket_dieu_tri", component: SoKetDieuTriComponent},
  {path: "phieu_truyen_mau", component: PhieuTruyenMauComponent},
  {path: "bien_ban_kiem_diem_tu_vong", component:BienBanKiemDiemTuVongComponent},
  // {path: "phieu_cham_soc", component: PhieuChamSocComponent},
  // {path: "phieu_giai_phau_benh", component: PhieuGiaiPhauBenhComponent},
  {path: "phieu_truyen_dich", component: PhieuTruyenDichComponent},
  {path: "giay-to-lien-quan", component: DocumentExamComponent},
  {path: "tom_tat_ho_so_benh_an", component: TomTatHoSoBenhAnComponent},
  {path: "quan-ly-benh-an", component: QuanLyBenhAnComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmrRoutingModule { }
