import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TomTatHoSoBenhAnComponent } from './tom-tat-ho-so-benh-an.component';

describe('TomTatHoSoBenhAnComponent', () => {
  let component: TomTatHoSoBenhAnComponent;
  let fixture: ComponentFixture<TomTatHoSoBenhAnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TomTatHoSoBenhAnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TomTatHoSoBenhAnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
