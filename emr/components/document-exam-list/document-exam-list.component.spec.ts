import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentExamListComponent } from './document-exam-list.component';

describe('DocumentExamListComponent', () => {
  let component: DocumentExamListComponent;
  let fixture: ComponentFixture<DocumentExamListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentExamListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentExamListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
