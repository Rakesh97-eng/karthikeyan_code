import { Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ReactComponent as HifiHand } from '../../../assets/icons/intake-icons/intake-hifi.svg';
import { INTAKE_DECENCY_AGREEMENT_ROUTE } from '../../../constants/intakeConstants';
import { WelcomeContainer, AfterWelcomeWrapper } from './intakeWelcome.styles';

const IntakeInterstitial = () => {
    const [isAnimationDown, setIsAnimationDown] = useState<boolean>(false);
    const [isShow, setIsShow] = useState<boolean>(true);
    const history= useHistory();
    useEffect(() => {
        setTimeout(() => {
            setIsAnimationDown(true);
        }, 2500);
    }, []);
    const navigate = () => {
        if (isAnimationDown) {
            // this is intentional
            setIsShow(false);
            history.push(INTAKE_DECENCY_AGREEMENT_ROUTE)
        }
    };
    return (
        <WelcomeContainer>
            <AfterWelcomeWrapper>
                <Grid container>
                    <Grid item xs={12}>
                        {isShow && (
                            <div
                                className={
                                    isAnimationDown
                                        ? 'success-container-down'
                                        : 'success-container'
                                }
                                onAnimationEnd={navigate}
                            >
                                <div className='success-wrapper'>
                                    <div className='img-container'>
                                        <HifiHand />
                                    </div>

                                    <Typography variant='h3' className='header'>
                                        Thanks for all the info!
                                    </Typography>
                                    <Typography variant='body1' className='title'>
                                        {' '}
                                        Just one more step to go.
                                    </Typography>
                                </div>
                            </div>
                        )}
                    </Grid>
                </Grid>
            </AfterWelcomeWrapper>
        </WelcomeContainer>
    );
};

export default IntakeInterstitial;
