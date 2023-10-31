import { Customer } from './Customer';
import { Location } from './Location';
import { Note } from './Note';
import { Staff } from './Staff';
import { Tag } from './Tag';

export interface Appointment {
  id: string;
  boulevardId: string;
  customerId: string;
  boulevardCustomerId: string;
  locationId: string;
  boulevardLocationId: string;
  orderId: null | string;
  boulevardOrderId: null | string;
  boulevardCreatedAt: Date;
  startAt: Date;
  endAt: Date;
  isRemote: boolean;
  manageUrl: string;
  remotePlatformsUrl: string;
  googleCalendarUrl: string;
  icsDownloadUrl: string;
  microsoftOfficeUrl: string;
  microsoftOutlookUrl: string;
  yahooCalendarUrl: string;
  rating: number | null;
  ratingFeedback: null | string;
  ratedAt: Date | null;
  state: AppointmentState;
  duration: number;
  bookedByType: BookedByType;
  cancelled: boolean;
  cancelledAt: null;
  cancellationReason: null;
  cancellationNote: null;
  treatmentId: string | null;
  customer: Customer;
  location: Location;
  tag: Tag[];
  note: Note[];
  appointmentService: IAppointmentService;
}

export interface IAppointmentService {
  id: string;
  boulevardId: string;
  appointmentId: string; // uuid
  boulevardAppointmentId: string;
  serviceId: string; // uuid
  boulevardServiceId: string;
  staffId: string; // uuid
  boulevardStaffId: string;
  staffRequested: boolean;
  price: number;
  duration: number;
  totalDuration: number;
  startAt: Date;
  endAt: Date;
  startTimeOffset: number;
  createdAt: Date;
  updatedAt: Date;
  staff: Staff;
}

export enum AppointmentState {
  Booked = 'BOOKED',
  Confirmed = 'CONFIRMED',
  Final = 'FINAL',
}

export enum BookedByType {
  Client = 'CLIENT',
  Staff = 'STAFF',
}
export type AppointmentResponse = Appointment;

/**
 * Customer Relations
 */
export enum AppointmentRelations {
  Customer = 'customer',
  Tag = 'tag',
  Note = 'note',
  Order = 'order',
  Location = 'location',
  AppointmentService = 'appointment_service',
  AppointmentServiceService = 'appointment_service.service',
  AppointmentServiceStaff = 'appointment_service.staff',
}
