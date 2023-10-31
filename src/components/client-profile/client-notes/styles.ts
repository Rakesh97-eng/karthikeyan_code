import { Box } from '@mui/material';
import { styled } from '@mui/system';

interface IClientNotesWrapper {
  bgColor: string;
}

export const ClientNotesWrapper = styled(Box)(
  ({ bgColor }: IClientNotesWrapper) => ({
    margin: '24px 0',
    backgroundColor: bgColor,
    borderRadius: '8px',
  })
);

export const NoteTitleWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '16px 16px 0',
  '.title-section': {
    display: 'flex',
    alignItems: 'center',
    '.notes-title': {
      fontWeight: 'bold',
      marginLeft: '8px',
      color: 'var(--neutral-primary)',
      lineHeight: '1px',
    },
    '.notes-pipe': {
      margin: '0 10px',
      color: 'var(--terracota-75)',
    },
  },
  '.edit-section': {
    '.edit-title': {
      fontWeight: 'bold',
      marginRight: '8px',
      color: 'var(--neutral-primary)',
    },
  },
});

export const NotesWrapper = styled(Box)({
  padding: '0 0px 16px',
  '.notes-ul-list': {
    margin: '0',
    marginTop: '14px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
});

export const EmptyNotesWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: '2px dashed var(--neutral-tertiary-darker)',
  borderRadius: '8px',
  padding: '8px 0',
  height: '40px',
  '.plus-icon': {
    width: '16px',
    height: '16px',
    marginRight: '8px',
    '& path': {
      stroke: 'var(--accent-primary)',
      strokeWidth: '2.5px',
    },
  },
  '.empty-title': {
    color: 'var(--accent-primary)',
    fontWeight: '700',
  },
});
