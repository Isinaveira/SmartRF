import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstellationsDetailComponent } from './constellations-detail.component';

describe('ConstellationsDetailComponent', () => {
  let component: ConstellationsDetailComponent;
  let fixture: ComponentFixture<ConstellationsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConstellationsDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConstellationsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
