import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EmrComponentBase } from '../../abstract/emr.component.base';
import { FrontendConfigService } from '../../../../services/frontend-config/frontend-config.service';
import { IGiayToLienQuanComponent } from '../../benh-an-emr/giay-to-lien-quan.component';
import { HisPatientInfo } from '../../../../model/emr/patient/patient-info';
import { DocumentExamResult } from '../../document-exam/document-exam.component';

@Component({
  selector: 'app-document-exam-list',
  templateUrl: './document-exam-list.component.html',
  styleUrls: ['./document-exam-list.component.scss'],
})
export class DocumentExamListComponent extends EmrComponentBase implements IGiayToLienQuanComponent<any>, OnInit {
  @Input() selectGiayToLienQuan: any;
  @Input() isCreateGiayToLienQuan: any;
  @Input() patientInfoHis!: HisPatientInfo;
  @Input() template!: boolean;
  @Input() isEdit!: boolean
  @Output() save = new EventEmitter();
  @Output() disabledChangeToParent = new EventEmitter<boolean>();

  @Input() listLoaiGiayToSave: DocumentExamResult[] = [];

  constructor(private proxy: FrontendConfigService) {
    super();
  }

  ngOnInit(): void {
    this.variableGlobal = this.proxy.getFrontendConfig();
  }

  handleReceiveDisableFromChild(value: boolean):void {
    this.disabledChangeToParent.emit(value)
  }
}
