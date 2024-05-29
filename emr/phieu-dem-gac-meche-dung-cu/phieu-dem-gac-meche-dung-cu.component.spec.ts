import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhieuDemGacMecheDungCuComponent } from './phieu-dem-gac-meche-dung-cu.component';

describe('PhieuDemGacMecheDungCuComponent', () => {
  let component: PhieuDemGacMecheDungCuComponent;
  let fixture: ComponentFixture<PhieuDemGacMecheDungCuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhieuDemGacMecheDungCuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhieuDemGacMecheDungCuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
