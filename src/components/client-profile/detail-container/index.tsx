import { IconButton, Typography } from '@mui/material';
import { FC } from 'react';
import { StyledDetailContainer, StyledDetailContainerProps } from './styles';

interface DetailContainerProps extends StyledDetailContainerProps {
  headerLeftIcon: JSX.Element;
  headerText: string;
  subHeaderText?: string;
  headerRightIcon?: JSX.Element;
  headerRightIconClick?: () => void;
}

/**
 * DetailContainer
 * Container with sticky heading
 */
export const DetailContainer: FC<DetailContainerProps> = ({
  headerLeftIcon,
  headerText,
  subHeaderText = '',
  headerRightIcon,
  headerRightIconClick,
  children,
  aside = false,
}) => {
  return (
    <StyledDetailContainer aside={aside}>
      <div className='header-wrapper'>
        <div className='header'>
          {headerLeftIcon}
          <Typography
            variant='h2'
            color='var(--neutral-primary)'
            fontWeight={400}
          >
            {headerText}
          </Typography>
          {headerRightIcon && (
            <IconButton
              className='header-icon-button'
              onClick={headerRightIconClick}
            >
              {headerRightIcon}
            </IconButton>
          )}
        </div>
        {subHeaderText && (
          <Typography variant='body1' className='sub-header-text'>
            {subHeaderText}
          </Typography>
        )}
      </div>
      {children}
    </StyledDetailContainer>
  );
};
