import styled from '@emotion/styled';

export const ScheduleWeekWrapper = styled('div')({
  flex: 2,
  width: '100%',
  position: 'sticky',
  top: '0',
  zIndex: 11,
  '.calendar-custom-height': {},
  '.icon': {
    fontFamily: 'Material Icons',
    fontStyle: 'normal',
    display: 'inline-block',
    verticalAlign: 'middle',
    lineHeight: '1',
    textTransform: 'none',
    letterSpacing: 'normal',
    wordWrap: 'normal',
    whiteSpace: 'nowrap',
    direction: 'ltr',
    textRendering: 'optimizeLegibility',
  },

  '.row': {
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },

  '.row-middle': {
    alignItems: 'center',
  },

  '.col': {
    flexGrow: 1,
    flexBasis: 0,
    maxWidth: '100%',
  },

  '.col-start': {
    justifyContent: 'flex-start',
    textAlign: 'left',
    position: 'relative',
    marginTop: '-90px',
  },

  '.col-center': {
    justifyContent: 'center',
    textAlign: 'center',
  },

  '.col-end': {
    justifyContent: 'flex-end',
    textAlign: 'right',
    position: 'relative',
    marginTop: '-90px',
  },

  // /* Calendar */

  '.calendar': {
    display: 'block',
    width: '100%',
    background: 'var(--neutral-secondary-dark)',
    borderWidth: '0.5px 0px',
    borderStyle: 'solid',
    borderColor: 'var(--neutral-secondary-darker)',
    left: 0,
    right: 0,
    padding: '0 60px',

    '&.customPadding': {
      padding: '0 40px',
    },

    '.header': {
      padding: '10px 0',
      justifyContent: 'center',
      alignItems: 'center',

      '.icon': {
        cursor: 'pointer',
        transition: '0.15s ease - out',

        '&:hover': {
          transition: '0.25s ease - out',
        },

        '&:first-of-type': {
          marginLeft: '-30px',
          marginTop: '8px',
        },

        '&:last-of-type': {
          marginRight: '-30px',
          marginTop: '8px',
        },
      },
    },

    '.days': {
      textTransform: 'uppercase',
      fontWeight: 400,
      color: 'var(--neutral-primary)',
      paddingTop: '0.75em',
    },

    '.body': {
      '.cell': {
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: '0.25s ease - out',
        fontSize: '1.5em',
        padding: '5px',
        textAlign: 'center',

        '.number': {
          fontSize: '16px',
          lineHeight: '24px',
          fontWeight: 700,
          color: 'var(--neutral-primary)',
          display: 'block',
          width: '26px',
          height: '26px',
          textAlign: 'center',
          margin: 'auto',
        },

        '.bg': {
          fontWeight: 700,
          lineHeight: '1',
          opacity: 0,
          fontSize: '8em',
          position: 'absolute',
          top: '-0.2em',
          right: '-0.05em',
          transition: '0.25s ease - out',
          letterSpacing: ' -0.07em',
        },

        '&:hover': {
          transition: '0.5s ease - out',

          '.bg': {
            opacity: 0.05,
            transition: '0.5s ease -in',
          },
        },

        '&:last-child': {
          borderRight: 'none',
        },

        '&.today .bg': {
          color: 'var(--red)',
          opacity: 0.05,
        },
      },

      '.today': {
        borderBottom: '1px solid var(--neutral-primary)',
      },

      '.selected  ': {
        borderBottomWidth: 0,
        backgroundColor: 'var(--ocean-100)',
        borderRadius: '16px',
        color: 'var(--neutral-secondary) !important',
      },

      '.disabled': {
        color: 'var(--neutral-primary-lighter)',
        pointerEvents: 'none',

        '.number': {
          color: 'var(--neutral-primary-lighter)',
        },
      },

      '.col': {
        flexGrow: 1,
        flexBasis: 'calc(100% / 7)',
        width: 'calc(100% / 7)',
      },
    },
  },

  '.days-name': {
    fontFamily: 'Cadiz',
    color: 'var(--neutral-primary)',
    fontSize: '14px',
  },
  '.selected-date': {
    fontFamily: 'Cadiz',
    color: 'var(--neutral-primary)',
    fontSize: '14px',
    lineHeight: '20px',
    fontWeight: 400,
    textAlign: 'center',
  },
  '.selected-month': {
    fontFamily: 'Cadiz',
    color: 'var(--dark-black)',
    fontSize: '16px',
    lineHeight: '24px',
    fontWeight: 600,
  },

  '.calender-container': {
    position: 'relative',
  },
  '.curser-type': {
    cursor: 'pointer',
    display: 'block',
    alignItems: 'center',
  },
  '.arrow-left': {
    position: 'absolute',
    marginTop: '-45px',
  },
  '.arrow-right': {
    position: 'absolute',
    marginTop: '-45px',
    right: '15px',
  },
  '.arrow-icon': {
    marginLeft: '10px',
  },
  '.calender-container:before': {
    content: '""',
    height: 'calc(100 % - 195px)',
  },

  '.col.col-start.header_icon, .col.col-end.header_icon': {
    top: '10px',
  },
  '.calender-container .calendar': {
    position: 'absolute',
    zIndex: 9,
  },
  '.col.cell.inactiveDay': {
    visibility: 'hidden',
  },
  '@media only screen and (max-width: 499px)': {
    '.calendar': {
      padding: 0,
    },
    '.days-name:first-letter': {
      color: 'var(--neutral-primary)',
    },

    '.col-start, .col-end, .arrow-left, .arrow-right': {
      display: 'none',
    },
  },
});
