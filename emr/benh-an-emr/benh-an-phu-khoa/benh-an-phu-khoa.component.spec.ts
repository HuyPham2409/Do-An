import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenhAnPhuKhoaComponent } from './benh-an-phu-khoa.component';

describe('BenhAnPhuKhoaComponent', () => {
  let component: BenhAnPhuKhoaComponent;
  let fixture: ComponentFixture<BenhAnPhuKhoaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BenhAnPhuKhoaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BenhAnPhuKhoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
