import { ReactComponent as Icon } from '../../assets/images/membership/success.svg';
import { SuccessContainer } from './styles';
import { Typography } from '@mui/material';
import { LayoutContext } from '../../providers/context/LayoutContext';
import { useEffect, useContext } from 'react';
import { CustomerDetailsContext } from '../../providers/context/IntakeClientContext';
import { useHistory } from 'react-router-dom';
import { MEMBERSHIP_ROUTE } from '../../constants/Helpers';
const SuccessScreen = () => {
  const { updateLayout } = useContext(LayoutContext);
  const { userLogout } = useContext(CustomerDetailsContext);
  const history = useHistory();
  useEffect(() => {
    setTimeout(() => {
      userLogout();
      history.push(MEMBERSHIP_ROUTE);
    }, 5000);

    updateLayout?.({
      header: false,
    });
    return () => {
      updateLayout?.({
        header: true,
      });
    };
  }, []);
  return (
    <SuccessContainer>
      <Icon />
      <div className='text-wrapper'>
        <Typography variant='h1'>All Set!</Typography>
        <Typography variant='body1'>
          You’ll receive a welcome email soon with more info on your membership
          perks and how to redeem them. Glowing skin awaits!
        </Typography>
      </div>
    </SuccessContainer>
  );
};
export default SuccessScreen;
