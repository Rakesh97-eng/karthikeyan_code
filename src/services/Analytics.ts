import { Location } from "../types/services/Location";
import { UserInfo } from "../types/userTypes";

declare global {
  interface Window {
    solve: any;
  }
}

export const MembershipAgreementTracking = (userInfo: UserInfo,selectedLocation?:Location) => {
  const payload = {
    app_version: '',
    email: userInfo.email ? userInfo.email : null,
    location: selectedLocation,
    os_version: window.navigator?.userAgent,
    source: '',
  };
  window.solve.customEvent('membership_agreement', payload);
};
