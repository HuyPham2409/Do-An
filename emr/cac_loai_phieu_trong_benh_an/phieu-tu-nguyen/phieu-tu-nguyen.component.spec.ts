import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhieuTuNguyenComponent } from './phieu-tu-nguyen.component';

describe('PhieuTuNguyenComponent', () => {
  let component: PhieuTuNguyenComponent;
  let fixture: ComponentFixture<PhieuTuNguyenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhieuTuNguyenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhieuTuNguyenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
