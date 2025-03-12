import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprintModalComponent } from './imprint-modal.component';

describe('ImprintModalComponent', () => {
  let component: ImprintModalComponent;
  let fixture: ComponentFixture<ImprintModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImprintModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImprintModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
