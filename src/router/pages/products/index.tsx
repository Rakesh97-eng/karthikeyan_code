import {
  IconButton,
  InputBase,
  TablePagination,
  Typography,
  Grid,
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import PurchaseLogo from '../../../assets/images/client-profile/purchase.png';
import { ReactComponent as SearchIcon } from '../../../assets/icons/search-icon.svg';
import { ReactComponent as Faders } from '../../../assets/icons/faders.svg';
import { ReactComponent as CloseIconFilled } from '../../../assets/icons/X-icon-filled.svg';
import { AxiosError } from 'axios';
import {
  defaultErrorHandler,
  handleAxiosError,
} from '../../../utils/helper-functions/handleError';
import { ProductService } from '../../../services/product';
import { Product, ProductRelation } from '../../../types/services/product';
import {
  ProductLookupPageHeader,
  ProductLookupPageSearch,
  ProductLookupProductsContainer,
  ProductLookupWrapper,
} from './styles';
import {
  PaginationData,
  ProductFilterOptions,
} from '../../../types/services/Common';
import { StyledCircularProgress } from '../../../containers/layout.styles';
import { ProductLookupProductCard } from '../../../components/product-lookup/product-card';
import { EmptyList } from '../../../components/common/empty-list';
import ProductFilter from '../../../components/product-lookup/product-filter';
import FilterSideBarMenu from '../../../components/product-lookup/product-filter/filterSideBar';
import { ToastContext } from '../../../providers/context/toastContext';

const Products = () => {
  // Sample breacrumb data
  const [searchProductString, setSearchProductString] = useState('');
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [sideBarStatus, setSideBarStatus] = useState<boolean>(false);
  const [filterData, setFilterData] = useState<ProductFilterOptions>({});
  const [productResults, setProductResults] = useState<PaginationData<Product>>(
    {
      data: [],
      meta: {
        page: 0,
        total: 0,
        size: 0,
      },
    }
  );
  const { showErrorDialog } = useContext(ToastContext);
  useEffect(() => {
    fetchProducts();
  }, [searchProductString, page, filterData]);

  const getFilterData = (filters: ProductFilterOptions) => {
    setFilterData(filters);
    setPage(0);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchProductString(event.target.value);
    setPage(0);
  };

  const fetchProducts = async () => {
    setLoading(true);

    let filterOptions: ProductFilterOptions = { shopify_status: 'active' };

    if (filterData || searchProductString) {
      filterOptions = {
        ...filterOptions,
        ...filterData,
        q: searchProductString,
        display_in_shopapp: true,
      };
    }

    try {
      const productResponse = await ProductService.getProducts(
        {
          size: 10,
          number: page + 1,
        },
        filterOptions,
        {
          product:
            'id,title,vendor,pregnancy_safe,back_or_front_bar,potential_allergies_new,ingredients,ingredients_new,brand,potential_allergies,pregnancy_safe,potential_allergies_new,ingredients_new,linked_name,product_type',
          product_image: 'id, src',
          product_variant: 'id,price,grams,weight,weight_unit',
        },
        [ProductRelation.productImage, ProductRelation.productVariant]
      );
      setProductResults(productResponse);
    } catch (error) {
      if (error instanceof AxiosError) {
        showErrorDialog(error?.message);
        handleAxiosError(error);
      } else if (error instanceof Error) {
        defaultErrorHandler(error.message);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <ProductLookupWrapper>
      <ProductLookupPageHeader>
        <img src={PurchaseLogo} alt='Purchage Logo' />
        <Typography variant='h1' className='header-text'>
          Products
        </Typography>
      </ProductLookupPageHeader>
      <Grid container className='search-box-wrapper'>
        <Grid item xs={10} sm={12} md={12}>
          {' '}
          <ProductLookupPageSearch>
            <IconButton type='submit' aria-label='search'>
              <SearchIcon />
            </IconButton>
            <InputBase
              placeholder='Product Name, Brand, Ingredients'
              inputProps={{ 'aria-label': 'Search Client' }}
              onChange={handleSearchChange}
              value={searchProductString}
              fullWidth
              className='input-box'
            />
            {searchProductString && (
              <CloseIconFilled
                className='close-filled-icon'
                onClick={() => setSearchProductString('')}
              />
            )}
          </ProductLookupPageSearch>
        </Grid>
        <Grid item sx={{ display: { xs: 'block', sm: 'none' } }} xs={2}>
          <IconButton
            type='submit'
            aria-label='search'
            className='filter-btn'
            onClick={() => setSideBarStatus(true)}
          >
            <Faders />
          </IconButton>
        </Grid>
      </Grid>

      {loading && (
        <div className='loader-div'>
          <StyledCircularProgress />
        </div>
      )}
      <Grid container spacing={2}>
        <Grid item sx={{ display: { xs: 'none', sm: 'block' } }} sm={4} md={4}>
          <ProductLookupProductsContainer>
            {' '}
            <ProductFilter
              getFilterData={getFilterData}
              headerTextShown={true}
            />
          </ProductLookupProductsContainer>
        </Grid>
        <Grid item xs={12} sm={8} md={8}>
          {' '}
          {!loading && productResults.data.length === 0 && (
            <EmptyList
              headerText={'Sorry, no products found'}
              subHeaderText={'Try refining your search'}
            />
          )}
          {!loading && productResults.data.length !== 0 && (
            <ProductLookupProductsContainer>
              {productResults.data.map((product) => (
                <ProductLookupProductCard product={product} key={product.id} />
              ))}
              <TablePagination
                component='div'
                count={productResults.meta.total}
                rowsPerPage={productResults.meta.size}
                page={productResults.meta.page - 1}
                onPageChange={(_, page) => {
                  setPage(page);
                }}
                rowsPerPageOptions={[]}
              />
            </ProductLookupProductsContainer>
          )}
        </Grid>
      </Grid>

      <FilterSideBarMenu
        sideBarOpen={sideBarStatus}
        closeSidebar={() => setSideBarStatus(false)}
        getFilterData={getFilterData}
      />
    </ProductLookupWrapper>
  );
};

export default React.memo(Products);
