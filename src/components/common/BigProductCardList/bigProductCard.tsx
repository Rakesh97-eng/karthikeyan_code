import React, { FC } from 'react';
import {
  ContentFooterWrapper,
  ContentHeaderWrapper,
  ProductCardContainer,
  IconDateWrapper,
} from './styles';
import {
  Avatar,
  Chip,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import { Product } from '../../../types/services/product';
import { ReactComponent as StoreFront } from '../../../assets/icons/storefront.svg';
import { getProductImages } from '../../../utils/helper-functions/ProductDetails';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { DATE_FORMAT_WITHOUT_TIME } from '../../../constants/appConstants';
dayjs.extend(relativeTime);
interface ProductCardProps {
  list: Product;
}
const BigProductCard: FC<ProductCardProps> = ({ list }) => {
  return (
    <ProductCardContainer>
      <ListItem className='card-item'>
        <ListItemAvatar className='list-avatar-set'>
          <Avatar
            alt='Product Image'
            src={getProductImages(list?.productImage)}
            className='list-avatar'
          />
          {list.recommendedProduct && (
            <Chip
              label={<Typography variant='prodLabel2'>REC</Typography>}
              className='select-icon'
            />
          )}
          {list?.quantity && list?.quantity > 1 && (
            <Chip
              label={
                <Typography variant='prodLabel2'>x{list.quantity}</Typography>
              }
              className='select-icon1'
            />
          )}
        </ListItemAvatar>
        <ListItemText
          className='list-item-text'
          primary={
            <Typography
              variant='prodLabel1'
              className='prod-brand'
              color='var(--neutral-primary-light)'
            >
              {list.brand}
            </Typography>
          }
          secondary={
            <React.Fragment>
              <ContentHeaderWrapper>
                <Typography className='prod-name' variant='body2'>
                  {list.title}
                </Typography>
                {/* Intentional : Will uncomment this once we get the actual price */}
                {/* <Typography className='prod-price' variant='body2'>
                  {list.productPrice ? list.productPrice : ''}
                </Typography> */}
              </ContentHeaderWrapper>
              <ContentFooterWrapper>
                <IconDateWrapper>
                  <StoreFront className='card-icon' />
                  <Typography
                    className='card-footer-date'
                    variant='body2'
                    color='var(--neutral-primary-light)'
                  >
                    {list?.dateOfBought
                      ? `${dayjs(list?.dateOfBought).format(
                          DATE_FORMAT_WITHOUT_TIME
                        )} (${dayjs().to(dayjs(list?.dateOfBought))})`
                      : 'NA'}
                  </Typography>
                </IconDateWrapper>
                <Chip
                  label={
                    <Typography variant='prodLabel1'>
                      {list?.productType}
                    </Typography>
                  }
                  className='chip-style'
                />
              </ContentFooterWrapper>
            </React.Fragment>
          }
        />
      </ListItem>
    </ProductCardContainer>
  );
};

export default BigProductCard;
