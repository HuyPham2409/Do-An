import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TienThaiParaComponent } from './tien-thai-para.component';

describe('TienThaiParaComponent', () => {
  let component: TienThaiParaComponent;
  let fixture: ComponentFixture<TienThaiParaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TienThaiParaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TienThaiParaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
