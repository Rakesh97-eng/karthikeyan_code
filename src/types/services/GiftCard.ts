export interface GiftCard {
  id: string;
  boulevardId: string | null;
  customerId: string | null;
  boulevardCustomerId: string | null;
  code: string;
  currentBalance: string;
  externalId: string;
  deliveredOn: Date;
  deliveryDate: Date;
  messageFromSender: string;
  recipientEmail: string;
  recipientName: string;
  senderName: string;
}
