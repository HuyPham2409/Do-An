import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KhamBenhNgoaikhoaComponent } from './kham-benh-ngoaikhoa.component';

describe('KhamBenhNgoaikhoaComponent', () => {
  let component: KhamBenhNgoaikhoaComponent;
  let fixture: ComponentFixture<KhamBenhNgoaikhoaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KhamBenhNgoaikhoaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KhamBenhNgoaikhoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
