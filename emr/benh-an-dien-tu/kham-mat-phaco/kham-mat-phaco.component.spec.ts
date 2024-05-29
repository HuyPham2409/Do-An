import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KhamMatPhacoComponent } from './kham-mat-phaco.component';

describe('KhamMatPhacoComponent', () => {
  let component: KhamMatPhacoComponent;
  let fixture: ComponentFixture<KhamMatPhacoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KhamMatPhacoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KhamMatPhacoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
