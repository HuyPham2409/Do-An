import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TMNGiaiDoanComponent } from './t-m-n-giai-doan.component';

describe('TMNGiaiDoanComponent', () => {
  let component: TMNGiaiDoanComponent;
  let fixture: ComponentFixture<TMNGiaiDoanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TMNGiaiDoanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TMNGiaiDoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
