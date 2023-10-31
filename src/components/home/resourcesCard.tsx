import { Typography } from '@mui/material';
import { StyledResourceCard } from './styles';
import { ResourceType } from '../../types/clientProfile';
import { FC } from 'react';

interface IResource {
  resourceList: ResourceType;
}
const ResourcesCard: FC<IResource> = ({ resourceList }) => {
  return (
    <StyledResourceCard href={resourceList?.url} target='_blank'>
      <img src={resourceList?.icon} alt='resource-img' />
      <Typography
        variant='label'
        className='text'
        color='var(--neutral-primary)'
      >
        <Typography className='link-text' variant='body1'>
          {resourceList.title}
        </Typography>
      </Typography>
      {resourceList?.rightIcon && (
        <img src={resourceList?.rightIcon} alt='resource-img' />
      )}
    </StyledResourceCard>
  );
};

export default ResourcesCard;
