import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhieuDieuTriComponent } from './phieu-dieu-tri.component';

describe('PhieuDieuTriComponent', () => {
  let component: PhieuDieuTriComponent;
  let fixture: ComponentFixture<PhieuDieuTriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhieuDieuTriComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhieuDieuTriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
