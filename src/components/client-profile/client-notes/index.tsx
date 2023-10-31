import { FC, useContext, useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import NotesEditor from '../notes-editor';
import {
  transform,
  whitelist,
  Transformer,
  DefaultTransformer,
  DocumentObject,
} from 'jsonapi-fractal';
// styles
import {
  ClientNotesWrapper,
  EmptyNotesWrapper,
  NotesWrapper,
  NoteTitleWrapper,
} from './styles';
// icons
import { ReactComponent as PlusIcon } from '../../../assets/icons/plus.svg';
import { ReactComponent as Checkmark } from '../../../assets/icons/editor-checkmark.svg';
import { ReactComponent as DeleteIcon } from '../../../assets/icons/editor-x.svg';
import { ReactComponent as EditorPencil } from '../../../assets/icons/editor-pencil.svg';
import EditorNotes from '../../../assets/icons/editor-notes.svg';
import ClientContext from '../../../store/client/ClientContext';
import { TClientContext } from '../../../types/store/client';
import {
  refreshClientEndpoint,
  updateClientNote,
} from '../../../store/client/ClientAction';
import { NotesService } from '../../../services/Note';
import { useParams } from 'react-router-dom';
import { IParams } from '../../../types/clientProfile';
import { Note } from '../../../types/services/Note';
import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import { ToastContext } from '../../../providers/context/toastContext';

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
        .withTransformer(new DefaultTransformer('customer'))
        // .withIncluded(true)
        .toContext()
    );
  }
}
// -----------------------

const ClientNotes: FC = () => {
  const { clientID }: IParams = useParams();
  const { clientState, clientDispatch } =
    useContext<TClientContext>(ClientContext);
  const [showEditor, setShowEditor] = useState<boolean>(false);
  const skinCareNotes = clientState.note
    ?.filter((val) => val?.type === 'skincare_notes')
    .slice(0, 1);
  const skincareNoteText =
    skinCareNotes?.length != 0
      ? skinCareNotes?.map((data: Note) => data.text).toString()
      : '';
  const [notes, setNotes] = useState<string>(skincareNoteText || '');
  const handleEditorStateChange = (editorData: string) => {
    setNotes(editorData);
  };
  const { showErrorDialog } = useContext(ToastContext);
  const resetClientNotes = () => {
    if (clientState.trRecentNotesForCustomer) {
      setNotes(clientState.trRecentNotesForCustomer);
    } else {
      setNotes('');
    }
    setShowEditor(false);
  };

  const getBGColor = () => {
    if (showEditor) {
      return 'var(--neutral-secondary)';
    } else if (!showEditor && clientState.note?.length != 0) {
      return 'var(--wheat-75)';
    } else {
      return 'transparent';
    }
  };
  const createNotesRecord = async (data: DocumentObject) => {
    try {
      const response: Note = await NotesService.createNotes(data);
      clientDispatch(updateClientNote([response]));
      setShowEditor(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        showErrorDialog(error?.message);
      } else if (error instanceof Error) {
        showErrorDialog(error?.message);
      }
      console.log('error', error);
    }
  };
  const updateNotesRecord = async (id: string) => {
    const noteDeserialised = {
      id: id,
      text: notes,
      contextId: {
        id: clientID,
      },
    };
    const entitySerialized: DocumentObject = transform()
      .withInput(noteDeserialised)
      .withTransformer(new NoteTransformer())
      .withOptions({ idKey: 'id' })
      .serialize();
    try {
      await NotesService.patchNotes(id, entitySerialized);
      clientDispatch(refreshClientEndpoint(true));
      setShowEditor(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        showErrorDialog(error?.message);
      } else if (error instanceof Error) {
        showErrorDialog(error?.message);
      }
      console.log('error', error);
    }
  };
  const saveClientNotes = () => {
    const noteDeserialised = {
      text: notes,
      type: 'skincare_notes',
      contextId: {
        id: clientID,
      },
    };
    const entitySerialized: DocumentObject = transform()
      .withInput(noteDeserialised)
      .withTransformer(new NoteTransformer())
      .withOptions({ idKey: 'id' })
      .serialize();
    createNotesRecord(entitySerialized);
  };

  const handleSave = () => {
    const clientNoteID = skinCareNotes?.map((data) => data.id).toString();
    clientState.note?.length != 0
      ? updateNotesRecord(clientNoteID || '')
      : saveClientNotes();
  };

  return (
    <ClientNotesWrapper bgColor={getBGColor()}>
      {(skinCareNotes?.length != 0 || showEditor) && (
        <NoteTitleWrapper>
          <Box className='title-section'>
            <img src={EditorNotes} alt='EditorNotes' />
            <Typography variant='body1' className='notes-title'>
              Notes
            </Typography>
            {skinCareNotes?.length != 0 && !showEditor && (
              <Box>
                <span className='notes-pipe'>|</span>
                <Typography
                  variant='body2'
                  component={'span'}
                  color={'var(--neutral-primary)'}
                >
                  Edited{' '}
                  {skinCareNotes
                    ? skinCareNotes
                        .map((date) => dayjs(date?.updatedAt)?.fromNow())
                        .toString()
                    : ' NA'}
                </Typography>
              </Box>
            )}
          </Box>

          {!showEditor ? (
            <Box className='edit-section'>
              <IconButton onClick={() => setShowEditor(true)}>
                <Typography variant='body1' className='edit-title'>
                  Edit
                </Typography>
                <EditorPencil />
              </IconButton>
            </Box>
          ) : (
            <Box>
              <IconButton onClick={() => handleSave()}>
                <Checkmark />
              </IconButton>
              <IconButton onClick={resetClientNotes}>
                <DeleteIcon />
              </IconButton>
            </Box>
          )}
        </NoteTitleWrapper>
      )}
      {showEditor && (
        <NotesWrapper>
          <NotesEditor
            notesData={notes || skincareNoteText || ''}
            handleChange={handleEditorStateChange}
          />
        </NotesWrapper>
      )}
      {skinCareNotes?.length != 0 && !showEditor && (
        <NotesWrapper>
          <ul className='notes-ul-list'>
            {skinCareNotes &&
              skinCareNotes?.map((data, index) => {
                return (
                  <Typography
                    variant='body1'
                    component={'p'}
                    color='var(--neutral-primary)'
                    key={`list-${index}`}
                  >
                    {data.text}
                  </Typography>
                );
              })}
          </ul>
        </NotesWrapper>
      )}{' '}
      {skinCareNotes?.length == 0 && !showEditor && (
        <EmptyNotesWrapper>
          <IconButton onClick={() => setShowEditor(true)}>
            <PlusIcon className='plus-icon' />
            <Typography variant='btn' className='empty-title'>
              Client Note
            </Typography>
          </IconButton>
        </EmptyNotesWrapper>
      )}
    </ClientNotesWrapper>
  );
};

export default ClientNotes;
