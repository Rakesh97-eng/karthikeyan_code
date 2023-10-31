import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import { StyledIconButton } from '../intake.styles';
import {
  IntakeSectionBodyContainer,
  IntakeSectionContainer,
  IntakeSectionHeaderContainer,
} from './intakeSection.styles';
import { ReactComponent as BackIcon } from '../../../assets/icons/chevron-left.svg';
import {
  IntakeSectionTypes,
  IntakeSectionElementTypes,
} from '../../../types/treatmentRecord/question';
import IntakeRadioButton from '../intake-common/intakeRadioButton';
import IntakeCheckbox from '../intake-common/intakeCheckbox';
import LinearWithValueLabel from '../intake-progress-bar';
import StyledButton from '../../common/Button';
import IntakeDateField from '../intake-common/intakeDateField';
import IntakeTextArea from '../intake-common/intakeTextArea';
import { FC, useRef, useState, useContext, useEffect } from 'react';
import { UnderEighteenPopUp, UnderFifteenPopUp } from '../intake-popup';
import IntakeCustomDialog from '../intake-common/intakeCustomDialog';
import { IntakeFormState } from '../../../types/store/form';
import { useHistory, useLocation } from 'react-router-dom';
import {
  dateFormatValidator,
  getFilterData,
} from '../../../utils/helper-functions/common';
import { CustomerDetailsContext } from '../../../providers/context/IntakeClientContext';
import IntakeRadioButtonWithTextField from '../intake-common/IntakeRadioButtonWithTextField';
import IntakeCheckboxWithTextField from '../intake-common/IntakeCheckboxWithTextField';
import { LayoutContext } from '../../../providers/context/LayoutContext';
import { SHOP } from '../../../constants/intakeConstants';
import { ToastContext } from '../../../providers/context/toastContext';
import { batchClientIntake, batchShopIntake } from '../../../services/user';
import { StyledCircularProgress } from '../../../containers/layout.styles';
import { INTAKE_YES, INTAKE_OTHERS } from '../../../constants/appConstants';
import { radioWithTextfieldValidation } from "../../../utils/helper-functions/intakeForm";

type HeaderProps = {
  headerText: string;
  title: string;
  progress: string;
};
export interface IntakeSectionProps {
  header?: HeaderProps;
  headerColor: string;
  bottomCurve: string;
  mobileBottomCurve: string;
  navigateTo: string;
  sectionId: string;
  onClickType: string;
  localJsonData: IntakeSectionTypes[];
  progressValue: number;
  isShow?: boolean;
  buttonText?: string;
}
interface HandleProgressProps {
  handleProgress(): void;
}

