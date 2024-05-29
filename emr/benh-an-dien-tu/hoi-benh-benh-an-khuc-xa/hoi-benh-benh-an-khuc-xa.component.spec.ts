import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoiBenhBenhAnKhucXaComponent } from './hoi-benh-benh-an-khuc-xa.component';

describe('HoiBenhBenhAnKhucXaComponent', () => {
  let component: HoiBenhBenhAnKhucXaComponent;
  let fixture: ComponentFixture<HoiBenhBenhAnKhucXaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HoiBenhBenhAnKhucXaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HoiBenhBenhAnKhucXaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
