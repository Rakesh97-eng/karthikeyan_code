import { FC, useContext, useEffect, useState } from 'react';
import { Button, Grid, Theme, useMediaQuery } from '@mui/material';
import { EmptyContainer } from '../../../components/client-profile/empty-container';
import { DetailContainer } from '../../../components/client-profile/detail-container';
import PastPurchases from '../../../components/client-profile/past-purchases';
import ProductsToAvoid from '../../../components/client-profile/products-to-avoid';
import FolderImage from '../../../assets/images/client-profile/folder.png';
import PurchaseImage from '../../../assets/images/client-profile/purchase.png';
import WarningImage from '../../../assets/images/client-profile/warning.png';
import { ReactComponent as FolderOpen } from '../../../assets/icons/folder-open.svg';
import { ReactComponent as ArrowRightUp } from '../../../assets/icons/arrow-right-up.svg';
import { ReactComponent as SmileyWink } from '../../../assets/icons/smiley-wink.svg';
import { ReactComponent as SmallArrowRightUp } from '../../../assets/icons/small-arrow-right-up.svg';
import { ReactComponent as ProductsFill } from '../../../assets/icons/products-fill.svg';
import { ClientDetailsContainer, TreatmentBtnWrapper } from './styles';
import PastTreatment from '../past-treatment';
import { useHistory, useParams } from 'react-router-dom';
import SkinProfile from '../skin-profile';
import { IParams } from '../../../types/clientProfile';
import AddTreatmentRecordButton from '../../treatment-record/add-treatment-record-btn';
import CustomDialog from '../../common/CustomDialog';
import { AppointmentsPopup } from '../appointments-popup';
import { TreatmentRecordDialog } from '../../treatment-record/styles';
import TreatmentRecord from '../../treatment-record';
import ClientContext from '../../../store/client/ClientContext';
import { TClientContext } from '../../../types/store/client';
import {
  IncludedTreatment,
  Treatment,
  TreatmentRelation,
  TreatmentResponse,
} from '../../../types/services/Treatment';
import { ROUTES } from '../../../router/routesConstant';
import { getMissingTag, getTreatmentTag } from '../past-treatment/service';
import KnackArchived from '../knack-archived';
import EditTreatmentRecordButton from '../../treatment-record/edit-treatment-record-button';
import PastTreatmentMissing from '../past-treatment/past-treatment-missing';
import { Appointment } from '../../../types/services/Appointment';
import {
  IHealthIntake,
  IIntakeJSON,
} from '../../../types/services/HealthIntake';
import { TreatmentService } from '../../../services/Treatment';
import EditTreatmentRecord from '../past-treatment/edit-past-treatment';
import {
  setLocalStorageItem,
  getLocalStorageItem,
} from '../../../utils/helper-functions/user';
import {
  FORMAT_DATE,
  LOCAL_STORAGE_KEYS,
  RITTENHOUSE_LOCATION_ID,
  PLYMOUTH_MEETING_LOCATION_ID,
  DEFAULT_TIMEZONE,
} from '../../../constants/appConstants';
import moment from 'moment-timezone';
import {
  refreshClientEndpoint,
  updateMappedHealthIntake,
} from '../../../store/client/ClientAction';
import { TFormContext } from '../../../types/store/form';
import FormContext from '../../../store/form/formContext';
import { updateForm } from '../../../store/form/formAction';
import { AxiosError } from 'axios';
import { ToastContext } from '../../../providers/context/toastContext';

