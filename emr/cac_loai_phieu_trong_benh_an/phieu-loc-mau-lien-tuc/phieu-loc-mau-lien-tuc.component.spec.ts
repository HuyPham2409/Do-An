import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhieuLocMauLienTucComponent } from './phieu-loc-mau-lien-tuc.component';

describe('PhieuLocMauLienTucComponent', () => {
  let component: PhieuLocMauLienTucComponent;
  let fixture: ComponentFixture<PhieuLocMauLienTucComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhieuLocMauLienTucComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhieuLocMauLienTucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
