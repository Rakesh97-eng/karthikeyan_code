import { AgreementSectionContainer } from './styles';
import { Typography } from '@mui/material';
const AgreementSection = () => {
  const AGREEMENT_CONTENT = [
    {
      id: 1,
      title: 'Active Memberships',
      list: [
        'No minimum term and non-refundable (except where specified below)',
        'Effective on the first Membership Charge Date',
        'Discounted First Facials can be accrued, up to THREE (3) at any time; any beyond 3 will expire',
        'Discounted First Facials can be shared or converted to gift cards',
      ],
    },
    {
      id: 2,
      title: 'Transferred Memberships',
      list: [
        'You may transfer your Membership between Heyday locations.',
        'Membership transfer document must be completed at the location you wish to transfer to.',
        'After document submission, the Heyday location with your original Membership will have seven (7) days to terminate the Membership so the new Membership can be activated.',
        'Existing discounts will not be impacted by the transfer.',
      ],
    },
    {
      id: 3,
      title: 'Cross-Regional Membership Redemptions',
      list: [
        'Discounts may be redeemed at any Heyday location. Additional fees or taxes may apply at the location where the discount is being redeemed.',
      ],
    },
  ];
  return (
    <AgreementSectionContainer>
      <Typography variant='h3'>Agreement Types</Typography>
      {AGREEMENT_CONTENT.map((content) => {
        return (
          <div key={content.id} className='list-wrapper'>
            <Typography variant='body1' fontWeight={600}>{content.title}</Typography>
            <ul>
              {content.list.map((item) => {
                return <li key='list'>{item}</li>;
              })}
            </ul>
          </div>
        );
      })}
    </AgreementSectionContainer>
  );
};
export default AgreementSection;
