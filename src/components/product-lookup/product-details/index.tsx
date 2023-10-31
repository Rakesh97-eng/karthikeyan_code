import { FC } from 'react';
import ProductDescription from './productDescription';
import ProductImage from './productImage';
import ProductIngredient from './productIngredients';
import { ProductDetailWrapper } from './styles';
import { Product } from '../../../types/services/product';

type Price = {
  price: string;
  priceText: string;
};
export type Details = {
  title: string;
  description: string;
};
export interface DescriptionDataProps {
  vendor?: string | null;
  title?: string | null;
  priceList: Price[];
  chipLabel: string[];
  details: Details[];
}

interface ProductDetailsProps {
  onClose: () => void;
  prodImage: string;
  vendor?: string | null;
  prodTitle?: string | null;
  product: Product;
}
const ProductDetails: FC<ProductDetailsProps> = ({
  onClose,
  prodImage,
  vendor,
  prodTitle,
  product,
}) => {
  return (
    <ProductDetailWrapper>
      <ProductImage
        prodImage={prodImage}
        ProdType={product.productType ? product.productType : 'Type: N/A'}
        onClose={onClose}
      />{' '}
      <ProductDescription descriptionData={product} />
      <ProductIngredient product={product} />
    </ProductDetailWrapper>
  );
};

export default ProductDetails;
