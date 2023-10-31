interface CustomerNote {
  icon: string;
  label: string;
}

interface CoreBlock {
  id: string;
  title: string;
  icon: string;
  info: string;
  customerNotes: CustomerNote[];
  sectionsIds: string[];
}

interface GeneralBlock {
  id: string;
  title: string;
  icon: string;
  info: string;
  customerNotes: CustomerNote[];
  sectionsIds: string[];
}

interface TreatmentBlocks {
  core_block: CoreBlock;
  general_block: GeneralBlock;
}

interface ISection {
  id: string;
  title: string;
  icon: string;
  isEnabled: boolean;
  blockId: string;
  elementIds: string[];
  info?: string;
}

interface TreatmentSections {
  exfoliationSegment: ISection;
  extractionsSegment: ISection;
  touchPointSegment: ISection;
  maskSegment: ISection;
  targetedTherapySegment: ISection;
  sosSegment: ISection;
  skin_analysis: ISection;
  cleanse_communicate: ISection;
  rehydrate_recap: ISection;
  treatment_wrap_up: ISection;
}

interface OptionElements {
  [key: string]: string[];
}

interface IElement {
  type: string;
  id: string;
  label: string;
  mandatory: boolean;
  blockId: string;
  sectionId: string;
  optionIds: string[];
  optionElements?: OptionElements;
  parentElementId?: string;
  parentOptionId?: string;
  info?: string;
  infoItalic?: boolean;
  multiRequire?: number;
  note?: string;
  placeholder?: string;
}

interface TreatmentElements {
  exfoliationEnhancement: IElement;
  exfoliationDtmWand: IElement;
  exfoliationDtmSuctionRate: IElement;
  exfoliationDtmPasses: IElement;
  exfoliationHwmWandProduct: IElement;
  exfoliationHwmSuctionRate: IElement;
  exfoliationHwmPasses: IElement;
  exfoliationHwiWandProduct: IElement;
  exfoliationHwiTreatmentSerum: IElement;
  exfoliationHwiSuctionRate: IElement;
  exfoliationPeelProduct: IElement;
  exfoliationPeelLayers: IElement;
  exfoliationPeelTreatmentTimeOnSkin: IElement;
  exfoliationPeelTimeOnSkin: IElement;
  exfoliationBaseProduct: IElement;
  exfoliationBoost: IElement;
  exfoliationModality: IElement;
  extractionsPrepProducts: IElement;
  extractionsBoost: IElement;
  extractionsZone: IElement;
  extractionsModality: IElement;
  extractionsPostProducts: IElement;
  touchPointEnhancement: IElement;
  touchPointBaseProduct: IElement;
  touchPointBoost: IElement;
  touchPointModality: IElement;
  touchPointTouch: IElement;
  maskEnhancement: IElement;
  maskLedPanelBoost: IElement;
  maskLedPanelTime: IElement;
  maskMicrocurrentLongProgramIntensity: IElement;
  maskMicrocurrentShortProgramIntensity: IElement;
  maskMicrocurrentProduct: IElement;
  maskMicrocurrentSerum: IElement;
  maskMicrocurrentTreatmentTime: IElement;
  maskHwiWandProduct: IElement;
  maskHwiSerum: IElement;
  maskHwiSuctionRate: IElement;
  maskBaseProduct: IElement;
  maskBoost: IElement;
  maskModality: IElement;
  targetedTherapyEnhancements: IElement;
  tteLedPanelBoost: IElement;
  tteLedPanelTime: IElement;
  tteMicrocurrentLongProgramIntensity: IElement;
  tteMicrocurrentShortProgramIntensity: IElement;
  tteMicrocurrentProduct: IElement;
  tteMicrocurrentSerum: IElement;
  tteMicrocurrentTreatmentTime: IElement;
  sosBaseProduct: IElement;
  sosSerum: IElement;
  sosHydration: IElement;
  skinType: IElement;
  conditions: IElement;
  topTreatmentFocus: IElement;
  cleanseBaseProduct: IElement;
  cleanseBoost: IElement;
  cleanseModality: IElement;
  toner: IElement;
  serum: IElement;
  moisturizerAndSpf: IElement;
  eyeAndLip: IElement;
  rehydrateBoost: IElement;
  internalNotes: IElement;
  manage_client_preferences: IElement;
  [key: string]: IElement;
}

interface TreatmentOptions {
  [key: string]: string;
}

export interface IS3Json {
  treatmentBlocks: TreatmentBlocks;
  treatmentSections: TreatmentSections;
  treatmentElements: TreatmentElements;
  treatmentOptions: TreatmentOptions;
}
