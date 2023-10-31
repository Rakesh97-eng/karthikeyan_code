import { Grid, IconButton, InputBase, Typography } from '@mui/material';
import {
  ClientLookUpContainer,
  ClientLookUpWrapper,
  StyledPaper,
} from './styles';
import BookOpen from '../../assets/images/client-look-up/book.png';
import { ReactComponent as SearchIcon } from '../../assets/icons/search-icon.svg';
import { useContext, useEffect, useState } from 'react';
import { Customer } from '../../types/services/Customer';
import ClientList from './clientList';
import { AxiosError } from 'axios';
import { CustomerService } from '../../services/Customer';
import {
  defaultErrorHandler,
  handleAxiosError,
} from '../../utils/helper-functions/handleError';
import { PaginationMeta } from '../../types/services/Common';
import { ReactComponent as CloseIconFilled } from '../../assets/icons/X-icon-filled.svg';
import { StyledCircularProgress } from '../../containers/layout.styles';
import { EmptyList } from '../common/empty-list';
import { ToastContext } from '../../providers/context/toastContext';
import useDebounce from '../../utils/helper-functions/useDebounce';

const ClientLookUp = () => {
  const [textBoxValue, setTextBoxValue] = useState<string>('');
  const [clients, setClients] = useState<Customer[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [filterList, setFilterList] = useState<Customer[]>();
  const [paginationData, setPaginationData] = useState<
    PaginationMeta | undefined
  >();
  const { showErrorDialog } = useContext(ToastContext);
  const searchQuery = useDebounce(textBoxValue, 800);
  const getAllClients = async (newPage: number) => {
    setLoading(true);
    try {
      const clientsData = await CustomerService.getAllCustomers(
        { number: newPage, size: 50 },
        { customer: 'id,first_name,last_name,name,email,phone,created_at,original_email' },
        { q: textBoxValue }
      );
      setClients(clientsData?.data);
      setFilterList(clientsData?.data);
      setPaginationData(clientsData?.meta);
    } catch (error) {
      if (error instanceof AxiosError) {
        showErrorDialog(error?.message);
        handleAxiosError(error);
      } else if (error instanceof Error) {
        showErrorDialog(error?.message);
        defaultErrorHandler(error.message);
      }
    }
    setLoading(false);
  };

  const searchProduct = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextBoxValue(event.target.value.toLowerCase());
  };

  const clearItem = () => {
    setTextBoxValue('');
    setFilterList(clients);
  };

  useEffect(() => {
    getAllClients(1);
  }, [searchQuery]);

  return (
    <ClientLookUpContainer>
      <Grid container>
        <Grid item>
          <ClientLookUpWrapper>
            <img src={BookOpen} alt='book' />
            <Typography variant='h1' className='header-text'>
              Clients
            </Typography>
          </ClientLookUpWrapper>
        </Grid>
        <Grid item>
          <StyledPaper>
            <IconButton type='submit' aria-label='search'>
              <SearchIcon />
            </IconButton>
            <InputBase
              placeholder='Client Name, Email, Phone'
              inputProps={{ 'aria-label': 'Search Client' }}
              onChange={searchProduct}
              value={textBoxValue}
              fullWidth
              className='input-box'
            />
            {textBoxValue && (
              <CloseIconFilled
                className='close-filled-icon'
                onClick={clearItem}
              />
            )}
          </StyledPaper>
        </Grid>
        <Grid item>
          {!loading && (
            <>
              {filterList?.length ? (
                <ClientList
                  clientList={filterList ? filterList : []}
                  pagination={paginationData}
                  getAllClients={getAllClients}
                />
              ) : (
                <EmptyList
                  headerText={'Sorry, no clients found'}
                  subHeaderText={'Try refining your search'}
                />
              )}
            </>
          )}
          {loading && <StyledCircularProgress className='loader' />}
        </Grid>
      </Grid>
    </ClientLookUpContainer>
  );
};

export default ClientLookUp;
