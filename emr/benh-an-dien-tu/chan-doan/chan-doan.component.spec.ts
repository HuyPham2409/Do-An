import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChanDoanComponent } from './chan-doan.component';

describe('ChanDoanComponent', () => {
  let component: ChanDoanComponent;
  let fixture: ComponentFixture<ChanDoanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChanDoanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChanDoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
