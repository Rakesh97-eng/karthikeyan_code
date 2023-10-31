import { Axios } from './_axios';

import {
  Fields,
  PaginationOptions,
  AppointmentFilterOptions,
} from '../types/services/Common';
import {
  Appointment,
  AppointmentRelations,
} from '../types/services/Appointment';

/**
 * Appointment resource
 * API call directed to /appointment and /appointment/**
 */
class AppointmentApi extends Axios<Appointment> {
  /**
   * getAppointments
   * @param filterOptions {AppointmentFilterOptions} customer Id
   * @param paginationOptions {PaginationOptions} page size and page number
   * @param fields {Fields} fields need to be fetched
   * @returns _ {PaginationData<Appointment>} array of Appointments
   */
  async getAppointments(
    paginationOptions: PaginationOptions,
    filterOptions: AppointmentFilterOptions,
    fields?: Fields,
    included: AppointmentRelations[] = []
  ) {
    const requestPayload = {
      page: paginationOptions,
      filter: filterOptions,
      fields,
      include: included.length ? included.join(',') : undefined,
    };
    const serializedData = await this.getRequest(`appointment`, requestPayload);

    return this.deserializeResponse(serializedData, true);
  }
}

export const AppointmentService = new AppointmentApi();
