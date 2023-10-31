import { FormState } from '../../types/store/form';
import { TrApiResponse } from '../../types/treatmentRecord/question';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validateTrData = (
  firstoreData: Partial<FormState> & { fs_updated_at: Date },
  response: TrApiResponse
) => new Date(firstoreData.fs_updated_at) > response.updated_at;
