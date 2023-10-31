import {
  Box,
  Grid,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import { FC, useContext, useEffect, useState } from 'react';
import {
  CancelChangesBtn,
  EditButtonsWrapper,
  InnerWrapper,
  SkinProfilePopupWrapper,
  SPEditHeader,
  SPHeaderTitle,
} from './styles';
import { skinProfileSchema } from '../../../utils/yup-schema/skinProfile';
import { ValidationError } from 'yup';
import { generateValidationErrorObject } from '../../../utils/helper-functions/yup';
import { ErrorToast } from '../../common/ErrorToast';

//components
import TRClientPreferences from '../../treatment-record/client-preferences';

//icons
import { ReactComponent as XIcon } from '../../../assets/icons/X-icon.svg';
import KeyAttributeIcon from '../../../assets/icons/sp-key-attribute-icon.svg';

import {
  ADDITIONAL_RESPONSE,
  LOCAL_STORAGE_KEYS,
  SKIN_PROFILE_SECTIONS,
} from '../../../constants/appConstants';
import {
  ErrorObject,
  IntakeFormType,
  IParams,
  SkinProfileSectionType,
} from '../../../types/clientProfile';
import SPSection from './sp-section';
import { ClientDetailsContext } from '../../../providers/context/ClientDetailsContext';
import StyledButton from '../../common/Button';
import CustomDialog from '../../common/CustomDialog';
import { CLIENT_SKIN_PROFILE } from '../../../constants/clients';
import { getLocalStorageItem } from '../../../utils/helper-functions/user';
import {
  IIntakeJSON,
  IKeyValueMap,
} from '../../../types/services/HealthIntake';
import { TClientContext } from '../../../types/store/client';
import ClientContext from '../../../store/client/ClientContext';
import { IntakeFormState, IntakePatchPayload } from '../../../types/store/form';
import { IntakeService } from '../../../services/intakeShop';
import { useParams } from 'react-router-dom';
import { ToastContext } from '../../../providers/context/toastContext';
import { AxiosError } from 'axios';

interface IEditSkinProfile {
  closeFunc: () => void;
  isModalOpen: boolean;
  setModalOpen: (data: boolean) => void;
}

interface SPFormDataInterface {
  data: IntakeFormType[] | undefined;
  errors?: ErrorObject;
}

interface ErrorToastData {
  title: string;
  list: string[];
}

interface IntakeQuestionMapping {
  [key: string]: IntakeAnswerMapping;
}

interface IntakeAnswerMapping {
  answer: string[];
  otherAnswer: string;
}

const EditSkinProfile: FC<IEditSkinProfile> = ({
  closeFunc,
  isModalOpen,
  setModalOpen,
}) => {
  const { clientID }: IParams = useParams();
  const { clientDetailData, updateIntakeProfile } =
    useContext(ClientDetailsContext);
  const { clientState } = useContext<TClientContext>(ClientContext);
  const clientSkinProfile = clientDetailData?.intakeForm || CLIENT_SKIN_PROFILE;
  const [errorToastData, setErrorToastData] = useState<ErrorToastData>();
  const { showErrorDialog } = useContext(ToastContext);
  const spFormData: SPFormDataInterface = {
    data: clientSkinProfile,
  };

  useEffect(() => {
    const savedS3Intake = getLocalStorageItem(
      LOCAL_STORAGE_KEYS.S3_HEALTH_INTAKE
    );
    if (savedS3Intake) {
      const savedS3IntakeJson = JSON.parse(savedS3Intake);

      if (savedS3IntakeJson.data) {
        const s3IntakeJson: IIntakeJSON = savedS3IntakeJson.data;

        const questionMapper: IKeyValueMap = {};
        for (const key in s3IntakeJson.intakeQuestions) {
          if (
            Object.prototype.hasOwnProperty.call(
              s3IntakeJson.intakeQuestions,
              key
            )
          ) {
            const element = s3IntakeJson.intakeQuestions[key];
            questionMapper[element.questionId] = key;
          }
        }

        SKIN_PROFILE_SECTIONS.map((section) => {
          section?.sectionQuestions?.map((question) => {
            question.options = [];

            if (
              Object.prototype.hasOwnProperty.call(questionMapper, question.id)
            ) {
              const questionId = questionMapper[question.id];

              if (
                Object.prototype.hasOwnProperty.call(
                  s3IntakeJson.intakeQuestions,
                  questionId
                )
              ) {
                question.uuid = questionId;

                s3IntakeJson.intakeQuestions[questionId].options.map(
                  (optionId: string) => {
                    question.options?.push({
                      label: s3IntakeJson.intakeOptions[optionId],
                      value: optionId,
                    });
                  }
                );
                clientState?.healthIntake?.forEach((sectionData) => {
                  if (questionId === sectionData?.questionId) {
                    question.selectedResponse = sectionData?.answer;
                  }
                });
              }
            }
          });
        });

        const newMap: IntakeQuestionMapping = {};
        clientState.healthIntake?.forEach((h_i) => {
          if (Object.prototype.hasOwnProperty.call(newMap, h_i.questionId)) {
            if (h_i.answer.length || h_i.otherAnswer != '') {
              newMap[h_i.questionId] = {
                answer: h_i.answer,
                otherAnswer: h_i.otherAnswer,
              };
            }
          } else {
            newMap[h_i.questionId] = {
              answer: h_i.answer,
              otherAnswer: h_i.otherAnswer,
            };
          }
        });

        CLIENT_SKIN_PROFILE?.forEach((clientSkinProfile) => {
          SKIN_PROFILE_SECTIONS?.forEach((skinProfileSection) => {
            if (clientSkinProfile.sectionID === skinProfileSection.sectionID) {
              clientSkinProfile.sectionResponses.forEach(
                (clientSkinProfileResp) => {
                  skinProfileSection?.sectionQuestions?.forEach(
                    (skinProfileSectionQuestion) => {
                      if (
                        clientSkinProfileResp.questionID ===
                          skinProfileSectionQuestion.id &&
                        Object.prototype.hasOwnProperty.call(
                          newMap,
                          skinProfileSectionQuestion.uuid || ''
                        )
                      ) {
                        clientSkinProfileResp.questionResponse =
                          newMap[
                            skinProfileSectionQuestion.uuid || ''
                          ].answer.join(',');
                        clientSkinProfileResp.additionalResponse =
                          newMap[
                            skinProfileSectionQuestion.uuid || ''
                          ].otherAnswer;
                      }
                    }
                  );
                }
              );
            }
          });
        });

        setFormData({ data: CLIENT_SKIN_PROFILE });
      }
    }
  }, [clientState]);

  const [formData, setFormData] = useState<SPFormDataInterface>(spFormData);

  const clientFormData = formData.data;

  const handleChange = (
    sectionID: string,
    questionID: string,
    newResponse?: string,
    additionalResponse?: string
  ) => {
    setFormData((prevState: SPFormDataInterface) => {
      if (prevState !== undefined) {
        const newFormData = prevState.data;
        newFormData
          ?.find((currSection) => currSection.sectionID === sectionID)
          ?.sectionResponses.map((currResponse) => {
            if (
              newResponse !== undefined &&
              currResponse.questionID === questionID
            ) {
              currResponse.questionResponse = newResponse;
            }
            if (
              additionalResponse !== undefined &&
              currResponse.questionID === questionID
            ) {
              currResponse.additionalResponse = additionalResponse;
            }
            return currResponse;
          });
        return {
          data: newFormData,
        };
      } else {
        return prevState;
      }
    });
  };

  /**
   * calculates the error toast data
   * based on the errors in the context value
   */
  useEffect(() => {
    if (!formData.errors) {
      setErrorToastData(undefined);
      return;
    }
    setErrorToastData({
      title: `Fix ${
        Object.keys(formData.errors).length
      } items in order to save your changes :`,
      list: Object.values(formData.errors),
    });
  }, [formData.errors]);

  interface IQuestionResp {
    [questionID: string]: string;
  }

  /**
   * validate
   * calculates the validation errors based on the schema
   * updates the formState in the context
   * @returns Promise<void>
   */
  const validate = async (): Promise<boolean> => {
    const questionRespArr: IQuestionResp = {};
    formData.data?.map((section) =>
      section.sectionResponses.forEach((sectionResp) => {
        questionRespArr[sectionResp.questionID] = sectionResp.questionResponse;
        if (sectionResp.additionalResponse !== undefined) {
          questionRespArr[sectionResp.questionID + ADDITIONAL_RESPONSE] =
            sectionResp.additionalResponse;
        }
      })
    );
    try {
      await skinProfileSchema.validate(questionRespArr, {
        abortEarly: false,
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        const generatedErrors = generateValidationErrorObject(error);
        setFormData((prevState: SPFormDataInterface) => {
          return {
            ...prevState,
            errors: generatedErrors,
          };
        });
      }
      return false;
    }
    return true;
  };

  const handleSaveAndClose = async () => {
    const isValid = await validate();
    if (isValid) {
      const skinProfileSaveData: IntakeFormState[] = [];
      SKIN_PROFILE_SECTIONS.forEach((section) => {
        section?.sectionQuestions?.forEach((sectionSkinQuestion) => {
          formData.data?.forEach((formValue) => {
            formValue?.sectionResponses?.forEach((formValueResp) => {
              if (sectionSkinQuestion?.id === formValueResp.questionID) {
                const savedIntakeRow = clientState?.healthIntake?.find(
                  (row) => row.questionId === sectionSkinQuestion.uuid
                );
                const skinProfileSaveRow: IntakeFormState = {
                  question_id: sectionSkinQuestion.uuid,
                  answer:
                    formValueResp.questionResponse &&
                    formValueResp.questionResponse !=
                      formValueResp.additionalResponse
                      ? formValueResp.questionResponse.split(',')
                      : [],
                  other_answer: formValueResp.additionalResponse || '',
                };
                if (savedIntakeRow) {
                  skinProfileSaveRow.id = savedIntakeRow.id;
                }
                skinProfileSaveData.push(skinProfileSaveRow);
              }
            });
          });
        });
      });
      updateIntakeProfile(formData.data);
      const final: IntakePatchPayload[] = skinProfileSaveData.map(
        (skinProfileRow) => {
          if (!skinProfileRow.id) {
            return {
              type: 'health_intake',
              attributes: skinProfileRow,
            };
          }
          return {
            id: skinProfileRow.id,
            type: 'health_intake',
            attributes: skinProfileRow,
          };
        }
      );

      try {
        await IntakeService.patchIntake(clientID, final);
      } catch (error) {
        if (error instanceof AxiosError) {
          showErrorDialog(error?.message);
        } else if (error instanceof Error) {
          showErrorDialog(error?.message);
        }
        console.log(error);
      }
      closeFunc();
    }
  };

  const handleCancel = () => {
    setModalOpen(false);
    closeFunc();
  };

  const keyAttributesSection = {
    sectionID: 'keyAttributes',
    sectionTitle: 'Manage Key Attributes',
    sectionIcon: KeyAttributeIcon,
    sectionInfo:
      "Track your client's treatment preferences (e.g. likes extra skincare education).",
  };
  return (
    <Box>
      <SPEditHeader position='static'>
        <Toolbar>
          <SPHeaderTitle variant='body1'>Edit Skin Profile</SPHeaderTitle>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
            className='dismiss-icon'
            onClick={() => setModalOpen(true)}
          >
            <XIcon />
          </IconButton>
        </Toolbar>
      </SPEditHeader>

      <InnerWrapper>
        <SPSection {...keyAttributesSection}>
          <TRClientPreferences />
        </SPSection>

        {SKIN_PROFILE_SECTIONS.filter(
          (skinProfile) => skinProfile.sectionID !== 'summary'
        ).map((skinProfile: SkinProfileSectionType) => {
          const clientSectionData = clientFormData?.find(
            (currSection) => currSection.sectionID === skinProfile.sectionID
          )?.sectionResponses;

          return (
            <SPSection
              key={skinProfile.sectionID}
              handleChange={handleChange}
              {...skinProfile}
              clientSectionData={clientSectionData}
              errors={formData.errors}
            />
          );
        })}
      </InnerWrapper>
      {errorToastData && <ErrorToast data={errorToastData} />}
      <EditButtonsWrapper container spacing={1}>
        <Grid item xs={6}>
          <StyledButton
            variant='outlined'
            value='Cancel'
            onClick={() => setModalOpen(true)}
          />
        </Grid>
        <Grid item xs={6}>
          <StyledButton
            variant='contained'
            value='Save &amp; Close'
            onClick={handleSaveAndClose}
          />
        </Grid>
      </EditButtonsWrapper>
      <CustomDialog
        isModalOpen={isModalOpen}
        handleClose={() => setModalOpen(false)}
        maxwidthsize='354px'
      >
        <SkinProfilePopupWrapper textAlign={'center'}>
          <Typography variant='h3'>Are you sure?</Typography>
          <Typography variant='body1' className='content'>
            Cancelling will result in losing any changes.
          </Typography>
          <Stack direction='column' className='buttons-wrapper'>
            <CancelChangesBtn variant='contained' onClick={handleCancel}>
              <Typography variant='btn' fontWeight='700'>
                Cancel Changes
              </Typography>
            </CancelChangesBtn>
            <StyledButton
              variant='outlined'
              value='Keep Editing'
              onClick={() => setModalOpen(false)}
            />
          </Stack>
        </SkinProfilePopupWrapper>
      </CustomDialog>
    </Box>
  );
};

export default EditSkinProfile;
