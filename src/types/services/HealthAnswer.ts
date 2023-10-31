export interface HealthAnswer {
  id: string;
  customerId: string;
  questionId: string;
  question: Question;
  answer: string[];
  isActive: null | boolean;
}

export type Question = QuestionWithOptions | QuestionWithTextbox;

export interface QuestionWithOptions {
  question: string;
  type: QuestionType.Checkbox | QuestionType.Radio;
  options: Option[];
}

export interface QuestionWithTextbox {
  question: string;
  type: QuestionType.Textbox;
  options: Option[];
}

export interface Option {
  field: number;
  value: string;
}

export interface DiscountApplications {}

export enum QuestionType {
  Checkbox = 'checkbox',
  Radio = 'radio',
  Textbox = 'textbox',
}
