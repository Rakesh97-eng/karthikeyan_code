export type Staff = {
  staffId: string;
  staffName: string;
  workingStartTime: string;
  workingEndTime: string;
  appointments: Appointment[];
  timeBlocks: OldTimeBlock[];
};

export type Appointment = {
  id: string;
  startTime: string;
  endTime: string;
  patientName: string;
};

export type OldTimeBlock = {
  id: string;
  startTime: string;
  endTime: string;
  title: string;
};

export type TimeSpan = {
  id: string;
  isLeft: boolean;
  hasOverlap: boolean;
  startTime: Date;
  endTime: Date;
  overlapCount: number;
};

export type StaffOrder = {
  staffId: string;
  staffName: string;
  isSelected: boolean;
};
