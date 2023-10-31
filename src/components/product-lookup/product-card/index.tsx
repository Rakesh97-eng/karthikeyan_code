import { Grid, Typography } from '@mui/material';
import { FC, useState } from 'react';
import { Product } from '../../../types/services/product';
import ChipList from '../../common/ChipList';
import ChipCard from '../../common/ChipList/chipCard';
import { ProductLookupProductCardStyled } from './styles';
import { ReactComponent as HandIcon } from '../../../assets/icons/hand.svg';
import CustomDialog from '../../common/CustomDialog';
import ProductDetails from '../product-details';
import HeyDayLogo from '../../../assets/images/hey-day-black-logo.png';

type ProductLookupProductCardFC = FC<{
  product: Product;
}>;

/**
 * ProductLookupProductCard
 * @description Product Cards for look up page
 * @property {Product} product - the product to show in the card
 */
export const ProductLookupProductCard: ProductLookupProductCardFC = ({
  product,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [prodImage, setProdImage] = useState<string>('');
  const [vendor, setVendor] = useState<string | null>('');
  const [title, setTitle] = useState<string | null>('');
  const handleClose = () => {
    setIsOpen(false);
  };
  const handleOpen = (
    prodImage: string,
    prodVendor: string | null,
    prodTitle: string | null
  ) => {
    setProdImage(prodImage);
    setVendor(prodVendor);
    setTitle(prodTitle);
    setIsOpen(true);
  };
  return (
    <>
      <ProductLookupProductCardStyled
        key={product.id}
        onClick={() =>
          handleOpen(
            product.productImage[0]?.src || HeyDayLogo,
            product?.vendor,
            product?.title
          )
        }
      >
        <div className='product-card-image'>
          <img
            src={
              product.productImage?.length > 0
                ? product.productImage[0].src
                : HeyDayLogo
            }
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = HeyDayLogo;
            }}
            alt={product.title || ''}
          />
          {product.productType && (
            <ChipCard
              chipLabel={product.productType}
              pastTreatment={true}
              className='product-image-chip'
            />
          )}
          {product?.backOrFrontBar === 'back' && (
            <span className='back-or-front-bar-icons'>
              <HandIcon />
            </span>
          )}
        </div>
        <Grid
          container
          direction='column'
          justifyContent='space-between'
          className='product-details'
        >
          <Grid item>
            <Typography variant='prodLabel1' className='product-brand'>
              {product.vendor}
            </Typography>
            <Typography variant='body2' className='product-name'>
              {product.title || 'NA'}
            </Typography>
          </Grid>
          <Grid item>
            <ChipList
              chip={[
                ...(product.potentialAllergiesNew || []),
                ...(!product.pregnancySafe ? ['Pregnancy'] : []),
              ]}
            />

            <Typography variant='body1' className='product-effective-for'>
              <p
                dangerouslySetInnerHTML={{ __html: product.ingredients || '' }}
              />
            </Typography>
          </Grid>
        </Grid>
      </ProductLookupProductCardStyled>
      <CustomDialog
        isModalOpen={isOpen}
        handleClose={handleClose}
        maxwidthsize='720px'
        padding='0px'
      >
        <ProductDetails
          onClose={handleClose}
          prodImage={prodImage}
          vendor={vendor}
          prodTitle={title}
          product={product}
        />
      </CustomDialog>
    </>
  );
};
