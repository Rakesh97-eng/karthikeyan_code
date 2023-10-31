import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import { ClientCardListWrapper } from './styles';
import { FC, useState, useEffect } from 'react';
import StyledButton from '../common/Button';

interface IClientCard {
  dataList: IData[];
  buttonValue: string;
  handleClick: (id: string) => void;
}
export interface IData {
  head: string;
  subText: string;
  clickId: string;
}
const ClientCard: FC<IClientCard> = ({
  dataList,
  buttonValue,
  handleClick,
}) => {
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [data, setData] = useState(dataList.slice(0, 3));
  const handleChangePage = async (event: unknown, newPage: number) => {
    setPage(newPage);
    setData(dataList.slice(newPage * rowsPerPage, (newPage + 1) * rowsPerPage));
    setIsLastPage((dataList.length <= ((newPage + 1) * rowsPerPage)));
  };

  useEffect(() => {
    setData(dataList.slice(0, 3));
    setIsLastPage((dataList.length < ((page + 1) * rowsPerPage)));
  }, [dataList]);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <ClientCardListWrapper>
      <TableContainer>
        <Table stickyHeader aria-label='sticky table'>
          <TableBody>
            {data &&
              data?.map((list, i) => {
                return (
                  <TableRow
                    hover
                    role='checkbox'
                    tabIndex={-1}
                    key={`client-list-${i}`}
                  >
                    <TableCell>
                      <Typography
                        variant='body1'
                        color={'var(--neutral-primary)'}
                        component='div'
                      >
                        <strong>{list.head}</strong>
                      </Typography>
                      <Typography variant='body3' fontWeight={400}>
                        {list.subText}
                      </Typography>
                    </TableCell>

                    <TableCell className='button'>
                      <StyledButton
                        variant='outlined'
                        value={buttonValue}
                        onClick={() => handleClick(list.clickId)}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>

      {dataList && dataList?.length >= rowsPerPage ? (
        <>
          <TablePagination
            component='div'
            count={dataList?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[]}
            backIconButtonProps={{
              style: {
                color:
                  page === 0
                    ? 'var(--neutral-secondary-darker)'
                    : 'var(--neutral-primary)',
                border: '1.5px solid var(--neutral-secondary-darker)',
                borderRadius: '4px',
                marginRight: '12px',
              },
            }}
            nextIconButtonProps={{
              style: {
                color:
                  isLastPage
                    ? 'var(--neutral-secondary-darker)'
                    : 'var(--neutral-primary)',
                border: '1.5px solid var(--neutral-secondary-darker)',
                borderRadius: '4px',
              },
            }}
          />
        </>
      ) : (
        <></>
      )}
    </ClientCardListWrapper>
  );
};

export default ClientCard;
