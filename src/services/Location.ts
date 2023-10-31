import { Axios } from './_axios';

import {
  Fields,
  LocationFilterOptions,
  PaginationOptions,
} from '../types/services/Common';
import { Location, LocationRelations } from '../types/services/Location';

/**
 * Location resource
 * API call directed to /Location and /Location/**
 */
class LocationApi extends Axios<Location> {
  /**
   * getLocations
   * @param filterOptions {LocationFilterOptions} customer Id
   * @param paginationOptions {PaginationOptions} page size and page number
   * @param fields {Fields} fields need to be fetched
   * @returns _ {PaginationData<Location>} array of Locations
   */
  async getLocations(
    filterOptions?: LocationFilterOptions,
    fields?: Fields,
    included: LocationRelations[] = []
  ) {
    const serializedData = await this.getRequest(`location`, {
      filter: filterOptions,
      fields,
      include: included.length ? included.join(',') : undefined,
    });

    return this.deserializeResponse(serializedData, true);
  }
  /**
   * getLocationById
   * @param id {string} id of the location
   * @param fields {Fields} fields need to be fetched
   * @param included {Array<LocationRelations>} list of customer relations
   * @returns _ {LocationData{}}
   */

  //get individual Location by id
  async getLocationsByStaffId(
    paginationOptions: PaginationOptions,
    id: string,
    fields: Fields,
    included: LocationRelations[] = []
  ) {
    const serializedData = await this.getRequest(`staff/${id}/location`, {
      page: paginationOptions,
      fields,
      include: included.length ? included.join(',') : undefined,
    });

    return this.deserializeResponse(serializedData, true);
  }
}

export const LocationService = new LocationApi();
