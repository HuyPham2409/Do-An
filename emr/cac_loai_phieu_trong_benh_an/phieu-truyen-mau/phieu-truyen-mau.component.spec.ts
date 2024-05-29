import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhieuTruyenMauComponent } from './phieu-truyen-mau.component';

describe('PhieuTruyenMauComponent', () => {
  let component: PhieuTruyenMauComponent;
  let fixture: ComponentFixture<PhieuTruyenMauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhieuTruyenMauComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhieuTruyenMauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
