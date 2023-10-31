import Box from '@mui/material/Box';
import { LinearProgressProps } from '@mui/material/LinearProgress';
import { forwardRef, useContext, useImperativeHandle } from 'react';
import { PROGRESS } from '../../../constants/Helpers';
import { CustomerDetailsContext } from '../../../providers/context/IntakeClientContext';
import { StyledProgressBar } from './styles';
interface HandleProgressProps {
  handleProgress(): void;
}
const LinearProgressWithLabel = (
  props: LinearProgressProps & { value: number }
) => {
  return (
    <Box>
      <Box sx={{ width: '100%' }}>
        <StyledProgressBar variant='determinate' {...props} />
      </Box>
    </Box>
  );
};

const LinearWithValueLabel = forwardRef<HandleProgressProps>((props, ref) => {
  const { updateState, progressValue } = useContext(CustomerDetailsContext);
  useImperativeHandle(ref, () => ({
    handleProgress() {
      updateState({ type: PROGRESS, payload: '' });
    },
  }));

  return (
    <Box sx={{ width: '100%' }} position='fixed' zIndex={1}>
      <LinearProgressWithLabel value={progressValue} />
    </Box>
  );
});
LinearWithValueLabel.displayName = 'LinearWithValueLabel';
export default LinearWithValueLabel;
