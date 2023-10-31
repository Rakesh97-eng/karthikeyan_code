import { Typography } from '@mui/material';
import { FC, useRef, useState } from 'react';
import {
  HeaderDateInfoRow,
  HeaderSubInfoRow,
  PastTreatmentContainer,
  PastTreatmentHeader,
  SubInfoBox,
} from '../past-treatment/styles';
import dayjs from 'dayjs';
import { TreatmentRecordDialog } from '../../treatment-record/styles';
import KnackDetailedView from './knack-detailed-view';
import { Treatment } from '../../../types/services/Treatment';

interface Props {
  date: Date | null;
  data: Treatment;
}
const KnackArchived: FC<Props> = ({ date, data }) => {
  const ref = useRef<HTMLElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleKnackRecord = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <PastTreatmentContainer onClick={() => toggleKnackRecord()}>
        <PastTreatmentHeader
          ref={ref}
          containerWidth={ref.current ? ref.current?.offsetHeight : 0}
          backgroundColor={'var(--wheat-75)'}
        >
          <HeaderDateInfoRow>
            <div className='date-and-moreInfo'>
              <Typography
                variant='h3'
                color={'var(--neutral-primary)'}
                fontSize={'24px'}
                lineHeight={'32px'}
              >
                {dayjs(date).format('MMM D, YYYY')}
              </Typography>
            </div>
          </HeaderDateInfoRow>

          <HeaderSubInfoRow>
            <SubInfoBox className='subInfoBox'>
              <Typography variant='body1' color={'var(--neutral-primary)'}>
                Knack treatment record
              </Typography>
            </SubInfoBox>
          </HeaderSubInfoRow>
        </PastTreatmentHeader>
      </PastTreatmentContainer>
      {isOpen && (
        <TreatmentRecordDialog
          open={isOpen}
          onClose={toggleKnackRecord}
          fullWidth
          maxWidth='md'
          className='treatment-record-dialog'
        >
          <KnackDetailedView
            data={data}
            date={date}
            toggleKnackRecord={toggleKnackRecord}
          />
        </TreatmentRecordDialog>
      )}
    </>
  );
};

export default KnackArchived;
