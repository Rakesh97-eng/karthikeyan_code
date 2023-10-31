import { Axios } from './_axios';

import {
  Fields,
  PaginationOptions,
  TreatmentFilterOptions,
} from '../types/services/Common';
import {
  TreatmentRelation,
  TreatmentWithRelationships,
} from '../types/services/Treatment';

/**
 * Treatment resource
 * API call directed to /treatment and /treatment/**
 */
class TreatmentApi extends Axios<TreatmentWithRelationships> {
  /**
   * treatment
   * @param filterOptions {FilterOptions} customer Id
   * @param paginationOptions {PaginationOptions} page size and page number
   * @param fields {Fields} fields need to be fetched
   * @param included {included} included need to be fetched
   * @returns _ {PaginationData<Treatment>} array of Treatments
   */
  async getTreatments(
    paginationOptions: PaginationOptions,
    filterOptions: TreatmentFilterOptions,
    fields?: Fields,
    included?: string[]
  ) {
    const serializedData = await this.getRequest(`treatment`, {
      page: paginationOptions,
      filter: filterOptions,
      fields,
      include: included?.length ? included.join(',') : undefined,
    });

    return this.deserializeResponse(serializedData, true);
  }

  /**
   * patch treatment
   * @param id {String} treatment id
   * @param data {Partial<Treatment>}
   * @returns _ {PaginationData<Treatment>} array of Treatments
   */
  async patchTreatment(id: string, data: Partial<TreatmentWithRelationships>) {
    const relationships = Object.values(TreatmentRelation).filter(
      (relation: string) => data[relation as keyof TreatmentWithRelationships]
    );
    const serializedBody = this.serializeRequestBody('treatment', data, {
      relationships,
    });
    await this.patchRequest(`treatment/${id}`, serializedBody);
  }

  /**
   * post treatment
   * @param id {String} appointment id
   * @returns _ {PaginationData<Treatment>} array of Treatments
   */
  async createTreatment(id: string) {
    const serializedData = await this.postRequest(`treatment`, {
      appointment_id: id,
    });
    return this.deserializeResponse(serializedData, false);
  }

  /**
   * Delete treatment
   * @param id {String} appointment id
   * @returns _ {PaginationData<Treatment>} array of Treatments
   */
  async deleteTreatment(id: string) {
    const serializedData = await this.deleteRequest(`treatment/${id}`);
    return serializedData;
  }

  /**
   * treatment
   * @param id {treatment Id}
   * @param fields {Fields} fields need to be fetched
   * @param included {included} included need to be fetched
   * @returns _ {Treatment} Treatment
   */
  async getTreatmentById(id: string, fields?: Fields, included?: string[]) {
    const serializedData = await this.getRequest(`treatment/${id}`, {
      fields,
      include: included?.length ? included.join(',') : undefined,
    });
    return this.deserializeResponse(serializedData, false);
  }
}

export const TreatmentService = new TreatmentApi();
