import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinOrganizationsComponent } from './join-organizations.component';

describe('JoinOrganizatinosComponent', () => {
  let component: JoinOrganizationsComponent;
  let fixture: ComponentFixture<JoinOrganizationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinOrganizationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinOrganizationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
