import {OrganizationRoleInfo} from '../../../utils/models/organization-role-info';

export class OrganizationMember {
  memberId: number;
  firstName: string;
  middleName: string;
  lastName: string;
  roles: OrganizationRoleInfo[];
}
