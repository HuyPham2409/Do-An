import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YHCTComponent } from './yhct.component';

describe('YHCTComponent', () => {
  let component: YHCTComponent;
  let fixture: ComponentFixture<YHCTComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YHCTComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YHCTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
