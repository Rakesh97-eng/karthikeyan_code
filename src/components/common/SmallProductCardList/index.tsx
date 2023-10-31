import { FC } from 'react';
import { List, ListItem, Skeleton } from '@mui/material';

import SmallProductCard from './smallProductCard';
import { ProductCard } from './styles';
import { Product } from '../../../types/services/product';

interface SmallProductListProps {
  productList?: Product[];
  pastProduct?: boolean;
  isSkeletonShow: boolean;
}
const SmallProductCardList: FC<SmallProductListProps> = ({
  productList,
  pastProduct = false,
  isSkeletonShow,
}) => {
  return (
    <List className='card-wrapper'>
      {productList?.map((list, i) => {
        return (
          <SmallProductCard
            list={list}
            key={`card-${i}`}
            pastProduct={pastProduct}
          />
        );
      })}
      {isSkeletonShow &&
        Array.from(Array(5)).map((_, i) => {
          return <SmallSkeletonCard key={`skeleton-item-${i}`} />;
        })}
    </List>
  );
};

const SmallSkeletonCard = () => {
  return (
    <ProductCard>
      <ListItem className='card-item'>
        <Skeleton variant='rectangular' className='list-avatar' />
        <Skeleton
          variant='rectangular'
          className='skeleton-list-item-text'
          width='100%'
        />
      </ListItem>
    </ProductCard>
  );
};

export default SmallProductCardList;
