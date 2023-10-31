import { Typography } from '@mui/material';
import { DefinitionSectionContainer, DefinitionSectionContent } from './styles';

const DefinitionSection = () => {
  const DEFINITION = [
    {
      id: 1,
      boldText: '“Additional Facials”',
      normalText:
        'are defined as any Facial that you receive within a Membership Month after the First Facial.',
    },
    {
      id: 2,
      boldText: '“Agreement Date”',
      normalText: 'is defined as the date you signed this Agreement.',
    },
    {
      id: 3,
      boldText: '“Enhancements”',
      normalText:
        'are currently defined as one (1) of the following services (which services may be updated from time to time), to be redeemed within the Facial: Gua Sha, Microdermabrasion, Peel, LED Light Therapy',
    },
    {
      id: 4,
      boldText: '“Facial”',
      normalText:
        'is defined as a base facial service (currently 50 minutes) that is available at any Heyday location.',
    },
    {
      id: 5,
      boldText: '“First Facial”',
      normalText:
        'is defined as the first Facial you receive within a Membership Month.',
    },
    {
      id: 6,
      boldText: '“Products”',
      normalText:
        'are defined as retail products available for purchase in the retail section of a Heyday location. Exclusions may apply at certain times.',
    },
    {
      id: 7,
      boldText: '“Membership Charge Date”',
      normalText:
        'is the date that your debit or credit card will be charged for your monthly membership.',
    },
    {
      id: 8,
      boldText: '“Membership Month”',
      normalText:
        'is defined as the period beginning with a Membership Charge Date and ending on the day before the next Membership Charge Date.',
    },
    {
      id: 9,
      boldText: '“Services”',
      normalText: 'are, collectively, the Facials and Enhancements.',
    },
  ];
  return (
    <DefinitionSectionContainer>
      <Typography variant='h3'>Definitions</Typography>
      <DefinitionSectionContent>
        <ul>
          {DEFINITION.map((list) => {
            return (
              <li key={list.id}>
                <Typography variant='body1'>
                  {' '}
                  <Typography variant='body1' fontWeight={600} className={'list-text'}>
                    {list.boldText}
                  </Typography>
                  {list.normalText}
                </Typography>
              </li>
            );
          })}
        </ul>
      </DefinitionSectionContent>
    </DefinitionSectionContainer>
  );
};
export default DefinitionSection;
