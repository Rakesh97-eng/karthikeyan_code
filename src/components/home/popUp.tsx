import { Typography } from '@mui/material';
import StyledButton from '../common/Button';
import { EmptyPopUp, PopUpBodyWrapper, PopUpHeaderWrapper } from './styles';
import BottomCurve from '../../assets/icons/bottom-curve-light.svg';
import ClipBoard from '../../assets/icons/clip-board.svg';
import { ReactComponent as CloseIcon } from '../../assets/icons/X-icon.svg';
import { FC, useContext } from 'react';
import { TimeBlock } from '../../types/services/TimeBlock';
import { Appointment } from '../../types/services/Appointment';
import { useHistory } from 'react-router-dom';
import { FORMAT_DATE, DEFAULT_TIMEZONE } from '../../constants/appConstants';
import { HomeContext } from '../../providers/context/HomeContext';
import moment from 'moment-timezone';

interface IAppointmentPopUp {
  handleClose: () => void;
  appointmentData?: Appointment;
  breakTimeData?: TimeBlock;
}
export const AppointmentPopUp: FC<IAppointmentPopUp> = ({
  handleClose,
  appointmentData,
}) => {
  const history = useHistory();
  const { selectedLocation } = useContext(HomeContext);

  const navigate = () => {
    history.push(`/clients/${appointmentData?.customerId}`);
  };

  const customerName = appointmentData?.customer?.firstName
    ? `${appointmentData?.customer?.firstName} ${appointmentData?.customer?.lastName}`
    : appointmentData?.customer?.name;
  const internalNotes = appointmentData?.note?.filter(
    (n) => n.context == 'appointment' && (n.type == '' || n.type == null)
  );

  return (
    <>
      <PopUpHeaderWrapper backgroundColor='var(--neutral-tertiary)'>
        <div className='date-close-wrapper'>
          <Typography
            variant='label'
            color='var(--neutral-primary)'
            letterSpacing={'0.03em'}
          >
            {moment
              .tz(
                appointmentData?.startAt || new Date(),
                selectedLocation?.tz || DEFAULT_TIMEZONE
              )
              .format(FORMAT_DATE.TIME_MIN)}{' '}
            -{' '}
            {moment
              .tz(
                appointmentData?.endAt || new Date(),
                selectedLocation?.tz || DEFAULT_TIMEZONE
              )
              .format(FORMAT_DATE.TIME_MIN)}
          </Typography>{' '}
          <CloseIcon className='close-icon' onClick={handleClose} />
        </div>
        <div className='client-name-wrapper'>
          <Typography variant='h2' color='var(--neutral-primary)'>
            {customerName}
            {appointmentData?.tag?.map((tag) => {
              return <>{tag.symbol} </>;
            })}
          </Typography>
        </div>
      </PopUpHeaderWrapper>
      <img src={BottomCurve} alt='BottomCurve' />
      <PopUpBodyWrapper>
        {internalNotes?.map((internalNote, index) => {
          return (
            <div className='content' key={`internalNote-${index}`}>
              <img src={ClipBoard} alt='ClipBoard' />
              <Typography variant='body1' color='var(--neutral-primary)'>
                <strong>Internal Note: </strong> {internalNote.text}
              </Typography>
            </div>
          );
        })}

        <StyledButton
          variant='outlined'
          value='View Profile'
          className='btn-style'
          onClick={navigate}
        />
      </PopUpBodyWrapper>
    </>
  );
};
export const AppointmentEmptyPopUp: FC<IAppointmentPopUp> = ({
  handleClose,
  breakTimeData,
}) => {
  const { selectedLocation } = useContext(HomeContext);

  return (
    <>
      <PopUpHeaderWrapper backgroundColor='var(--neutral-secondary)'>
        <div className='date-close-wrapper'>
          <Typography variant='label' color='var(--neutral-primary)'>
            {moment
              .tz(
                breakTimeData?.startAt || new Date(),
                selectedLocation?.tz || DEFAULT_TIMEZONE
              )
              .format(FORMAT_DATE.TIME_MIN)}{' '}
            -{' '}
            {moment
              .tz(
                breakTimeData?.endAt || new Date(),
                selectedLocation?.tz || DEFAULT_TIMEZONE
              )
              .format(FORMAT_DATE.TIME_MIN)}
          </Typography>{' '}
          <CloseIcon className='close-icon' onClick={handleClose} />
        </div>
        <Typography
          variant='h2'
          color='var(--neutral-primary)'
          className='client-heading'
        >
          {breakTimeData?.title}
        </Typography>
      </PopUpHeaderWrapper>
      <EmptyPopUp>
        <Typography variant='body3' color='var(--neutral-primary-light)'>
          {breakTimeData?.reason || ''}
        </Typography>
      </EmptyPopUp>
    </>
  );
};
