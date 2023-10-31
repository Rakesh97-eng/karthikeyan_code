import { Grid, Typography } from '@mui/material';
import { ResourceWrapper } from './styles';
import ResourceIcon from '../../assets/images/resources/resources.png';
import ResourcesCard from './resourcesCard';
import { RESOURCE } from '../../constants/clients';

const Resources = () => {
  return (
    <ResourceWrapper>
      <div className='header'>
        <img src={ResourceIcon} alt='book' className='header-icon' />
        <Typography variant='h3' color='var(--neutral-primary)' fontWeight={400}>
          Resources
        </Typography>
      </div>
      <Typography
        variant='body1'
        color='var(--neutral-primary-light)'
        className='secondary-text'
        fontWeight={400}
      >
      </Typography>
      <Grid container spacing={2}>
        {RESOURCE.map((list, index) => {
          return (
            <Grid item xs={12} md={4} key={`card-list-${index}`}>
              <ResourcesCard resourceList={list} />{' '}
            </Grid>
          );
        })}
      </Grid>
    </ResourceWrapper>
  );
};

export default Resources;
