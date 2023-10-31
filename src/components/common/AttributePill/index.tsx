import { IconButton, Typography } from '@mui/material';
import { FC, FunctionComponent, ReactElement } from 'react';
import { StyledAttributePill } from './styles';

interface IAttributePill {
  id: string;
  PrefIcon: FunctionComponent;
  label: string;
  backgroundColor: string;
  fontSize?: string;
  lineHeight?: string;
  letterSpacing?: string;
  padding?: string;
  margin?: string;
  iconMargin?: string;
  deleteIcon?: ReactElement;
  height?: string;
  handleDelete?: (cpID: string) => void;
}

const AttributePill: FC<IAttributePill> = ({
  id,
  PrefIcon,
  label,
  fontSize,
  lineHeight,
  letterSpacing,
  padding,
  margin,
  deleteIcon,
  iconMargin,
  handleDelete,
  backgroundColor,
  height,
}) => {
  return (
    <StyledAttributePill
      backgroundColor={backgroundColor}
      padding={padding}
      margin={margin}
      iconMargin={iconMargin}
      height={height}
      className='attribute-pill'
    >
      <span className='pref-icon'>
        <PrefIcon />
      </span>
      <Typography
        variant='body1'
        fontSize={fontSize}
        lineHeight={lineHeight}
        letterSpacing={letterSpacing}
        fontWeight={400}
        color={'var(--neutral-primary)'}
      >
        {label}
      </Typography>
      {deleteIcon && handleDelete && (
        <IconButton className='pref-del-icon' onClick={() => handleDelete(id)}>
          {deleteIcon}
        </IconButton>
      )}
    </StyledAttributePill>
  );
};

export default AttributePill;
