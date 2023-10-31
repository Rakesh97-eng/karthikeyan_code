import { Customer } from './Customer';
import { Note } from './Note';
import { Product } from './product';

export interface TreatmentForm {
  poreSize: string | null;
  oilProduction: string | null;
  skinType: string;
  conditions: string;
  generalNotes: string | null;
  treatmentType: string;
  topTreatmentFocus: string;
  cleanseBaseProduct: string;
  cleanseBoost: string;
  cleanseModality: string | null;
  exfoliationSegment: boolean;
  exfoliationBaseProduct: string | null;
  exfoliationBoost: string | null;
  exfoliationModality: string | null;
  exfoliationEnhancement: string | null;
  microdermSuctionRate: string | null;
  microdermPasses: string | null;
  peelProduct: string | null;
  peelLayers: string | null;
  peelTimeOnSkin: string | null;
  extractionsSegment: boolean;
  extractionsPrepProducts: string | null;
  extractionsBoost: string | null;
  extractionsZone: string | null;
  extractionsModality: string | null;
  extractionsPostProducts: string | null;
  touchPointSegment: boolean;
  touchPointBaseProduct: string | null;
  touchPointBoost: string | null;
  touchPointModality: string | null;
  touchPointEnhancement: string | null;
  maskSegment: boolean;
  maskBaseProduct: string | null;
  maskBoost: string | null;
  maskModality: string | null;
  maskZoneSpecificDetails: string | null;
  targetedTherapySegment: boolean;
  targetedTherapyEnhancements: string | null;
  ledPanelTime: string | null;
  ledPanelBoost: string | null;
  toner: string | null;
  serum: string | null;
  moisturizerAndSpf: string | null;
  eyeAndLip: string | null;
  rehydrateBoost: string | null;
  enhMicroderm: boolean;
  enhPeel: boolean;
  currentTreatmentFocus: string | null;
  otherFocus: string | null;
  focusNextTime: string | null;
  otherFocusNextTime: string | null;
  peelOrMicroPostCareInstructions: string | null;
  nextTimeTreatment: string;
  nextTimeEnhancement: string;
  revenue: number;
  firstTreatment: boolean;
  btMicro: boolean;
  btMicroDesc: string | null;
  paymentStatus: string | null;
  customerBookerId: string | null;
  accutane: boolean;
  groupAppointment: boolean;
  currentTreatmentCount: number;
  internalNotes: string | null;
  skinRecommendationNote: string | null;
  nextTrTimeframe: string;
  noteForCustomer: string | null;
  products: string | null;
  sourceCustomerId: string | null;
  sourceEnteredBy: string | null;
  sourceTreatedBy: string | null;
  locationName: string | null;
  appointmentId: string | null;
  healthInfoSnapshot: string | null;
  isSubmitted: boolean | null;
  isKnack: string | null;
  touchPointTouch: string | null;
  sosSegment: string | null;
  sosBaseProduct: string | null;
  sosSerum: string | null;
  sosHydration: string | null;
  exfoliationDtmPasses: string | null;
  exfoliationDtmSuctionRate: string | null;
  exfoliationPeelProduct: string | null;
  exfoliationPeelLayers: string | null;
  exfoliationPeelTimeOnSkin: string | null;
  exfoliationPeelTreatmentTimeOnSkin: string | null;
  touchPointMassageMedium: string | null;
  clientMessage: string | null;
  maskLedPanelBoost: string | null;
  maskLedPanelTime: string | null;
  targetedTherapyLedPanelBoost: string | null;
  targetedTherapyLedPanelTime: string | null;
  note?: Note[];
  recommendedProduct?: Product[];

  maskHwiWand: string | null;
  maskHwiWandProduct: string | null;
  maskHwiTreatmentSerum: string | null;
  maskHwiSuctionRate: string | null;

  maskLedPanel: string | null;

  maskNanoinfusion: string | null;
  maskEnhancements: string | null;
  maskNanoinfusionDeviceUsed: string | null;
  maskNanoinfusionSerumUsed: string | null;
  maskNanoinfusionMaskUsed: string | null;

  maskMicrocurrent: string | null;
  maskMicrocurrentProgramLpi: string | null;
  maskMicrocurrentProgramSpi: string | null;
  maskMicrocurrentProduct: string | null;
  maskMicrocurrentSerum: string | null;
  maskMicrocurrentTreatmentTime: string | null;
  maskNanoinfusionStitchDepthFcc: string | null;
  maskNanoinfusionSpeedFcc: string | null;
  maskNanoinfusionStitchDepthNe: string | null;
  maskNanoinfusionSpeedNe: string | null;

  targetedTherapyLedPanel: string | null;
  targetedTherapyMicrocurrent: string | null;
  targetedTherapyMicrocurrentProgramLpi: string | null;
  targetedTherapyMicrocurrentProgramSpi: string | null;
  targetedTherapyMicrocurrentProduct: string | null;
  targetedTherapyMicrocurrentSerum: string | null;
  targetedTherapyMicrocurrentTreatmentTime: string | null;
  targetedTherapyNanoInfusion: string | null;
  targetedTherapyNanoinfusionDeviceUsed: string | null;
  targetedTherapyNanoinfusionSerumUsed: string | null;
  targetedTherapyNanoinfusionMaskUsed: string | null;
  targetedTherapyNanoinfusionStitchDepthFcc: string | null;
  targetedTherapyNanoinfusionSpeedFcc: string | null;
  targetedTherapyNanoinfusionStitchDepthNe: string | null;
  targetedTherapyNanoinfusionSpeedNe: string | null;

  exfoliationDiamondTipMicroderm: string | null;
  exfoliationDtmWand: string | null;
  exfoliationHydroWandInfusion: string | null;
  exfoliationHwiWandProduct: string | null;
  exfoliationHwiTreatmentSerum: string | null;
  exfoliationHwiSuctionRate: string | null;
  exfoliationHydroWandMicroderm: string | null;
  exfoliationPeel: string | null;
  exfoliationHwmWandProduct: string | null;
  exfoliationHwmSuctionRate: string | null;
  exfoliationHwmPasses: string | null;
}

export interface Treatment extends TreatmentForm {
  id: string;
  customerId: string;
  locationId: string;
  enteredBy: string;
  treatedBy: string;
  treatedByStaff: { firstName: string; lastName: string; name: string };
  knackId: string;
  appointmentTime: Date;
  createdAt: Date;
  location: { name: string; tz: string };
  isSubmitted: boolean;
}

export interface TreatmentWithRelationships extends Treatment {
  customer: Customer;
}

export interface IncludedTreatment {
  treatedByStaff?: {
    firstName?: string;
    id?: string;
    lastName?: string;
    name?: string;
  };
  enteredByStaff?: {
    firstName?: string;
    id?: string;
    lastName?: string;
    name?: string;
  };
}

export type TreatmentResponse = Treatment & IncludedTreatment;

export enum TreatmentRelation {
  'enteredByStaff' = 'entered_by_staff',
  'treatedByStaff' = 'treated_by_staff',
  'recommendedProduct' = 'recommended_product',
  'customer' = 'customer',
  'location' = 'location',
  'note' = 'note',
}
