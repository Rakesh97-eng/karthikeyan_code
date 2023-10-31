import {
  FC,
  Fragment,
  useContext,
  useEffect,
  useCallback,
  useState,
} from 'react';
import { Box, Typography } from '@mui/material';
import TreatmentRecordHeader from '../../../treatment-record/treatment-record-header';
import ClientInfo from '../../../treatment-record/client-info';
import {
  InnerWrapper,
  SnackbarWrapper,
  StyledSnackbar,
} from '../../../treatment-record/styles';
import TreatmentRecordSection from '../../../treatment-record/treatment-record-section';
// using sections data from constant file
import {
  AUTO_SAVE_MESSAGE,
  DEFAULT_TIMEZONE,
  NOT_REQUIRED_FORMSTATE_KEYS,
  TR_SECTIONS,
} from '../../../../constants/appConstants';
import { CLIENT_FOLLOW_UP } from '../../../../constants/prClientFollowUp';
import { Section } from '../../../../types/treatmentRecord/question';
import TreatmentRecordCoreSegments from '../../../treatment-record/treatment-record-core-segments';
import { TR_SECTION_TITLES } from '../../../../constants/enums';
import { FormState, TFormContext } from '../../../../types/store/form';
import FormContext from '../../../../store/form/formContext';
import AutoSaveIcon from '../../../../assets/icons/autosave_stars.svg';
import ClientFollowUp from '../../../treatment-record/client-follow-up';
import { deleteFirestoreDoc, getFirestoreDoc } from '../../../../firebase';
import { updateForm } from '../../../../store/form/formAction';
import { treatmentRecordSchema } from '../../../../utils/yup-schema/treatmentRecord';
import {
  Treatment,
  TreatmentResponse,
} from '../../../../types/services/Treatment';
import {
  ClientFollowUpContainer,
  SearchBoxWrapper,
} from '../../../treatment-record/client-follow-up/styles';
import { ErrorToast } from '../../../common/ErrorToast';
import StyledButton from '../../../common/Button';
import { ValidationError } from 'yup';
import { generateValidationErrorObject } from '../../../../utils/helper-functions/yup';
import { TreatmentService } from '../../../../services/Treatment';
import {
  transform,
  whitelist,
  Transformer,
  DefaultTransformer,
  DocumentObject,
} from 'jsonapi-fractal';
import { Note } from '../../../../types/services/Note';
import { NotesService } from '../../../../services/Note';
import { AxiosError } from 'axios';
import { ToastContext } from '../../../../providers/context/toastContext';

interface Props {
  modalClose: () => void;
  prefilledData: Partial<Treatment>;
}
interface ErrorToastData {
  title: string;
  list: string[];
}

// NoteTransformer class ---------------------------
class NoteTransformer extends Transformer<Note, unknown> {
  constructor() {
    super();
    this.type = 'Note';
    this.relationships = {
      context_id: this.context_id,
    };
  }

  transform(note: Note) {
    return whitelist(note, ['id', 'text', 'type']);
  }

  context_id(note: Note) {
    return (
      transform()
        .withInput(note.contextId)
        .withTransformer(new DefaultTransformer('treatment'))
        // .withIncluded(true)
        .toContext()
    );
  }
}
// -----------------------

