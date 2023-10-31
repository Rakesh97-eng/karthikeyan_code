import { FC, Fragment, useContext, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import TreatmentRecordHeader from './treatment-record-header';
import ClientInfo from './client-info';
import { InnerWrapper, SnackbarWrapper, StyledSnackbar } from './styles';
import TreatmentRecordSection from './treatment-record-section';
// using sections data from constant file
import {
  AUTO_SAVE_MESSAGE,
  DEFAULT_TIMEZONE,
  NOT_REQUIRED_FORMSTATE_KEYS,
  TR_SECTIONS,
} from '../../constants/appConstants';
import { CLIENT_FOLLOW_UP } from '../../constants/prClientFollowUp';
import { Section } from '../../types/treatmentRecord/question';
import TreatmentRecordCoreSegments from './treatment-record-core-segments';
import { TR_SECTION_TITLES } from '../../constants/enums';
import { FormState, TFormContext } from '../../types/store/form';
import FormContext from '../../store/form/formContext';
import AutoSaveIcon from '../../assets/icons/autosave_stars.svg';
import ClientFollowUp from './client-follow-up';
import { deleteFirestoreDoc, getFirestoreDoc } from '../../firebase';
import { validateTrData } from './service';
import { updateForm } from '../../store/form/formAction';
import StyledButton from '../common/Button';
import { treatmentRecordSchema } from '../../utils/yup-schema/treatmentRecord';
import { ValidationError } from 'yup';
import { generateValidationErrorObject } from '../../utils/helper-functions/yup';
import { ErrorToast } from '../common/ErrorToast';
import {
  ClientFollowUpContainer,
  SearchBoxWrapper,
} from './client-follow-up/styles';
import { TreatmentService } from '../../services/Treatment';
import { Treatment } from '../../types/services/Treatment';
import {
  transform,
  whitelist,
  Transformer,
  DefaultTransformer,
  DocumentObject,
} from 'jsonapi-fractal';
import { Note } from '../../types/services/Note';
import { NotesService } from '../../services/Note';
import { AxiosError } from 'axios';
import { ToastContext } from '../../providers/context/toastContext';

interface Props {
  modalClose: () => void;
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

const TreatmentRecord: FC<Props> = ({ modalClose }) => {
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const { formState, formDispatch } = useContext<TFormContext>(FormContext);
  const [loading, setLoading] = useState(false);
  const [errorToastData, setErrorToastData] = useState<ErrorToastData>();
  const { showErrorDialog } = useContext(ToastContext);
  useEffect(() => {
    updateStateFromFirebase(formState);
  }, []);
  // Initial middleware & firestore sync up call

  function updateStateFromFirebase(formState: FormState) {
    (async function () {
      if (formState.treatment_record_id) {
        // Dummy response data
        const res = {
          tr_id: formState.id,
          updated_at: new Date(),
        };
        const exFsData = await getFirestoreDoc(formState.treatment_record_id);
        const isCallRequire = exFsData ? validateTrData(exFsData, res) : false;
        if (isCallRequire && exFsData) {
          // API call to middleware to syncup the data
          onSave(false, exFsData as Partial<Treatment>);
          // Intentional console log
          console.log(
            'Firestore data not pushed to middleware so now is API is being called'
          );
        }
      }
    })();
  }

  const snackbarCloseHandler = () => setSnackbarOpen(false);
  const clientFollowUpSection = CLIENT_FOLLOW_UP;
  /**
   * calculates the error toast data
   * based on the errors in the context value
   */
  useEffect(() => {
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
  }, [formState.errors]);
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
      createTreatmentNotes(formState as Treatment, 'general_notes');
      createTreatmentNotes(formState as Treatment, 'note_for_customer');
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

  const createTreatmentNotes = async (data: any, type: string) => {
    const noteDeserialised = {
      text:
        type === 'general_notes' ? data?.internalNotes : data?.clientMessage,
      type: type,
      contextId: {
        id: data?.id,
      },
    };
    const entitySerialized: DocumentObject = transform()
      .withInput(noteDeserialised)
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
    }
  };
  const onSave = async (
    isSubmitted: boolean,
    data: Partial<Treatment>,
    closeModal = false
  ) => {
    // treatment record API call
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
      await TreatmentService.patchTreatment(formState.id, {
        ...sanitizedData,
        isSubmitted,
      });
      // On API success deleting the doc from firestore
      deleteFirestoreDoc(formState.id);
      if (closeModal) {
        modalClose();
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        showErrorDialog(error?.message);
      } else if (error instanceof Error) {
        showErrorDialog(error?.message);
      }
    }
  };
  const handleDraft = (data: Partial<Treatment>) => {
    createTreatmentNotes(data, 'general_notes');
    createTreatmentNotes(data, 'note_for_customer');
    onSave(false, data, true);
  };
  const handleModalClose = (autoSave = true) => {
    autoSave ? handleDraft(formState as Treatment) : modalClose();
  };
  return (
    <>
      <TreatmentRecordHeader
        closeFunc={handleModalClose}
        treatmentId={formState.id}
        treatmentIsSubmitted={false}
      />
      <InnerWrapper>
        <ClientInfo
          treatmentType={formState.treatmentType}
          location={formState.location.name}
          tz={
            formState.location?.tz ? formState.location?.tz : DEFAULT_TIMEZONE
          }
        />
        {TR_SECTIONS.map((section: Section, index: number) => (
          <Fragment key={`tr-section-${index}`}>
            {section.title !== TR_SECTION_TITLES.CORE_SEGMENT ? (
              <TreatmentRecordSection section={section} childKey={index} />
            ) : (
              <TreatmentRecordCoreSegments
                section={section}
                error={
                  formState.errors ? !!formState.errors['choose_one'] : false
                }
              />
            )}
          </Fragment>
        ))}
      </InnerWrapper>
      <SearchBoxWrapper>
        <ClientFollowUpContainer>
          <ClientFollowUp section={clientFollowUpSection} />

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
              onClick={() => handleDraft(formState as Treatment)}
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

export default TreatmentRecord;
