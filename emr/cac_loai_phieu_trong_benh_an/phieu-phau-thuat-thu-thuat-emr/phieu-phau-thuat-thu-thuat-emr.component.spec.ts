import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhieuPhauThuatThuThuatEmrComponent } from './phieu-phau-thuat-thu-thuat-emr.component';

describe('PhieuPhauThuatThuThuatEmrComponent', () => {
  let component: PhieuPhauThuatThuThuatEmrComponent;
  let fixture: ComponentFixture<PhieuPhauThuatThuThuatEmrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhieuPhauThuatThuThuatEmrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhieuPhauThuatThuThuatEmrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
