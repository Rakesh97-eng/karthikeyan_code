import { FC } from 'react';
import { Typography, Box } from '@mui/material';
import PostBox from '../../../../assets/icons/post-box.svg';
import { ClientFollowUpContainer, SearchBoxWrapper } from './styles';
import { PastTreatment } from '../../../../types/treatmentRecord/question';
import MediumProductCard from '../../../common/SmallProductCardList/mediumProductCard';

interface PastTreatmentProps {
  section: PastTreatment;
}

const PastTreatmentClientFollowUp: FC<PastTreatmentProps> = ({ section }) => {
  return (
    <div className='temp'>
      <SearchBoxWrapper>
        <ClientFollowUpContainer>
          <Box className='segment-title'>
            <img src={PostBox} alt='client-follow-up' />
            <Typography variant='h3' className='title'>
              Client Follow-Up
            </Typography>
          </Box>
          <ul className='sub-head-wrapper'>
            <li>
              <Typography variant='body1' className='sub-head'>
                Product Recommendations:
              </Typography>
            </li>
          </ul>
          {section.product &&
            section?.product.map((data, i) => {
              return <MediumProductCard list={data} key={`medium-card-${i}`} />;
            })}
          <Box className='tr-section-elements-wrapper'>
            <ul className='list-item-wrapper'>
              {section?.elements.map((element, id) => {
                return element.id !== 'recommendedProduct' ? (
                  <li key={`list-item-${id}`} className='list-item'>
                    <div>
                      <Typography
                        component='div'
                        textTransform={'uppercase'}
                        variant='body3'
                        display='inline'
                      >
                        {element?.label} :{' '}
                      </Typography>
                      <Typography
                        component='div'
                        display='inline'
                        variant='body1'
                        className='li-text'
                      >
                        {Array.isArray(element.selectedOptions)
                          ? element.selectedOptions.join(', ')
                          : element.selectedOptions}
                      </Typography>
                    </div>
                  </li>
                ) : null;
              })}
            </ul>
          </Box>
        </ClientFollowUpContainer>
      </SearchBoxWrapper>
    </div>
  );
};

export default PastTreatmentClientFollowUp;
