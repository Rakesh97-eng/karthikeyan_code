import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Metric, ProfileTag } from '../../../types/clientProfile';
import {
  Capsule,
  CapsuleWrapper,
  ProfileImageWrapper,
  ContactDetailsWrapper,
} from './styles';
import { duplicateEmail } from '../../../utils/helper-functions/common';
interface Props {
  firstName?: string;
  lastName?: string;
  name?: string;
  tags: ProfileTag[] | [];
  appointmentMetrics: Metric[];
  profileImgUrl: string | undefined;
  email?: string;
  phone: string | undefined;
  originalEmail?: string;
}

const ClientProfileHeader: React.FC<Props> = ({
  firstName,
  lastName,
  name,
  tags,
  profileImgUrl,
  email,
  phone,
  originalEmail,
}) => {
  return (
    <>
      <Box display={'flex'}>
        {profileImgUrl && <ProfileImageWrapper path={profileImgUrl} />}
        <Box>
          <Typography
            variant='h1'
            marginBottom={'8px'}
            color={'var(--neutral-primary)'}
          >
            {firstName && lastName ? `${firstName} ${lastName}` : name || 'NA'}
          </Typography>
          <ContactDetailsWrapper>
            {email && !duplicateEmail(email) ? (
              <Typography>{email}</Typography>
            ) : originalEmail && !duplicateEmail(originalEmail) ? (
              originalEmail
            ) : (
              <Typography className={'missing-email'}>
                {'Missing Email'}
              </Typography>
            )}
            <span>•</span>
            {phone ? (
              <Typography>{phone}</Typography>
            ) : (
              <Typography className={'missing-phone-num'}>
                {'Missing Phone Number'}
              </Typography>
            )}
          </ContactDetailsWrapper>
          <CapsuleWrapper>
            {tags?.map((tag, index) => {
              return (
                <Capsule key={`capsule-${index}`} className='capTube'>
                  <img
                    src={tag.icon}
                    className='capsule-icon'
                    alt={tag.label}
                  />
                  <Typography variant='label'>{tag.label}</Typography>
                </Capsule>
              );
            })}
          </CapsuleWrapper>
          {/* Hide out for MVP */}
          {/* <AppointmentMetricsWrapper className='large-device'>
            {appointmentMetrics.map((metric, index) => {
              return (
                <MetricBox key={`metric-${index}`}>
                  <Typography
                    variant='label'
                    color={'var(--neutral-primary-light)'}
                  >
                    {metric.label}
                  </Typography>
                  <Typography variant='body1' color={'var(--neutral-primary)'}>
                    {metric.value}
                  </Typography>
                </MetricBox>
              );
            })}
          </AppointmentMetricsWrapper> */}
        </Box>
      </Box>
      {/* Hide out for MVP */}
      {/* <AppointmentMetricsWrapper className='small-device'>
        {appointmentMetrics.map((metric, index) => {
          return (
            <MetricBox key={`metric-${index}`}>
              <Typography
                variant='label'
                color={'var(--neutral-primary-light)'}
              >
                {metric.label}
              </Typography>
              <Typography variant='body1' color={'var(--neutral-primary)'}>
                {metric.value}
              </Typography>
            </MetricBox>
          );
        })}
      </AppointmentMetricsWrapper> */}
    </>
  );
};

export default ClientProfileHeader;
