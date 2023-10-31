export interface Membership {
  id: string;
  boulevardId: string | null;
  customerId: string | null;
  boulevardCustomerId: string | null;
  locationId: string | null;
  boulevardLocationId: string | null;
  cancelOn: Date | null;
  endOn: Date | null;
  interval: string | null;
  name: string | null;
  startOn: Date | null;
  status: string | null;
  teamNumber: number;
  unitPrice: number;
  cancelReason: string | null;
  pauseOn: Date | null;
  resumeOn: Date | null;
}
