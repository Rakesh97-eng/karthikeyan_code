import { FC, useState } from 'react';
import { PastPurchaseContainer } from './styles';
import StyledButton from '../../common/Button';
import BigProductCardList from '../../common/BigProductCardList';
import { Product } from '../../../types/services/product';
interface PastPurchaseProps {
  productList: Product[];
}
const PastPurchases: FC<PastPurchaseProps> = ({ productList }) => {
  const [data, setData] = useState(
    productList.length > 5 ? productList.slice(0, 5) : productList
  );
  const [isSkeletonShow, setIsSkeletonShow] = useState(false);
  const changeData = () => {
    if (data.length > 5) {
      setData(productList.slice(0, 5));
    } else {
      setIsSkeletonShow(true);
      setTimeout(() => {
        setIsSkeletonShow(false);
        setData(productList);
      }, 2000);
    }
  };
  return (
    <PastPurchaseContainer>
      <BigProductCardList productList={data} isSkeletonShow={isSkeletonShow} />
      {productList.length > 5 && (
        <StyledButton
          variant='outlined'
          value={data.length > 5 ? 'See Less' : 'See All'}
          onClick={changeData}
        />
      )}
    </PastPurchaseContainer>
  );
};

export default PastPurchases;
