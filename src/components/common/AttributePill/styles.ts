import { Box } from '@mui/material';
import { styled } from '@mui/system';

interface IStyledAttributePill {
  backgroundColor: string;
  padding?: string;
  margin?: string;
  iconMargin?: string;
  height?: string;
}

export const StyledAttributePill = styled(Box)(
  ({
    backgroundColor,
    padding = '8px 12px',
    margin,
    height,
  }: IStyledAttributePill) => ({
    display: 'flex',
    padding: padding,
    backgroundColor: `var(--${backgroundColor})`,
    borderRadius: '20px',
    alignItems: 'center',
    margin: margin,
    height: height,
    '.pref-icon': {
      display: 'flex',
      svg: {
        height: '24px',
        width: '24px',
      },
    },
    '.pref-del-icon': {
      cursor: 'pointer',
      height: '12px',
      padding: '0',
      marginLeft: '12px',
    },
    svg: {
      width: '12px',
      height: '12px',
    },
  })
);
