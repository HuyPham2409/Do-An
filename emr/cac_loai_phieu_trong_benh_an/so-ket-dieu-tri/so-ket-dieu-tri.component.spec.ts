import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoKetDieuTriComponent } from './so-ket-dieu-tri.component';

describe('SoKetDieuTriComponent', () => {
  let component: SoKetDieuTriComponent;
  let fixture: ComponentFixture<SoKetDieuTriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoKetDieuTriComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoKetDieuTriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
