import { FC } from 'react';
import { AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import { ReactComponent as DownSideArrow } from '../../../assets/icons/down-side-arrow.svg';
import { StyledAccordion } from './styles';

interface IAccordionItem {
  accordionID: string;
  accordionTitle: string;
  accordionExpanded?: string;
  handleChange: (panel: string, isExpanded: boolean) => void;
}

const AccordionItem: FC<IAccordionItem> = ({
  accordionID,
  accordionTitle,
  accordionExpanded,
  handleChange,
  children,
}) => {
  const handleAccordionChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      handleChange(panel, isExpanded);
    };

  return (
    <StyledAccordion
      className='accordion-wrapper'
      expanded={accordionExpanded === accordionID}
      onChange={handleAccordionChange(accordionID)}
    >
      <AccordionSummary
        expandIcon={<DownSideArrow />}
        aria-controls='panel1a-content'
        id='panel1a-header'
        classes={{
          root: 'accordion-summary-root',
          content: 'accordion-summary-content',
          expanded: 'accordion-summary-expanded',
        }}
      >
        <Typography
          className={`accordion-title ${
            accordionExpanded && 'accordion-title-expanded'
          }`}
        >
          {accordionTitle}
        </Typography>
      </AccordionSummary>

      <AccordionDetails
        classes={{
          root: 'accordion-details',
        }}
      >
        {children}
      </AccordionDetails>
    </StyledAccordion>
  );
};

export default AccordionItem;