const EditTreatmentRecord: FC<Props> = ({ modalClose, prefilledData }) => {
  const [prefilledDataState, setPrefilledDataState] = useState<
    Partial<Treatment>
  >({});
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const { formState, formDispatch } = useContext<TFormContext>(FormContext);
  const [loading, setLoading] = useState(false);
  const [errorToastData, setErrorToastData] = useState<ErrorToastData>();
  const { showErrorDialog } = useContext(ToastContext);
  const [saveToFirebase, setSaveToFirebase] = useState<boolean>(false);

  useEffect(() => {
    //set prefilled data to state
    setPrefilledDataState(prefilledData);
    setSaveToFirebase(false);
  }, []);

  const memoizedCallback = useCallback(() => {
    if (prefilledDataState === prefilledData && saveToFirebase === false) {
      updateStateFromFirebase();
    }

    if (prefilledDataState && saveToFirebase) {
      updateFormState(prefilledDataState);
    }
  }, [prefilledDataState, saveToFirebase]);

  useEffect(() => {
    memoizedCallback();
  }, [memoizedCallback]);

  // Initial middleware & firestore sync up call
  function updateStateFromFirebase() {
    (async function () {
      if (prefilledDataState?.id) {
        const exFsData = await getFirestoreDoc(prefilledDataState?.id);
        if (exFsData) {
          const recommendedProduct = {
            recommendedProduct: prefilledDataState?.recommendedProduct,
          };
          setPrefilledDataState({
            ...prefilledDataState,
            ...exFsData,
            ...recommendedProduct,
          });
        }
        setSaveToFirebase(true);
      }
    })();
  }

  const updateFormState = (data: FormState) => {
    formDispatch(updateForm(data));
  };

  const snackbarCloseHandler = () => setSnackbarOpen(false);
  const clientFollowUpSection = CLIENT_FOLLOW_UP;
  /**
   * calculates the error toast data
   * based on the errors in the context value
   */

  useEffect(() => {
    if (prefilledDataState) {
      if (!formState.errors) {
        setErrorToastData(undefined);
        return;
      }
      setErrorToastData({
        title: `Fix ${
          Object.keys(formState.errors).length
        } items in order to submit treatment record :`,
        list: Object.values(formState.errors),
      });
    }
  }, [formState.errors, prefilledDataState]);
  /**
   * validate
   * calculates the validation errors based on the schema
   * updates the formState in the context
   * @returns Promise<void>
   */
  const validate = async () => {
    setLoading(true);
    try {
      await treatmentRecordSchema.validate(formState, {
        abortEarly: false,
      });
      formDispatch(updateForm({ isSubmitted: true }));
      onSave(true, formState as Treatment, true);
      apiCallForNotes(formState as Treatment);
    } catch (error) {
      if (error instanceof ValidationError) {
        const errors = generateValidationErrorObject(error);
        formDispatch(updateForm({ errors }));
      }
    } finally {
      setLoading(false);
    }
  };

  const sanitizedFormData = (data: Partial<Treatment>): Partial<Treatment> => {
    for (const key in data) {
      if (NOT_REQUIRED_FORMSTATE_KEYS.includes(key)) {
        delete data[key as keyof Partial<Treatment>];
      }
    }
    return data;
  };

  const createTreatmentNotes = async (
    treatment: Partial<TreatmentResponse>,
    type: string
  ) => {
    const noteDeserialized = {
      text:
        type === 'general_notes'
          ? treatment?.internalNotes
          : treatment?.clientMessage,
      type: type,
      contextId: {
        id: treatment?.id,
      },
    };
    const entitySerialized: DocumentObject = transform()
      .withInput(noteDeserialized)
      .withTransformer(new NoteTransformer())
      .withOptions({ idKey: 'id' })
      .serialize();
    try {
      await NotesService.createNotes(entitySerialized);
    } catch (error) {
      if (error instanceof AxiosError) {
        showErrorDialog(error?.message);
      } else if (error instanceof Error) {
        showErrorDialog(error?.message);
      }
      console.log('error', error);
    }
  };

  const updateTreatmentNotes = async (
    treatment: Partial<TreatmentResponse>,
    type: string
  ) => {
    const noteId = prefilledDataState?.note
      ?.filter((val: Partial<FormState>) => val?.type === type)
      ?.slice(0, 1)
      ?.map((data) => data?.id)
      .toString();

    const noteDeserialized = {
      text:
        type === 'general_notes'
          ? treatment?.internalNotes
          : treatment?.clientMessage,
      type: type,
      contextId: {
        id: treatment?.id,
      },
    };

    const entitySerialized: DocumentObject = transform()
      .withInput(noteDeserialized)
      .withTransformer(new NoteTransformer())
      .withOptions({ idKey: 'id' })
      .serialize();
    try {
      await NotesService.patchNotes(noteId || '', entitySerialized);
    } catch (error) {
      if (error instanceof AxiosError) {
        showErrorDialog(error?.message);
      } else if (error instanceof Error) {
        showErrorDialog(error?.message);
      }
      console.log('error', error);
    }
  };

  const apiCallForNotes = async (treatment: Partial<TreatmentResponse>) => {
    const notesDataByType = (type: string) =>
      treatment?.note
        ?.filter((val) => val?.type === type && val.text != '')
        .slice(0, 1);

    const noteForCustomerText =
      notesDataByType('note_for_customer')?.length != 0
        ? notesDataByType('note_for_customer')
            ?.map((data: Note) => data.text)
            .toString()
        : '';

    const generalNotesText =
      notesDataByType('general_notes')?.length != 0
        ? notesDataByType('general_notes')
            ?.map((data: Note) => data.text)
            .toString()
        : '';

    const isGeneralNotesValueChanged = treatment?.internalNotes
      ? generalNotesText != treatment?.internalNotes
      : false;

    const isNoteForCustomerValueChanged = treatment?.clientMessage
      ? noteForCustomerText != treatment?.clientMessage
      : false;

    const generalNotesApiCall = async () => {
      notesDataByType('general_notes')?.length == 0
        ? treatment?.internalNotes &&
          createTreatmentNotes(treatment, 'general_notes')
        : isGeneralNotesValueChanged &&
          updateTreatmentNotes(treatment, 'general_notes');
    };

    const notesForCustomerApiCall = async () => {
      notesDataByType('note_for_customer')?.length == 0
        ? treatment?.clientMessage &&
          createTreatmentNotes(treatment, 'note_for_customer')
        : isNoteForCustomerValueChanged &&
          updateTreatmentNotes(treatment, 'note_for_customer');
    };

    // internal note call
    if (treatment?.internalNotes?.length) await generalNotesApiCall();

    // customer note call
    if (treatment?.clientMessage?.length) await notesForCustomerApiCall();
  };

  const onSave = async (
    isSubmitted: boolean,
    data: Partial<TreatmentResponse>,
    closeModal = false
  ) => {
    //treatment record API call
    try {
      const copy = JSON.parse(JSON.stringify(data));
      for (const key in copy) {
        if (
          Object.prototype.hasOwnProperty.call(copy, key) &&
          copy[key] === null
        )
          delete copy[key];
      }

      const sanitizedData = sanitizedFormData(copy);
      if (prefilledDataState?.id) {
        await TreatmentService.patchTreatment(prefilledDataState?.id, {
          ...sanitizedData,
          isSubmitted,
        });
      }
      if (closeModal) {
        modalClose();
      }
      if (prefilledDataState?.id) {
        // On API success deleting the doc from firestore
        await deleteFirestoreDoc(prefilledDataState?.id);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        showErrorDialog(error?.message);
      } else if (error instanceof Error) {
        showErrorDialog(error?.message);
      }
      console.log('Error', error);
    }
  };

  const saveDraft = async () => {
    await onSave(false, formState as Treatment);
    await apiCallForNotes(formState as Treatment);
    modalClose();
  };
  return (
    <>
      {prefilledDataState && prefilledDataState?.id && (
        <TreatmentRecordHeader
          closeFunc={(autoSave = true) => {
            autoSave ? saveDraft() : modalClose();
          }}
          treatmentId={prefilledDataState?.id}
          treatmentIsSubmitted={
            prefilledDataState.isSubmitted
              ? prefilledDataState.isSubmitted
              : false
          }
        />
      )}
      <InnerWrapper>
        <ClientInfo
          treatmentType={
            prefilledDataState.treatmentType
              ? prefilledDataState.treatmentType
              : ''
          }
          location={
            prefilledDataState.location?.name
              ? prefilledDataState.location?.name
              : ''
          }
          tz={
            prefilledDataState.location?.tz
              ? prefilledDataState.location?.tz
              : DEFAULT_TIMEZONE
          }
        />
        {TR_SECTIONS.map((section: Section, index: number) => (
          <Fragment key={`tr-section-${index}`}>
            {section.title !== TR_SECTION_TITLES.CORE_SEGMENT ? (
              <TreatmentRecordSection
                section={section}
                childKey={index}
                prefilledData={prefilledDataState}
              />
            ) : (
              <TreatmentRecordCoreSegments
                section={section}
                error={
                  formState.errors ? !!formState.errors['choose_one'] : false
                }
                prefilledData={prefilledDataState}
              />
            )}
          </Fragment>
        ))}
      </InnerWrapper>
      <SearchBoxWrapper>
        <ClientFollowUpContainer>
          <ClientFollowUp
            section={clientFollowUpSection}
            prefilledData={prefilledDataState}
          />
          {errorToastData && <ErrorToast data={errorToastData} />}
          <Box className='button-wrapper'>
            <StyledButton
              variant='contained'
              fullWidth={true}
              value={!loading ? 'Submit Treatment Record' : 'Please wait...'}
              isDisabled={false}
              onClick={validate}
              type={'submit'}
              className='submit-btn'
            />
            <StyledButton
              variant='outlined'
              value={'Save Draft'}
              onClick={saveDraft}
            />
          </Box>
        </ClientFollowUpContainer>
      </SearchBoxWrapper>

      <StyledSnackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={snackbarOpen}
        onClose={snackbarCloseHandler}
        autoHideDuration={1000}
      >
        <SnackbarWrapper>
          <img src={AutoSaveIcon} />
          <Typography variant='body2' color={'var(--neutral-secondary)'}>
            {AUTO_SAVE_MESSAGE}
          </Typography>
        </SnackbarWrapper>
      </StyledSnackbar>
    </>
  );
};

export default EditTreatmentRecord;
