import { Axios } from './_axios';

import {
  Customer as CustomerData,
  CustomerRelations,
} from '../types/services/Customer';
import { Fields, Filter, PaginationOptions } from '../types/services/Common';
import { Client, ClientDetailsType } from '../types/clientProfile';

/**
 * Customer resource
 * API call directed to /customer and /customer/**
 */
class Customer extends Axios<CustomerData> {
  /**
   * getAllCustomers
   * @param paginationOptions {PaginationOptions} page size and page number
   * @param fields {Fields} fields need to be fetched
   * @param filters {Filters} filters needed for query
   * @param included {Array<CustomerRelations>} list of customer relations
   * @returns _ {CustomerData[]} array of customers
   */
  async getAllCustomers(
    paginationOptions: PaginationOptions,
    fields: Fields,
    filter: Filter,
    included: CustomerRelations[] = []
  ) {
    const serializedData = await this.getRequest('customer', {
      page: paginationOptions,
      fields,
      filter,
      include: included.length ? included.join(',') : undefined,
    });

    return this.deserializeResponse(serializedData, true);
  }

  /**
   * getClientDetailsById/{id}
   * @param paginationOptions {PaginationOptions} page size and page number
   * @param fields {Fields} fields need to be fetched
   * @param included {Array<CustomerRelations>} list of client relations
   * @returns _ {CustomerData[]} array of customers
   */
  async getClientDetailsById(
    id: string,
    fields: Fields,
    included: CustomerRelations[] = []
  ) {
    const serializedData = await this.getRequest(`customer/${id}`, {
      fields,
      include: included.length ? included.join(',') : undefined,
    });

    return this.deserializeResponse<ClientDetailsType>(serializedData, false);
  }

  /**
   * patch customer
   * @param id {String} customer id
   * @param data {Partial<Customer>}
   */
  async patchClient(id: string, data: Partial<Client>) {
    const serializedBody = this.serializeRequestBody('customer', data, {});
    await this.patchRequest(`customer/${id}`, serializedBody);
  }
}

export const CustomerService = new Customer();
