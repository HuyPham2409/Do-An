import { DocumentExam } from '../../../model/emr/document-exam/document-exam';
import { FrontendConfigs } from '@shared';
import { Directive, Input } from '@angular/core';
import { EmrPatientInfo } from '../../../model/emr/patient/patient-info';

@Directive()
export class EmrComponentBase implements Record<string, any> {
  @Input() patientInfo!: EmrPatientInfo;

  /**
   * Dùng riêng cho giấy tờ liên quan (không dùng cho bệnh án)
   */
  @Input() loaiGiayToLienQuan: DocumentExam = {};
  selectGiayToLienQuan: any;

  ID_PHAU_THUAT_THU_THUAT = 5004;
  ID_SOKET_DIEUTRI = 5023;
  ID_PHIEU_TRUYEN_MAU = 5035;
  ID_THU_PHAN_UNG_THUOC: number = 5072;
  ID_LUONG_GIA_CHUC_NANG = 5073;
  ID_CHI_DINH_DIEU_TRI_PHCN = 5074;
  ID_THUC_HIEN_KY_THUAT_PHCN = 5075;
  ID_YEU_CAU_QUAN_LY_KHANG_SINH = 5079;
  ID_KHAI_THAC_TIEN_SU_DUNG_THUOC = 5081;
  ID_PHIEU_THEO_DOI_CHUC_NANG_SONG: number = 5083;
  ID_PHIEU_CHAM_SOC_Y_TA: number = 5084;
  ID_THEO_DOI_TRUYEN_DICH = 5085;
  ID_BIEN_BAN_HOI_CHAN_PHAU_THUAT = 5086;
  ID_BANG_KIEM_AN_TOAN_PT = 5087;
  ID_GIAY_DONG_Y_PTTT: number = 5088;
  ID_PHIEU_DANH_GIA_DD_TRE_EM: number = 5089;
  ID_PHIEU_THEO_DOI_TIEN_SU_DI_UNG = 5090;
  ID_HSBA_CS_DT_HIV = 5091;
  ID_ADR = 5092;
  ID_PDM = 5093;
  ID_PHIEU_GDSK_NGUOI_BENH = 5094;
  ID_TU_CHOI_DIEU_TRI = 5095;
  ID_PDNKCBTYC = 5096;
  ID_CAM_KET_NB_NOI_TRU = 5097;
  ID_THEO_DOI_GIAM_DAU_SAU_MO = 5098;
  ID_PHIEU_CHAM_SOC_SO_SINH = 6004;
  ID_THU_MOI_HC = 6005;
  ID_TRUYEN_DICH = 5022;
  ID_BANG_DANH_GIA_THANG_DIEM_GLASGOW = 6010;
  ID_BANG_THEO_DOI_BENH_NHAN_ECMO = 6024;
  ID_BANG_KIEM_AN_VA_BAN_GIAO_NGUOI_BENH = 6025;
  ID_BANG_KIEM_CHUAN_BI_VA_BAN_GIAO_NGUOI_BENH : number = 6025;
  ID_PHIEU_THEO_DOI_BENH_NHAN_LOC_MAU_LIEN_TUC = 6026;
  ID_BO_CAU_HOI_NRS = 6027;
  ID_PHIEU_DANH_GIA_DINH_DUONG_PHU_NU_MANG_THAI = 6029;
  ID_PHIEU_LOC_MAU_LIEN_TUC = 6028
  ID_TOM_TAT_HO_SO_BENH_AN = 5061
  ID_THONG_TIN_TU_VAN = 6039
  ID_BO_CAU_HOI_TRE_EM = 6040
  ID_PDNKCBTYC_KSAN = 6050;
  ID_GIAY_KHAM_SUC_KHOE_LAI_XE = 6052;
  ID_PHIEU_LAP_KE_HOACH_CHAM_SOC = 6054;
  ID_GIAY_KHAM_TIEN_ME = 6067;
  ID_GIAY_CAM_DOAN_CHAP_NHAN_PHAU_THUAT_THU_THUAT = 6073;
  ID_PHIEU_TU_NGUYEN = 6074;
  ID_PHIEU_NHAN_DINH_NGUOI_BENH_VAO_VIEN = 6077;

