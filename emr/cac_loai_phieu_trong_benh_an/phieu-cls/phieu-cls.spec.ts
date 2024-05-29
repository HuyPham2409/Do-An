import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PhieuClsComponent } from './phieu-cls.component';


describe('PhieuClsComponent', () => {
  let component: PhieuClsComponent;
  let fixture: ComponentFixture<PhieuClsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhieuClsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhieuClsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
