import { Menu, Typography } from '@mui/material';
import { styled } from '@mui/system';

export const ClientHeader = styled('div')({
  backgroundColor: 'var(--sky-50)',
  borderRadius: '16px',
  padding: '24px',
});
export const PastTRClientHeader = styled('div')({
  backgroundColor: 'var(--honey-50)',
  borderRadius: '16px',
  padding: '24px',
  margin: '16px',
  marginTop: '24px',
  '.past-tr': {
    marginBottom: '8px',
  },
});

export const AttributesSection = styled('div')({
  margin: '24px 0',
  padding: '0 40px',
  '.attribute-label-title': {
    textTransform: 'uppercase',
    letterSpacing: '0.03em',
    color: 'var(--neutral-primary)',
  },
});

export const ClientName = styled(Typography)({
  color: 'var(--neutral-primary)',
  marginBottom: '8px',
});

export const LocationDateWrapper = styled('div')({
  display: 'flex',
  columnGap: '18px',
  color: 'var(--neutral-primary)',
  flexWrap: 'wrap',
  '@media (max-width:501px)': {
    flexDirection: 'column',
    rowGap: '8px',
  },
  '.inner-wrapper': {
    display: 'flex',
    alignItems: 'center',
    ' .icon': {
      marginRight: '5px',
    },
    '.pensilIcon': {
      height: '15px',
    },
  },
});

export const TreatmentTypeMenu = styled(Menu)({
  '&.treatment-type-menu .MuiPaper-root': {
    marginLeft: '-12px',
    width: 'fit-content',
    marginTop: '25px',
    borderRadius: '8px',
  },
  '&.treatment-type-menu .MuiMenu-list': {
    color: 'var(--neutral-primary)',
    borderRadius: '8px',
    padding: '0',
    '.treatment-type-menu-item': {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '8px 16px',
      '.checkmark-icon': {
        marginLeft: '16px',
      },
    },
  },
});

export const TreatmentTypeWrapper = styled('div')({
  backgroundColor: 'var(--neutral-secondary)',
  borderRadius: '8px',
  color: 'var(--neutral-primary)',
  padding: '12px 20px 12px 12px',
  marginTop: '20px',
  width: 'fit-content',
  '.treatment-type-btn': {
    padding: '0',
    color: 'var(--neutral-primary)',
    textTransform: 'none',
  },
  '.expand-icon-wrapper': {
    display: 'flex',
    marginLeft: '16px',
  },
});
