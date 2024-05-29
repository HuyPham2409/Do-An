import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenhAnPhacoComponent } from './benh-an-phaco.component';

describe('BenhAnPhacoComponent', () => {
  let component: BenhAnPhacoComponent;
  let fixture: ComponentFixture<BenhAnPhacoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BenhAnPhacoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BenhAnPhacoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
