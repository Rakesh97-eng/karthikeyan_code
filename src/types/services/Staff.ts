export interface Staff {
  id: string;
  shopifyId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  roleId: string;
  dob: Date;
  gender: string;
  imo: string;
  bio: string;
  shopifyUserType: string;
  shopifyAccountOwner: boolean;
  shopifyPermissions: string;
  receiveAnnouncements: boolean;
  locale: string;
  boulevardId: string;
  externalId: string;
  nickname: string;
  externalNickname: string;
  displayName: string;
  boulevardAppPermissions: string;
  boulevardAppRoles: string;
  boulevardRoles: string;
  boulevardCreatedAt: Date;
  boulevardUpdatedAt: Date;
  knackId: string;
  knackSkinTherapistId: string;
  knackRoles: string;
  name: string;
  knackUserStatus: string;
  createdAt: Date;
  updatedAt: Date;
}
export enum StaffRelations {}
