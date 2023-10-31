import { Typography, Box, List, ListItem } from '@mui/material';
import { ErrorChipWrapper, ErrorToastWrapper } from './styles';
import { ReactComponent as WarningIcon } from '../../../assets/icons/toast-warning.svg';

interface ErrorChipProps {
  text?: string;
}

interface ErrorToastProps {
  data: {
    title: string;
    list: string[];
  };
}
const ErrorChip: React.FC<ErrorChipProps> = ({ text }) => {
  return (
    <ErrorChipWrapper>
      <WarningIcon />
      <Typography variant='body1' className='txt'>
        {text}
      </Typography>
    </ErrorChipWrapper>
  );
};

const ErrorToast: React.FC<ErrorToastProps> = ({ data }) => {
  return (
    <ErrorToastWrapper>
      <WarningIcon height='20px' width='20px' />
      <Box className='list-wrapper'>
        <Typography variant='body1' className='txt'>
          {data.title}
        </Typography>
        <List component='ul'>
          {data.list &&
            data.list?.map((list: string, i: number) => {
              return (
                <ListItem key={`list-item-${i}`} component='li'>
                  <Typography variant='body1' className='txt'>
                    {list}
                  </Typography>
                </ListItem>
              );
            })}
        </List>
      </Box>
    </ErrorToastWrapper>
  );
};
export { ErrorChip, ErrorToast };
