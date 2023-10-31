import { Paper, Typography } from '@mui/material';
import { FC, useState, useEffect, useContext } from 'react';
import { IClientCard } from '../../router/pages/Home';
import ClientCard from './clientCard';
import MissingInTakeIcon from '../../assets/icons/missing-intake-form.svg';
import { BodyWrapper, HeaderWrapper } from './styles';
import {
  INTAKE_BASIC_SECTION_ROUTE,
  SHOP,
} from '../../constants/intakeConstants';
import {
  Appointment,
  AppointmentRelations,
} from '../../types/services/Appointment';
import {
  defaultErrorHandler,
  handleAxiosError,
} from '../../utils/helper-functions/handleError';
import { AppointmentService } from '../../services/Appointment';
import { HomeContext } from '../../providers/context/HomeContext';
import { AxiosError } from 'axios';
import moment from 'moment-timezone';
import { IData } from '../../components/home/clientCard';
import {
  APPOINTMENT_STATES,
  DEFAULT_TIMEZONE,
  FORMAT_DATE,
} from '../../constants/appConstants';
import { ToastContext } from '../../providers/context/toastContext';

const IntakeForm: FC<IClientCard> = ({ buttonValue }) => {
  const { selectedLocation } = useContext(HomeContext);
  const [missingDataList, setMissingDataList] = useState<IData[]>([]);
  const { showErrorDialog } = useContext(ToastContext);
  const handleStart = (id: string) => {
    const win: Window | null = window.open(
      `${SHOP}${INTAKE_BASIC_SECTION_ROUTE}?cid=${id}`,
      '_blank'
    );
    if (win) {
      win.focus();
    }
  };

  //this is intentional
  const sDT = moment
    .tz(new Date(), selectedLocation?.tz || DEFAULT_TIMEZONE)
    .startOf('date')
    .toISOString();
  const eDT = moment
    .tz(new Date(), selectedLocation?.tz || DEFAULT_TIMEZONE)
    .add(1, 'days')
    .endOf('date')
    .toISOString();

  let allMissingIntake: Appointment[] = [];
  const getAllMissingIntake = async (pageNo: number) => {
    try {
      const appointmentsData = await AppointmentService.getAppointments(
        { number: pageNo, size: 50 },
        {
          location_id: selectedLocation?.id,
          start_at: {
            gte: sDT,
            lte: eDT,
          },
          customer: {
            is_intake_submitted: false,
          },
          state: {
            ne: APPOINTMENT_STATES.CANCELLED,
          },
        },

        {
          appointment: 'id,customer_id,start_at',
          customer: 'id,first_name,last_name,name,is_intake_submitted',
          [AppointmentRelations.AppointmentService]: 'id',
          [AppointmentRelations.AppointmentServiceStaff]:
            'id,first_name,last_name,name',
        },
        [
          AppointmentRelations.Customer,
          AppointmentRelations.AppointmentServiceStaff,
          AppointmentRelations.AppointmentService,
        ]
      );
      allMissingIntake = [...allMissingIntake, ...appointmentsData.data];

      const currentSize =
        appointmentsData?.meta?.page * appointmentsData?.meta?.size;
      if (appointmentsData?.meta.total > currentSize) {
        setTimeout(() => {
          getAllMissingIntake(pageNo + 1);
        }, 100);
      } else {
        allMissingIntake.sort(function (a, b) {
          if (a.startAt == b.startAt) {
            return 0;
          } else if (a.startAt > b.startAt) {
            return 1;
          }
          return -1;
        });
        const tempMissingIntakeList: IData[] = [];
        allMissingIntake.forEach((item) => {
          const customerName = item.customer?.firstName
            ? `${item.customer?.firstName} ${item.customer?.lastName}`
            : item.customer?.name;

          const staffName = item.appointmentService?.staff
            ? `${item.appointmentService?.staff?.firstName} ${item.appointmentService?.staff?.lastName}`
            : '';

          const subTextDate =
            moment
              .tz(item?.startAt, selectedLocation?.tz || DEFAULT_TIMEZONE)
              .format(FORMAT_DATE.DAY) ===
            moment
              .tz(new Date(), selectedLocation?.tz || DEFAULT_TIMEZONE)
              .format(FORMAT_DATE.DAY)
              ? 'Today'
              : 'Tomorrow';

          const subTextTime = moment
            .tz(item?.startAt, selectedLocation?.tz || DEFAULT_TIMEZONE)
            .format(FORMAT_DATE.TIME_MIN);

          let subText = `${subTextDate} @ ${subTextTime}`;
          subText += staffName != '' ? ` with ${staffName}` : '';

          tempMissingIntakeList.push({
            head: customerName || 'N/A',
            subText: subText,
            clickId: item.customer?.id,
          });
        });
        setMissingDataList(tempMissingIntakeList);
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
      getAllMissingIntake(1);
    }
  }, [selectedLocation]);

  if (missingDataList.length > 0) {
    return (
      <BodyWrapper>
        <Paper sx={{ overflow: 'hidden' }}>
          <HeaderWrapper>
            <object
              type='image/svg+xml'
              data={MissingInTakeIcon}
              className='icon'
            />
            <div className='inner-wrapper'>
              <Typography
                variant='h3'
                component={'h3'}
                color='var(--neutral-primary)'
                fontWeight={400}
              >
                Missing Intake Forms{' '}
                <Typography
                  variant='body1'
                  component={'span'}
                  color='var(--neutral-primary)'
                  fontWeight={400}
                >
                  ({missingDataList.length})
                </Typography>
              </Typography>
            </div>
          </HeaderWrapper>

          <ClientCard
            dataList={missingDataList}
            buttonValue={buttonValue}
            handleClick={handleStart}
          />
        </Paper>
      </BodyWrapper>
    );
  }

  return <></>;
};

export default IntakeForm;
