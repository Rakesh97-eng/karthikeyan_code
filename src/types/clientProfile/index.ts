import {
  AvoidProductTypes,
  PastPurchaseTypes,
} from '../searchTypes/userSearchTypes';
import { FunctionComponent } from 'react';
import { Appointment } from '../services/Appointment';
import { Treatment } from '../services/Treatment';
import { QuestionOptions } from '../treatmentRecord/question';

export interface IParams {
  clientID: string;
}
export type ProfileTag = { icon: string; label: string; name?: string };
export type Metric = {
  title: string;
  label: string;
  value: string | undefined;
  info: string;
  key:
    | 'appointmentsCount'
    | 'lastVisit'
    | 'enhancementRate'
    | 'productAttritionRate';
};
export enum TreatmentTags {
  recovery = 'recovery',
  sos = 'sos',
  missing = 'missing',
  draft = 'draft',
}
export enum TreatmentTypes {
  recovery = 'Recovery Session',
  '50Min' = '50 Minute',
  sos = 'sos',
  missing = 'missing',
  draft = 'draft',
}
export enum PastTreatmentDisplayFormat {
  text = 'text',
  list = 'list',
}
export type PastTreatmentDetailSection = {
  title: string;
  icon?: string;
};

export enum SkinProfileQuestionTypes {
  radio = 'radio',
  checkbox = 'checkbox',
  textbox = 'textbox',
  date = 'date',
  zipcode = 'zipcode',
}

export type SPQuestionOptions = {
  value: string;
  label: string;
};

export type SkinProfileQuestion = {
  id: string;
  questionTitle: string;
  label: string;
  includeOtherVal?: string;
  otherField?: string;
  questionType: SkinProfileQuestionTypes;
  options?: QuestionOptions[];
  mandatory: boolean;
  defaultError?: string;
  additionalLabel?: string;
  additionalLabelResponse?: string;
  note?: string;
  summaryIcon?: FunctionComponent;
  uuid?: string;
  selectedResponse?: any;
};

export type SkinProfileSectionType = {
  sectionID: string;
  sectionTitle: string;
  altSectionTitle?: string;
  sectionIcon?: string;
  sectionQuestions?: SkinProfileQuestion[];
};

export type IntakeFormSectionResponseType = {
  questionID: string;
  questionResponse: string;
  additionalResponse?: string;
};

export type IntakeFormType = {
  sectionID: string;
  lastUpdatedAt: string;
  sectionResponses: IntakeFormSectionResponseType[];
};

export type HealthIntake = {
  id: string;
  customerId: string;
  questionId: string;
  answer: string[];
  otherAnswer: string;
  createdAt: string;
  updatedAt: string;
};
export type Client = {
  id: string;
  firstName: string;
  lastName: string;
  clientNotes: string;
  clientNotesUpdatedAt: string;
  pastPurchases?: PastPurchaseTypes[];
  productToAvoid?: AvoidProductTypes[];
  intakeForm?: IntakeFormType[];
  keyAttributes: string[];
  tags?: ProfileTag[];
  profileImageUrl: string;
  treatmentType?: 'Recovery Session' | '50 Minute';
  appointments_count?: string;
  last_visit?: string;
  enhancement_rate?: string;
  product_attrition_rate?: string;
  health_intake?: HealthIntake[];
  pastTreatments?: Treatment[];
};
export interface ClientDetailsType extends Client {
  appointments?: Appointment[];
  location?: { name: string; tz: string; city: string };
}

export type Appointments = {
  id: string;
  startAt: Date;
  endAt?: Date;
};

export type ResourceType = {
  icon: string;
  title: string;
  url: string;
  rightIcon?: string;
};

export type PastTreatmentHeaderStyleProps = {
  containerWidth?: number;
  isSubmitted?: boolean;
  backgroundColor?: string;
};

export type ErrorObject = {
  [key: string]: string;
};

export type QuestionLabel = {
  seasonalAllergies: string;
  topicalAlergies: string;
  topicalAlergiesAdditionalResp: string;
  rednesOrBurning: string;
  accutaneIsotretinoin: string;
  rx_medications: string;
  rxTopicals: string;
  hormoneConsiderations: string;
  diagnoses: string;
  electricity: string;
  facialSurgery: string;
  breakouts: string;
  oilyShine: string;
  facialFrequency: string;
  skincareKnowledge: string;
  atHomeProducts: string;
  gender: string;
  birthday: string;
  zipCode: string;
  source: string;
  activeIngredients: string;
};
export type FilterType = {
  id: string;
  label: string;
  name: string;
};
