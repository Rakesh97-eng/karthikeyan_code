export interface Location {
  id: string;
  imageUrl: string;
  boulevardId: string;
  line1: string;
  line2: string | null;
  city: string;
  State: string;
  zip: string;
  name: string;
  phone: string | null;
  billingContactEmail: string;
  contactEmail: string;
  externalId: string;
  tz: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}

/**
 * Location Relations
 */
export enum LocationRelations {
  Appointment = 'appointment',
  Membership = 'membership',
  Tag = 'tag',
  Note = 'note',
  Order = 'order',
  PaymentMethod = 'payment_method',
  HealthAnswer = 'health_answer',
  GiftCard = 'gift_card',
  Treatment = 'treatment',
}
