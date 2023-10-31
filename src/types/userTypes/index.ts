import { IntakeFormState } from '../store/form';

export type BookedAppointmentResponse = {
  id: string;
  boulevard_id: string;
  state: string;
  start_at: string;
  location: {
    id: string;
    image_url: string;
    boulevard_id: string;
    line1: string;
    line2: string;
    city: string;
    state: string;
    zip: string;
    name: string;
    phone: string;
    billing_contact_email: string;
    contact_email: string;
  };
  service_name: string;
  esthetician_name: string;
  esthetician_id: string;
  title: string;
  updated_at: string;
};

export type ClientInfoResponse = {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  updated_at: string;
  created_at: string;
  zip_code: string;
  profile_image_url: string;
  is_member: boolean;
  membership_start_on: string;
  is_intake_submitted: boolean;
  tags: Array<string>;
};

export type MyAppointmentsPayload = {
  query: string;
  variables: {
    query: string;
  };
};

interface AppointmentServices {
  totalDuration: number;
  startTimeOffset: number;
  startAt: string;
  staffId: string;
  staff: {
    lastName: string;
    id: string;
    firstName: string;
    bio: string;
  };
  serviceId: string;
  service: {
    name: string;
    categoryId: string;
    category: {
      name: string;
    };
  };
  price: number;
  endAt: string;
  duration: number;
}

export interface AppointmentEdge {
  node: {
    state: string;
    startAt: string;
    notes: string;
    location: {
      name: string;
      id: string;
      businessName: string;
    };
    id: string;
    endAt: string;
    duration: number;
    clientId: string;
    client: {
      name: string;
      id: string;
    };
    cancelled: boolean;
    appointmentServices: AppointmentServices[];
  };
}

export type MyAppointmentsResponse = {
  myAppointments: {
    edges: AppointmentEdge[];
  };
};
export interface UserInfo {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  is_member: boolean;
  membership_start_on: string;
  is_intake_submitted: boolean;
}

export interface UserDetails {
  email: string;
  userInfo: UserInfo;
  isLoggedIn: boolean;
  token: string;
  section: SectionData[];
  data: IntakeFormState[];
}

export interface SectionData {
  [key: string]: IntakeFormState[];
}
