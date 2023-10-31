export interface BlvdStaffTimeShift {
  available: boolean;
  bookingInterval: number;
  clockIn: string;
  clockOut: string;
  day: number;
  locationId: string;
  recurrence: string;
  recurrenceEnd: Date;
  recurrenceInterval: number;
  recurrenceStart: Date;
  resourceId: string;
  id: string;
  boulevardStaffId: string;
  boulevardLocationId: string;
  unavailableReason: string;
}

interface BlvdShifts {
  shifts: BlvdStaffTimeShift[];
}

export interface BlvdShiftData {
  shifts: BlvdShifts;
}
