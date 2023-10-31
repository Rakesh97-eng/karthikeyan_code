import { IconButton, Typography } from '@mui/material';
import { FC, useState } from 'react';
import {
  AppointmentsDialogWrapper,
  ButtonWrapper,
  PrimaryButton,
} from './styles';
import CloseIcon from '../../../assets/icons/X-icon.svg';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import isYesterday from 'dayjs/plugin/isYesterday';
import RadioButtonBody from '../../common/RadioButton/RadioButtonBody';
import { Appointment } from '../../../types/services/Appointment';
import { DEFAULT_TIMEZONE, FORMAT_DATE } from '../../../constants/appConstants';
import moment from 'moment-timezone';

dayjs.extend(isToday);
dayjs.extend(isYesterday);

interface Props {
  appointments: Appointment[];
  onClose: () => void;
  createTreatmentRecord?: (selectedAppointment: string) => void;
}

const getLabelFromDate = (date: Date, tz: string): string => {
  let dayString;

  if (dayjs(date).isToday()) {
    dayString = 'Today';
  } else if (dayjs(date).isYesterday()) {
    dayString = 'Yesterday';
  } else {
    dayString = dayjs(date).format(FORMAT_DATE.DISPLAY_DAY);
  }

  const getTime = moment
    .tz(date, tz || DEFAULT_TIMEZONE)
    .format(FORMAT_DATE.TIME_MIN);
  return `${dayString} @ ${getTime}`;
};

export const AppointmentsPopup: FC<Props> = ({
  appointments,
  onClose,
  createTreatmentRecord,
}) => {
  const [selectedAppointment, setSelectedAppointment] = useState<string>();

  const ModalTopButtonWrapper = () => {
    return (
      <ButtonWrapper>
        <IconButton onClick={onClose}>
          <img src={CloseIcon} alt='popup close' />
        </IconButton>
      </ButtonWrapper>
    );
  };

  return (
    <AppointmentsDialogWrapper>
      <ModalTopButtonWrapper />
      <Typography variant='h3' className='header'>
        {appointments.length
          ? `Which Appointment is this for?`
          : `No Appointment Found`}
      </Typography>
      <Typography
        variant='body1'
        className='content'
        color={
          appointments.length
            ? 'var(--neutral-primary-light)'
            : 'var(--neutral-primary)'
        }
      >
        {appointments.length
          ? `Select one in order to proceed.`
          : `Double check if client has an appointment. If you believe there is a technical error, please contact your manager.`}
      </Typography>
      {appointments.length
        ? appointments.map((appointment) => {
            return (
              <>
                {appointment.startAt && (
                  <RadioButtonBody
                    key={appointment.id}
                    id={appointment.id}
                    name={'appointments'}
                    label={getLabelFromDate(
                      appointment.startAt,
                      appointment.location.tz
                    )}
                    mandatory={false}
                    fontWeight={400}
                    value={appointment.id}
                    checked={selectedAppointment === appointment.id}
                    onChange={(e) => setSelectedAppointment(e.target.value)}
                    labelClassName='appointments-radio-label'
                  />
                )}
              </>
            );
          })
        : null}
      {appointments.length ? (
        <PrimaryButton
          variant='contained'
          onClick={() => {
            selectedAppointment &&
              createTreatmentRecord &&
              createTreatmentRecord(selectedAppointment);
            onClose();
          }}
          disabled={selectedAppointment === undefined ? true : false}
        >
          <Typography variant='btn'>Continue</Typography>
        </PrimaryButton>
      ) : (
        <PrimaryButton variant='contained' onClick={onClose}>
          <Typography variant='btn'>Ok</Typography>
        </PrimaryButton>
      )}
    </AppointmentsDialogWrapper>
  );
};
