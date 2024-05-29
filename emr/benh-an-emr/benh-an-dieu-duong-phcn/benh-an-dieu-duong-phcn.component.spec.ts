import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenhAnDieuDuongPHCNComponent } from './benh-an-dieu-duong-phcn.component';

describe('BenhAnDieuDuongPHCNComponent', () => {
  let component: BenhAnDieuDuongPHCNComponent;
  let fixture: ComponentFixture<BenhAnDieuDuongPHCNComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BenhAnDieuDuongPHCNComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BenhAnDieuDuongPHCNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
