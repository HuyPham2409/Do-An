import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TienSuBenhComponent } from './tien-su-benh.component';

describe('TienSuBenhComponent', () => {
  let component: TienSuBenhComponent;
  let fixture: ComponentFixture<TienSuBenhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TienSuBenhComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TienSuBenhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
