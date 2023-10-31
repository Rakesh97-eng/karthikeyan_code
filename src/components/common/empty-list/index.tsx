import { EmptyListContainer } from './styles';
import { ReactComponent as MagnifyingGlass } from '../../../assets/icons/magnifying-glass.svg';
import { Typography } from '@mui/material';
import { FC } from 'react';

type EmptyListProps = {
  headerText: string;
  subHeaderText: string;
};

/**
 * EmptyList
 * @description This is an empty list that can be shown for empty search results
 * @property {string} headerText the title for the error
 * @property {string} subHeaderText the sub-text for the error
 */
export const EmptyList: FC<EmptyListProps> = ({
  headerText,
  subHeaderText,
}) => {
  return (
    <EmptyListContainer>
      <MagnifyingGlass />
      <Typography
        variant='h3'
        className='main-text'
        color='var(--neutral-primary)'
      >
        {headerText}
      </Typography>
      <Typography variant='body1' color='var(--neutral-primary-light)'>
        {subHeaderText}
      </Typography>
    </EmptyListContainer>
  );
};
