import { Axios } from './_axios';
import { IntakeFormState, IntakePatchPayload } from '../types/store/form';

/**
 * Treatment resource
 * API call directed to /treatment and /treatment/**
 */
class IntakeApi extends Axios<IntakeFormState> {
  /**
   * patch treatment
   * @param id {String} treatment id
   * @param data {Partial<IntakeFormState>}
   */
  async patchIntake(id: string, data: IntakePatchPayload[]) {
    await this.patchRequest(`customer/${id}/intake`, { data });
  }
}

export const IntakeService = new IntakeApi();
