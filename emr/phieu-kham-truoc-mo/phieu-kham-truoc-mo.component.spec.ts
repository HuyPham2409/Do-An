import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhieuKhamTruocMoComponent } from './phieu-kham-truoc-mo.component';

describe('PhieuKhamTruocMoComponent', () => {
  let component: PhieuKhamTruocMoComponent;
  let fixture: ComponentFixture<PhieuKhamTruocMoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhieuKhamTruocMoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhieuKhamTruocMoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
