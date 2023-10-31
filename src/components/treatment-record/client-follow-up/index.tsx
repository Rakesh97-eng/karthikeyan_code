import React, {
  useState,
  FC,
  useContext,
  useRef,
  useEffect,
  useMemo,
} from 'react';
import {
  InputBase,
  IconButton,
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Typography,
  Chip,
  Avatar,
  Box,
} from '@mui/material';
import { ReactComponent as SearchIcon } from '../../../assets/icons/search-icon.svg';
import { ReactComponent as Card } from '../../../assets/icons/card.svg';
import { ReactComponent as CloseIcon } from '../../../assets/icons/X-icon.svg';
import { ReactComponent as CloseIconFilled } from '../../../assets/icons/X-icon-filled.svg';
import { ReactComponent as TickIcon } from '../../../assets/icons/tick-icon.svg';
import PostBox from '../../../assets/icons/client-follow-up-post-box.svg';
import { getProductImages } from '../../../utils/helper-functions/ProductDetails';
import Highlighter from 'react-highlight-words';
import {
  StyledPaper,
  ListViewContainer,
  CardFooterWrapper,
  SelectedCard,
} from './styles';
import { StyledMandatory } from '../../../styles/global';
import Checkbox from '../../common/Checkbox';
import {
  Section,
  SectionElementTypes,
} from '../../../types/treatmentRecord/question';
import TextArea from '../../common/TextArea';
import RadioButton from '../../common/RadioButton';
import { CLIENT_MESSAGE_TEXTAREA } from '../../../constants/prClientFollowUp';
import { FormState, TFormContext } from '../../../types/store/form';
import FormContext from '../../../store/form/formContext';
import { updateForm } from '../../../store/form/formAction';
import { ProductService } from '../../../services/product';
import { Product, ProductRelation } from '../../../types/services/product';
import {
  defaultErrorHandler,
  handleAxiosError,
} from '../../../utils/helper-functions/handleError';
import { AxiosError } from 'axios';
import {
  PaginationMeta,
  ProductFilterOptions,
} from '../../../types/services/Common';
import { IParams } from '../../../types/clientProfile';
import { useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Loader } from '../../common/Loader';
import { Note } from '../../../types/services/Note';
import { ToastContext } from '../../../providers/context/toastContext';

interface ICheckBoxSection {
  section: Section;
  prefilledData?: Partial<FormState>;
}

