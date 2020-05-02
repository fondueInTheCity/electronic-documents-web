import {OrganizationRoleInfo} from './organization-role-info';

export class HeapDocumentView {
  id: number;
  name: string;
  roles: number[];
  organizationId: number;
  allRoles: OrganizationRoleInfo[];
}
