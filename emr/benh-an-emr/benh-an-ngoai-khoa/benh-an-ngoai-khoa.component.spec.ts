import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenhAnNgoaiKhoaComponent } from './benh-an-ngoai-khoa.component';

describe('BenhAnNgoaiKhoaComponent', () => {
  let component: BenhAnNgoaiKhoaComponent;
  let fixture: ComponentFixture<BenhAnNgoaiKhoaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BenhAnNgoaiKhoaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BenhAnNgoaiKhoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
