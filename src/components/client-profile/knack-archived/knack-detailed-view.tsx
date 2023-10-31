import { Box, IconButton, Toolbar } from '@mui/material';
import { FC } from 'react';
import dayjs from 'dayjs';
import {
  HeaderTitle,
  TreatmentRecordHeaderAppBar,
} from '../../treatment-record/treatment-record-header/styles';
import { ReactComponent as XIcon } from '../../../assets/icons/X-icon.svg';
import {
  KnackRecordColumn,
  KnackRecordRow,
  KnackRecordWrapper,
} from './styles';
import { KNACK_DATA_KEYS } from '../../../constants/appConstants';
import { Treatment } from '../../../types/services/Treatment';

interface Props {
  date: Date | null;
  data: Treatment;
  toggleKnackRecord: () => void;
}
const KnackDetailedView: FC<Props> = ({ date, data, toggleKnackRecord }) => {
  const allDataKeys = KNACK_DATA_KEYS;
  return (
    <Box style={{ width: '100%', overflowX: 'auto' }}>
      <TreatmentRecordHeaderAppBar
        position='static'
        style={{ minWidth: '513px' }}
      >
        <Toolbar>
          <HeaderTitle>{dayjs(date).format('MMM D, YYYY')}</HeaderTitle>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
            className='dismiss-icon'
            onClick={toggleKnackRecord}
          >
            <XIcon />
          </IconButton>
        </Toolbar>
      </TreatmentRecordHeaderAppBar>
      <KnackRecordWrapper>
        {allDataKeys.map((key: string, index: number) => {
          if (key === 'treatedBy') {
            return (
              <>
                <KnackRecordRow key={`keyRow-${index}`}>
                  <KnackRecordColumn>{key}</KnackRecordColumn>
                  <KnackRecordColumn>
                    {data?.treatedByStaff?.firstName}{' '}
                    {data?.treatedByStaff?.lastName}
                  </KnackRecordColumn>
                </KnackRecordRow>
              </>
            );
          }
          if (key === 'appointmentTime') {
            return (
              <>
                <KnackRecordRow key={`keyRow-${index}`}>
                  <KnackRecordColumn>{key}</KnackRecordColumn>
                  <KnackRecordColumn>
                    {dayjs(data.appointmentTime).format('DD/M/YY h:mm')}
                  </KnackRecordColumn>
                </KnackRecordRow>
              </>
            );
          }
          if (key === 'products') {
            return (
              <KnackRecordRow key={`keyRow-${index}`}>
                <KnackRecordColumn>{key}</KnackRecordColumn>
                <KnackRecordColumn>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: `${data[key as keyof Treatment]}`,
                    }}
                  />
                </KnackRecordColumn>
              </KnackRecordRow>
            );
          }
          const ifDataIsTrue =
            data[key as keyof Treatment] == true
              ? 'Yes'
              : data[key as keyof Treatment];
          const ifDataIsFalse =
            data[key as keyof Treatment] == false ? 'No' : 'NA';
          const knackRecordDataValue = data[key as keyof Treatment]
            ? ifDataIsTrue
            : ifDataIsFalse;
          return (
            <KnackRecordRow key={`keyRow-${index}`}>
              <KnackRecordColumn>{key}</KnackRecordColumn>
              <KnackRecordColumn>{knackRecordDataValue}</KnackRecordColumn>
            </KnackRecordRow>
          );
        })}
      </KnackRecordWrapper>
    </Box>
  );
};

export default KnackDetailedView;
