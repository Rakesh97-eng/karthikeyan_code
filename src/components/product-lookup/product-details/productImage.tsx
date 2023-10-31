import { Chip, Typography } from '@mui/material';
import { FC } from 'react';
import { ReactComponent as CloseIcon } from '../../../assets/icons/x-white-icon-filled.svg';
import { ReactComponent as WhiteHand } from '../../../assets/icons/intake-icons/white-hand.svg';
import { ProductImageContainer } from './styles';
import HeyDayLogo from "../../../assets/images/hey-day-black-logo.png";

interface ProdImageProps {
  prodImage: string;
  ProdType: string;
  onClose: () => void;
}
const ProductImage: FC<ProdImageProps> = ({ prodImage, ProdType, onClose }) => {
  return (
    <ProductImageContainer>
      <div className='image-wrapper'>
        <img src={prodImage} alt='prod-image'
         onError={({ currentTarget }) => {
          currentTarget.onerror = null; // prevents looping
          currentTarget.src = HeyDayLogo;
        }}
        className='prod-image' />

        <div className='chip'>
          <WhiteHand />
          <Chip
            label={
              <Typography variant='prodLabel1' className='product-type'>
                {ProdType}
              </Typography>
            }
          />
        </div>
      </div>
      <CloseIcon className='close-icon' onClick={onClose} />
    </ProductImageContainer>
  );
};

export default ProductImage;
