import { FC, useContext, useState } from 'react';
import { DetailContainer } from '../detail-container';

// components
import AccordionItem from '../../common/AccordionItem';

// icons
import SkinProfileIcon from '../../../assets/icons/skin-profile.svg';
import { ReactComponent as SkinProfileSummaryIcon1 } from '../../../assets/icons/skin-profile-summary-1.svg';

// constants
import {
  CLIENT_PREFERENCES,
  SKIN_PROFILE_SECTIONS,
} from '../../../constants/appConstants';
import { Box, Typography } from '@mui/material';
import { ClientDetailsContext } from '../../../providers/context/ClientDetailsContext';
import ClientContext from '../../../store/client/ClientContext';
import { SkinProfileDetailWrapper, SPEditDialog } from './styles';
import AttributePill from '../../common/AttributePill';
import EditSkinProfile from '../edit-skin-profile';
import { IHealthIntake } from '../../../types/services/HealthIntake';
import { SkinProfileSectionType } from '../../../types/clientProfile';
import { ReactComponent as EditPencil } from '../../../assets/icons/edit-pencil.svg';

const SkinProfile: FC<IHealthIntake> = ({ intakeHealthInfo }) => {
  const { clientDetailData } = useContext(ClientDetailsContext);
  const { clientState } = useContext(ClientContext);
  const clientSkinProfile = clientDetailData?.intakeForm;
  const [isModalOpen, setModalOpen] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [expandedSkinProfile, setExpandedSkinProfile] =
    useState<string>('summary');

  const toggleEditDialog = () => {
    setEditDialog(!editDialog);
  };

  const handleSkinProfileChange = (
    currAccordionID: string,
    isAccordionExpanded: boolean
  ) => {
    setExpandedSkinProfile(isAccordionExpanded ? currAccordionID : '');
  };

  const selectedPreferences = clientState?.keyAttributes?.map(
    (keyAttribute) => {
      return CLIENT_PREFERENCES?.find(
        (clientPref) => clientPref.cp_label === keyAttribute
      );
    }
  );

  const getSummarySensitivities = () => {
    const summarySensitivity: SkinProfileSectionType[] =
      SKIN_PROFILE_SECTIONS.filter((f) => f.sectionID === 'sensitivities') ||
      null;

    return (
      <SkinProfileDetailWrapper>
        <Typography variant='body3' className='question-title' fontWeight={400}>
          Sensitivities
        </Typography>

        <Box className='question-response'>
          <Box className='attribute-pill-wrapper'>
            {summarySensitivity[0]?.sectionQuestions?.map((question) => {
              let sensitivityAnswers = '';
              if (
                intakeHealthInfo?.sensitivities[question.id]['answer'].length >
                0
              ) {
                sensitivityAnswers =
                  intakeHealthInfo?.sensitivities[question.id]['answer'].join(
                    ', '
                  );
              }
              if (
                intakeHealthInfo?.sensitivities[question.id]['otherAnswer']
                  .length > 0
              ) {
                sensitivityAnswers += sensitivityAnswers !== '' ? ', ' : '';
                sensitivityAnswers +=
                  intakeHealthInfo?.sensitivities[question.id]['otherAnswer'];
              }
              if (sensitivityAnswers.trim().toLowerCase() === 'yes') {
                sensitivityAnswers = question.questionTitle;
              }
              if (
                sensitivityAnswers.trim().toLowerCase() === 'no' ||
                sensitivityAnswers.trim() === ''
              ) {
                return null;
              }
              return (
                <AttributePill
                  id={`summary-topical-allergies-${question.id}`}
                  PrefIcon={question.summaryIcon || SkinProfileSummaryIcon1}
                  label={sensitivityAnswers}
                  backgroundColor='neutral-secondary'
                  key={question.id}
                  lineHeight={"1.25"}
                />
              );
            })}
          </Box>
        </Box>
      </SkinProfileDetailWrapper>
    );
  };

  return (
    <DetailContainer
      headerLeftIcon={<object type='image/svg+xml' data={SkinProfileIcon} />}
      headerText='Skin Profile'
      // Hide the edit action for MVP
      headerRightIcon={<EditPencil />}
      headerRightIconClick={() => {
        toggleEditDialog();
      }}
      aside
    >
      {SKIN_PROFILE_SECTIONS.map((skinProfileSection) => {
        const clientSkinProfileSection = clientSkinProfile?.find(
          (currClientSkinProfSection) =>
            currClientSkinProfSection.sectionID === skinProfileSection.sectionID
        );
        const isSummarySection = skinProfileSection.sectionID === 'summary';

        return (
          <AccordionItem
            key={`accordion-${skinProfileSection.sectionID}`}
            accordionTitle={skinProfileSection.sectionTitle}
            accordionID={skinProfileSection.sectionID}
            handleChange={handleSkinProfileChange}
            accordionExpanded={expandedSkinProfile}
          >
            {
              (skinProfileSection.sectionID === 'basics' && intakeHealthInfo?.basics) ?
                (
                  <>
                    <SkinProfileDetailWrapper
                      key={`question-${skinProfileSection.sectionID}-email`}
                    >
                      <Typography variant='body3' className='question-title'>
                        Email
                      </Typography>
                      <Typography variant='body1' className='question-response'>
                        {intakeHealthInfo?.basics['email']['otherAnswer']}
                      </Typography>
                    </SkinProfileDetailWrapper>
                    <SkinProfileDetailWrapper
                      key={`question-${skinProfileSection.sectionID}-phoneNumber`}
                    >
                      <Typography variant='body3' className='question-title'>
                        Phone
                      </Typography>
                      <Typography variant='body1' className='question-response'>
                        {intakeHealthInfo?.basics['phoneNumber']['otherAnswer']}
                      </Typography>
                    </SkinProfileDetailWrapper>
                  </>
                )
                : <></>
            }
            {isSummarySection ? (
              <Box>
                {getSummarySensitivities()}
                <SkinProfileDetailWrapper>
                  <Typography
                    variant='body3'
                    className='question-title'
                    fontWeight={400}
                  >
                    Key Attributes
                  </Typography>
                  {selectedPreferences?.map((selectedPreference) => {
                    if (selectedPreference)
                      return (
                        <Box
                          className='attribute-pill-wrapper'
                          key={`key-attribute-${selectedPreference.cp_id}`}
                        >
                          <AttributePill
                            id={selectedPreference.cp_id}
                            PrefIcon={selectedPreference.icon}
                            label={selectedPreference.cp_label}
                            backgroundColor='neutral-secondary'
                          />
                        </Box>
                      );
                  })}
                </SkinProfileDetailWrapper>
              </Box>
            ) : (
              skinProfileSection.sectionQuestions?.map(
                (skinProfileQuestion) => {
                  let skinProfileSectionResponse;

                  if (!clientSkinProfileSection) {
                    if (
                      intakeHealthInfo &&
                      intakeHealthInfo[skinProfileSection.sectionID] &&
                      intakeHealthInfo[skinProfileSection.sectionID][
                      skinProfileQuestion.id
                      ]
                    ) {
                      skinProfileSectionResponse =
                        intakeHealthInfo[skinProfileSection.sectionID][
                          skinProfileQuestion.id
                        ].answer.join(', ');
                      if (
                        intakeHealthInfo[skinProfileSection.sectionID][
                          skinProfileQuestion.id
                        ]['otherAnswer'].length > 0
                      ) {
                        skinProfileSectionResponse +=
                          skinProfileSectionResponse !== '' ? ', ' : '';
                        skinProfileSectionResponse +=
                          intakeHealthInfo[skinProfileSection.sectionID][
                          skinProfileQuestion.id
                          ]['otherAnswer'];
                      }
                    } else {
                      skinProfileSectionResponse = 'Intake form pending';
                    }
                  } else {
                    const clientSPSectionResp =
                      clientSkinProfileSection.sectionResponses.find(
                        (skinProfileResp) =>
                          skinProfileResp.questionID === skinProfileQuestion.id
                      )?.questionResponse;

                    const clientSPSectionAdditionalResp =
                      clientSkinProfileSection.sectionResponses.find(
                        (skinProfileResp) =>
                          skinProfileResp.questionID === skinProfileQuestion.id
                      )?.additionalResponse;

                    const spQuestionResponseArr =
                      clientSPSectionResp?.split(',');
                    let spQuestionResponseStr = spQuestionResponseArr
                      ?.map((spQuestionResponse) => {
                        if (skinProfileQuestion.options) {
                          const responseValue =
                            skinProfileQuestion.options?.find(
                              (skinProfileQuestionResp) =>
                                skinProfileQuestionResp.value ===
                                spQuestionResponse
                            )?.label;

                          // append additional response if exists
                          if (
                            skinProfileQuestion.includeOtherVal !==
                            spQuestionResponse &&
                            (!clientSPSectionAdditionalResp ||
                              clientSPSectionAdditionalResp !== '')
                          ) {
                            return responseValue;
                          } else {
                            return `${responseValue}: ${clientSPSectionAdditionalResp}`;
                          }
                        } else {
                          return spQuestionResponse;
                        }
                      })
                      .join(', ');
                    if (
                      intakeHealthInfo &&
                      Object.prototype.hasOwnProperty.call(intakeHealthInfo?.sensitivities, skinProfileQuestion.id) &&
                      intakeHealthInfo?.sensitivities[skinProfileQuestion.id][
                        'otherAnswer'
                      ].length > 0
                    ) {
                      spQuestionResponseStr +=
                        spQuestionResponseStr !== '' ? ', ' : '';
                      spQuestionResponseStr += intakeHealthInfo?.sensitivities[skinProfileQuestion.id][
                        'otherAnswer'
                      ];
                    }

                    skinProfileSectionResponse =
                      spQuestionResponseStr || '';
                  }
                  return (
                    <SkinProfileDetailWrapper
                      key={`question-${skinProfileSection.sectionID}-${skinProfileQuestion.id}`}
                    >
                      <Typography variant='body3' className='question-title'>
                        {skinProfileQuestion.questionTitle}
                      </Typography>
                      <Typography variant='body1' className='question-response'>
                        {skinProfileSectionResponse}
                      </Typography>
                    </SkinProfileDetailWrapper>
                  );
                }
              )
            )}
          </AccordionItem>
        );
      })}
      <SPEditDialog
        open={editDialog}
        onClose={()=>setModalOpen(true)}
        fullWidth
        maxWidth='md'
        className='sp-edit-dialog'
      >
        <EditSkinProfile closeFunc={toggleEditDialog} isModalOpen={isModalOpen} setModalOpen={setModalOpen}/>
      </SPEditDialog>
    </DetailContainer>
  );
};

export default SkinProfile;
