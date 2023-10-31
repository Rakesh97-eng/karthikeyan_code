import { Chip, Typography } from '@mui/material';
import { FC } from 'react';
import { Product } from '../../../types/services/product';
import { ProductDescriptionContainer } from './styles';
interface ProductDescriptionProps {
  descriptionData: Product;
}
const ProductDescription: FC<ProductDescriptionProps> = ({
  descriptionData,
}) => {
  return (
    <ProductDescriptionContainer>
      <div className='desc-wrapper'>
        <Typography variant='label' className='vendor'>
          {descriptionData.vendor ? descriptionData.vendor : 'N/A'}
        </Typography>
        <Typography variant='h3' className='title'>
          {descriptionData.title ? descriptionData.title : 'N/A'}
        </Typography>
        <div className='price-list-wrapper'>
          {descriptionData?.productVariant.map((list, index) => {
            const priceInDollar = list?.price
              ? `$${Number(list.price) / 100}`
              : 'NA';
            return (
              <div key={`price-${index}`} className='price-list'>
                <Typography variant='mono1' className='price'>
                  {priceInDollar}
                </Typography>
                <Typography
                  variant='body2'
                  className='price-text'
                  component={'span'}
                >
                  {` (${list.weight} ${list.weightUnit})`}{' '}
                </Typography>
              </div>
            );
          })}
        </div>
        <div className='chip-list'>
          {descriptionData?.potentialAllergiesNew?.map((label, index) => {
            return (
              <Chip
                label={
                  <Typography variant='prodLabel2' className='chip-label'>
                    {label}
                  </Typography>
                }
                key={`chip-${index}`}
              />
            );
          })}
          {descriptionData.pregnancySafe ? (
            <Chip
              label={
                <Typography variant='prodLabel2' className='chip-label'>
                  Pregnancy Safe
                </Typography>
              }
            />
          ) : null}
        </div>
      </div>
    </ProductDescriptionContainer>
  );
};
export default ProductDescription;
