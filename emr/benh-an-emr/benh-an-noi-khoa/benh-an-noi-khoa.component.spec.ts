import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenhAnNoiKhoaComponent } from './benh-an-noi-khoa.component';

describe('BenhAnNoiKhoaComponent', () => {
  let component: BenhAnNoiKhoaComponent;
  let fixture: ComponentFixture<BenhAnNoiKhoaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BenhAnNoiKhoaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BenhAnNoiKhoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
