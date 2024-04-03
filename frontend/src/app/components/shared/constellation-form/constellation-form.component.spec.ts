import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstellationFormComponent } from './constellation-form.component';

describe('ConstellationFormComponent', () => {
  let component: ConstellationFormComponent;
  let fixture: ComponentFixture<ConstellationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConstellationFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConstellationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
