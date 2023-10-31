import React, { FC } from 'react';
import { ContentHeaderWrapper, ProductCard } from './styles';
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';

import { getProductImages } from '../../../utils/helper-functions/ProductDetails';
import ChipList from '../ChipList';
import { Product } from '../../../types/services/product';

interface SmallProductCardProps {
  list: Product;
  pastProduct?: boolean;
}
const SmallProductCard: FC<SmallProductCardProps> = ({ list }) => {
  return (
    <ProductCard>
      <ListItem className='card-item'>
        <ListItemAvatar>
          <Avatar
            alt='Product Image'
            src={
              list.productImage?.length
                ? getProductImages(list.productImage)
                : ''
            }
            className='list-avatar'
          />
        </ListItemAvatar>
        <ListItemText
          className='list-item-text'
          primary={
            <Typography
              variant='label'
              className='prod-brand'
              color='var(--neutral-primary-light)'
            >
              {list.brand}
            </Typography>
          }
          secondary={
            <React.Fragment>
              <ContentHeaderWrapper>
                <Typography variant='body2' className='prod-name'>
                  {list.title}
                </Typography>
                <ChipList
                  chip={
                    list?.potentialAllergiesNew
                      ? list?.potentialAllergiesNew
                      : []
                  }
                />
              </ContentHeaderWrapper>
            </React.Fragment>
          }
        />
      </ListItem>
    </ProductCard>
  );
};

export default SmallProductCard;
