export interface TimeBlock {
  id: string;
  duration: number;
  endAt: Date;
  reason: string | null;
  blvdStaffId: string;
  staffName: string;
  startAt: Date;
  title: string;
}
