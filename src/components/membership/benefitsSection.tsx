import { Typography } from '@mui/material';
import { BenefitsSectionContainer } from './styles';

const BenefitsSection = () => {
  const LIST_TEXTS = [
    '50% off Enhancements.',
    '15% off Products – 20% off of Products at time of signing up for a Membership (only available when a Membership is first purchased).',
    '$85 Additional Facials in that Membership Month.',
    'Member Perks – think Member gear, skincare insider info, first access to new product & tool launches & more – the longer you’re a Member, the more access you have.',
  ];

  const LIST_CONTENT = [
    {
      id: 1,
      title: 'Monthly Payment',
      content:
        'Your card will be automatically charged on the same day of each month.',
    },
    {
      id: 2,
      title: 'Minimum Commitment / Cancellation',
      content:
        'We require 30 days notice for cancellation. If you wish to cancel, email us at members@heydayskincare.com. Memberships will be cancelled effective 30 days following our receipt of such cancellation requests.',
    },
    {
      id: 3,
      title: 'Discount Sharing; Gift Cards',
      content:
        'In addition to being able to apply your discounts to Facials for yourself, you also have the following options: 1) let a friend or family member use your First Facial discount for a Facial, or 2) receive a gift card for the value of your discounted First Facial, which may be used for your own product purchases or gifted as you would like! Freezing of your Membership is not allowed in this membership program for any period of time.',
    },
    {
      id: 4,
      title: 'Discount Accrual',
      content:
        'You can have a maximum of three (3) accrued discounted First Facials at any time. Any accrued discounted First Facials in excess of three (3) at any one time that have not been redeemed or converted to gift cards will be deemed expired.',
    },
    {
      id: 5,
      title: 'Product Exchanges',
      content:
        'If you aren’t 100% satisfied with your Heyday esthetician recommended Product, you may exchange the Product, up to 14 days post purchase.',
    },
    {
      id: 6,
      title: 'Founder’s Rate',
      content:
        'Certain shops may offer promotional rates (a “Founder’s Membership Rate”) for those that sign up for monthly membership prior to the opening of such shop. To take advantage of the Founder’s Membership Rate you (i) cannot be a current member at any Heyday and (ii) must live within 50 miles of the shop offering such Founder’s Membership Rate. There is a limit of one (1) Founder’s Membership Rate redemption per person. Such promotion can end at any time with or without notice. The Founder’s Membership Rate is an auto-renewing contract and will bill every month. Memberships canceled after the billing date cannot be refunded. Certain regions may have taxes and surcharges that are not included in your Founder’s Membership Rate.',
    },
  ];
  return (
    <BenefitsSectionContainer>
      <Typography variant='h3'>Membership & Benefits</Typography>
      <div className='list-section'>
        <Typography className='body1'>
          By entering into this Agreement and signing up for the Membership, you
          agree to purchase a Facial on every Membership Charge Date. In
          addition to your monthly Facial, you’ll receive the follow benefits:
        </Typography>
        <ul>
          {LIST_TEXTS.map((list) => {
            return (
              <li key={'list'}>
                {' '}
                <Typography className='body1'>{list}</Typography>
              </li>
            );
          })}
        </ul>
      </div>
      {LIST_CONTENT.map((list) => {
        return (
          <div className='content-wrapper' key={list.id}>
            <Typography variant='body1' fontWeight={600}>
              {list.title}
            </Typography>
            <Typography variant='body1'>{list.content}</Typography>
          </div>
        );
      })}
    </BenefitsSectionContainer>
  );
};
export default BenefitsSection;
