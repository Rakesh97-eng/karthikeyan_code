import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
  Stack,
} from '@mui/material';
import { ClientListWrapper } from './styles';
import { FC, useState } from 'react';
import { Customer } from '../../types/services/Customer';
import { useHistory } from 'react-router-dom';
import { PaginationMeta } from '../../types/services/Common';
import { ReactComponent as WarningIcon } from '../../assets/icons/warning-red-icon.svg';
import { CLIENT_LOOK_UP } from '../../constants/enums';
import { duplicateEmail } from '../../utils/helper-functions/common';
interface IClientList {
  clientList: Customer[];
  pagination: PaginationMeta | undefined;
  getAllClients: (data: number) => void;
}

const ClientList: FC<IClientList> = ({
  clientList,
  pagination,
  getAllClients,
}) => {
  const [page, setPage] = useState(pagination ? pagination?.page - 1 : 0);
  const [rowsPerPage, setRowsPerPage] = useState(50);

  const handleChangePage = async (event: unknown, newPage: number) => {
    setPage(newPage);
    getAllClients(newPage + 1);
  };
  const history = useHistory();
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleClick = (id: string) => {
    history.push(`/clients/${id}`);
  };

  const getEmail = (clientDetail: Customer) => {
    if (clientDetail.originalEmail) {
      return (
        <Typography variant='body1' fontWeight={400} className='textContainer'>
          {clientDetail.originalEmail}
        </Typography>
      );
    }
    if (clientDetail.email && !duplicateEmail(clientDetail.email)) {
      return (
        <Typography variant='body1' fontWeight={400} className='textContainer'>
          {clientDetail.email}
        </Typography>
      );
    }
    return (
      <Typography
        variant='body1'
        color='var(--negative-primary)'
        className='warning-text'
      >
        {CLIENT_LOOK_UP.EMAIL_MISSING}
        <WarningIcon className='warning-icon' />
      </Typography>
    );
  };

  return (
    <ClientListWrapper>
      <Paper className='page' sx={{ overflow: 'hidden' }}>
        <TableContainer>
          <Table stickyHeader aria-label='sticky table'>
            <TableBody>
              {clientList?.map((list, i) => {
                return (
                  <TableRow
                    hover
                    role='checkbox'
                    tabIndex={-1}
                    key={`client-list-${i}`}
                    onClick={() => handleClick(list.id)}
                  >
                    <TableCell>
                      <Stack direction='row' justifyContent='space-between'>
                        <Stack>
                          <Typography
                            variant='body1'
                            color={'var(--neutral-primary)'}
                            fontWeight={700}
                            className='textContainer'
                          >
                            {list?.firstName && list?.lastName
                              ? `${list?.firstName} ${list?.lastName}`
                              : list?.name || 'NA'}
                          </Typography>
                          {getEmail(list)}
                          {list?.phone ? (
                            <Typography variant='body1' fontWeight={400}>
                              {list?.phone}
                            </Typography>
                          ) : (
                            <>
                              <Typography
                                variant='body1'
                                color='var(--negative-primary)'
                                className='warning-text'
                              >
                                {CLIENT_LOOK_UP.PHONE_NUMBER_MISSING}
                                <WarningIcon className='warning-icon' />
                              </Typography>
                            </>
                          )}
                        </Stack>
                        <Stack
                          justifyContent='flex-start'
                          alignItems='flex-end'
                        >
                          {duplicateEmail(list?.email) !== 'Missing Email' &&
                          duplicateEmail(list?.email) ? (
                            <Typography className='duplicate-label'>
                              DUPLICATE
                            </Typography>
                          ) : (
                            <></>
                          )}
                        </Stack>
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        {pagination && pagination?.total > 50 ? (
          <TablePagination
            component='div'
            count={pagination ? pagination?.total : 0}
            rowsPerPage={rowsPerPage}
            page={page ?? 0}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[]}
          />
        ) : (
          <></>
        )}
      </Paper>
    </ClientListWrapper>
  );
};
export default ClientList;
