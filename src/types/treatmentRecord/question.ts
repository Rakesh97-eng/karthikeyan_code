import { FunctionComponent } from 'react';
import { Product } from '../services/product';
import { TreatmentForm } from '../services/Treatment';
import { FormState } from '../store/form';

export enum SectionElementTypes {
  radio = 'radio',
  checkbox = 'checkbox',
  textarea = 'textarea',
  search = 'search',
  collapse = 'collapse',
  multiCollapse = 'multiCollapse',
  text = 'text',
}

export type QuestionOptions = {
  value: string;
  label: string;
  id?: string;
  note?: string;
  subLabel?: string;
  elements?: Question[];
};

export type Collapse = {
  id: string;
  title: string;
  type: SectionElementTypes.collapse;
  isCollapsed: boolean;
  elements: (Question | Collapse | MultiCollapse)[];
};

export type Question = {
  id: string;
  type:
    | SectionElementTypes.checkbox
    | SectionElementTypes.radio
    | SectionElementTypes.textarea
    | SectionElementTypes.text;
  label: string;
  note?: string;
  info?: string;
  options?: QuestionOptions[];
  mandatory: boolean;
  multiRequire?: number;
  placeholder?: string;
  infoItalic?: boolean;
};
export type MultiCollapse = {
  id: string;
  type: SectionElementTypes.multiCollapse;
  title: string;
  element: Collapse[];
};

export type CustomerNotes = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  label: string;
};

export type Section = {
  id?: string;
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  elements?: Question[];
  info?: string;
  isEnabled?: boolean;
  sections?: Section[];
  customerNotes?: CustomerNotes[];
};

export type Element = Question | Collapse | MultiCollapse;

export type PastTreatment = {
  id?: string;
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  elements: PastTreatmentElement[];
  info?: string;
  product?: Product[];
};
export type PastTreatmentClientData = {
  date: string;
  temp: string;
};
export type PastTreatmentElement = {
  id: keyof TreatmentForm;
  label: string;
  selectedIds?: string | string[] | number | boolean | Date | null;
  selectedOptions: string | number | boolean | Date | null;
  elements?: PastTreatmentElement[];
  type?: string;
};
export type SelectedOptionObject = {
  [key: string]: string;
};
export type PastTreatmentProduct = {
  brand: string;
  productName: string;
  productImage: string;
  chip: string;
};

export type ClientPreferencesCategory = {
  cp_category_id: string;
  cp_category_title: string;
};

export type ClientPreference = {
  cp_id: string;
  cp_category_id: ClientPreferencesCategory['cp_category_id'];
  cp_label: string;
  icon: FunctionComponent;
  selected: boolean;
  showOnCoreSegments: boolean;
};

export type TrApiResponse = Partial<FormState> & { updated_at: Date };

export type EnhancementRecommendation = {
  er_id: string;
  er_label: string;
  icon: FunctionComponent;
  selected: boolean;
};
export enum IntakeSectionElementTypes {
  radio = 'radio',
  checkbox = 'checkbox',
  textarea = 'textarea',
  textbox = 'textbox',
  date = 'date',
  zipCode = 'zipCode',
}

export type IntakeQuestion = {
  id?: string;
  note?: string;
  info?: string;
  isListPresent?: boolean;
  listItems?: string[];
  options?: QuestionOptions[];
  mandatory: boolean;
  defaultError?: string;
  multiRequire?: number;
  additionalLabel?: string;
  includeOtherVal?: string;
  selectedOptions?: any;
};
export type IntakeQuestionJson = {
  additionalLabel: string;
  defaultError: string;
  id: string;
  includeOtherVal: string;
  isVersioned: boolean;
  label: string;
  mandatory: boolean;
  type: string;
  options: QuestionOptions[];
  optionsData: QuestionOptions[];
  otherField: string;
  questionId: string;
  questionTitle: string;
  questionType: string;
  sectionId: string;
  subLabel: string;
};
export interface IntakeSectionTypes extends IntakeQuestion {
  questionId?: string;
  label?: string;
  title?: string;
  icon: any;
  type: IntakeSectionElementTypes;
  info?: string;
  note?: string;
  isEnabled?: boolean;
  sections?: IntakeSectionTypes[];
  customerNotes?: CustomerNotes[];
  isListPresent?: boolean;
  listItems?: string[];
  jsonData?: IntakeQuestionJson;
  otherAnswer?: string;
}

export type IntakeSectionJsonTypes = {
  id?: string;
  altSectionTitle: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sectionIcon: any;
  sectionId: string;
  sectionTitle: string;
  title: string;
  questionIds: string[];
  questionData: IntakeQuestionJson[];
};

export type MessageList = {
  header: string;
  title: string;
  image: string;
  path: string;
};

export type iUTCOffset = {
  [key: string]: number;
};
