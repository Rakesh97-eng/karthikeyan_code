import { Axios } from './_axios';

import { Fields } from '../types/services/Common';
import { Staff, StaffRelations } from '../types/services/Staff';

/**
 * Staff resource
 * API call directed to /Staff and /Staff/**
 */
class StaffApi extends Axios<Staff> {
  /**
   * getStaffById
   * @param id {string} id of the Staff
   * @param fields {Fields} fields need to be fetched
   * @param included {Array<StaffRelations>} list of customer relations
   * @returns _ {PaginationData<Staff>} array of Staffs
   */

  //get individual Staff by id
  async getStaffByLocationId(
    id: string,
    fields: Fields,
    included: StaffRelations[] = []
  ) {
    const serializedData = await this.getRequest(`location/${id}/staff`, {
      fields,
      include: included.length ? included.join(',') : undefined,
    });

    return this.deserializeResponse(serializedData, true);
  }
}

export const StaffService = new StaffApi();
