import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationMemberInfoComponent } from './organization-member-info.component';

describe('OrganizationMemberInfoComponent', () => {
  let component: OrganizationMemberInfoComponent;
  let fixture: ComponentFixture<OrganizationMemberInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationMemberInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationMemberInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
