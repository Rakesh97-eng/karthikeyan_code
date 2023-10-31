import { Paper, Typography } from '@mui/material';
import { FC, useState, useEffect, useContext } from 'react';
import { IClientCard } from '../../router/pages/Home';
import ClientCard from './clientCard';
import TreatmentWrapUp from '../../assets/icons/treatment-wrap-up.svg';
import { BodyWrapper, HeaderWrapper } from './styles';

import {
  TreatmentWithRelationships,
  TreatmentRelation,
} from '../../types/services/Treatment';
import {
  defaultErrorHandler,
  handleAxiosError,
} from '../../utils/helper-functions/handleError';
import { TreatmentService } from '../../services/Treatment';
import { HomeContext } from '../../providers/context/HomeContext';
import { AxiosError } from 'axios';
import moment from 'moment-timezone';
import { IData } from '../../components/home/clientCard';
import { DEFAULT_TIMEZONE, FORMAT_DATE } from '../../constants/appConstants';
import { useHistory } from 'react-router-dom';
import { ToastContext } from '../../providers/context/toastContext';

const IncompleteDraft: FC<IClientCard> = ({ buttonValue }) => {
  const history = useHistory();
  const { selectedLocation } = useContext(HomeContext);
  const [incompleteDraftList, setIncompleteDraftList] = useState<IData[]>([]);
  const { showErrorDialog } = useContext(ToastContext);
  const handleEdit = (id: string) => {
    history.push(`/clients/${id}`);
  };

  //this is intentional
  const today = moment
    .tz(new Date(), selectedLocation?.tz || DEFAULT_TIMEZONE)
    .endOf('date')
    .toISOString();
  const dayBeforeYesterday = moment
    .tz(new Date(), selectedLocation?.tz || DEFAULT_TIMEZONE)
    .subtract(2, 'days')
    .startOf('date')
    .toISOString();

  let allIncompleteDraft: TreatmentWithRelationships[] = [];
  const getAllIncompleteDraft = async (pageNo: number) => {
    try {
      const drafts = await TreatmentService.getTreatments(
        { number: pageNo, size: 50 },
        {
          created_at: {
            gte: dayBeforeYesterday,
            lte: today,
          },
          location_id: selectedLocation?.id,
          is_submitted: false,
        },

        {
          // will update as issue will be fixed
          // treatment: 'id,appointment_time,is_submitted,customer_id,location_id',
          customer: 'id,first_name,last_name,name',
          [TreatmentRelation.treatedByStaff]: 'id,first_name,last_name,name',
        },
        [
          TreatmentRelation.treatedByStaff,
          TreatmentRelation.customer,
          TreatmentRelation.note,
        ]
      );
      allIncompleteDraft = [...allIncompleteDraft, ...drafts.data];

      const currentSize =
        (drafts?.meta?.page || 1) * (drafts?.meta?.size || 10);
      if (drafts?.meta.total > currentSize) {
        setTimeout(() => {
          getAllIncompleteDraft(pageNo + 1);
        }, 100);
      } else {
        allIncompleteDraft.sort(function (a, b) {
          if (a.appointmentTime == b.appointmentTime) {
            return 0;
          } else if (a.appointmentTime < b.appointmentTime) {
            return 1;
          }
          return -1;
        });
        const dateToday = moment
          .tz(new Date(), selectedLocation?.tz || DEFAULT_TIMEZONE)
          .endOf('date')
          .format(FORMAT_DATE.DISPLAY_DAY);

        const dateYesterday = moment
          .tz(new Date(), selectedLocation?.tz || DEFAULT_TIMEZONE)
          .subtract(1, 'days')
          .startOf('date')
          .format(FORMAT_DATE.DISPLAY_DAY);

        const incompleteDraftList: IData[] = [];
        allIncompleteDraft.forEach((item) => {
          const customerName = item.customer?.firstName
            ? `${item.customer?.firstName} ${item.customer?.lastName}`
            : item.customer?.name;

          const staffName = item.treatedByStaff?.firstName
            ? `${item.treatedByStaff?.firstName} ${item.treatedByStaff?.lastName}`
            : item.treatedByStaff?.name;

          const appointmentDate = moment
            .tz(item?.appointmentTime, selectedLocation?.tz || DEFAULT_TIMEZONE)
            .format(FORMAT_DATE.DISPLAY_DAY);

          let subTextDate = '';
          if (appointmentDate === dateToday) {
            subTextDate = 'Today';
          } else if (appointmentDate === dateYesterday) {
            subTextDate = 'Yesterday';
          } else {
            subTextDate = appointmentDate;
          }
          const appointmentTime = moment
            .tz(item?.appointmentTime, selectedLocation?.tz || DEFAULT_TIMEZONE)
            .format(FORMAT_DATE.TIME_MIN);

          let subText = `${subTextDate} @ ${appointmentTime}`;
          subText += staffName != '' ? ` with ${staffName}` : '';

          incompleteDraftList.push({
            head: customerName || 'N/A',
            subText: subText || 'N/A',
            clickId: item.customer?.id,
          });
        });
        setIncompleteDraftList(incompleteDraftList);
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

  useEffect(() => {
    if (selectedLocation?.id) {
      getAllIncompleteDraft(1);
    }
  }, [selectedLocation]);

  if (incompleteDraftList.length > 0) {
    return (
      <BodyWrapper>
        <Paper sx={{ overflow: 'hidden' }}>
          <HeaderWrapper>
            <object
              type='image/svg+xml'
              data={TreatmentWrapUp}
              className='icon'
            />
            <div className='inner-wrapper'>
              <Typography
                variant='h3'
                component={'h3'}
                color='var(--neutral-primary)'
                fontWeight={400}
              >
                Incomplete Drafts{' '}
                <Typography
                  variant='body1'
                  component={'span'}
                  color='var(--neutral-primary)'
                  fontWeight={400}
                >
                  ({incompleteDraftList.length})
                </Typography>
              </Typography>
            </div>
          </HeaderWrapper>
          <ClientCard
            dataList={incompleteDraftList}
            buttonValue={buttonValue}
            handleClick={handleEdit}
          />
        </Paper>
      </BodyWrapper>
    );
  }

  return <></>;
};

export default IncompleteDraft;
