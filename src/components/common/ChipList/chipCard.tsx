import { FC } from 'react';
import { Chip, Typography } from '@mui/material';
import { ChipWrapper } from './styles';

interface ChipProps {
  chipLabel: string;
  pastTreatment?: boolean;
  className?: string;
}
const ChipCard: FC<ChipProps> = ({
  chipLabel,
  pastTreatment = false,
  className,
}) => {
  return pastTreatment ? (
    <ChipWrapper className={className}>
      <Chip
        label={<Typography variant='prodLabel2'>{chipLabel}</Typography>}
        className={'chip-style gray-chip'}
      />
    </ChipWrapper>
  ) : (
    <ChipWrapper className={className || ''}>
      <Chip
        label={<Typography variant='prodLabel2'>{chipLabel}</Typography>}
        className='chip-style'
      />
    </ChipWrapper>
  );
};

export default ChipCard;
