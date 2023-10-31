import { Typography } from '@mui/material';
import { FC } from 'react';
import { Product } from '../../../types/services/product';
import { ProductIngredientContainer } from './styles';

interface ProductIngredientProps {
  product: Product;
}
const ProductIngredient: FC<ProductIngredientProps> = ({ product }) => {
  return (
    <ProductIngredientContainer>
      <Typography variant='h3' color='var(--neutral-primary)' className="ingredients">
        Ingredients
      </Typography>

      <div className='ingredients-list'>
        <Typography variant='body1' fontWeight={700}>
          <strong>All Ingredients:</strong>
        </Typography>
        {product.ingredients ? (
          <Typography variant='body2' className='ingredients-details'>
            <p
              dangerouslySetInnerHTML={{
                __html: product.ingredients ? product.ingredients : 'N/A',
              }}
            />
          </Typography>
        ) : (
          'N/A'
        )}
      </div>
    </ProductIngredientContainer>
  );
};
export default ProductIngredient;
