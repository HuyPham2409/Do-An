import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiayChungNhanPhauThuatComponent } from './giay-chung-nhan-phau-thuat.component';

describe('GiayChungNhanPhauThuatComponent', () => {
  let component: GiayChungNhanPhauThuatComponent;
  let fixture: ComponentFixture<GiayChungNhanPhauThuatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiayChungNhanPhauThuatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GiayChungNhanPhauThuatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
