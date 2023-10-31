import { AxiosError } from 'axios';
import React, { useEffect, useContext } from 'react';

import { StaffService } from '../../../services/Staff';

import { Staff } from '../../../types/services/Staff';
import {
  defaultErrorHandler,
  handleAxiosError,
} from '../../../utils/helper-functions/handleError';
import ScheduleBody from './schedule-body';
import ScheduleHeader from './schedule-header';
import ScheduleWeek from './schedule-week';
import { ScheduleWrapper } from './styles';

import moment from 'moment-timezone';
import { FORMAT_DATE, LOCAL_STORAGE_KEYS } from '../../../constants/appConstants';
import { defaultStaff, HomeContext } from '../../../providers/context/HomeContext';
import { getLocalStorageItem, setLocalStorageItem } from '../../../utils/helper-functions/user';
import { ToastContext } from '../../../providers/context/toastContext';

const Schedule: React.FC = () => {
  const { selectedLocation, selectedStaffId, staffs, updateStaff, updateSelectedStaffId } = useContext(HomeContext);
  const { showErrorDialog } = useContext(ToastContext);
  const getAllStaffByLocationId = async () => {
    if(selectedLocation?.id)
    try {
      const staffsByLocationId = await StaffService.getStaffByLocationId(
        selectedLocation?.id,
        {},
        []
      );

      updateStaff(staffsByLocationId.data);
      resetSelectedStaff(staffsByLocationId.data);
      const saveData = {
        savedDate: moment().format(FORMAT_DATE.DAY),
        data: staffsByLocationId.data,
      };
      setLocalStorageItem(
        `${LOCAL_STORAGE_KEYS.STAFF_FOR_LOCATION_ID}_${selectedLocation?.id}`,
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

  const resetSelectedStaff = (currentStaffs : Staff[]) => {
    if (selectedStaffId != defaultStaff.staffId) {
      const staff = currentStaffs.find(staff => staff.id === selectedStaffId);
      if (!staff) {
        updateSelectedStaffId(defaultStaff.staffId);
      }
    }
  };
  
  useEffect(() => {
    if (selectedLocation?.id) {
      const savedStaff = getLocalStorageItem(
        `${LOCAL_STORAGE_KEYS.STAFF_FOR_LOCATION_ID}_${selectedLocation?.id}`
      );
      if (savedStaff) {
        const savedStaffJson = JSON.parse(savedStaff);
        if (savedStaffJson?.savedDate != moment().format(FORMAT_DATE.DAY)) {
          getAllStaffByLocationId();
        } else {
          updateStaff(savedStaffJson.data);
          resetSelectedStaff(savedStaffJson.data);
        }
      } else {
        getAllStaffByLocationId();
      }
    }

  }, [selectedLocation]);

  if (selectedLocation && staffs.length > 0) {
    return (
      <ScheduleWrapper>
        <ScheduleHeader />
        <ScheduleWeek />
        <ScheduleBody />
      </ScheduleWrapper>
    );
  }

  return (<></>)
};

export default Schedule;