  protected variableGlobal: any = {};

  /**
   * @deprecated Nếu không await thì sẽ không lấy được từ file json
   */
  protected getFrontendConfigValue(formName: string, defaultValue = 0) {
    return this.variableGlobal[formName] ? Number(this.variableGlobal[formName]?.value) : defaultValue;
  }
  protected async getFrontendConfigValueAsync(formName: string, defaultValue = 0) {
    const config = await this.variableGlobal['getAsync'](formName);
    return config ? Number(config?.value) : defaultValue;
  }

  /**
   * Gán các form ID. Nếu không có, đừng bỏ vào hàm này
   */
  async init() {
    this.ID_PHAU_THUAT_THU_THUAT = await this.getFrontendConfigValueAsync('FORM_PHAU_THUAT_THU_THUAT');
    this.ID_SOKET_DIEUTRI = await this.getFrontendConfigValueAsync('FORM_SOKET_DIEUTRI');
    this.ID_PHIEU_TRUYEN_MAU = await this.getFrontendConfigValueAsync('FORM_TRUYEN_MAU');
    this.ID_THU_PHAN_UNG_THUOC = await this.getFrontendConfigValueAsync('FORM_THU_PHAN_UNG_THUOC');
    this.ID_LUONG_GIA_CHUC_NANG = await this.getFrontendConfigValueAsync('FORM_ID_LUONG_GIA_CHUC_NANG');
    this.ID_CHI_DINH_DIEU_TRI_PHCN = await this.getFrontendConfigValueAsync('FORM_ID_CHI_DINH_DIEU_TRI_PHCN');
    this.ID_THUC_HIEN_KY_THUAT_PHCN = await this.getFrontendConfigValueAsync('FORM_ID_THUC_HIEN_KY_THUAT_PHCN');
    this.ID_YEU_CAU_QUAN_LY_KHANG_SINH = await this.getFrontendConfigValueAsync('FORM_ID_YEU_CAU_QUAN_LY_KHANG_SINH');
    this.ID_KHAI_THAC_TIEN_SU_DUNG_THUOC = await this.getFrontendConfigValueAsync('FORM_ID_KHAI_THAC_TIEN_SU_DUNG_THUOC');
    this.ID_PHIEU_CHAM_SOC_Y_TA = await this.getFrontendConfigValueAsync('FORM_PHIEU_CHAM_SOC_Y_TA');
    this.ID_THEO_DOI_TRUYEN_DICH = await this.getFrontendConfigValueAsync('FORM_THEO_DOI_TRUYEN_DICH');
    this.ID_BIEN_BAN_HOI_CHAN_PHAU_THUAT = await this.getFrontendConfigValueAsync('FORM_ID_BIEN_BAN_HC_PT');
    this.ID_GIAY_DONG_Y_PTTT = await this.getFrontendConfigValueAsync('FORM_ID_GIAY_DONG_Y_PTTT');
    this.ID_PHIEU_DANH_GIA_DD_TRE_EM = await this.getFrontendConfigValueAsync('ID_PHIEU_DANH_GIA_DD_TRE_EM');
    this.ID_BANG_KIEM_AN_TOAN_PT = await this.getFrontendConfigValueAsync('FORM_ID_BANG_KIEM_AN_TOAN_PT');
    this.ID_PHIEU_THEO_DOI_TIEN_SU_DI_UNG = await this.getFrontendConfigValueAsync('FORM_PHIEU_THEO_DOI_TIEN_SU_DI_UNG');
    this.ID_HSBA_CS_DT_HIV = await this.getFrontendConfigValueAsync('FORM_HSBA_CHAM_SOC_DIEU_TRI_HIV_AIDS');
    this.ID_PDM = await this.getFrontendConfigValueAsync('FORM_PDM');
    this.ID_PHIEU_GDSK_NGUOI_BENH = await this.getFrontendConfigValueAsync('FORM_GDSK_NGUOI_BENH');
    this.ID_TU_CHOI_DIEU_TRI = await this.getFrontendConfigValueAsync('FORM_TU_CHOI_DIEU_TRI');
    this.ID_PDNKCBTYC = await this.getFrontendConfigValueAsync('FORM_PDNKCBTYC');
    this.ID_CAM_KET_NB_NOI_TRU = await this.getFrontendConfigValueAsync('FORM_CAM_KET_NB_NAM_NOI_CHU');
    this.ID_THEO_DOI_GIAM_DAU_SAU_MO= await this.getFrontendConfigValueAsync('FORM_THEO_DOI_GIAM_DAU_SAU_MO');
    this.ID_PHIEU_CHAM_SOC_SO_SINH= await this.getFrontendConfigValueAsync('FORM_PHIEU_CHAM_SOC_SO_SINH');
    this.ID_THU_MOI_HC= await this.getFrontendConfigValueAsync('FORM_THU_MOI_HC');
    this.ID_TRUYEN_DICH= await this.getFrontendConfigValueAsync('FORM_PHIEU_TRUYEN_DICH');
    this.ID_BANG_DANH_GIA_THANG_DIEM_GLASGOW = await this.getFrontendConfigValueAsync('FORM_BANG_DANH_GIA_THANG_DIEM_GLASGOW');
    this.ID_BANG_THEO_DOI_BENH_NHAN_ECMO = await this.getFrontendConfigValueAsync('FORM_BANG_THEO_DOI_BENH_NHAN_ECMO');
    this.ID_PHIEU_NHAN_DINH_NGUOI_BENH_VAO_VIEN = await this.getFrontendConfigValueAsync('FORM_PHIEU_NHAN_DINH_NGUOI_BENH_VAO_VIEN', 6077);
    // this.ID_BANG_KIEM_AN_VA_BAN_GIAO_NGUOI_BENH = await this.getFrontendConfigValueAsync('FORM_BANG_DANH_GIA_THANG_DIEM_GLASGOW');
    this.ID_PHIEU_THEO_DOI_BENH_NHAN_LOC_MAU_LIEN_TUC = await this.getFrontendConfigValueAsync('FORM_PHIEU_THEO_DOI_BENH_NHAN_LOC_MAU_LIEN_TUC');
    this.ID_TOM_TAT_HO_SO_BENH_AN = await this.getFrontendConfigValueAsync('FORM_TOM_TAT_HO_SO_BENH_AN');
    this.ID_BO_CAU_HOI_NRS = await this.getFrontendConfigValueAsync('FORM_BO_CAU_HOI_NRS');
    this.ID_PHIEU_DANH_GIA_DINH_DUONG_PHU_NU_MANG_THAI = await this.getFrontendConfigValueAsync('FORM_PHIEU_DANH_GIA_DINH_DUONG_PHU_NU_MANG_THAI');
    this.ID_PHIEU_LOC_MAU_LIEN_TUC = await this.getFrontendConfigValueAsync('FORM_PHIEU_LOC_MAU_LIEN_TUC');
    this.ID_PDNKCBTYC_KSAN = await this.getFrontendConfigValueAsync('FORM_PDNKCBTYC_KSAN');
    this.ID_GIAY_KHAM_SUC_KHOE_LAI_XE = await this.getFrontendConfigValueAsync('FORM_GIAY_KHAM_SUC_KHOE_LAI_XE');
    this.ID_PHIEU_LAP_KE_HOACH_CHAM_SOC = await this.getFrontendConfigValueAsync('FORM_PHIEU_LAP_KE_HOACH_CHAM_SOC');
    this.ID_GIAY_KHAM_TIEN_ME = await this.getFrontendConfigValueAsync('FORM_GIAY_KHAM_TIEN_ME');
    this.ID_GIAY_CAM_DOAN_CHAP_NHAN_PHAU_THUAT_THU_THUAT = await this.getFrontendConfigValueAsync('FORM_GIAY_CAM_DOAN_CHAP_NHAN_PHAU_THUAT_THU_THUAT');
    this.ID_PHIEU_TU_NGUYEN = await this.getFrontendConfigValueAsync('FORM_PHIEU_TU_NGUYEN');


  }
}
