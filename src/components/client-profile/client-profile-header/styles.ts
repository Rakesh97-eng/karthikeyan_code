import styled from '@emotion/styled';
import { Theme } from '@mui/material';

export const Capsule = styled('span')(({ theme }: { theme?: Theme }) => ({
  display: 'flex',
  alignItems: 'center',
  background: 'var(--neutral-tertiary-dark)',
  borderRadius: '12px',
  padding: '4px 8px',
  marginBottom: '24px',
  marginRight: '8px',
  textTransform: 'uppercase',
  letterSpacing: '0.03em',
  '@media (max-width:880px)': {
    marginBottom: '8px',
  },
  [`${theme?.breakpoints.down('sm')}`]: {
    '&:nth-of-type(odd)': {
      marginLeft: '0 !important',
    },
  },
}));

export const CapsuleWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  '& .capsule-icon': {
    marginRight: '4px',
  },
});
export const AppointmentMetricsWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  '&.small-device': {
    display: 'none',
  },
  '@media (max-width:501px)': {
    marginTop: '16px',
    '&.large-device': {
      display: 'none',
    },
    '&.small-device': {
      display: 'flex',
    },
  },
});
export const MetricBox = styled('div')(({ theme }: { theme?: Theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0 16px',
  borderLeft: '1px solid var(--neutral-tertiary-darker)',
  '&:last-child': {
    borderRight: '1px solid var(--neutral-tertiary-darker)',
  },
  [`${theme?.breakpoints.down('sm')}`]: {
    padding: '0 13px',
  },
}));
export const ProfileImageWrapper = styled('div')(
  ({ path, theme }: { path: string; theme?: Theme }) => ({
    backgroundImage: `url(${path})`,
    width: '120px',
    height: '160px',
    borderRadius: '8px',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: '50%',
    marginRight: '24px',
    [`${theme?.breakpoints.down('lg')}`]: {
      maxWidth: '108px',
    },
    [`${theme?.breakpoints.down('sm')}`]: {
      minWidth: '80px',
      height: '208px',
      marginRight: '16px',
    },
  })
);
export const ContactDetailsWrapper = styled('div')(
  ({ theme }: { theme?: Theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginBottom: '16px',
    'p, span': {
      color: 'var(--slate-75)',
      [`${theme?.breakpoints.down('sm')}`]: {
        fontSize: '14px',
      },
    },
    'p.missing-phone-num , p.missing-email': {
      color: 'var(--negative-primary)',
    },
  })
);
