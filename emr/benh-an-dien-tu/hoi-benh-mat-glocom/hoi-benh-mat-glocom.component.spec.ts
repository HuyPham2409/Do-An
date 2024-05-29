import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoiBenhMatGlocomComponent } from './hoi-benh-mat-glocom.component';

describe('HoiBenhMatGlocomComponent', () => {
  let component: HoiBenhMatGlocomComponent;
  let fixture: ComponentFixture<HoiBenhMatGlocomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HoiBenhMatGlocomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HoiBenhMatGlocomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
