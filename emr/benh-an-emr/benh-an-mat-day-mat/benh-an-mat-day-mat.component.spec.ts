import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenhAnMatDayMatComponent } from './benh-an-mat-day-mat.component';

describe('BenhAnMatDayMatComponent', () => {
  let component: BenhAnMatDayMatComponent;
  let fixture: ComponentFixture<BenhAnMatDayMatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BenhAnMatDayMatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BenhAnMatDayMatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
