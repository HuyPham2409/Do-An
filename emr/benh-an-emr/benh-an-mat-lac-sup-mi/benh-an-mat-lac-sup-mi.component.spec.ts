import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenhAnMatLacSupMiComponent } from './benh-an-mat-lac-sup-mi.component';

describe('BenhAnMatLacSupMiComponent', () => {
  let component: BenhAnMatLacSupMiComponent;
  let fixture: ComponentFixture<BenhAnMatLacSupMiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BenhAnMatLacSupMiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BenhAnMatLacSupMiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
