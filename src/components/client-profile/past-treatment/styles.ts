import styled from '@emotion/styled';
import { Box, Grid } from '@mui/material';
import { PastTreatmentHeaderStyleProps } from '../../../types/clientProfile';

export const PastTreatmentContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  border: '1px solid var(--neutral-secondary-dark)',
  borderRadius: '8px',
  cursor: 'pointer',
  '&:active': {
    backgroundColor: 'var(--neutral-secondary-dark)',
  },
  '&:last-child': {
    marginBottom: 0,
  },
  color: 'var(--neutral-primary)',
});
export const PastTreatmentHeader = styled(Box)(
  ({ isSubmitted, backgroundColor }: PastTreatmentHeaderStyleProps) => ({
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: backgroundColor,
    padding: '24px',
    borderRadius: isSubmitted ? '7px 7px 0 0' : '7px',
    position: 'relative',
    '.header-info': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      '.date-and-moreInfo': {
        display: 'flex',
      },
    },
    '.backgroundBottomCurve': {
      position: 'absolute',
      left: 0,
      top: '99%',
      width: '100%',
    },
  })
);
export const HeaderDateInfoRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '8px',
  '.date-and-moreInfo': {
    display: 'flex',
    alignItems: 'center',
  },
  '.treatment-button-div': {
    display: 'flex',
    gap: '5px',
  },
  '.menu-icon': {
    borderRadius: '4px',
    padding: '4px',
    '&:active': {
      backgroundColor: 'var(--honey-75)',
    },
    '&.menu-open': {
      backgroundColor: 'var(--honey-75)',
    },
  },
});
export const HeaderSubInfoRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  '.subInfoBox + .subInfoBox': {
    marginLeft: '18px',
  },
});
export const SubInfoBox = styled(Box)({
  display: 'flex',
  '.subInfoIcon': {
    marginRight: '8px',
  },
});
export const StyledGridContainer = styled(Grid)({
  marginTop: '22px',
  paddingTop: '0',
});
export const TreatmentDetailsHeader = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '8px',
  '.detailInfoIcon': {
    marginRight: '8px',
  },
});
export const StyledUl = styled('ul')({
  paddingLeft: '25px',
  margin: 0,
});
