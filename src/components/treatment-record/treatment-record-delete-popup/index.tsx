import { Stack, Typography } from '@mui/material';
import { FC } from 'react';
import {
  DeleteTreatmentBtn,
  DeleteTreatmentDialogWrapper,
  KeepEditingBtn,
} from './styles';

interface ITreatmentRecordDelete {
  deleteTR: (event: React.MouseEvent<HTMLElement>) => void;
  keepEditingTR: (event: React.MouseEvent<HTMLElement>) => void;
  title?: string;
  description?: string;
  deleteBtnText?: string;
  editBtnText?: string;
}

export const TreatmentRecordDeletePopup: FC<ITreatmentRecordDelete> = ({
  deleteTR,
  keepEditingTR,
  title,
  description,
  deleteBtnText,
  editBtnText,
}) => {
  return (
    <DeleteTreatmentDialogWrapper textAlign={'center'}>
      <Typography variant='h3'>{title}</Typography>
      <Typography variant='body1' className='content'>
        {description}
      </Typography>
      <Stack direction='column' className='buttons-wrapper'>
        <DeleteTreatmentBtn variant='contained' onClick={deleteTR}>
          <Typography variant='btn' fontWeight='700'>
            {deleteBtnText}
          </Typography>
        </DeleteTreatmentBtn>
        <KeepEditingBtn variant='contained' onClick={keepEditingTR}>
          <Typography variant='btn' fontWeight='700'>
            {editBtnText}
          </Typography>
        </KeepEditingBtn>
      </Stack>
    </DeleteTreatmentDialogWrapper>
  );
};
