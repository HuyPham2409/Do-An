import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DienBienBenhYLenhComponent } from './dien-bien-benh-y-lenh.component';

describe('DienBienLenhYLenhComponent', () => {
  let component: DienBienBenhYLenhComponent;
  let fixture: ComponentFixture<DienBienBenhYLenhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DienBienBenhYLenhComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DienBienBenhYLenhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