const IntakeSection: FC<IntakeSectionProps> = ({
  header,
  headerColor,
  bottomCurve,
  localJsonData,
  sectionId,
  navigateTo,
  mobileBottomCurve,
  onClickType,
  progressValue,
  isShow = true,
  buttonText='Next'
}) => {
  const childRef = useRef<HandleProgressProps>(null);
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [ageEighteen, setAgeEighteen] = useState<boolean>(false);
  const [ageFifteen, setAgeFifteen] = useState<boolean>(false);
  const [dateError, setDateError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const {
    updateProgressData,
    updateData,
    customerData,
    S3JsonData,
    updateError,
    userLogout,
    allAnswers,
    allowSubmit,
    updateSubmit
  } = useContext(CustomerDetailsContext);
  const { showToast } = useContext(ToastContext);
  const [userSelections, setUserSelections] = useState<IntakeFormState[]>(
    customerData.data
  );
  const { search = '' } = useLocation();
  const {
    layoutData: { isClientIntake, token },
  } = useContext(LayoutContext);
  const PREFIX = !isClientIntake ? SHOP : '';
  navigateTo = `${PREFIX}${navigateTo}${search}`;
  const history = useHistory();
  const { showErrorDialog } = useContext(ToastContext);
  const params = new URLSearchParams(search);
  const clientId = params.get('cid');
  const [showForm, setShowForm] = useState<boolean>(false);
  const [sectionData, setSectionData] = useState<IntakeSectionTypes[]>([]);

  useEffect(() => {
    updateProgressData(progressValue);
  }, [progressValue]);

  useEffect(() => {
    if ((!customerData?.isLoggedIn && isClientIntake) || (!allowSubmit && isClientIntake)) {
      userLogout();
    }
  }, [customerData?.isLoggedIn,allowSubmit]);

  useEffect(() => {
    const matchedSectionData = S3JsonData[sectionId];
    const data = getFilterData(
      localJsonData,
      matchedSectionData,
      customerData?.data,
      allAnswers
    );
    setSectionData(data);
  }, [sectionId, customerData?.data, S3JsonData]);

  useEffect(() => {
    setShowForm(
      (customerData?.isLoggedIn || !isClientIntake) && !!sectionData[0]?.id
    );
  }, [sectionData, S3JsonData]);

  const commonHandler = (data: IntakeFormState) => {
    const selectedData = [...userSelections];
    if (data.question_id) {
      const ind = selectedData.findIndex(
        (a) => a.question_id === data.question_id
      );
      if (selectedData[ind]) {
        if (!data?.other_answer && data.answer.length === 0) {
          selectedData.splice(ind, 1);
        } else {
          selectedData[ind] = data;
        }
      } else {
        selectedData.push(data);
      }
      setUserSelections(selectedData);
    }
  };

  const onDateClickHandler = (data: IntakeFormState) => {
    if (dateFormatValidator(data.other_answer)) {
      commonHandler(data);
      const todayDate = new Date();
      let difference =
        (todayDate?.getTime() - new Date(data.other_answer).getTime()) / 1000;
      difference /= 60 * 60 * 24;
      const ageDifferent = Math.abs(Math.round(difference / 365.25));
      if (difference > 0) {
        setDateError(false);
        if (ageDifferent <= 18 && ageDifferent > 15) {
          setDateError(true);
          setAgeEighteen(true);
          setAgeFifteen(false);
          setIsOpen(true);
        } else if (ageDifferent <= 15) {
          setDateError(true);
          setAgeFifteen(true);
          setAgeEighteen(false);
          setIsOpen(true);
        } else {
          setDateError(false);
          setAgeFifteen(false);
          setAgeEighteen(false);
        }
      } else {
        setDateError(true);
      }
    } else {
      setDateError(true);
    }
  };

  const requiredCheck = (userSelections: IntakeFormState[]): boolean => {
    const listData = sectionData.filter((a) => !!a.mandatory);
    const res = listData.filter((a) => {
      if (a.questionId === 'rxTopicals') {
        return radioWithTextfieldValidation(a, userSelections, INTAKE_YES);
      }
      if (a.questionId === 'topicalAlergies') {
        return radioWithTextfieldValidation(a, userSelections, INTAKE_OTHERS);
      }
      return (
        userSelections.findIndex((k) => {
          return k.question_id === a.id;
        }) === -1
      );
    });
    if (res.length > 0) {
      updateError(res.map((k) => k?.id ?? ''));
      showToast({
        text: `Oops! Looks like we’re missing answers to ${res.length} questions.`,
        variant: 'error',
        isIcon: false,
        vertical: 'bottom',
        close: false,
      });
    } else {
      updateError([]);
    }
    return res.length === 0;
  };

  const handleClick = async (onClickType: string) => {
    if (!requiredCheck(userSelections)) {
      return;
    }
    if (dateError) {
      return;
    }
    childRef.current?.handleProgress();
    updateData({
      section: { ...customerData.section, [onClickType]: userSelections },
      data: userSelections,
    });
    if (onClickType === 'sensitiveSection') {
      setLoading(true);
      if (isClientIntake) {
        try {
          await batchClientIntake({ data: userSelections });
          updateSubmit(false)
        } catch (error: any) {
          showErrorDialog(error.message);
          return;
        }
      } else {
        const changeToPayload = userSelections.map((a) => ({
          type: 'health_intake',
          attributes: a,
        }));
        try {
          await batchShopIntake({ data: changeToPayload }, clientId, token);
        } catch (error: any) {
          showErrorDialog(error.message);
          return;
        }
      }
      setLoading(false);
    }
    history.push(navigateTo);
    scrollTo(0, 0);
  };
  const navigateBack = () => {
    history.goBack();
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  const isDateValidate = () => {
    setDateError(false);
  };
  const getSectionElement = (sectionElement: IntakeSectionTypes) => {
    switch (sectionElement.type) {
      case IntakeSectionElementTypes.radio: {
        if (
          sectionElement.includeOtherVal &&
          sectionElement.includeOtherVal !== ''
        ) {
          return (
            <IntakeRadioButtonWithTextField
              {...sectionElement}
              onChangeHandler={commonHandler}
              includeOtherVal={sectionElement.includeOtherVal}
            />
          );
        } else {
          return (
            <>
              {sectionElement?.isListPresent && (
                <div className='list-items'>
                  {sectionElement?.listItems?.map((item, i) => {
                    return (
                      <Typography
                        key={`list-${i}`}
                        component='li'
                        variant={'mono1'}
                        color='var(--neutral-primary)'
                      >
                        {item}
                      </Typography>
                    );
                  })}
                </div>
              )}
              <IntakeRadioButton
                {...sectionElement}
                onChangeHandler={commonHandler}
              />
            </>
          );
        }
      }

      case IntakeSectionElementTypes.checkbox: {
        if (
          sectionElement.includeOtherVal &&
          sectionElement.includeOtherVal !== ''
        ) {
          return (
            <IntakeCheckboxWithTextField
              {...sectionElement}
              onChangeHandler={commonHandler}
              includeOtherVal={sectionElement.includeOtherVal}
            />
          );
        } else {
          return (
            <IntakeCheckbox
              {...sectionElement}
              onChangeHandler={commonHandler}
            />
          );
        }
      }
      case IntakeSectionElementTypes.date:
        return (
          <IntakeDateField
            {...sectionElement}
            onChangeHandler={onDateClickHandler}
            error={dateError}
          />
        );
      case IntakeSectionElementTypes.textarea:
        return (
          <IntakeTextArea
            {...sectionElement}
            onChangeHandler={commonHandler}
            placeholder={'Zip Code'}
            validateType='ZipCode'
          />
        );
      case IntakeSectionElementTypes.textbox:
        return (
          <IntakeTextArea {...sectionElement} onChangeHandler={commonHandler} />
        );
      default:
        return null;
    }
  };

  if (!showForm) {
    return <StyledCircularProgress className='loader' />;
  }

  return (
    <IntakeSectionContainer BottomCurve={mobileBottomCurve}>
      <LinearWithValueLabel ref={childRef} />
      <IntakeSectionHeaderContainer backgroundColor={headerColor}>
        <Grid container className='header-wrapper'>
          <Grid item xs={12}>
            <div className='section'>
              <div>
                {isShow && (
                  <StyledIconButton startIcon={<BackIcon />}>
                    <Typography
                      variant='btn'
                      color='var(--neutral-primary)'
                      onClick={navigateBack}
                    >
                      Back
                    </Typography>
                  </StyledIconButton>
                )}
              </div>

              <div className='section-number'>
                <Typography textAlign={'center'} variant='label'>
                  {header?.progress}
                </Typography>
              </div>
            </div>
            <div className='header-container'>
              <Typography
                variant='h2'
                textAlign={'center'}
                color={'var(--neutral-primary)'}
              >
                {header?.headerText}
              </Typography>
              <Typography
                variant='body1'
                textAlign={'center'}
                className='title'
                color={'var(--neutral-primary)'}
              >
                {header?.title}
              </Typography>
            </div>
          </Grid>
        </Grid>
      </IntakeSectionHeaderContainer>
      <img src={bottomCurve} className='bottom-curve' alt='bottom-curve' />
      <IntakeSectionBodyContainer>
        <div className='intake-container'>
          {sectionData.map((section: IntakeSectionTypes, index: number) => (
            <div
              key={`section-wrapper-${index}`}
              className='intake-content-wrapper'
            >
              <div className='header'>
                <img src={section.icon} className="icon" />
                <Typography variant='h4' maxWidth={'560px'} fontWeight={400}>
                  {section.title}
                </Typography>
              </div>
              <Box className='question-section'>
                {getSectionElement(section)}{' '}
              </Box>
            </div>
          ))}
          <div className='button-wrapper'>
            <StyledButton
              variant='contained'
              isDisabled={loading}
              value={
                loading ? <CircularProgress color='info' size={20} /> : buttonText
              }
              onClick={() => {
                handleClick(onClickType);
              }}
            />
          </div>
        </div>
      </IntakeSectionBodyContainer>
      {(ageEighteen || ageFifteen) && (
        <IntakeCustomDialog
          isModalOpen={isOpen}
          handleClose={handleClose}
          maxWidthSize='684px'
        >
          {ageEighteen && <UnderEighteenPopUp onClose={handleClose} isDateValidate={isDateValidate} />}
          {ageFifteen && <UnderFifteenPopUp onClose={handleClose} />}
        </IntakeCustomDialog>
      )}
    </IntakeSectionContainer>
  );
};
export default IntakeSection;
