import { HealthIntake } from '../clientProfile';
import { Appointment } from './Appointment';
import { Currency, ShopifyState } from './Common';
import { GiftCard } from './GiftCard';
import { HealthAnswer } from './HealthAnswer';
import { Membership } from './Membership';
import { Note } from './Note';
import { Order } from './Order';
import { PaymentMethod } from './PaymentMethod';
import { Tag } from './Tag';
import { Treatment } from './Treatment';
export interface Customer {
  id: string;
  shopifyId: null | string;
  firstName: string;
  lastName: string;
  email: string;
  originalEmail: string;
  phone: null | string;
  dob: Date | null;
  zipCode: null | string;
  profileImageUrl: string | null;
  acceptsMarketing: boolean | null;
  acceptsMarketingUpdatedAt: Date | null;
  currency: Currency | null;
  marketingOptInLevel: null | string;
  multipassIdentifier: string | null;
  ordersCount: number | null;
  shopifyState: ShopifyState | null;
  taxExempt: boolean | null;
  taxExemptions: string | null;
  totalSpent: number | null;
  verifiedEmail: boolean | null;
  shopifyCreatedAt: Date | null;
  shopifyUpdatedAt: Date | null;
  customerIdentifier: null | string;
  solveProfileId: null | string;
  boulevardId: null | string;
  mergedIntoCustomerId: string | null;
  boulevardActive: boolean | null;
  externalId: string | null;
  knackId: null | string;
  name: null | string;
  gender: null | string;
  source: null | string;
  referralName: string | null;
  event: string | null;
  bookerId: null;
  under_18: boolean | null;
  signature: null | string;
  guardianSignature: null | string;
  treatmentCount: number | null;
  addedToKnack: Date | null;
  countOfEnhancements: number | null;
  percentageOfTreatmentsEnhanced: number | null;
  knackDeleted: boolean | null;
  treatmentsAfterCancellation: number | null;
  earliestTreatmentDate: Date | null;
  mostRecentTreatmentDate: Date | null;
  outsideTheUs: boolean | null;
  newIntakeFormCompleted: boolean | null;
  sendIntakeFormEmail: boolean | null;
  trRecentNotesForCustomer: null | string;
  createdAt: Date;
  membership: Membership[];
  tag: Tag[];
  note: Note[];
  paymentMethod: PaymentMethod[];
  healthAnswer: HealthAnswer[];
  giftCard: GiftCard[];
  order: Order[];
  appointment: Appointment[];
  treatment: Treatment[];
  healthIntake?: HealthIntake;
  keyAttributes?: string[];
}

/**
 * Customer Relations
 */
export enum CustomerRelations {
  Appointment = 'appointment',
  Membership = 'membership',
  Tag = 'tag',
  Note = 'note',
  Order = 'order',
  PaymentMethod = 'payment_method',
  HealthIntake = 'health_intake',
  GiftCard = 'gift_card',
  Treatment = 'treatment',
}
