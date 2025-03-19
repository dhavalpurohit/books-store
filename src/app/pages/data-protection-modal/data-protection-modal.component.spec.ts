import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataProtectionModalComponent } from './data-protection-modal.component';

describe('DataProtectionModalComponent', () => {
  let component: DataProtectionModalComponent;
  let fixture: ComponentFixture<DataProtectionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataProtectionModalComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DataProtectionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
