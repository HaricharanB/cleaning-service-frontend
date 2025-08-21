import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLeadComponent } from './admin-lead.component';

describe('AdminLeadComponent', () => {
  let component: AdminLeadComponent;
  let fixture: ComponentFixture<AdminLeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminLeadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
