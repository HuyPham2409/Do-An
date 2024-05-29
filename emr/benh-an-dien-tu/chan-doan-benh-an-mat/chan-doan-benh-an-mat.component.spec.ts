import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChanDoanBenhAnMatComponent } from './chan-doan-benh-an-mat.component';

describe('ChanDoanBenhAnMatComponent', () => {
  let component: ChanDoanBenhAnMatComponent;
  let fixture: ComponentFixture<ChanDoanBenhAnMatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChanDoanBenhAnMatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChanDoanBenhAnMatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
