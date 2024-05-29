import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanLyNguoiBenhComponent } from './quan-ly-nguoi-benh.component';

describe('QuanLyNguoiBenhComponent', () => {
  let component: QuanLyNguoiBenhComponent;
  let fixture: ComponentFixture<QuanLyNguoiBenhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuanLyNguoiBenhComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuanLyNguoiBenhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
