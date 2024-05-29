import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HsbaCsDtHivAidsComponent } from './hsba-cs-dt-hiv-aids.component';

describe('HsbaCsDtHivAidsComponent', () => {
  let component: HsbaCsDtHivAidsComponent;
  let fixture: ComponentFixture<HsbaCsDtHivAidsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HsbaCsDtHivAidsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HsbaCsDtHivAidsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
