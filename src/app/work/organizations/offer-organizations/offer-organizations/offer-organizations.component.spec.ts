import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferOrganizationsComponent } from './offer-organizations.component';

describe('OfferOrganizationsComponent', () => {
  let component: OfferOrganizationsComponent;
  let fixture: ComponentFixture<OfferOrganizationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferOrganizationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferOrganizationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
