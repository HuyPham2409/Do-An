import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThucHienKyThuatPhcnComponent } from './thuc-hien-ky-thuat-phcn.component';

describe('ThucHienKyThuatPhcnComponent', () => {
  let component: ThucHienKyThuatPhcnComponent;
  let fixture: ComponentFixture<ThucHienKyThuatPhcnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThucHienKyThuatPhcnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThucHienKyThuatPhcnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
