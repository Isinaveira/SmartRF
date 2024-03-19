import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstellationsComponent } from './constellations.component';

describe('ConstellationsComponent', () => {
  let component: ConstellationsComponent;
  let fixture: ComponentFixture<ConstellationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConstellationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConstellationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
