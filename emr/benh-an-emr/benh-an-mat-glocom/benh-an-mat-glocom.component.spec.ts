import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenhAnMatGlocomComponent } from './benh-an-mat-glocom.component';

describe('BenhAnMatGlocomComponent', () => {
  let component: BenhAnMatGlocomComponent;
  let fixture: ComponentFixture<BenhAnMatGlocomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BenhAnMatGlocomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BenhAnMatGlocomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
