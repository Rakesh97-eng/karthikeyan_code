import { Box, IconButton, Typography } from '@mui/material';
import { FC, useContext, useEffect, useState } from 'react';
import {
  CLIENT_PREFERENCES,
  CLIENT_PREFERENCES_CATEGORIES,
} from '../../../constants/appConstants';
import {
  ClientPreference,
  ClientPreferencesCategory,
} from '../../../types/treatmentRecord/question';

//icons
import { ReactComponent as PlusIcon } from '../../../assets/icons/plus.svg';
import { ReactComponent as PlusCircleIcon } from '../../../assets/icons/plus-circle.svg';
import { ReactComponent as Checkmark } from '../../../assets/icons/checkmark.svg';
import { ReactComponent as DeleteIcon } from '../../../assets/icons/delete-icon.svg';

import CustomDialog from '../../common/CustomDialog';
import StyledButton from '../../common/Button';
import {
  ClientPreferencesWrapper,
  SelectedPreferencesWrapper,
  StyledClientPreference,
} from './styles';
import AttributePill from '../../common/AttributePill';
import AccordionItem from '../../common/AccordionItem';
import { TClientContext } from '../../../types/store/client';
import ClientContext from '../../../store/client/ClientContext';
import { CustomerService } from '../../../services/Customer';
import { IParams } from '../../../types/clientProfile';
import { useParams } from 'react-router-dom';
import { updateClient } from '../../../store/client/ClientAction';
import { ToastContext } from '../../../providers/context/toastContext';
import { AxiosError } from 'axios';

const TRClientPreferences: FC = () => {
  const { clientID }: IParams = useParams();
  const { clientState, clientDispatch } =
    useContext<TClientContext>(ClientContext);
  const [expandedClientPref, setExpandedClientPref] = useState<string>();
  const handleClientPrefChange = (
    currAccordionID: string,
    isAccordionExpanded: boolean
  ) => {
    setExpandedClientPref(isAccordionExpanded ? currAccordionID : '');
  };
  const { showErrorDialog } = useContext(ToastContext);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const isClientPreferencesModal = () => {
    setModalOpen(!isModalOpen);
  };

  const [clientPreferences] = useState<ClientPreference[]>(CLIENT_PREFERENCES);
  const [selectedClientPreferences, setSelectedClientPreferences] = useState<
    string[]
  >(clientState.keyAttributes || []);

  const selectedPreferences: ClientPreference[] = clientPreferences.filter(
    (preference) => selectedClientPreferences.includes(preference.cp_label)
  );

  const addPreference = (pref: ClientPreference) => {
    setSelectedClientPreferences([...selectedClientPreferences, pref.cp_label]);
  };

  const deletePreference = (prefLabel: string) => {
    setSelectedClientPreferences(
      selectedClientPreferences.filter((selected) => selected !== prefLabel)
    );
  };

  useEffect(() => {
    updateClientKeyAttributes();
  }, [selectedClientPreferences]);

  async function updateClientKeyAttributes() {
    try {
      await CustomerService.patchClient(clientID, {
        id: clientID,
        keyAttributes: selectedClientPreferences,
      });
      clientDispatch(
        updateClient({ keyAttributes: selectedClientPreferences })
      );
    } catch (error) {
      console.log('Error', error);
      if (error instanceof AxiosError) {
        showErrorDialog(error?.message);
      } else if (error instanceof Error) {
        showErrorDialog(error?.message);
      }
    }
  }

  return (
    <>
      <SelectedPreferencesWrapper>
        {selectedPreferences.map(({ cp_id, icon, cp_label }) => {
          return (
            <Box key={`tr-attribute-${cp_id}`}>
              <AttributePill
                id={cp_id}
                PrefIcon={icon}
                label={cp_label}
                backgroundColor='neutral-secondary-dark'
                deleteIcon={<DeleteIcon />}
                handleDelete={() => deletePreference(cp_label)}
              />
            </Box>
          );
        })}
        {selectedPreferences.length === 0 ? (
          <StyledButton
            variant='outlined'
            fullWidth={false}
            value={'New Attribute'}
            isIcon
            icon={<PlusIcon className='add-icon' />}
            onClick={isClientPreferencesModal}
            className='cp-add-button'
          />
        ) : (
          <IconButton
            className='cp-circle-add-button'
            onClick={isClientPreferencesModal}
          >
            <PlusCircleIcon />
          </IconButton>
        )}
      </SelectedPreferencesWrapper>

      <CustomDialog
        isModalOpen={isModalOpen}
        handleClose={isClientPreferencesModal}
        maxwidthsize='354px'
      >
        <ClientPreferencesWrapper>
          <Typography variant='h3' id='modal-modal-title'>
            Add A Key Attribute
          </Typography>
          {CLIENT_PREFERENCES_CATEGORIES.map(
            (category: ClientPreferencesCategory) => (
              <AccordionItem
                key={`accordion-${category.cp_category_id}`}
                accordionTitle={category.cp_category_title}
                accordionID={category.cp_category_id}
                handleChange={handleClientPrefChange}
                accordionExpanded={expandedClientPref}
              >
                {clientPreferences.map(
                  (client_preference: ClientPreference) => {
                    if (
                      client_preference.cp_category_id ===
                      category.cp_category_id
                    ) {
                      return (
                        <StyledClientPreference
                          key={client_preference.cp_id}
                          selected={selectedClientPreferences.includes(
                            client_preference.cp_label
                          )}
                        >
                          <Box className='pref-icon'>
                            <client_preference.icon />
                          </Box>
                          <Typography variant='body1' className='cp-label'>
                            {client_preference.cp_label}
                          </Typography>
                          {selectedClientPreferences.includes(
                            client_preference.cp_label
                          ) ? (
                            <Checkmark className='pref-action-icon' />
                          ) : (
                            <IconButton
                              className='pref-action-icon'
                              onClick={() => addPreference(client_preference)}
                            >
                              <PlusCircleIcon />
                            </IconButton>
                          )}
                        </StyledClientPreference>
                      );
                    }

                    return null;
                  }
                )}
              </AccordionItem>
            )
          )}
        </ClientPreferencesWrapper>
      </CustomDialog>
    </>
  );
};

export default TRClientPreferences;
