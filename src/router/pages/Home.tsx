import { useAuth0 } from '@auth0/auth0-react';
import { Grid } from '@mui/material';
import React from 'react';
import { HomepageHeader } from '../../components/home/homepage-header';
import IncompleteDraft from '../../components/home/incompleteDraft';
import IntakeForm from '../../components/home/intakeForms';
import Resources from '../../components/home/resources';
import Schedule from '../../components/home/schedule';
import HomeContextProvider from '../../providers/context/HomeContext';

export interface IClientCard {
  buttonValue: string;
}
export interface IData {
  head: string;
  subText: string;
}

const Home = () => {
  const { user } = useAuth0();
  return (
    <HomeContextProvider>
      <HomepageHeader userFirstName={user?.nickname} />
      <Grid container spacing={3}>
        <Grid item md={6} xs={12}>
          <IntakeForm buttonValue='Start' />
        </Grid>
        <Grid item md={6} xs={12}>
          <IncompleteDraft buttonValue='Edit' />
        </Grid>
      </Grid>
      <Schedule />
      <Resources />
    </HomeContextProvider>
  );
};

export default React.memo(Home);
