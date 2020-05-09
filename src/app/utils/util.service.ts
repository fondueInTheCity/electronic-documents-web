import {Injectable} from '@angular/core';
import {Subscription} from 'rxjs';
import {Validators} from '@angular/forms';
import {
  firstNamePattern,
  lastNamePattern,
  middleNamePattern, organizationDocumentNamePattern,
  organizationNamePattern,
  organizationRoleNamePatter,
  passwordPattern,
  usernamePattern
} from './pattern';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  private USERNAME_MIN_LENGTH = 4;
  private PASSWORD_MIN_LENGTH = 6;
  private FIRST_NAME_MIN_LENGTH = 2;
  private LAST_NAME_MIN_LENGTH = 2;
  private MIDDLE_NAME_MIN_LENGTH = 2;
  currentOrganizationId: number;

  constructor() {
  }

  getCurrentOrganizationId(): number {
    return this.currentOrganizationId;
  }

  setCurrentOrganizationId(organizationId: number) {
    this.currentOrganizationId = +organizationId;
  }

  unsubscribe(subscription: Subscription) {
    if (subscription && !subscription.closed) {
      subscription.unsubscribe();
    }
  }

  getKeys(enumType): string[] {
    return Object.keys(enumType).filter(k => typeof enumType[k as any] === 'number');
  }

  getUsernameValidators() {
    return [Validators.required, Validators.pattern(usernamePattern)];
  }

  getPasswordValidators() {
    return [Validators.required, Validators.pattern(passwordPattern)];
  }

  getFirstNameValidators() {
    return [Validators.required, Validators.pattern(firstNamePattern)];
  }

  getLastNameValidators() {
    return [Validators.required, Validators.pattern(lastNamePattern)];
  }

  getMiddleNameValidators() {
    return [Validators.required, Validators.pattern(middleNamePattern)];
  }

  getEmailValidators() {
    return [Validators.required, Validators.email];
  }

  getOrganizationNameValidators() {
    return [Validators.required, Validators.pattern(organizationNamePattern)];
  }

  getOrganizationTypeValidators() {
    return [Validators.required];
  }

  getOrganizationRoleValidators() {
    return [Validators.required];
  }

  getOrganizationRoleNameValidators() {
    return [Validators.required, Validators.pattern(organizationRoleNamePatter)];
  }

  getOrganizationDocumentNameValidators() {
    return [Validators.required, Validators.pattern(organizationDocumentNamePattern)];
  }
}
