import { Component, Input } from '@angular/core';
import { KhamBenh } from '../../../../model/emr/kham_benh';
import { BenhAnComponent } from '../benh-an.component';
import { EmrService } from '../../../../services/emr.service';

@Component({
  selector: 'app-benh-an-phau-thuat-khuc-xa',
  templateUrl: './benh-an-phau-thuat-khuc-xa.component.html',
  styleUrls: ['./benh-an-phau-thuat-khuc-xa.component.scss'],
})
export class BenhAnPhauThuatKhucXaComponent extends BenhAnComponent {
  @Input() patientOutData: any;
  khamBenh: KhamBenh = new KhamBenh();

  constructor(private emrService: EmrService) {
    super();
  }

  ngOnInit(): void {
    this.emrService.tenBenhAn = this.tenBenhAn;
  }
}
