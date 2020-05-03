import {Injectable} from '@angular/core';
import {Subscription} from 'rxjs';
import {Validators} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  private USERNAME_MIN_LENGTH = 4;
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
    return [Validators.required, Validators.minLength(this.USERNAME_MIN_LENGTH), Validators.pattern(/^[a-zA-Z0-9]*$/)];
  }

  getFirstNameValidators() {
    return [Validators.required, Validators.minLength(this.FIRST_NAME_MIN_LENGTH), Validators.pattern(/^[a-zA-Z]*$/)];
  }

  getLastNameValidators() {
    return [Validators.required, Validators.minLength(this.LAST_NAME_MIN_LENGTH), Validators.pattern(/^[a-zA-Z]*$/)];
  }

  getMiddleNameValidators() {
    return [Validators.required, Validators.minLength(this.MIDDLE_NAME_MIN_LENGTH), Validators.pattern(/^[a-zA-Z]*$/)];
  }

  getEmailValidators() {
    return [Validators.required, Validators.email];
  }
}
