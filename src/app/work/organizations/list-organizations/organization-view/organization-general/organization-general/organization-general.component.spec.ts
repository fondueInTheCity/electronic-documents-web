import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationGeneralComponent } from './organization-general.component';

describe('OrganizationGeneralComponent', () => {
  let component: OrganizationGeneralComponent;
  let fixture: ComponentFixture<OrganizationGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
