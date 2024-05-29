import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenhAnSoSinhComponent } from './benh-an-so-sinh.component';

describe('BenhAnSoSinhComponent', () => {
  let component: BenhAnSoSinhComponent;
  let fixture: ComponentFixture<BenhAnSoSinhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BenhAnSoSinhComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BenhAnSoSinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