const ClientFollowUp: FC<ICheckBoxSection> = ({ section, prefilledData }) => {
  const { clientID }: IParams = useParams();
  const { formDispatch, formState } = useContext<TFormContext>(FormContext);
  const searchRef = useRef<HTMLInputElement>();
  const updateFormState = (data: FormState) => {
    formDispatch(updateForm(data));
  };
  const [showList, setShowList] = useState(false);
  const [textBoxValue, setTextBoxValue] = useState('');
  const [productList, setProductList] = useState<Product[]>([]);
  const [meta, setMeta] = useState<PaginationMeta>({
    page: 0,
    size: 50,
    total: 0,
  });
  const [filterList, setFilterList] = useState(productList);
  const [selectedList, setSelectedList] = useState<Product[]>(
    prefilledData?.recommendedProduct || []
  );
  const [searchString, setSearchString] = useState<string>();
  const { showErrorDialog } = useContext(ToastContext);
  const searchProduct = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    resetPage();
    setTextBoxValue(value);
    setSearchString(value);
  };
  const selectItem = (data: Product) => {
    const isNotPresent = selectedList.some((list) => {
      return list?.id === data?.id;
    });
    if (!isNotPresent) {
      setSelectedList((prevState: Product[]) => [...prevState, data]);
    }
  };

  const clearItem = () => {
    setTextBoxValue('');
    setFilterList(productList);
    setShowList(false);
  };

  const removeSelectedItem = (productName: string) => {
    setSelectedList(
      selectedList.filter((list: Product) => {
        if (list?.title !== productName) {
          return list;
        }
      })
    );
  };

  useEffect(() => {
    if (prefilledData && prefilledData?.recommendedProduct?.length > 0) {
      const productIds = prefilledData?.recommendedProduct.map(
        (prod: Product) => {
          return prod.id;
        }
      );
      if (productIds.length > 0) {
        getProducts(productIds);
      }
    }
  }, [prefilledData?.recommendedProduct]);

  useEffect(() => {
    const productIds = selectedList.map((prod) => {
      return { id: prod.id };
    });
    updateFormState({ recommendedProduct: productIds });
  }, [selectedList]);

  const handlePopupClose = () => {
    setShowList(false);
  };
  const handleSelectItem = (list: Product) => () => {
    selectItem(list);
    setTimeout(() => {
      searchRef.current?.focus();
    }, 100);
  };
  useEffect(() => {
    getProducts();
  }, [searchString]);

  const getProducts = async (productIds?: string[]) => {
    const filter: ProductFilterOptions = {
      customer_id: clientID,
      display_in_shopapp: true,
    };
    if (productIds && productIds?.length > 0) {
      filter.ids = productIds?.join(',');
    } else {
      filter.q = searchString;
    }

    try {
      const products = await ProductService.getProducts(
        { number: meta.page + 1, size: meta.size },
        filter,
        {
          [ProductRelation.productImage]: 'src,position',
        },
        [ProductRelation.productImage, ProductRelation.productVariant]
      );

      if (productIds && productIds?.length > 0 && products.data) {
        setSelectedList(products.data);
      } else {
        setProductList((prevState) => {
          return [...prevState, ...products.data];
        });
        setFilterList((prevState) => {
          return [...prevState, ...products.data];
        });
        setMeta(products.meta);
      }
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
  const isSelectedProduct = (product: Product): boolean => {
    return !!selectedList.find((pro) => pro.id === product.id);
  };
  const resetPage = () => {
    setProductList([]);
    setFilterList([]);
    setMeta((prev) => {
      return { ...prev, page: 0 };
    });
  };

  return (
    <>
      <Box className='segment-title'>
        <img src={PostBox} alt='client-follow-up' />
        <Typography variant='h3' className='title'>
          Client Follow-Up
        </Typography>
      </Box>
      <Typography variant='body1' className='title-content'>
        Submitting this section will result in a client email.
        <strong>
          If clients reply to this email, it will go to the front desk.
        </strong>
        The Front Desk is instructed to get in touch with you for any follow up.
      </Typography>
      <Typography variant='body1' className='option-title'>
        Product Recommendations
        <StyledMandatory> *</StyledMandatory>
      </Typography>

      {selectedList && (
        <List>
          {selectedList.map((list: Product, i: number) => {
            const priceInCent =
              list?.productVariant?.length > 0
                ? Number(list?.productVariant[0].price)
                : 0;
            const priceInDollar: string = priceInCent
              ? `$${priceInCent / 100}`
              : 'NA';
            const titleAndPrice = list?.title
              ? `${list.title} — ${priceInDollar}`
              : '';

            return (
              <SelectedCard key={`list-item-${i}`}>
                <div className='card-wrapper'>
                  <ListItem
                    onClick={() => selectItem(list)}
                    className='card-item'
                  >
                    <ListItemAvatar className='list-avatar-set'>
                      <Avatar
                        alt='Product Image'
                        src={getProductImages(list.productImage)}
                        className='list-avatar-set'
                      />
                    </ListItemAvatar>
                    <ListItemText
                      className={'primary-txt set-opacity'}
                      primary={
                        list.brand && (
                          <Typography
                            variant='prodLabel1'
                            className='brand-name'
                          >
                            {list.brand}
                          </Typography>
                        )
                      }
                      secondary={
                        <React.Fragment>
                          <Typography
                            variant='body2'
                            className='secondary-text'
                          >
                            {titleAndPrice}
                          </Typography>

                          <CardFooterWrapper>
                            {list.brand ? (
                              <Chip
                                label={
                                  <Typography variant='prodLabel2'>
                                    {list.brand}
                                  </Typography>
                                }
                                className='chip-style'
                              />
                            ) : (
                              'NA'
                            )}
                          </CardFooterWrapper>
                        </React.Fragment>
                      }
                    />
                    <CloseIcon
                      className='close-icon'
                      onClick={() =>
                        list?.title && removeSelectedItem(list?.title)
                      }
                    />
                  </ListItem>
                </div>
              </SelectedCard>
            );
          })}
        </List>
      )}
      <StyledPaper>
        <IconButton type='submit' aria-label='search'>
          <SearchIcon />
        </IconButton>
        <InputBase
          inputRef={searchRef}
          onFocus={() => setShowList(true)}
          onBlur={handlePopupClose}
          placeholder='Search Products'
          inputProps={{ 'aria-label': 'Search Products' }}
          onChange={searchProduct}
          value={textBoxValue}
          fullWidth
          className='input-box'
        />
        {textBoxValue && (
          <CloseIconFilled className='close-filled-icon' onClick={clearItem} />
        )}
      </StyledPaper>
      {showList && (
        <ListViewContainer style={{ zIndex: 1000 }}>
          <Typography variant='body2' className='list-box-title'>
            {textBoxValue.trim()
              ? `${filterList?.length} Results`
              : 'Past Client Recommendations:'}
          </Typography>
          <List id='productsListContainer' className='card-wrapper'>
            <InfiniteScroll
              dataLength={meta.total} //This is important field to render the next data
              next={() => {
                getProducts();
              }}
              hasMore={meta.total > filterList?.length}
              loader={<Loader />}
              scrollableTarget='productsListContainer'
            >
              {filterList?.map((list, i) => {
                const priceInCent = Number(list?.productVariant[0]?.price) || 0;
                const priceInDollar: string = priceInCent
                  ? `$${priceInCent / 100}`
                  : 'NA';
                return (
                  list?.title && (
                    <ListItem
                      key={`list-item-${i}`}
                      onMouseDown={handleSelectItem(list)}
                      className='card-item'
                    >
                      <ListItemAvatar className='list-avatar-set'>
                        <Avatar
                          alt='Product Image'
                          src={
                            list.productImage?.length
                              ? getProductImages(list.productImage)
                              : ''
                          }
                          className={
                            isSelectedProduct(list)
                              ? 'list-avatar-set set-opacity'
                              : 'list-avatar-set'
                          }
                        />
                        {isSelectedProduct(list) && (
                          <TickIcon className='select-icon' />
                        )}
                      </ListItemAvatar>
                      <ListItemText
                        className={
                          isSelectedProduct(list)
                            ? 'primary-txt set-opacity'
                            : 'primary-txt'
                        }
                        primary={
                          <Typography variant='prodLabel1'>
                            {list.brand && list.brand.toUpperCase()}
                          </Typography>
                        }
                        secondary={
                          <React.Fragment>
                            <Typography
                              variant='body2'
                              className='secondary-text'
                            >
                              <Highlighter
                                highlightClassName='text-highlight'
                                searchWords={[textBoxValue]}
                                autoEscape={true}
                                textToHighlight={`${list.title} — ${priceInDollar}`}
                              />
                            </Typography>

                            <CardFooterWrapper>
                              {list?.type ? (
                                <Chip
                                  label={
                                    <Typography variant='prodLabel2'>
                                      {list?.type}
                                    </Typography>
                                  }
                                  className='chip-style'
                                />
                              ) : (
                                'NA'
                              )}
                              <Divider
                                orientation='vertical'
                                className='custom-divider'
                                style={{ marginLeft: '7px' }}
                              />
                              {list?.orderId && <Card className='card-icon1' />}
                              <Typography
                                className='card-footer-date'
                                variant='body2'
                              >
                                {list?.dateOfBought ?? 'NA'}
                              </Typography>
                            </CardFooterWrapper>
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                  )
                );
              })}
            </InfiniteScroll>
          </List>
        </ListViewContainer>
      )}
      <Box className='checkbox-wrapper'>
        {section.elements?.map((element, i) => {
          switch (element.type) {
            case SectionElementTypes.checkbox:
              return (
                <Checkbox
                  {...element}
                  onChangeHandler={updateFormState}
                  key={`item-${i}`}
                  error={
                    formState.errors ? !!formState.errors[element.id] : false
                  }
                  selectedValue={
                    prefilledData ? prefilledData[element.id] : null
                  }
                />
              );
            case SectionElementTypes.radio:
              return (
                <RadioButton
                  {...element}
                  onChangeHandler={updateFormState}
                  key={`item-${i}`}
                  error={
                    formState.errors ? !!formState.errors[element.id] : false
                  }
                  defaultSelectedValue={
                    prefilledData ? prefilledData[element.id] : null
                  }
                />
              );
            default:
              return null;
          }
        })}
      </Box>
      <ButtonGroup prefilledData={prefilledData} />
    </>
  );
};

const ButtonGroup = ({ prefilledData }: Partial<FormState>) => {
  const { formState, formDispatch } = useContext<TFormContext>(FormContext);
  const noteForCustomer = prefilledData?.note
    ?.filter((val: Partial<FormState>) => val?.type === 'note_for_customer')
    .slice(0, 1);
  const noteForCustomerText = useMemo(() => {
    const noteText =
      noteForCustomer?.length != 0
        ? noteForCustomer?.map((data: Note) => data.text).toString()
        : '';
    formDispatch(updateForm({ [CLIENT_MESSAGE_TEXTAREA.id]: noteText }));
    return noteText;
  }, [prefilledData?.note]);
  const updateFormState = (data: FormState) => {
    formDispatch(updateForm(data));
  };

  return (
    <>
      <TextArea
        {...CLIENT_MESSAGE_TEXTAREA}
        onChangeHandler={updateFormState}
        error={
          formState.errors
            ? !!formState.errors[CLIENT_MESSAGE_TEXTAREA.id]
            : false
        }
        selectedValue={noteForCustomerText}
      />
    </>
  );
};

export default ClientFollowUp;
