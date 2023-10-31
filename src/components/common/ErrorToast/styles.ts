import { styled } from '@mui/material/styles';
export const ErrorChipWrapper = styled('span')({
  backgroundColor: 'var(--negative-primary)',
  display: 'inline-flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'static',
  borderRadius: '2px',
  height: '24px',
  marginLeft: '8px',
  width: 'fit-content',
  svg: {
    margin: '4px',
  },
  '.txt': {
    color: 'var(--neutral-secondary)',
    padding: '4px',
    paddingLeft: '0',
  },
});

export const ErrorToastWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  padding: '16px',
  backgroundColor: 'var(--negative-primary-desaturated)',
  borderRadius: '8px',
  marginTop: '55px',
  svg: {
    marginTop: '2px',
  },
  '.list-wrapper': {
    marginLeft: '16px',
    color: 'var(--neutral-secondary)',
    ul: {
      margin: '0',
      display: 'list-item',
      listStyle: 'disc',
      marginLeft: '24px',
    },
    'ul li': {
      padding: '0',
      display: 'list-item',
    },
    '.txt': {
      color: 'var(--neutral-secondary)',
    },
  },
});
