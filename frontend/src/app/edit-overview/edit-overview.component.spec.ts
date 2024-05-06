import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOverviewComponent } from './edit-overview.component';

describe('EditOverviewComponent', () => {
  let component: EditOverviewComponent;
  let fixture: ComponentFixture<EditOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditOverviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
