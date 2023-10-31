export interface IKeyValueMap {
  [key: string]: string;
}
export interface IIntakeJSON {
  intakeSections: { [key: string]: IIntakeJSONSection };
  intakeQuestions: { [key: string]: IIntakeJSONQuestion };
  intakeOptions: IIntakeJSONOptions;
}
export interface IIntakeJSONQuestion {
  questionId: string;
  questionTitle: string;
  label: string;
  subLabel: string;
  questionType: string;
  options: string[];
  includeOtherVal: string;
  otherField: string;
  defaultError: string;
  additionalLabel: string;
  mandatory: boolean;
  isVersioned: boolean;
  sectionId: string;
}
export interface IIntakeJSONSection {
  sectionId: string;
  sectionTitle: string;
  sectionIcon: string;
  altSectionTitle: string;
  questionIds: string[];
}
export interface IIntakeJSONOptions {
  [key: string]: string;
}
export interface IAllAnswers {
  answer?: string[];
  otherAnswer?: string;
}
export interface ISensitivities {
  seasonalAllergies?: IAllAnswers;
  topicalAlergies?: IAllAnswers;
  rednesOrBurning?: IAllAnswers;
  accutaneIsotretinoin?: IAllAnswers;
  rx_medications?: IAllAnswers;
  rxTopicals?: IAllAnswers;
  hormoneConsiderations?: IAllAnswers;
  diagnoses?: IAllAnswers;
  electricity?: IAllAnswers;
  facialSurgery?: IAllAnswers;
  [key: string]: any;
}
export interface IOilActivity {
  oilyShine?: IAllAnswers;
  breakouts?: IAllAnswers;
}
export interface ISkincareBackground {
  facialFrequency?: IAllAnswers;
  skincareKnowledge?: IAllAnswers;
  atHomeProducts?: IAllAnswers;
}
export interface IBasics {
  email?: IAllAnswers;
  phoneNumber?: IAllAnswers;
  gender?: IAllAnswers;
  birthday?: IAllAnswers;
  zipCode?: IAllAnswers;
  source?: IAllAnswers;
}

export interface IHealthIntake {
  sensitivities?: ISensitivities;
  'oil-activity'?: IOilActivity;
  'skincare-background'?: ISkincareBackground;
  basics?: IBasics;
  [key: string]: any;
}
