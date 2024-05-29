import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenhAnMatTreEmComponent } from './benh-an-mat-tre-em.component';

describe('BenhAnMatTreEmComponent', () => {
  let component: BenhAnMatTreEmComponent;
  let fixture: ComponentFixture<BenhAnMatTreEmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BenhAnMatTreEmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BenhAnMatTreEmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
