import { Axios } from './_axios';
import { BlvdStaffTimeShift } from '../types/services/TimeShift';
import { TimeShiftFilterOptions } from '../types/services/Common';

/**
 * TimeShift resource
 * API call directed to /shift
 */
class TimeShiftApi extends Axios<BlvdStaffTimeShift> {
  /**
   * getTimeShifts
   * @param filterOptions {TimeShiftFilterOptions} boulevard_location_id, boulevard_staff_id, startIso, endIso
   * @returns _ {PaginationData<TimeShift>} array of TimeShifts
   */
  async getTimeShifts(filterOptions: TimeShiftFilterOptions) {
    const serializedData = await this.getRequest(`shift`, {
      filter: filterOptions,
    });
    return this.deserializeResponse(serializedData, true);
  }
}

export const TimeShiftService = new TimeShiftApi();
