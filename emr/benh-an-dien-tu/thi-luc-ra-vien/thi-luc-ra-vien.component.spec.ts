import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThiLucRaVienComponent } from './thi-luc-ra-vien.component';

describe('ThiLucRaVienComponent', () => {
  let component: ThiLucRaVienComponent;
  let fixture: ComponentFixture<ThiLucRaVienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThiLucRaVienComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThiLucRaVienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
