import { Typography } from '@mui/material';
import { FC } from 'react';
import { ClientName, LocationDateWrapper, PastTRClientHeader } from './styles';
import { ReactComponent as User } from '../../../assets/icons/user.svg';
import { ReactComponent as Hand } from '../../../assets/icons/hand-left.svg';
import { ReactComponent as Pencil } from '../../../assets/icons/editor-pencil.svg';
import { ReactComponent as LocationIcon } from '../../../assets/icons/location-pointer.svg';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { DEFAULT_TIMEZONE, FORMAT_DATE } from '../../../constants/appConstants';
import moment from 'moment-timezone';
dayjs.extend(relativeTime);

interface Props {
  firstName: string;
  lastName: string;
  treatedAt: Date | null;
  treatedBy: string;
  locationName: string | null;
  locationTZ: string | null;
  lastEditedBy: string | null;
  lastEditedAt: Date | null;
}
const ClientInfoHeader: FC<Props> = ({
  firstName,
  lastName,
  treatedAt,
  treatedBy,
  locationName,
  locationTZ,
  lastEditedBy,
  lastEditedAt,
}) => {
  return (
    <PastTRClientHeader>
      <ClientName variant='h2'>
        {moment.tz(treatedAt, locationTZ || DEFAULT_TIMEZONE).format(FORMAT_DATE.FULL_DATE)}
      </ClientName>
      <LocationDateWrapper className='past-tr'>
        <div className='inner-wrapper'>
          <User className='icon' />
          <Typography variant='body1'>{`${firstName} ${lastName}`}</Typography>
        </div>
        <div className='inner-wrapper'>
          <Hand className='icon' />
          <Typography variant='body1'>{treatedBy}</Typography>
        </div>
        <div className='inner-wrapper'>
          <LocationIcon className='icon' />
          <Typography variant='body1'>{locationName}</Typography>
        </div>
      </LocationDateWrapper>
      <LocationDateWrapper className='past-tr'>
        <div className='inner-wrapper'>
          <Pencil className='icon pensilIcon' />
          {lastEditedBy ||
            (lastEditedAt && (
              <Typography variant='body2'>
                {dayjs().to(dayjs(lastEditedAt))}{' '}
                {lastEditedBy ? `by ${lastEditedBy}` : null}.
              </Typography>
            ))}
        </div>
      </LocationDateWrapper>
    </PastTRClientHeader>
  );
};

export default ClientInfoHeader;
