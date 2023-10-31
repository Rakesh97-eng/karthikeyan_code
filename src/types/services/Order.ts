import {
  Currency,
  FinancialStatus,
  Locale,
  ProcessingMethod,
  ShopifySourceName,
  Source,
} from './Common';
import { Product } from './product';

export interface Order {
  id: string;
  source: Source;
  sourceId: string;
  sourceOrderNumber: string;
  customerId: string;
  sourceCustomerId: string;
  staffId: string;
  sourceStaffId: null | string;
  locationId: string;
  sourceLocationId: string | null;
  appId: null | string;
  browserIp: null | string;
  customerLocale: Locale | null;
  orderStatusUrl: null | string;
  cancelReason: null | string;
  cancelledAt: Date | null;
  closedAt: Date | null;
  processedAt: Date | null;
  clientDetails: ClientDetails | null;
  currency: Currency | null;
  cartToken: null | string;
  checkoutToken: null | string;
  currentDiscountAmount: number;
  currentSubtotal: number;
  currentTaxAmount: number;
  currentTotal: number;
  currentGratuityAmount: number | null;
  initialDiscountAmount: number;
  initialSubtotal: number;
  initialTaxAmount: number;
  initialTotal: number;
  initialGratuityAmount: number | null;
  refundAmount: number | null;
  totalOutstanding: number | null;
  totalLineItemsPrice: number | null;
  taxesIncluded: boolean | null;
  financialStatus: FinancialStatus | null;
  fulfillmentStatus: null | string;
  landingSite: null | string;
  name: null | string;
  number: null | string;
  phone: null | string;
  presentmentCurrency: Currency | null;
  processingMethod: ProcessingMethod | null;
  referringSite: null | string;
  shopifySourceName: ShopifySourceName | null;
  test: boolean | null;
  token: null | string;
  totalTipReceived: number | null;
  totalWeight: number | null;
  discountApplications: DiscountApplication[] | null;
  shippingAddress: Address | null;
  billingAddress: Address | null;
  shippingLines: ShippingLine[] | null;
  taxLines: TaxLine[] | null;
  sourceCreatedAt: string;
  sourceUpdatedAt: Date;
  orderLine: OrderLine[] | null;
}

export interface Address {
  firstName?: string;
  address1?: string | null;
  phone?: null | string;
  city?: string;
  zip?: string;
  province?: string | null;
  country?: string;
  lastName?: string;
  address2?: string | null;
  company?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  name?: string;
  countryCode?: string;
  provinceCode?: string | null;
}

export interface ClientDetails {
  acceptLanguage?: null | string;
  browserHeight?: number | null;
  browserIp?: null | string;
  browserWidth?: number | null;
  sessionHash?: null | string;
  userAgent?: null | string;
}

export interface DiscountApplication {
  targetType: string;
  type: string;
  value: string;
  valueType: string;
  allocationMethod: string;
  targetSelection: string;
  title?: string;
  description?: string;
  code?: string;
}

export interface ShippingLine {
  id: number;
  carrierIdentifier: string | null;
  code: string;
  deliveryCategory: string | null;
  discountedPrice: string;
  discountedPriceSet: PriceSet;
  phone: string | null;
  price: string;
  priceSet: PriceSet;
  requestedFulfillmentServiceId: string | null;
  source: string;
  title: string;
  taxLines: TaxLine[];
  discountAllocations: any[];
}

export interface PriceSet {
  shopMoney: Money;
  presentmentMoney: Money;
}

export interface Money {
  amount: string;
  currencyCode: Currency;
}

export interface TaxLine {
  price: string;
  rate: number;
  title: string;
  priceSet: PriceSet;
  channelLiable: boolean | null;
}

export enum OrderLineTypes {
  PRODUCT = 'PRODUCT',
  GIFT_CARD = 'GIFT_CARD',
  SERVICE = 'SERVICE',
}
export type OrderLineType = keyof typeof OrderLineTypes;
export interface OrderLine {
  id?: string | null;
  productVariantId?: string | null;
  type: OrderLineType;
  orderId: string;
  quantity: number;
  orderDate?: string;
}

export type ProductOrderLine = Product & OrderLine;

/**
 * Order Relations
 */
export enum OrderRelations {
  OrderLine = 'order_line',
}
