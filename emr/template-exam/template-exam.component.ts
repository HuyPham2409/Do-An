import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { TemplateExameService } from '../../../services/template/template-exam.service';
import { ToastrTranslateService } from '@shared/services/toastr-translate-service';
import { MtxGridColumn } from '@ng-matero/extensions/grid';
import { TemplateExam } from '../../../model/examination/template-exam';

@Component({
  selector: 'app-template-exam',
  templateUrl: './template-exam.component.html',
  styleUrls: ['./template-exam.component.scss'],
})
export class TemplateExamComponent implements OnInit,OnChanges {
  @Input() loaiGiayToLienQuan: any;
  @Input() saveTemplate: any;
  @Input() form_id: any;
  @Input() is_select: boolean = false;
  @Output() templateChange = new EventEmitter<TemplateExam | null>();
  templateSelect = new TemplateExam();
  listTemplate = [];
  totalTab= 0;
  isLoadingTab= false;
  showPaginatorTab= false;
  rowHover = true;
  rowStriped = false;
  showPaginator = false;
  rowSelectable = false;
  queryPage ={
    page: 1,
    per_page: 10,
  }
  columns: MtxGridColumn[] = [
    {
      header: 'template.examination_template_code',
      field: 'examination_template_code',
      minWidth: 50
    },
    {
      header: 'template.examination_template_name',
      field: 'examination_template_name',
      minWidth: 150,
    },
    {
      header: 'template.examination_template_content',
      field: 'examination_template_content',
      minWidth: 150,
    }
  ]
  constructor(private templateExameService: TemplateExameService,
              private toastr: ToastrTranslateService
  ) {
  }

  ngOnInit(): void {
    this.getTemplateGiayTo('');
  }
  getTemplateGiayTo(query: string, is_refesh = false){
    setTimeout(()=> {
      if(this.loaiGiayToLienQuan.ID != 0){
        this.isLoadingTab = true;
        this.templateExameService.getTemplates(query, this.loaiGiayToLienQuan.ID).subscribe((data: any) => {
          if (data.status == true) {
            this.listTemplate = data.results;
            this.totalTab = data.total;
            if (this.totalTab > this.queryPage.per_page) {
              this.showPaginatorTab = true;
            } else {
              this.showPaginatorTab = false;
            }
          } else {
            this.totalTab = 0;
            if(!this.is_select){
              this.toastr.error(data.results, 'template.error_danh_sach');
            }
          }
          this.isLoadingTab = false;
        })
      }
    }, ((is_refesh) ? 2000 : 0))
  }
  ngOnChanges(){
    if(this.saveTemplate){
      this.getTemplateGiayTo('', this.saveTemplate);
    }
  }
  getNextPage(event: any){
  }
  rowClick(event: any){
    if(event.rowData){
      const data = event.rowData;
      this.templateExameService.loadTemplate(data._id).subscribe((dataTemplate: any) =>{
        if(dataTemplate.status == true){
          this.templateChange.emit(dataTemplate.results[0]);
        }
      })
    }
  }
  choiceTemplate(event: any){
    this.templateExameService.loadTemplate(event._id).subscribe((dataTemplate: any) =>{
      if(dataTemplate.status == true){
        this.templateChange.emit(dataTemplate.results[0]);
      }
    })
  }
}
