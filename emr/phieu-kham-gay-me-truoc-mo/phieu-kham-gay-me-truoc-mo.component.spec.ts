import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhieuKhamGayMeTruocMoComponent } from './phieu-kham-gay-me-truoc-mo.component';

describe('PhieuKhamGayMeTruocMoComponent', () => {
  let component: PhieuKhamGayMeTruocMoComponent;
  let fixture: ComponentFixture<PhieuKhamGayMeTruocMoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhieuKhamGayMeTruocMoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhieuKhamGayMeTruocMoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
