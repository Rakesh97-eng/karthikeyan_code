import styled from '@emotion/styled';
import { Box, Grid } from '@mui/material';

export const PastTreatmentContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  border: '1px solid var(--neutral-secondary-dark)',
  borderRadius: '8px',
  '&:active': {
    backgroundColor: '#DFB3B3',
  },
  '&:last-child': {
    marginBottom: 0,
  },
});

export const PastTreatmentHeader = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  backgroundColor: '#E9CCCC',
  padding: '24px',
  borderRadius: '7px',
  position: 'relative',
  '.header-info': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '.date-and-moreInfo': {
      display: 'flex',
    },
  },
});

export const HeaderDateInfoRow = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '8px',
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
  minWidth: '300px',
  '@media (max-width: 425px)': {
    minWidth: 'unset',
  },
  '.subInfoBox + .subInfoBox': {
    marginLeft: '18px',
    '@media (max-width: 425px)': {
      marginLeft: '10px',
    },
  },
});
export const SubInfoBox = styled(Box)({
  display: 'flex',
  '.subInfoIcon': {
    marginRight: '8px',
  },
  p: {
    '@media (max-width: 425px)': {
      fontSize: '14px',
    },
    '@media (max-width: 400px)': {
      fontSize: '12px',
    },
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
export const Trbutton = styled('button')({
  minWidth: '180px',
  background: '#FFFFFF',
  borderRadius: '4px',
  height: '40px',
  border: 'none',
  fontWeight: '700',
  fontSize: '16px',
  lineHeight: '24px',
  color: '#105368',
  cursor: 'pointer',
  marginTop: '10px',
  '@media (max-width:800px)': {
    minWidth: '130px',
    height: '30px',
    fontSize: '12px',
    lineHeight: '12px',
    marginLeft: '2px',
  },
});
