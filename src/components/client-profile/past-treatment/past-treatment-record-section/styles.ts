import { styled } from '@mui/material';

export const TRSectionWrapper = styled('div')({
  backgroundColor: 'var(--neutral-secondary)',
  borderRadius: '16px',
  padding: '24px',
  margin: '16px',
  marginTop: '24px',
  zIndex: '999',
  '& .tr-section-titles-wrapper': {
    marginBottom: '8px',
    '& .tr-section-title-icon-wrapper': {
      display: 'flex',
      alignItems: 'center',
    },
    '& .tr-section-title': {
      color: 'var(--neutral-primary)',
    },
    '& .tr-section-info': {
      color: 'var(--neutral-primary-light)',
      marginTop: '8px',
    },
  },
  '.tr-section-elements-wrapper': {
    '>ul >li.list-item': {
      '>.preview-list-wrapper': {
        '> .MuiTypography-root.MuiTypography-label': {
          display: 'inline-block',
        },
        '>ul>li': {
          '> .preview-list-wrapper > .tr-label': {
            fontWeight: '900',
            fontSize: '13px',
            marginBottom: '10px',
            display: 'inline-block',
          },
        },
      },
    },
    marginLeft: '24px',
    '.MuiListItem-root': {
      display: 'list-item',
      listStyle: 'disc',
      padding: '0px 0px 4px 8px',
      '.list-item-text-wrapper': {
        display: 'flex',
      },
      '.list-item': {
        color: 'var(--neutral-primary-light)',
        letterSpacing: '0.03em',
        '.inner-list': {
          listStyle: 'disc',
        },
        '.li-text': {
          fontWeight: '400',
          color: 'var(--neutral-primary)',
          textTransform: 'capitalize',
          fontSize: '15px',
        },
        '.tr-label': {
          marginRight: '2px',
        },
      },
    },
    '.MuiList-root': {
      padding: '0px',
      listStyle: 'disc',
    },
  },
  '.questions-wrapper': {
    '.MuiTypography-root': {
      display: 'flex',
    },
  },
});

export const TRSectionHeaderWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  color: 'var(--neutral-primary)',
  '& .tr-section-icon': {
    padding: '4px 8px 4px 0px',
  },
  '.custom-switch': {
    marginLeft: 'auto',
  },
});

export const PastTreatmentRecordWrapper = styled('div')({
  padding: '0px',
});
