import styled from '@emotion/styled';

export const MemberShipAgreementContainer = styled('div')({
  backgroundColor: 'var(--neutral-secondary)',
  display: 'flex',
  flexDirection: 'column',
  gap: '96px',
  alignItems: 'center',
  '.bottom-curve': {
    position: 'absolute',
    width: '100%',
    marginTop: '-1px',
  },
  '.header-wrapper': {
    width: '100%',
  },
});
export const HeaderContainer = styled('div')({
  backgroundColor: 'var(--sage-50)',
  display: 'flex',
  color: 'var(--neutral-primary)',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  paddingTop: '48px',
  paddingBottom: '30px',
  gap: '16px',
  textAlign: 'center',
});

export const CardContainer = styled('div')({
  maxWidth: '584px',
  display: 'flex',
  color: 'var(--neutral-primary)',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '24px',
  '.title': {
    textTransform: 'uppercase',
  },
  '.MuiGrid-root': {
    gap: '24px',
    '.MuiGrid-item': {
      width: '280px',
    },
  },
  '@media (max-width: 584px)': {
    '.grid-wrapper': {
      width: '100%',
      gap: '24px',
      padding: '24px',
      paddingBottom: '0px',
      margin: '0px',
      justifyContent: 'center',
      '.MuiGrid-item': {
        padding: '0px',
        maxWidth: '387px',
      },
    },
  },
});
export const Card = styled('div')({
  backgroundColor: 'var(--sage-50)',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  padding: '16px',
  alignItems: 'center',
  borderRadius: '8px',
  '.image': {
    height: '48px',
    width: '48px',
  },
  '.text-section':{
    textAlign:'center',
  }
});

export const NotesContainer = styled('div')({
  backgroundColor: 'var(--neutral-secondary-dark)',
  padding: '24px',
  color: 'var(--neutral-primary)',
  display: 'flex',
  borderRadius: '8px',
  maxWidth: '584px',

  '@media (max-width: 584px)': {
    maxWidth: '387px',
  },
  '@media (max-width: 400px)': {
    maxWidth: '327px',
  },
  '.note-txt': {
    display: 'inline',
  },
});
export const AccordionContainer = styled('div')({
  maxWidth: '584px',
  color: 'var(--neutral-primary)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '24px',
  width: '100%',
  '.title': {
    textTransform: 'uppercase',
  },
});

export const AccordionWrapper = styled('div')({
  borderBottom: '1px solid var(--neutral-secondary-dark)',
  borderTop: '1px solid var(--neutral-secondary-dark)',
  margin: '24px',
  marginTop: '0px',

  '@media (max-width: 584px)': {
    maxWidth: '387px',
  },
  '@media (max-width: 400px)': {
    maxWidth: '327px',
  },
  '.Mui-expanded': {
    margin: '0px',
  },
  '.MuiAccordionSummary-content': {
    margin: '16px 0px',
  },
  '.MuiAccordionSummary-root': {
    padding: '0px',
    width: '100%',

    '@media (max-width: 584px)': {
      maxWidth: '387px',
    },
    '@media (max-width: 400px)': {
      maxWidth: '327px',
    },
  },
  '.MuiAccordion-root': {
    boxShadow: 'none',
    color: 'var(--neutral-primary)',
  },
  '.MuiAccordion-root:before': {
    backgroundColor: 'transparent',
    borderBottom: '1px solid var(--neutral-secondary-dark)',
  },
  '.MuiAccordionDetails-root': {
    padding: '0px',
    paddingBottom: '16px',
  },
  '.link-text': {
    color: 'var(--accent-primary)',
  },
});

export const FullMembershipSectionContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  color: 'var(--neutral-primary)',
  '.title': {
    textTransform: 'uppercase',
  },
});
export const FullMembershipSectionWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '56px',
  padding: '24px',
  backgroundColor: 'var(--neutral-secondary-dark)',
  margin: '24px',
  borderRadius: '8px',
});
export const DefinitionSectionContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
});
export const DefinitionSectionContent = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  ul: {
    margin: '0px',
    paddingLeft: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  '.list-text': {
    display: 'inline',
  },
});
export const BenefitsSectionContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  '.list-section': {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    ul: {
      margin: '0',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      paddingLeft: '24px',
    },
  },
  '.content-wrapper': {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
});
export const AgreementSectionContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  '.list-wrapper': {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    ul: {
      margin: '0',
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
      paddingLeft: '24px',
    },
  },
});

export const AdditionalTermsContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  '.list-wrapper': {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    '.list-title': {
      display: 'inline',
    },
    '.list-item': {
      paddingLeft: '24px',
    },
  },
});

export const FooterWrapper = styled('div')({
  width: '100%',
  backgroundColor: 'var(--neutral-secondary)',
  position: 'sticky',
  bottom: '0px',
  display: 'flex',
  justifyContent: 'center',
  borderTop: '1px solid var(--neutral-secondary-dark)',
  '.footer-container': {
    maxWidth: '584px',
    textAlign: 'center',
    padding: '16px 24px',
    '.footer-text': {
      color: 'var(--neutral-primary-light)',
    },
  },
});

export const SuccessContainer = styled('div')({
  height: '100vh',
  width: '100%',
  backgroundColor: 'var(--neutral-secondary)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '24px',
  '.text-wrapper': {
    maxWidth: '384px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    textAlign: 'center',
    color: 'var(--neutral-primary)',
  },
});
