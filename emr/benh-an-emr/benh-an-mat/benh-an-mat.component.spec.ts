import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenhAnMatComponent } from './benh-an-mat.component';

describe('BenhAnMatComponent', () => {
  let component: BenhAnMatComponent;
  let fixture: ComponentFixture<BenhAnMatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BenhAnMatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BenhAnMatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
