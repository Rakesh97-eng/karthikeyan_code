import Prod1 from '../../assets/images/product/antibacterial-hand-cream.svg';
import Prod2 from '../../assets/images/product/original-turmeric-latte-blend.svg';
import Prod3 from '../../assets/images/product/the-marble-body-brush.svg';
import { ProductImage } from '../../types/services/product';

const productImage: { [key: string]: string } = {
  prod1: Prod1,
  prod2: Prod2,
  prod3: Prod3,
};

export const getProductImage = (productName: string) => {
  return productImage[productName.toLowerCase()]
    ? productImage[productName.toLowerCase()]
    : '';
};

export const getProductImages = (images: ProductImage[]) => {
  return images?.find((img) => img.position === 1)?.src;
};
