import { FC, useContext, useEffect, useMemo, useState } from 'react';
import { PastPurchaseContainer } from './styles';
import StyledButton from '../../common/Button';
import SmallProductCardList from '../../common/SmallProductCardList';
import { Product, ProductRelation } from '../../../types/services/product';
import { ProductService } from '../../../services/product';
import { AxiosError } from 'axios';
import {
  defaultErrorHandler,
  handleAxiosError,
} from '../../../utils/helper-functions/handleError';
import { PaginationMeta } from '../../../types/services/Common';
import { TClientContext } from '../../../types/store/client';
import ClientContext from '../../../store/client/ClientContext';
import { ToastContext } from '../../../providers/context/toastContext';
import { PRODUCT_TYPE } from '../../../constants/appConstants';

const ProductsToAvoid: FC = () => {
  const [prodData, setProdData] = useState<Product[]>();
  const [allProducts, setAllProducts] = useState<Product[]>();
  const [pagination, setPagination] = useState<PaginationMeta>({
    page: 1,
    size: 50,
    total: 0,
  });
  const { showErrorDialog } = useContext(ToastContext);
  const [isSkeletonShow, setIsSkeletonShow] = useState(false);
  const { clientState } = useContext<TClientContext>(ClientContext);
  const allergy = useMemo(() => {
    return clientState.mappedHealthIntake?.sensitivities?.topicalAlergies?.answer?.join();
  }, [clientState]);

  const getProducts = async (
    meta: { page: number; size: number },
    allergies: string
  ) => {
    setIsSkeletonShow(true);
    const productRes = await getProductsToAvoid(meta, allergies);
    setIsSkeletonShow(false);
    if (!prodData?.length && pagination.page === 1 && productRes) {
      setProdData(productRes.data.slice(0, 5));
      setAllProducts(productRes.data);
      setPagination((prevState) => ({
        ...prevState,
        total: productRes.meta.total,
      }));
    } else {
      if (productRes?.data.length && allProducts) {
        setProdData([...allProducts, ...productRes.data]);
        setPagination(productRes?.meta);
        setAllProducts([...allProducts, ...productRes.data]);
      } else {
        setProdData([]);
      }
    }
  };

  useEffect(() => {
    if (allergy?.length) {
      getProducts(pagination, allergy);
    }
  }, [allergy]);

  const getProductsToAvoid = async (
    meta: { page: number; size: number },
    allergies: string
  ) => {
    try {
      const products = await ProductService.getProducts(
        { number: meta.page, size: meta.size },
        {
          allergy: { with: allergies },
          back_or_front_bar: [PRODUCT_TYPE.backBar, PRODUCT_TYPE.both],
          display_in_shopapp: true,
        },
        {
          [ProductRelation.productImage]: 'src,position',
        },
        [ProductRelation.productImage]
      );
      return products;
    } catch (error) {
      if (error instanceof AxiosError) {
        showErrorDialog(error?.message);
        handleAxiosError(error);
      } else if (error instanceof Error) {
        showErrorDialog(error?.message);
        defaultErrorHandler(error.message);
      }
    }
  };

  const seeAllSeeLessHandler = (isShowAll: boolean) => {
    if (isShowAll && allProducts?.length !== pagination.total && allergy) {
      getProducts({ page: pagination.page + 1, size: 50 }, allergy);
    } else {
      if (allProducts?.length === pagination.total && !isShowAll) {
        setProdData(allProducts?.slice(0, 5));
      } else {
        setProdData(allProducts);
      }
    }
  };
  return (
    <>
      {prodData && (
        <PastPurchaseContainer>
          <SmallProductCardList
            productList={prodData}
            isSkeletonShow={isSkeletonShow}
          />
          {pagination && pagination.total > 5 && (
            <StyledButton
              variant='outlined'
              value={
                pagination.total === prodData.length ? 'See Less' : 'See More'
              }
              onClick={() => {
                if (pagination.total !== prodData.length) {
                  seeAllSeeLessHandler(true);
                } else {
                  seeAllSeeLessHandler(false);
                }
              }}
            />
          )}
        </PastPurchaseContainer>
      )}
    </>
  );
};

export default ProductsToAvoid;
