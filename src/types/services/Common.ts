/**
 * Shopify State
 */
export enum ShopifyState {
  Enabled = 'ENABLED',
  Invited = 'INVITED',
}

/**
 * Data Source
 */
export enum Source {
  Boulevard = 'boulevard',
  Shopify = 'shopify',
}

/**
 * Currency
 */
export enum Currency {
  USD = 'USD',
  ILS = 'ILS',
}

/**
 * Not Included Data type
 */
export interface NotIncluded {
  id: string;
}

/**
 * Locale
 */
export enum Locale {
  EN = 'en',
}

/**
 * FinancialStatus
 */
export enum FinancialStatus {
  Paid = 'paid',
  PartiallyRefunded = 'partially_refunded',
}

/**
 * Financial Status
 */
export enum ProcessingMethod {
  Direct = 'direct',
  Manual = 'manual',
}

/**
 * Shopify Source
 */

export enum ShopifySourceName {
  ShopifyDraftOrder = 'shopify_draft_order',
  Web = 'web',
}

/**
 * Pagination Request Option
 */
export interface PaginationOptions {
  number: number;
  size: number;
}

/**
 * Fields requested from get request
 */
export interface Fields {
  [key: string]: string;
}

/**
 * Filter requested params
 */
export interface Filter {
  [key: string]: string;
}

/**
 * API_ERROR_MESSAGE
 */
export enum API_ERRORS {
  NO_TOKEN = 'Authorization Failed',
  NO_DESERIALIZED = 'Data can not be deserialized',
  NO_SERIALIZED = 'Data can not be serialized',
}

/**
 * Pagination Meta
 */
export interface PaginationMeta {
  total: number;
  page: number;
  size: number;
}

/**
 * Pagination Data
 */
export interface PaginationData<D> {
  data: D[];
  meta: PaginationMeta;
}

export interface TreatmentFilterOptions {
  customer_id?: string;
  treated_by?: string;
  created_at?: {
    gte?: string;
    lte?: string;
  };
  is_submitted?: boolean;
  location_id?: string;
  knack_only?: boolean;
}

export interface OrderFilterOptions {
  customer_id: string;
  source_created_at?: {
    gte?: string;
    lte?: string;
  };
  order_line?: {
    type?: string;
  };
}

export interface ProductFilterOptions {
  allergy?: { with?: string; without?: string };
  ids?: string;
  variant_ids?: string;
  customer_id?: string;
  q?: string;
  back_or_front_bar?: string[];
  pregnancy_safe?: string;
  display_in_shopapp?: boolean;
  shopify_status?: string;
}

export interface AppointmentFilterOptions {
  customer_id?: string;
  location_id?: string;
  state?: {
    eq?: string;
    ne?: string;
  };
  start_at?: {
    gte?: string;
    lte?: string;
  };
  boulevard_created_at?: {
    gte?: string;
    lte?: string;
  };
  customer?: {
    is_intake_submitted?: boolean;
  };
  treatment_id?: string | null;
}

export interface LocationFilterOptions {
  id?: string;
  boulevard_id?: string;
}
export interface TimeBlockFilterOptions {
  boulevard_location_id: string;
  boulevard_staff_id?: string;
  start_at?: DateRangeFilterParams;
}

export interface TimeShiftFilterOptions {
  boulevard_location_id: string;
  boulevard_staff_id?: string[];
  startIso: string;
  endIso: string;
}

export interface DateRangeFilterParams {
  gte?: string;
  lte?: string;
}

export interface StaffFilterOptions {
  id: string;
}
