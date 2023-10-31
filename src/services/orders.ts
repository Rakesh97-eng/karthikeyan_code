import { Axios } from './_axios';

import {
  Fields,
  OrderFilterOptions,
  PaginationOptions,
} from '../types/services/Common';
import { Order as TOrder, OrderRelations } from '../types/services/Order';

/**
 * Orders resource
 * API call directed to /order
 */
class Order extends Axios<TOrder> {
  /**
   * order
   * @param filterOptions {FilterOptions} customer Id
   * @param fields {Fields} fields need to be fetched
   * @param included {Array<OrderRelations>} list of customer relations
   * @returns _ {<Order>} array of Orders
   */
  async getOrders(
    paginationOptions: PaginationOptions,
    filterOptions: OrderFilterOptions,
    fields?: Fields,
    included: OrderRelations[] = []
  ) {
    const serializedData = await this.getRequest(`order`, {
      page: paginationOptions,
      filter: filterOptions,
      fields,
      include: included.length ? included.join(',') : undefined,
    });

    return this.deserializeResponse(serializedData, true);
  }
}

export const OrderService = new Order();
