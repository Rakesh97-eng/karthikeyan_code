import { FC } from 'react';
import { List, ListItem, Skeleton } from '@mui/material';

import BigProductCard from './bigProductCard';
import { ProductCardContainer } from './styles';
import { Product } from '../../../types/services/product';

interface ProductListProps {
  productList: Product[];
  isSkeletonShow: boolean;
}
const BigProductCardList: FC<ProductListProps> = ({
  productList,
  isSkeletonShow,
}) => {
  return (
    <List className='card-wrapper'>
      {productList.map((list, i) => {
        return <BigProductCard list={list} key={`card-${i}`} />;
      })}

      {isSkeletonShow &&
        Array.from(Array(5)).map((_, i) => {
          return <BigSkeletonCard key={`skeleton-item-${i}`} />;
        })}
    </List>
  );
};

const BigSkeletonCard = () => {
  return (
    <ProductCardContainer>
      <ListItem className='card-item'>
        <Skeleton variant='rectangular' className='list-avatar' />
        <Skeleton
          variant='rectangular'
          className='skeleton-list-item-text'
          width='100%'
        />
      </ListItem>
    </ProductCardContainer>
  );
};

export default BigProductCardList;
