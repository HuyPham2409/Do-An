import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhieuTuChoiDieuTriComponent } from './phieu-tu-choi-dieu-tri.component';

describe('PhieuTuChoiDieuTriComponent', () => {
  let component: PhieuTuChoiDieuTriComponent;
  let fixture: ComponentFixture<PhieuTuChoiDieuTriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhieuTuChoiDieuTriComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhieuTuChoiDieuTriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
