import { Injectable } from '@angular/core';
import {Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  currentOrganizationId: number;

  constructor() { }

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
}
