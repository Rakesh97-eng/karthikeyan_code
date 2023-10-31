import styled from '@emotion/styled';
import DownSideArrow from '../../../../assets/icons/arrow-down-black.svg';
import UpSideArrow from '../../../../assets/icons/arrow-up-black.svg';
import Checkbox from '../../../../assets/icons/checkmark-black.svg';

export const ScheduleHeaderWrapper = styled('div')({
  flex: 1,
  width: '100%',
  '.header-wrapper': {
    borderBottom: '1px solid var(--neutral-secondary-dark)',
    padding: '20px 16px 28px 24px',
    width: '100%',
    backgroundColor: 'var(--neutral-secondary)',
    '.header': {
      backgroundColor: 'var(--neutral-secondary)',
      display: 'flex',
      gap: '12px',
      alignItems: 'center',
      '.calendar-icon': {
        width: '32px',
        height: '32px',
      },
      h2: {
        flexGrow: 1,
        fontFamily: 'Tobias',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: '32px',
        lineHeight: '40px',
        color: '#35383D',
      },
      '.header-List': {
        height: '24px',
        width: '24px',
      },
      '.staff-wrapper': {
        position: 'relative',
        '.selected-option': {
          height: '40px',
          border: '1.5px solid var(--neutral-secondary-darker)',
          borderRadius: '4px',
          padding: '4px 8px',
          '.selected-name': {
            fontWeight: '700',
            color: 'var(--neutral-primary)',
            lineHeight: '28px',
          },
          '.list-arrow': {
            marginLeft: '4px',
            backgroundImage: `url(${DownSideArrow})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            width: '16px',
            height: '8px',
            display: 'inline-block',
          },
        },
        '.staff-options': {
          visibility: 'hidden',
          opacity: 0,
          transition: 'all 0.5s ease',
          display: 'inline-block',
          position: 'absolute',
          marginTop: '8px',
          zIndex: 12,
          border: '1px solid var(--neutral-secondary-darker)',
          borderRadius: '4px',
          backgroundColor: 'var(--neutral-secondary)',
          width: '160px',
          right: 0,
          maxHeight: '300px',
          overflowY: 'scroll',
          ul: {
            padding: '0',
            margin: '0',
            li: {
              display: 'block',
              transitionDuration: '0.5s',
              clear: 'both',
              width: '100%',
              padding: '0px 16px',
              margin: '0',
              overflow: 'hidden',
              height: '40px',
              lineHeight: '40px',
              borderBottom: '1px solid var(--neutral-secondary-darker)',
              '&:last-child': {
                borderBottomWidth: 0,
              },
            },
            '.selected': {
              backgroundImage: `url(${Checkbox})`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: '90%',
            },
          },
        },
        '&:hover > .staff-options': {
          visibility: 'visible',
          opacity: '1',
        },
        '&:hover > .selected-option .list-arrow': {
          backgroundImage: `url(${UpSideArrow})`,
        },
      },
    },
  },
  '@media (max-width:880px)': {
    '.header-wrapper': {
      padding: '16px 16px 24px 16px',
      '.header': {
        gap: '8px',
        '.calendar-icon': {
          height: '24px',
          width: '24px',
        },
        h2: {
          fontSize: '24px',
          lineHeight: '32px',
        },
        '.staff-wrapper': {
          '.selected-option': {
            height: '32px',
            padding: '2px 4px',
            '.selected-name': {
              lineHeight: '24px',
            },
          },
        },
      },
    },
  },
});
