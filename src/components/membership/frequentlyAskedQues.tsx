import { AccordionContainer,AccordionWrapper } from './styles';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { ReactComponent as Plus } from '../../assets/images/membership/plus.svg';
import { ReactComponent as Minus } from '../../assets/images/membership/minus.svg';

const FAQSection = () => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  const fillOutThisFormLink = (
    <a
      href='https://heyday.kustomer.help/contact/adjusting-your-membership-SJtOCAxZo'
      rel='noreferrer'
      target='_blank'
      className='link-text'
    >
      fill out this form
    </a>
  );
  const hereLink = (
    <a
      href='https://help.heydayskincare.com/can-i-cancel-my-membership-at-any-time-S11xvNR5d'
      rel='noreferrer'
      target='_blank'
      className='link-text'
    >
      here
    </a>
  );
  const panel1 = (
    <>
      You may use a gift card towards your first membership payment upon sign-up
      but a valid credit or debit card is required for all future monthly
      payments. Gift cards can also be used toward additional facials,
      enhancements, and product purchases (in-store and online) and do not
      expire.
    </>
  );
  const panel2 = (
    <>
      The goal of our memberships is to keep your skin healthy and glowing which
      we believe is best maintained on a monthly cadence. But, we understand
      that life gets busy.{' '}
      <Typography fontWeight={600} component='span'>
        We allow for 3 rollovers per year
      </Typography>
      , just let us know before the end of the missed month and we&apos;ll
      ensure you can use it next month. You can also turn the paid- value of a
      missed membership benefit into product credit or a gift card, or pay it
      forward by gifting the facial to a friend or family member! If you are
      heading on vacation or just need a couple of months off, we also offer the
      ability to pause your membership once a year for up to 3 months. For any
      of these options, all you need to do is {fillOutThisFormLink} and
      we&apos;ll take care of the rest.
    </>
  );
  const panel3 = (
    <>
      Please {fillOutThisFormLink} or chat with the Host at the front desk next
      time you are in-shop to request a pause or cancellation. For more
      information on our pausing and cancellation policy, please see {hereLink}.
    </>
  );
  const panel4 = (
    <>
      If you need to take a break or are heading on vacation, we do offer the
      ability to (though we&apos;d be sad to see you go!). Please note that
      pause requests can take up to 1-2 business days to fully process. During
      the pause period, you will no longer be billed for monthly benefits. Once
      your pausing period has finished, your membership will reactivate
      automatically and continue processing benefits on the same billing date.
      To pause your membership, all you need to do is {fillOutThisFormLink} or
      tell the Host next time you are in-shop!
    </>
  );
  const panel5 = (
    <>
      In order to best support our shop teams and customers (you!), our pricing
      is relative to the cost of doing business in each region. This helps us to
      pay our staff competitively and keep our high standard of service in every
      shop around the country. Come visit us in a new city next time you&apos;re
      in town!
    </>
  );
  const EXPAND_CONTENT = [
    {
      panel: 1,
      title: 'Can I use a gift card for my membership payment?',
      text: panel1,
    },
    {
      panel: 2,
      title:
        'I can’t make it in for a facial this month — what are my options?',
      text: panel2,
    },
    {
      panel: 3,
      title: 'How do I pause or cancel my facial membership?',
      text: panel3,
    },
    {
      panel: 4,
      title: 'Can I pause my membership at any time?',
      text: panel4,
    },
    {
      panel: 5,
      title: 'Why are your prices different by city?',
      text: panel5,
    },
  ];
  return (
    <AccordionContainer>
      <Typography variant='label' className='title'>
        Frequently asked questions
      </Typography>
      <AccordionWrapper>
        {EXPAND_CONTENT.map((content) => {
          return (
            <Accordion
              expanded={expanded === `panel${content.panel}`}
              onChange={handleChange(`panel${content.panel}`)}
              key={`item${content.panel}`}
            >
              <AccordionSummary
                expandIcon={
                  expanded === `panel${content.panel}` ? <Minus /> : <Plus />
                }
                aria-controls='panel1a-content'
                id='panel1a-header'
              >
                <Typography variant='body1' fontWeight={400}>{content.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant='body2' >{content.text}</Typography>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </AccordionWrapper>
    </AccordionContainer>
  );
};
export default FAQSection;
