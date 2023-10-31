import { styled } from '@mui/material';
export const HeaderWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
});

export const LocationWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
});

export const RefreshWrapper = styled('div')({
  '.Refresh-title': {
    marginBottom: '0px',
    border: '1.5px solid var(--accent-primary)',
    padding: '8px 12px',
    borderRadius: '6px',
    color: 'var(--accent-primary)',
    fontSize: '16px',
    fontWeight: '600',
  },
});
