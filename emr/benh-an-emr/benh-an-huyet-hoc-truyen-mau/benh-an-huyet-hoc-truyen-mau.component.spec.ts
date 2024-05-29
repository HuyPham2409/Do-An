import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenhAnHuyetHocTruyenMauComponent } from './benh-an-huyet-hoc-truyen-mau.component';

describe('BenhAnHuyetHocTruyenMauComponent', () => {
  let component: BenhAnHuyetHocTruyenMauComponent;
  let fixture: ComponentFixture<BenhAnHuyetHocTruyenMauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BenhAnHuyetHocTruyenMauComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BenhAnHuyetHocTruyenMauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
