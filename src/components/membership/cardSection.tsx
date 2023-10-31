import { Grid, Typography } from '@mui/material';
import { Card, CardContainer, NotesContainer } from './styles';
import Enhacement from '../../assets/images/membership/enhancement.svg';
import Exclusive from '../../assets/images/membership/exclusive.svg';
import Facial from '../../assets/images/membership/facial.svg';
import Product from '../../assets/images/membership/product.svg';
const CardSection = () => {
  const CARDS = [
    {
      id: 1,
      image: Facial,
      title: 'Free Monthly Facial',
      subText: 'with additional facials for $85.',
    },
    {
      id: 2,
      image: Enhacement,
      title: '50% Off Enhancements',
      subText: 'for microcurrent, peels and more.',
    },
    {
      id: 3,
      image: Product,
      title: '15% Off Products',
      subText: 'with 20% off at sign-up.',
    },
    {
      id: 4,
      image: Exclusive,
      title: 'Exclusive Benefits',
      subText: 'shop events, surprises & more.',
    },
  ];
  return (
    <CardContainer>
      <Typography variant='label' className='title'>
        Your Membership Summary
      </Typography>
      <Grid container className='grid-wrapper'>
        {CARDS.map((card) => {
          return (
            <Grid item key={`grid-${card.id}`}>
              <Card>
                <img src={card.image} alt='image' className='image' />
                <div className='text-section'>
                  <Typography variant='body1' fontWeight={600}>
                    {card.title}
                  </Typography>
                  <Typography variant='body2'>{card.subText}</Typography>
                </div>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      <NotesContainer>
        <Typography variant='body2'>
          <Typography variant='body2' className='note-txt' fontWeight={600}>
            Note:
          </Typography>
          If you wish to cancel your membership after signing up, email us at
          members@heydayskincare.com. We require 30 days notice for
          cancellation. Memberships will be cancelled effective 30 days
          following our receipt of such cancellation request.
        </Typography>
      </NotesContainer>
    </CardContainer>
  );
};
export default CardSection;
