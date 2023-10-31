import { Axios } from './_axios';

import {
  Fields,
  PaginationOptions,
  ProductFilterOptions,
} from '../types/services/Common';

import {
  Product as TProduct,
  ProductRelation,
} from '../types/services/product';

/**
 * Products resource
 * API call directed to /product
 */
class Product extends Axios<TProduct> {
  /**
   * product
   * @param paginationOptions {PaginationOptions} page size and page number
   * @param filterOptions {ProductFilterOptions} customer Id
   * @param fields {Fields} fields need to be fetched
   * @returns _ {<Order>} array of Products
   */
  async getProducts(
    paginationOptions: PaginationOptions,
    filterOptions: ProductFilterOptions,
    fields?: Fields,
    included?: ProductRelation[]
  ) {
    const serializedData = await this.getRequest(`product`, {
      page: paginationOptions,
      filter: filterOptions,
      fields,
      include: included?.length ? included.join(',') : undefined,
    });

    return this.deserializeResponse(serializedData, true);
  }
}

export const ProductService = new Product();