const ClientDetailsWrapper: FC = () => {
  const { clientID }: IParams = useParams();
  const history = useHistory();
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('lg')
  );
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    clientDispatch(refreshClientEndpoint(true));
    setOpen(false);
  };
  const [pastTreatments, setPastTreatments] = useState<TreatmentResponse[]>([]);
  const [missingRecords, setMissingRecords] = useState<Appointment[]>([]);
  const [knackRecords, setKnackRecords] = useState<Treatment[]>([]);
  const { clientState, clientDispatch } =
    useContext<TClientContext>(ClientContext);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [appointmentModalOpen, setAppointmentModalOpen] =
    useState<boolean>(false);
  const [noAppointmentModalOpen, setNoAppointmentModalOpen] =
    useState<boolean>(false);
  const [intakeJson, setIntakeJson] = useState<IIntakeJSON>();
  const [intakeHealthInfo, setIntakeHealthInfo] = useState<IHealthIntake>();
  const { formDispatch } = useContext<TFormContext>(FormContext);
  const { showErrorDialog } = useContext(ToastContext);

  const fetchIntakeSkinProfileJson = async () => {
    return fetch(
      process.env.REACT_APP_INTAKE_HEALTH_JSON_URL +
        'form-builder/health-intake-builder.json' || ''
    )
      .then((response) => response.json())
      .then((response) => {
        setIntakeJson(response);
        const saveData = {
          savedDate: moment().format(FORMAT_DATE.DAY),
          data: response,
        };
        setLocalStorageItem(
          LOCAL_STORAGE_KEYS.S3_HEALTH_INTAKE,
          JSON.stringify(saveData)
        );
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          showErrorDialog(error?.message);
        } else if (error instanceof Error) {
          showErrorDialog(error?.message);
        }
        console.error(error);
        throw error;
      });
  };

  useEffect(() => {
    const savedS3Intake = getLocalStorageItem(
      LOCAL_STORAGE_KEYS.S3_HEALTH_INTAKE
    );
    if (savedS3Intake) {
      const savedS3IntakeJson = JSON.parse(savedS3Intake);
      if (savedS3IntakeJson) {
        if (savedS3IntakeJson?.savedDate != moment().format(FORMAT_DATE.DAY)) {
          fetchIntakeSkinProfileJson();
        } else {
          setIntakeJson(savedS3IntakeJson.data);
        }
      } else {
        fetchIntakeSkinProfileJson();
      }
    } else {
      fetchIntakeSkinProfileJson();
    }
  }, []);

  useEffect(() => {
    const healthIntakeOutput: IHealthIntake = {};
    if (clientState.healthIntake && intakeJson) {
      for (const healthIntake of clientState.healthIntake) {
        if (
          Object.hasOwnProperty.call(
            intakeJson.intakeQuestions,
            healthIntake.questionId
          )
        ) {
          const s3Question =
            intakeJson.intakeQuestions[healthIntake.questionId];
          const sectionIdUUID = s3Question.sectionId;
          const sectionId = intakeJson.intakeSections[sectionIdUUID].sectionId;

          if (!Object.hasOwnProperty.call(healthIntakeOutput, sectionId)) {
            healthIntakeOutput[`${sectionId}`] = {};
          }

          const questionId = s3Question.questionId;

          let otherAnswer = healthIntake.otherAnswer;
          if (questionId === 'birthday' && otherAnswer != '') {
            otherAnswer = moment(otherAnswer).format(FORMAT_DATE.DISPLAY_DAY);
          }

          if (
            Object.hasOwnProperty.call(
              healthIntakeOutput[sectionId],
              questionId
            )
          ) {
            if (otherAnswer != '') {
              healthIntakeOutput[`${sectionId}`][`${questionId}`][
                'otherAnswer'
              ] = otherAnswer;
            }
          } else {
            healthIntakeOutput[sectionId][questionId] = {
              answer: [],
              otherAnswer: otherAnswer,
            };
          }

          for (const ansUUID of healthIntake.answer) {
            if (Object.hasOwnProperty.call(intakeJson.intakeOptions, ansUUID)) {
              healthIntakeOutput[sectionId][questionId]['answer'].push(
                intakeJson.intakeOptions[ansUUID]
              );
            }
          }
        }
      }

      for (const key in intakeJson.intakeQuestions) {
        if (Object.hasOwnProperty.call(intakeJson.intakeQuestions, key)) {
          const s3Question = intakeJson.intakeQuestions[key];

          const sectionId =
            intakeJson.intakeSections[s3Question.sectionId].sectionId;
          if (!Object.hasOwnProperty.call(healthIntakeOutput, sectionId)) {
            healthIntakeOutput[sectionId] = {};
          }

          if (
            !Object.hasOwnProperty.call(
              healthIntakeOutput[sectionId],
              s3Question.questionId
            )
          ) {
            healthIntakeOutput[sectionId][s3Question.questionId] = {
              answer: [],
              otherAnswer: '',
            };
          }
        }
      }
      healthIntakeOutput.basics = { ...healthIntakeOutput.basics };
      healthIntakeOutput.basics.email = {
        answer: [],
        otherAnswer: clientState.email ? clientState.email : 'N/A',
      };
      healthIntakeOutput.basics.phoneNumber = {
        answer: [],
        otherAnswer: clientState.phone ? clientState.phone : 'N/A',
      };
      clientDispatch(updateMappedHealthIntake(healthIntakeOutput));
      setIntakeHealthInfo(healthIntakeOutput);
    }
  }, [clientState.healthIntake, intakeJson]);

  useEffect(() => {
    if (clientState.pastTreatments) {
      setPastTreatments(clientState.pastTreatments);
    }
  }, [clientState.pastTreatments]);

  useEffect(() => {
    if (clientState.appointments) {
      let currentDate = moment().format(FORMAT_DATE.DAY);
      let today = moment
        .tz(new Date(currentDate), DEFAULT_TIMEZONE)
        .endOf('date')
        .toDate();

      //Hide old missing treatment records for specific locations
      const launchDate = new Date('2023-01-18');
      const missingTreatments = clientState.appointments.filter(
        (appointment) => {
          if (
            ((appointment.locationId === RITTENHOUSE_LOCATION_ID ||
              appointment.locationId === PLYMOUTH_MEETING_LOCATION_ID) &&
              new Date(appointment.startAt) < today) ||
            (new Date(appointment.startAt) < today &&
              new Date(appointment.startAt) > launchDate)
          ) {
            return appointment;
          }
        }
      );

      currentDate = moment().add(1, 'days').format(FORMAT_DATE.DAY);
      today = moment
        .tz(new Date(currentDate), DEFAULT_TIMEZONE)
        .endOf('date')
        .toDate();
      const shopPopupMissingRecords = clientState.appointments.filter(
        (appointment) => {
          if (
            ((appointment.locationId === RITTENHOUSE_LOCATION_ID ||
              appointment.locationId === PLYMOUTH_MEETING_LOCATION_ID) &&
              new Date(appointment.startAt) < today) ||
            (new Date(appointment.startAt) < today &&
              new Date(appointment.startAt) > launchDate)
          ) {
            return appointment;
          }
        }
      );
      setAppointments(shopPopupMissingRecords);
      setMissingRecords(missingTreatments);
    }
  }, [clientState.appointments]);

  useEffect(() => {
    if (clientState.knackRecords) {
      setKnackRecords(clientState.knackRecords);
    }
  }, [clientState.knackRecords]);

  const createTreatmentRecordHandler = async (selectedAppointment: string) => {
    const treatmentSuccess = await createTreatmentRecord(selectedAppointment);
    if (treatmentSuccess) {
      handleOpen();
    }
  };

  const AddTreatmentRecordHandler = async () => {
    if (appointments?.length) {
      if (appointments?.length <= 1) {
        const treatmentSuccess = await createTreatmentRecord(
          appointments[0].id
        );
        if (treatmentSuccess) {
          handleOpen();
        }
      } else {
        setAppointmentModalOpen(true);
      }
    } else {
      setNoAppointmentModalOpen(true);
    }
  };

  const createTreatmentRecord = async (appointmentId: string) => {
    try {
      const treatmentDetails = await TreatmentService.createTreatment(
        appointmentId
      );
      const treatment = await TreatmentService.getTreatmentById(
        treatmentDetails.id,
        {
          [TreatmentRelation.treatedByStaff]: 'first_name,last_name,name',
          [TreatmentRelation.enteredByStaff]: 'first_name,last_name,name',
          [TreatmentRelation.location]: 'city,name,tz',
        },
        [
          TreatmentRelation.enteredByStaff,
          TreatmentRelation.treatedByStaff,
          TreatmentRelation.location,
          TreatmentRelation.recommendedProduct,
          TreatmentRelation.note,
        ]
      );
      formDispatch(updateForm(treatment));
      return treatment;
    } catch (error) {
      console.log('error', error);
      if (error instanceof AxiosError) {
        showErrorDialog(error?.message);
      } else if (error instanceof Error) {
        showErrorDialog(error?.message);
      }
    }
  };

  const redirectToProducts = () => {
    history.push(ROUTES.PRODUCTS_ROUTE);
  };

  if (!clientState) return <>No Client Found</>;

  const inCompleteTreatment = clientState?.pastTreatments?.find(
    (treatment) => !treatment?.isSubmitted
  );

  const showPastTreatment = () => {
    if (missingRecords.length >= 3) {
      return false;
    } else {
      return true;
    }
  };

  const showKnackRecords = () => {
    if (missingRecords.length + pastTreatments.length >= 3) {
      return false;
    } else {
      return true;
    }
  };

  const closeTreatmentRecordEdit = () => {
    clientDispatch(refreshClientEndpoint(true));
    setIsEdit(false);
  };

  const editTreatmentRecord = () => {
    setIsEdit(true);
  };

  const editTreatmentHandler = () => {
    if (inCompleteTreatment) {
      editTreatmentRecord();
    }
  };

  const showArrowIconOnPastTreatmentCard = () => {
    if (
      pastTreatments?.length + knackRecords?.length + missingRecords?.length >
      3
    ) {
      return true;
    }
    return false;
  };

  return (
    <ClientDetailsContainer>
      <Grid container spacing={3}>
        <Grid top={'16px'} item md={4} xs={12} className='skin-profile'>
          {intakeHealthInfo && clientState && (
            <SkinProfile
              intakeHealthInfo={intakeHealthInfo}
              intakeJson={intakeJson}
            />
          )}
        </Grid>
        <Grid position={'sticky'} item md={8} xs={12}>
          {pastTreatments?.length ||
          knackRecords?.length ||
          missingRecords?.length ? (
            <DetailContainer
              headerLeftIcon={<img src={FolderImage} alt='folder-image' />}
              headerText='Past Treatments'
              headerRightIcon={
                showArrowIconOnPastTreatmentCard() ? (
                  <ArrowRightUp />
                ) : undefined
              }
              headerRightIconClick={() => {
                history.push(`/clients/${clientID}/past-treatments`);
              }}
            >
              {missingRecords
                ?.slice(0, 3)
                ?.map((appointment, index: number) => {
                  const staffName = appointment?.appointmentService?.staff
                    ?.firstName
                    ? `${appointment?.appointmentService?.staff?.firstName} ${appointment?.appointmentService?.staff?.lastName}`
                    : appointment?.appointmentService?.staff?.name;
                  return (
                    <PastTreatmentMissing
                      key={`pMissingTreatment-${index}`}
                      treatmentTag={getMissingTag(appointment)}
                      AddTreatmentRecordHandler={createTreatmentRecordHandler}
                      estheticianName={staffName}
                      date={appointment?.startAt}
                      location={appointment?.location?.name}
                      locationTZ={appointment.location?.tz}
                      treatmentDetails={appointment}
                      id={appointment?.id}
                    />
                  );
                })}
              {showPastTreatment() &&
                pastTreatments
                  ?.slice(0, 3 - missingRecords.length)
                  ?.map(
                    (
                      treatment: Treatment & IncludedTreatment,
                      index: number
                    ) => {
                      const estheticianName = treatment?.treatedByStaff
                        ?.firstName
                        ? `${treatment?.treatedByStaff?.firstName} ${treatment?.treatedByStaff?.lastName}`
                        : treatment?.treatedByStaff?.name;
                      return (
                        <PastTreatment
                          key={`pTreatment-${index}`}
                          treatmentTag={getTreatmentTag(treatment)}
                          estheticianName={estheticianName}
                          date={treatment.appointmentTime}
                          location={treatment.location.name}
                          locationTZ={treatment.location.tz}
                          treatmentDetails={treatment}
                          id={treatment?.id}
                        />
                      );
                    }
                  )}
              {showKnackRecords() &&
                knackRecords?.slice(0, 3).map((knackRecord, index) => {
                  return (
                    <KnackArchived
                      key={`knack-${index}`}
                      date={knackRecord.appointmentTime}
                      data={knackRecord}
                    />
                  );
                })}
            </DetailContainer>
          ) : (
            <EmptyContainer
              icon={<FolderOpen />}
              text='No treatment records, yet!'
              button={
                <Button
                  startIcon={<>+</>}
                  variant='contained'
                  disableElevation
                  onClick={AddTreatmentRecordHandler}
                  className='gridButton'
                >
                  Treatment Record
                </Button>
              }
            />
          )}
          {/* API Integration pending for below UI till this part needed commented */}
          {clientState.productsToAvoid?.data.length ? (
            <DetailContainer
              headerLeftIcon={<img src={WarningImage} alt='warning-image' />}
              headerText={
                isSmallScreen ? 'Prod. to Avoid' : 'Products To Avoid'
              }
              headerRightIcon={<ArrowRightUp />}
              headerRightIconClick={() => {
                history.push(ROUTES.PRODUCTS_ROUTE);
              }}
            >
              <ProductsToAvoid />
            </DetailContainer>
          ) : (
            <EmptyContainer
              icon={<SmileyWink />}
              text='No products to avoid'
              button={
                <Button
                  endIcon={<SmallArrowRightUp />}
                  variant='contained'
                  disableElevation
                  onClick={redirectToProducts}
                  className='gridButton'
                >
                  Look Up Products
                </Button>
              }
            />
          )}
          {clientState?.pastPurchasedProducts?.length ? (
            <DetailContainer
              headerLeftIcon={<img src={PurchaseImage} alt='purchase-image' />}
              headerText='Past Purchases'
              subHeaderText='All items bought in the last 12 months'
            >
              <PastPurchases productList={clientState.pastPurchasedProducts} />
            </DetailContainer>
          ) : (
            <EmptyContainer
              icon={<ProductsFill />}
              text='No purchases, yet!'
              button={
                <Button
                  endIcon={<SmallArrowRightUp />}
                  variant='contained'
                  disableElevation
                  onClick={redirectToProducts}
                  className='gridButton'
                >
                  Look Up Products
                </Button>
              }
            />
          )}
        </Grid>
      </Grid>
      <TreatmentBtnWrapper>
        {inCompleteTreatment ? (
          <EditTreatmentRecordButton EditTreatment={editTreatmentHandler} />
        ) : (
          <AddTreatmentRecordButton AddTreatment={AddTreatmentRecordHandler} />
        )}
      </TreatmentBtnWrapper>
      {appointments.length ? (
        <CustomDialog
          isModalOpen={appointmentModalOpen}
          handleClose={() => setAppointmentModalOpen(false)}
          maxwidthsize='360px'
        >
          <AppointmentsPopup
            appointments={appointments}
            onClose={() => {
              setAppointmentModalOpen(false);
            }}
            createTreatmentRecord={createTreatmentRecordHandler}
          />
        </CustomDialog>
      ) : null}
      {!appointments.length ? (
        <CustomDialog
          isModalOpen={noAppointmentModalOpen}
          handleClose={() => setNoAppointmentModalOpen(false)}
          maxwidthsize='360px'
        >
          <AppointmentsPopup
            appointments={[]}
            onClose={() => {
              setNoAppointmentModalOpen(false);
            }}
          />
        </CustomDialog>
      ) : null}
      <TreatmentRecordDialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth='md'
        className='treatment-record-dialog'
      >
        <TreatmentRecord modalClose={handleClose} />
      </TreatmentRecordDialog>
      {isEdit && inCompleteTreatment && (
        <TreatmentRecordDialog
          open={isEdit}
          onClose={closeTreatmentRecordEdit}
          fullWidth
          maxWidth='md'
          className='treatment-record-dialog'
        >
          <EditTreatmentRecord
            prefilledData={inCompleteTreatment}
            modalClose={closeTreatmentRecordEdit}
          />
        </TreatmentRecordDialog>
      )}
    </ClientDetailsContainer>
  );
};

export default ClientDetailsWrapper;
