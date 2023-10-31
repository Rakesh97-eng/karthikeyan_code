import React, { FC } from 'react';
import { ContentHeaderWrapper, MediumProductCardWrapper } from './styles';
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';

import { getProductImages } from '../../../utils/helper-functions/ProductDetails';
import ChipCard from '../ChipList/chipCard';
import { Product } from '../../../types/services/product';

interface MediumProductCardProps {
  list: Product;
}
const MediumProductCard: FC<MediumProductCardProps> = ({ list }) => {
  return (
    <MediumProductCardWrapper>
      <ListItem className='card-item'>
        <ListItemAvatar>
          <Avatar
            alt='Product Image'
            src={getProductImages(list?.productImage)}
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
              {list.brand || 'NA'}
            </Typography>
          }
          secondary={
            <React.Fragment>
              <ContentHeaderWrapper>
                <Typography variant='body2' className='prod-name'>
                  {list.title}
                </Typography>
                <ChipCard
                  chipLabel={
                    list?.potentialAllergies ? list.potentialAllergies : ''
                  }
                  pastTreatment={true}
                />
              </ContentHeaderWrapper>
            </React.Fragment>
          }
        />
      </ListItem>
    </MediumProductCardWrapper>
  );
};

export default MediumProductCard;
