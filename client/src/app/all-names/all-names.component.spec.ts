import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllNamesComponent } from './all-names.component';

describe('AllNamesComponent', () => {
  let component: AllNamesComponent;
  let fixture: ComponentFixture<AllNamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllNamesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllNamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
