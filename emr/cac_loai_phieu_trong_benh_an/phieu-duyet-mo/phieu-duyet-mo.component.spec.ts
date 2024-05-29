import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhieuDuyetMoComponent } from './phieu-duyet-mo.component';

describe('PhieuDuyetMoComponent', () => {
  let component: PhieuDuyetMoComponent;
  let fixture: ComponentFixture<PhieuDuyetMoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhieuDuyetMoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhieuDuyetMoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
