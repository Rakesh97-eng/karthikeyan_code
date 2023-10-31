import { INVALID_PRODUCT_VARIANT_ID } from '../../../constants/appConstants';
import {
  Order,
  OrderLine,
  OrderLineTypes,
} from '../../../types/services/Order';
import { Product } from '../../../types/services/product';
import { uniqueValues } from '../../../utils/helper-functions/common';

export const getProductVariantIds = (orders: Order[]): string[] => {
  const productVariantIds: string[] = [];
  try {
    orders.forEach((order: Order) => {
      order?.orderLine?.map((orderLine) => {
        if (
          orderLine?.type == OrderLineTypes.PRODUCT &&
          orderLine?.productVariantId &&
          orderLine?.productVariantId !== INVALID_PRODUCT_VARIANT_ID
        ) {
          productVariantIds.push(orderLine?.productVariantId);
        }
      });
    });
  } catch (error) {
    console.log('error', error);
  }

  return productVariantIds.filter(uniqueValues);
};
export const mergeProductToOrder = (
  products: Product[],
  orders: Order[]
): Product[] => {
  const orderLineProducts = getOrderLineProducts(orders);
  const productsArr: Product[] = [];
  products.forEach((product) => {
    orderLineProducts.forEach((orderLine) => {
      if (
        orderLine.productVariantId &&
        product.productVariant
          .map((variant) => variant.id)
          .includes(orderLine.productVariantId)
      ) {
        productsArr.push({
          ...product,
          productVariantId: orderLine.productVariantId,
          quantity: orderLine.quantity,
          orderId: orderLine.orderId,
          dateOfBought: orderLine.orderDate,
        });
      }
    });
  });
  return productsArr;
};
const getOrderLineProducts = (orders: Order[]): OrderLine[] => {
  const orderLineArr: OrderLine[] = [];
  orders.forEach((order: Order) => {
    order.orderLine?.forEach((orderLine: OrderLine) => {
      if (
        orderLine.type === OrderLineTypes.PRODUCT &&
        orderLine?.productVariantId &&
        orderLine?.productVariantId !== INVALID_PRODUCT_VARIANT_ID
      ) {
        orderLineArr.push({ ...orderLine, orderDate: order.sourceCreatedAt });
      }
    });
  });
  return orderLineArr;
};
