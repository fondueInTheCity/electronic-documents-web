import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationsDocumentsComponent } from './organizations-documents.component';

describe('OrganizationsDocumentsComponent', () => {
  let component: OrganizationsDocumentsComponent;
  let fixture: ComponentFixture<OrganizationsDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationsDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationsDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
