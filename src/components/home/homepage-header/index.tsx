import { FC, useState, useEffect, useContext } from 'react';
import { HeaderWrapper, LocationWrapper, RefreshWrapper } from './styles';
import { IconButton, Typography } from '@mui/material';
import {
  filterLocations,
  getGreetingMessage,
} from '../../../utils/helper-functions/common';
import { LocationSelect } from './location-select';
import { Location } from '../../../types/services/Location';
import { LocationService } from '../../../services/Location';
import {
  defaultErrorHandler,
  handleAxiosError,
} from '../../../utils/helper-functions/handleError';
import { AxiosError } from 'axios';
import moment from 'moment-timezone';
import {
  FORMAT_DATE,
  LOCAL_STORAGE_KEYS,
} from '../../../constants/appConstants';
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from '../../../utils/helper-functions/user';
import { ToastContext } from '../../../providers/context/toastContext';
import { PaginationMeta } from '../../../types/services/Common';
import { dynamicSort } from '../../../utils/helper-functions/alphabetKeySort';

interface HomepageHeaderProps {
  userFirstName?: string;
}

export const HomepageHeader: FC<HomepageHeaderProps> = ({ userFirstName }) => {
  const greetingMessage = getGreetingMessage();
  const refreshPage = () => {
    window.location.reload();
  };
  const [locations, setLocations] = useState<Location[]>([]);
  const [meta] = useState<PaginationMeta>({
    page: 0,
    size: 50,
    total: 0,
  });
  const loggedInStaffId = getLocalStorageItem(
    LOCAL_STORAGE_KEYS.LOGGED_IN_STAFF_STAFF_ID
  );
  const { showErrorDialog } = useContext(ToastContext);
  const getAllLocationsByStaffId = async () => {
    try {
      const locationsByStaffId = await LocationService.getLocationsByStaffId(
        { number: meta.page + 1, size: meta.size },
        loggedInStaffId || '',
        {},
        []
      );
      const sortedLocations = locationsByStaffId.data.sort(dynamicSort('name'));
      setLocations(filterLocations(sortedLocations));

      const saveData = {
        savedDate: moment().format(FORMAT_DATE.DAY),
        data: sortedLocations,
      };
      setLocalStorageItem(
        LOCAL_STORAGE_KEYS.LOGGED_IN_STAFF_LOCATIONS,
        JSON.stringify(saveData)
      );
    } catch (error) {
      if (error instanceof AxiosError) {
        showErrorDialog(error?.message);
        handleAxiosError(error);
      } else if (error instanceof Error) {
        showErrorDialog(error?.message);
        defaultErrorHandler(error.message);
      }
    }
  };

  useEffect(() => {
    if (loggedInStaffId) {
      const savedLocation = getLocalStorageItem(
        LOCAL_STORAGE_KEYS.LOGGED_IN_STAFF_LOCATIONS
      );
      if (savedLocation) {
        const savedLocationJson = JSON.parse(savedLocation);
        if (savedLocationJson?.savedDate != moment().format(FORMAT_DATE.DAY)) {
          getAllLocationsByStaffId();
        } else {
          setLocations(filterLocations(savedLocationJson.data));
        }
      } else {
        getAllLocationsByStaffId();
      }
    }
  }, [loggedInStaffId]);

  return (
    <HeaderWrapper>
      {locations?.length > 0 && (
        <LocationWrapper>
          <LocationSelect locations={locations} />
          <RefreshWrapper>
            <IconButton onClick={refreshPage}>
              <Typography variant='body1' className='Refresh-title'>
                Refresh Page
              </Typography>
            </IconButton>
          </RefreshWrapper>
        </LocationWrapper>
      )}
      <Typography
        variant='h2'
        marginBottom={'24px'}
        color={'var(--neutral-primary)'}
      >
        {`${greetingMessage}, ${userFirstName}`}
      </Typography>
    </HeaderWrapper>
  );
};
