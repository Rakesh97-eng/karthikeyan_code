interface ErrorObject {
  [key: string]: string;
}
export interface FormState {
  // For now we are keeping that property as any,
  // once we integrate the API then we can update with all the formState values
  [key: string]: any;
  errors?: ErrorObject;
}
export interface IntakeFormState {
  id?: string;
  question_id?: string;
  answer: string[];
  other_answer: string;
}

export interface IntakeShopPatchPayloadObjType {
  type: string;
  attributes: IntakeFormState;
}

export interface FormDispatch {
  type: string;
  payload?: Partial<FormState>;
  error?: boolean;
}
export interface TFormContext {
  formState: FormState;
  formDispatch: (action: FormDispatch) => void;
}

export interface IntakePatchPayload {
  id?: string;
  type: string;
  attributes: IntakeFormState;
}
