import React, { useContext, useEffect, useState } from 'react';
import { ScheduleBodyWrapper } from './styles';
import { addHours, format, differenceInMinutes } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import { ReactComponent as CheckMark } from '../../../../assets/images/home/checkmark.svg';
import { ReactComponent as StoreFront } from '../../../../assets/images/home/storefront.svg';
import {
  APPOINTMENT_STATES,
  calendarColors,
  DEFAULT_TIMEZONE,
  FORMAT_DATE,
  LOCAL_STORAGE_KEYS,
} from '../../../../constants/appConstants';
import { Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';
import CustomDialog from '../../../common/CustomDialog';
import { AppointmentEmptyPopUp, AppointmentPopUp } from '../../popUp';
import { TimeSpan } from '../../../../types/schedule';
import {
  defaultStaff,
  HomeContext,
} from '../../../../providers/context/HomeContext';
import { TimeBlock } from '../../../../types/services/TimeBlock';
import { TimeBlockService } from '../../../../services/TimeBlock';
import {
  defaultErrorHandler,
  handleAxiosError,
} from '../../../../utils/helper-functions/handleError';
import { AppointmentService } from '../../../../services/Appointment';
import {
  Appointment,
  AppointmentRelations,
} from '../../../../types/services/Appointment';
import { AxiosError } from 'axios';
import moment from 'moment-timezone';
import { Staff } from '../../../../types/services/Staff';
import { TimeShiftService } from '../../../../services/TimeShift';
import { BlvdStaffTimeShift } from '../../../../types/services/TimeShift';
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from '../../../../utils/helper-functions/user';
import { ToastContext } from '../../../../providers/context/toastContext';
import { ReactComponent as RightArrowIcon } from '../../../../assets/icons/rightArrow.svg';

const ScheduleBody = () => {
  const history = useHistory();
  const { staffs, selectedStaffId, selectedDate, selectedLocation } =
    useContext(HomeContext);
  const [selectedStaff, setSelectedStaff] = useState<Staff[]>([]);
  const [time, setTime] = useState(new Date());
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [appointmentData, setAppointmentData] = useState<
    Appointment | undefined
  >();
  const [breakTimeData, setBreakTimeData] = useState<TimeBlock | undefined>();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEmptyPopupOpen, setIsEmptyPopupOpen] = useState(false);
  const [timeBlocks, setTimeBlocks] = useState<TimeBlock[]>([]);
  const [timeShifts, setTimeShifts] = useState<BlvdStaffTimeShift[]>([]);
  const handleDeleteModal = () => setDeleteModalOpen(!deleteModalOpen);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isAppointmentsLoaded, setIsAppointmentsLoaded] = useState(false);
  const { showErrorDialog } = useContext(ToastContext);
  const selectedDateFormatted = moment(selectedDate).format(FORMAT_DATE.DAY);
  const sDT = moment
    .tz(selectedDateFormatted, selectedLocation?.tz || DEFAULT_TIMEZONE)
    .startOf('date')
    .toISOString();
  const eDT = moment
    .tz(selectedDateFormatted, selectedLocation?.tz || DEFAULT_TIMEZONE)
    .endOf('date')
    .toISOString();

  let allTimeShifts: BlvdStaffTimeShift[] = [];
  const getAllTimeShifts = async () => {
    try {
      const allTimeBShiftsData = await TimeShiftService.getTimeShifts({
        boulevard_location_id: selectedLocation?.boulevardId || '',
        startIso: selectedDateFormatted,
        endIso: selectedDateFormatted,
      });
      const allTimeBShifts: BlvdStaffTimeShift[] =
        allTimeBShiftsData.data.filter(
          (timeShift) => timeShift.available === true
        );
      allTimeShifts = [...allTimeShifts, ...allTimeBShifts];

      setTimeShifts(allTimeShifts);

      if (allTimeShifts.length > 0) {
        const saveData = {
          savedDate: moment().format(FORMAT_DATE.DAY),
          data: allTimeShifts,
        };
        setLocalStorageItem(
          `${LOCAL_STORAGE_KEYS.STAFF_SHIFT_FOR_LOCATION_ID}_${selectedLocation?.boulevardId}_${selectedDateFormatted}`,
          JSON.stringify(saveData)
        );
      }
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

  const getAllTimeBlocks = async () => {
    try {
      const allTimeBlocksData = await TimeBlockService.getTimeBlocks({
        boulevard_location_id: selectedLocation?.boulevardId || '',
        start_at: {
          gte: sDT,
          lte: eDT,
        },
      });

      // Remove Time Blocks without title
      let allTimeBlocks: TimeBlock[] = allTimeBlocksData.data.filter(
        (timeBlock) => timeBlock.title !== null
      );

      const isDuplicate: string[] = [];
      for (let i = 0; i < allTimeBlocks.length; i++) {
        for (let j = i + 1; j < allTimeBlocks.length; j++) {
          const aSide = allTimeBlocks[i];
          const bSide = allTimeBlocks[j];
          if (aSide.id != bSide.id && isDuplicate.indexOf(aSide.id) === -1) {
            if (
              aSide.startAt == bSide.startAt &&
              aSide.endAt == bSide.endAt &&
              aSide.title.toLowerCase() == bSide.title.toLowerCase() &&
              aSide.blvdStaffId == bSide.blvdStaffId
            ) {
              isDuplicate.push(bSide.id);
            }
          }
        }
      }

      // Remove duplicate Time Blocks
      allTimeBlocks = allTimeBlocks.filter(
        (timeBlock) => isDuplicate.indexOf(timeBlock.id) === -1
      );

      setTimeBlocks(allTimeBlocks);
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

  let allAppointments: Appointment[] = [];
  const getAllAppointments = async (pageNo: number) => {
    try {
      const appointmentsData = await AppointmentService.getAppointments(
        { number: pageNo, size: 50 },
        {
          location_id: selectedLocation?.id || '',
          start_at: {
            gte: sDT,
            lte: eDT,
          },
          state: {
            ne: APPOINTMENT_STATES.CANCELLED,
          },
        },
        {
          appointment:
            'id,customer_id,location_id,start_at,end_at,rating,cancelled,is_remote,state,duration,cancellation_reason,cancellation_note',
          customer: 'id,first_name,last_name,name',
          note: 'id,context,context_id,text,created_at,type',
          tag: 'id,context,context_id,name,symbol,created_at',
          [AppointmentRelations.AppointmentService]: 'id',
          [AppointmentRelations.AppointmentServiceStaff]:
            'id,first_name,last_name,boulevard_id',
        },
        [
          AppointmentRelations.Customer,
          AppointmentRelations.Note,
          AppointmentRelations.Tag,
          AppointmentRelations.AppointmentService,
          AppointmentRelations.AppointmentServiceStaff,
        ]
      );
      const activeAppointments: Appointment[] = appointmentsData.data.filter(
        (appointment) => appointment.state !== APPOINTMENT_STATES.CANCELLED
      );
      allAppointments = [...allAppointments, ...activeAppointments];
      const currentSize =
        (appointmentsData?.meta?.page || 1) *
        (appointmentsData?.meta?.size || 10);
      if (appointmentsData?.meta.total > currentSize) {
        setIsAppointmentsLoaded(false);
        setTimeout(() => {
          getAllAppointments(pageNo + 1);
        }, 100);
      } else {
        setIsAppointmentsLoaded(true);
        setAppointments(allAppointments);
      }
    } catch (error) {
      setIsAppointmentsLoaded(true);
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
    if (selectedLocation?.id && staffs.length > 0) {
      setTimeBlocks([]);
      getAllTimeBlocks();

      setAppointments([]);
      getAllAppointments(1);
    }
  }, [selectedDate, selectedLocation?.id]);

  useEffect(() => {
    if (selectedLocation?.id && selectedLocation?.boulevardId) {
      const savedStaff = getLocalStorageItem(
        `${LOCAL_STORAGE_KEYS.STAFF_FOR_LOCATION_ID}_${selectedLocation?.id}`
      );
      if (savedStaff) {
        const savedShifts = getLocalStorageItem(
          `${LOCAL_STORAGE_KEYS.STAFF_SHIFT_FOR_LOCATION_ID}_${selectedLocation?.boulevardId}_${selectedDateFormatted}`
        );
        if (savedShifts) {
          const savedShiftsJson = JSON.parse(savedShifts);
          if (savedShiftsJson?.savedDate != moment().format(FORMAT_DATE.DAY)) {
            setTimeShifts([]);
            getAllTimeShifts();
          } else {
            setTimeShifts(savedShiftsJson.data);
          }
        } else {
          setTimeShifts([]);
          getAllTimeShifts();
        }
      }
    }
  }, [selectedDate, selectedLocation, staffs]);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 60000); // 1000 * 60 (milliseconds * second)
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (selectedStaffId === defaultStaff.staffId) {
      setSelectedStaff(staffs);
    } else {
      setSelectedStaff(staffs.filter((ss) => ss.id === selectedStaffId));
    }
  }, [selectedStaffId, staffs]);

  const renderAppointmentStatus = (state: string): JSX.Element => {
    switch (state) {
      case APPOINTMENT_STATES.ARRIVED:
        return <StoreFront className='success-icon' />;
      case APPOINTMENT_STATES.BOOKED:
      case APPOINTMENT_STATES.CONFIRMED:
        return <CheckMark className='success-icon' />;
      default:
        return <></>;
    }
  };

  const renderHours = (): JSX.Element => {
    const dateFormat = 'haaa';
    const hours = [];
    const sT = new Date();
    sT.setHours(8, 0, 0);
    for (let i = 0; i < 15; i++) {
      hours.push(
        <Typography
          variant='body3'
          className='workingHour'
          component='div'
          key={uuidv4()}
        >
          {format(addHours(sT, i), dateFormat)}
        </Typography>
      );
    }
    return <div className='workingHourWrapper'>{hours}</div>;
  };

  const renderShiftGrid = (currentSelectedStaffs: Staff[]): JSX.Element => {
    const grids = [];
    let staffColumnCount: number;
    staffColumnCount = 0;
    const staffCount = currentSelectedStaffs.length;
    const timeHeight = 100 / 60;
    const dayStart = moment
      .tz(selectedDateFormatted, selectedLocation?.tz || DEFAULT_TIMEZONE)
      .set({ hour: 8, minute: 0, second: 0, millisecond: 0 })
      .toDate();

    const minWidthDay = staffCount > 1 ? '240px' : '100%';
    const leftRightMargin = staffCount > 1 ? '12px' : '16px';
    const fullScreenClass = staffCount > 1 ? '' : 'fullScreen';
    const columnClasses =
      staffCount > 1
        ? 'workingShiftGridColumn workingShiftGridMin'
        : 'workingShiftGridColumn';

    for (let idx = 0; idx < currentSelectedStaffs.length; idx++) {
      const staff = currentSelectedStaffs[idx];
      const colorIdx = idx % calendarColors.length;
      const color = calendarColors[colorIdx];
      //Calendar column for a single staff
      const cols = [];

      const timeShift = timeShifts.find(
        (t) => t.boulevardStaffId === staff.boulevardId
      );
      const tempAppointments = appointments.filter(
        (appointment) => appointment.appointmentService?.staff?.id == staff.id
      );
      const tmpTimeBlocks = timeBlocks.filter(
        (timeBlock) => timeBlock.blvdStaffId == staff.boulevardId
      );

      if (timeShift || tempAppointments.length > 0) {
        staffColumnCount++;

        //add staff name at the top of calendar grid
        cols.push(
          <Typography
            variant='body3'
            className='workingShiftGridHeader'
            component='div'
            key={uuidv4()}
          >
            {staff.firstName} {staff.lastName}
          </Typography>
        );

        //loop for creating background 13 calendar grids for a single staff
        for (let i = 0; i < 15; i++) {
          cols.push(
            <div className='workingShiftGridData' key={uuidv4()}></div>
          );
        }

        // render Time Shift
        if (timeShift) {
          const clockIn = timeShift.clockIn.split(':');
          const clockOut = timeShift.clockOut.split(':');

          const workingStartTime = moment
            .tz(selectedDateFormatted, selectedLocation?.tz || DEFAULT_TIMEZONE)
            .set({
              hour: parseInt(clockIn[0]),
              minute: parseInt(clockIn[1]),
              second: parseInt(clockIn[2]),
              millisecond: 0,
            })
            .toDate();

          const workingEndTime = moment
            .tz(selectedDateFormatted, selectedLocation?.tz || DEFAULT_TIMEZONE)
            .tz(selectedLocation?.tz || DEFAULT_TIMEZONE)
            .set({
              hour: parseInt(clockOut[0]),
              minute: parseInt(clockOut[1]),
              second: parseInt(clockOut[2]),
              millisecond: 0,
            })
            .toDate();

          //staff's day start timing
          let startDay = differenceInMinutes(workingStartTime, dayStart);
          //staff's day end timing
          let endDay = differenceInMinutes(workingEndTime, workingStartTime);
          startDay = startDay * timeHeight + 24;
          endDay = endDay * timeHeight - 4;

          //render staff's working shift with some bg color
          cols.push(
            <div
              className='workingShiftTime'
              style={{
                width: minWidthDay,
                top: startDay,
                height: endDay,
                backgroundColor: color.alpha,
              }}
              key={uuidv4()}
            ></div>
          );
        }

        //Staff's appointments and time blocks with a check of overlapping and sorting
        const staffTimeSpans: TimeSpan[] = getStaffTimings(
          tempAppointments,
          tmpTimeBlocks
        );

        // render Appointments
        for (const appointment of tempAppointments) {
          const appointmentStartTime = new Date(appointment.startAt);
          const appointmentEndTime = new Date(appointment.endAt);

          const setAppointment = staffTimeSpans.find(
            (a) => a.id === appointment.id
          );

          const minWidthAppointment = setAppointment?.hasOverlap
            ? 'calc(66% - 4px)'
            : 'calc(100% - 4px)';

          let appointmentStart = differenceInMinutes(
            appointmentStartTime,
            dayStart
          );

          let appointmentEnd = differenceInMinutes(
            appointmentEndTime,
            appointmentStartTime
          );

          appointmentStart = appointmentStart * timeHeight + 24;
          appointmentEnd = appointmentEnd * timeHeight - 4;

          const customerName = appointment.customer?.firstName
            ? `${appointment.customer?.firstName} ${appointment.customer?.lastName}`
            : appointment.customer?.name;

          const internalNotes = appointment?.note?.filter(
            (n) =>
              n.context == 'appointment' && (n.type == '' || n.type == null)
          );

          cols.push(
            <div
              onClick={() => handleTreatmentClick(appointment.customerId)}
              className={`appointmentWrapper ${
                setAppointment?.isLeft ? 'moveLeft' : 'moveRight'
              }`}
              style={{
                width: minWidthAppointment,
                top: appointmentStart,
                height: appointmentEnd,
                backgroundColor: color.color,
              }}
              key={uuidv4()}
            >
              <Typography
                variant='body2'
                className={`appointmentTime ${fullScreenClass}`}
                component='div'
                style={{ marginLeft: leftRightMargin }}
                key={uuidv4()}
              >
                {moment
                  .tz(
                    appointment.startAt,
                    selectedLocation?.tz || DEFAULT_TIMEZONE
                  )
                  .format(FORMAT_DATE.TIME_MIN)}{' '}
                -{' '}
                {moment
                  .tz(
                    appointment.endAt,
                    selectedLocation?.tz || DEFAULT_TIMEZONE
                  )
                  .format(FORMAT_DATE.TIME_MIN)}
              </Typography>
              <div
                className='appointmentStatus'
                style={{ marginRight: leftRightMargin }}
              >
                {staffCount > 1 ? (
                  ''
                ) : (
                  <Typography
                    variant='body3'
                    className='appointmentStatusText'
                    component='div'
                    key={uuidv4()}
                  >
                    {appointment.state}
                  </Typography>
                )}
                <div
                  style={{
                    height: '20px',
                    width: '16px',
                    display: 'inline-block',
                    verticalAlign: 'middle',
                    marginTop:'-6px',
                  }}
                >
                  {renderAppointmentStatus(appointment.state)}
                </div>
              </div>

              <Typography
                variant='body2'
                className={`appointmentWith ${fullScreenClass}`}
                component='div'
                key={uuidv4()}
              >
                {customerName}
              </Typography>
              <div className={`appointmentIcons ${fullScreenClass}`}>
                {appointment.tag?.map((tag) => {
                  return <>{tag.symbol} </>;
                })}
              </div>
              {internalNotes?.map((internalNote) => {
                return (
                  <Typography
                    variant='body2'
                    className='appointmentInfo'
                    component='div'
                    key={uuidv4()}
                  >
                    INTERNAL: {internalNote.text}
                  </Typography>
                );
              })}
              {internalNotes?.length ? (
                <Typography
                  variant='body2'
                  className={`appointmentMore ${
                    staffCount > 1 ? '' : 'appointmentMoreFullScreen'
                  }`}
                  component='div'
                  key={uuidv4()}
                  onClick={(event: React.MouseEvent<HTMLElement>) =>
                    handlePopUpOpen(event, appointment)
                  }
                >
                  More
                  <RightArrowIcon />
                </Typography>
              ) : null}
            </div>
          );
        }

        // render Time Blocks
        for (const block of tmpTimeBlocks) {
          const blockStartTime = new Date(block.startAt);
          const blockEndTime = new Date(block.endAt);

          const setBlock = staffTimeSpans.find((a) => a.id === block.id);

          const minWidthAppointment = setBlock?.hasOverlap
            ? 'calc(66% - 4px)'
            : 'calc(100% - 4px)';

          let blockStart = differenceInMinutes(blockStartTime, dayStart);
          let blockEnd = differenceInMinutes(blockEndTime, blockStartTime);
          blockStart = blockStart * timeHeight + 24;
          blockEnd = blockEnd * timeHeight - 4;

          cols.push(
            <div
              className={`blockWrapper ${
                setBlock?.isLeft ? 'moveLeft' : 'moveRight'
              }`}
              style={{
                width: minWidthAppointment,
                top: blockStart,
                height: blockEnd,
                backgroundColor: color.alpha,
                borderColor: color.color,
              }}
              key={uuidv4()}
              onClick={(event: React.MouseEvent<HTMLElement>) =>
                handleEmptyPopUpOpen(event, block)
              }
            >
              <Typography
                variant='body2'
                className={`blockTime ${fullScreenClass}`}
                style={{ marginLeft: leftRightMargin }}
                component='div'
                key={uuidv4()}
              >
                {moment(block.startAt)
                  .tz(selectedLocation?.tz || DEFAULT_TIMEZONE)
                  .format(FORMAT_DATE.TIME_MIN)}{' '}
                -{' '}
                {moment(block.endAt)
                  .tz(selectedLocation?.tz || DEFAULT_TIMEZONE)
                  .format(FORMAT_DATE.TIME_MIN)}
              </Typography>
              <Typography
                variant='body2'
                className={`blockTitle ${fullScreenClass}`}
                component='div'
                key={uuidv4()}
              >
                {/* render title only if duration is greater than 30 */}
                {block.duration > 29 && block.title}
              </Typography>
            </div>
          );
        }

        grids.push(
          <div className={columnClasses} key={uuidv4()}>
            {cols}
          </div>
        );
      }
    }

    const maxWidthGrid =
      staffCount > 1 ? `${240 * staffColumnCount}px` : '100%';

    return (
      <div className='workingShiftGridWrapper'>
        <div className='workingShiftGrid' style={{ width: maxWidthGrid }}>
          {grids}
        </div>
      </div>
    );
  };

  const renderCurrentTime = (showTime: Date): JSX.Element => {
    const dayStart = moment()
      .tz(selectedLocation?.tz || DEFAULT_TIMEZONE)
      .set({ hour: 8, minute: 0, second: 0, millisecond: 0 })
      .toDate();

    const currentTime = moment(showTime)
      .tz(selectedLocation?.tz || DEFAULT_TIMEZONE)
      .toDate();

    const timeHeight = 100 / 60;

    let pointerTop = differenceInMinutes(currentTime, dayStart);
    pointerTop = pointerTop * timeHeight + 12;

    const currentTimeBar = (
      <div className='workingCurrentTimeWrapper' style={{ top: pointerTop }}>
        <Typography variant='body3' className='currentTimeText' component='div'>
          {moment(currentTime)
            .tz(selectedLocation?.tz || DEFAULT_TIMEZONE)
            .format(FORMAT_DATE.TIME_MIN)}
        </Typography>
        <div className='currentTimeLine'></div>
      </div>
    );

    return currentTimeBar;
  };

  const getStaffTimings = (
    appointments: Appointment[],
    timeBlocks: TimeBlock[]
  ): TimeSpan[] => {
    let timeSpans: TimeSpan[] = [];
    for (const appointment of appointments) {
      const e = appointment;
      const span: TimeSpan = {
        id: e.id,
        isLeft: true,
        hasOverlap: false,
        startTime: moment(new Date(e.startAt))
          .tz(selectedLocation?.tz || DEFAULT_TIMEZONE)
          .toDate(),
        endTime: moment(new Date(e.endAt))
          .tz(selectedLocation?.tz || DEFAULT_TIMEZONE)
          .toDate(),
        overlapCount: 0,
      };
      timeSpans.push(span);
    }
    for (const timeBlock of timeBlocks) {
      const e = timeBlock;
      const span: TimeSpan = {
        id: e.id,
        isLeft: true,
        hasOverlap: false,
        startTime: moment(new Date(e.startAt))
          .tz(selectedLocation?.tz || DEFAULT_TIMEZONE)
          .toDate(),
        endTime: moment(new Date(e.endAt))
          .tz(selectedLocation?.tz || DEFAULT_TIMEZONE)
          .toDate(),
        overlapCount: 0,
      };
      timeSpans.push(span);
    }

    timeSpans.sort(function (a, b) {
      if (a.startTime == b.startTime) {
        return 0;
      } else if (a.startTime > b.startTime) {
        return 1;
      }
      return -1;
    });

    timeSpans = setOverlap(timeSpans);

    return timeSpans;
  };

  const setOverlap = (timeSpans: TimeSpan[]): TimeSpan[] => {
    let tmpTimeSpans: TimeSpan[] = [];
    tmpTimeSpans = tmpTimeSpans.concat(timeSpans);

    for (let idx = 0; idx < tmpTimeSpans.length; idx++) {
      const check = tmpTimeSpans[idx];
      if (!check.hasOverlap) {
        let tempSpans: TimeSpan[] = [];
        tempSpans = tmpTimeSpans.slice(idx + 1, tmpTimeSpans.length);
        for (let lp = 0; lp < tempSpans.length; lp++) {
          const oSpan = tempSpans[lp];
          if (
            (check.startTime >= oSpan.startTime &&
              check.startTime < oSpan.endTime) ||
            (check.endTime > oSpan.startTime &&
              check.endTime <= oSpan.endTime) ||
            (check.startTime < oSpan.startTime &&
              check.endTime > oSpan.startTime) ||
            check.startTime === oSpan.startTime
          ) {
            tmpTimeSpans[idx].hasOverlap = true;
            tmpTimeSpans[idx + 1 + lp].hasOverlap = true;
            tmpTimeSpans[idx + 1 + lp].isLeft = false;
            tmpTimeSpans[idx + 1 + lp].overlapCount += 1;
          }
        }
      }
    }
    return tmpTimeSpans;
  };

  const handleTreatmentClick = (id: string) => {
    history.push(`/clients/${id}`);
  };

  const handlePopUpOpen = (
    event: React.MouseEvent<HTMLElement>,
    data: Appointment
  ) => {
    event?.stopPropagation();
    setIsPopupOpen(true);
    setIsEmptyPopupOpen(false);
    setAppointmentData(data);
    setDeleteModalOpen(true);
  };

  const handleEmptyPopUpOpen = (
    event: React.MouseEvent<HTMLElement>,
    data: TimeBlock
  ) => {
    event?.stopPropagation();
    setIsEmptyPopupOpen(true);
    setIsPopupOpen(false);
    setBreakTimeData(data);
    setDeleteModalOpen(true);
  };

  return (
    <>
      <ScheduleBodyWrapper>
        {isAppointmentsLoaded && (
          <div style={{ position: 'relative' }}>
            {renderHours()}
            {renderShiftGrid(selectedStaff)}
            {renderCurrentTime(time)}
          </div>
        )}
      </ScheduleBodyWrapper>

      <CustomDialog
        isModalOpen={deleteModalOpen}
        handleClose={handleDeleteModal}
        maxwidthsize='536px'
        padding='0px'
      >
        {isPopupOpen && (
          <AppointmentPopUp
            handleClose={handleDeleteModal}
            appointmentData={appointmentData ? appointmentData : undefined}
          />
        )}
        {isEmptyPopupOpen && (
          <AppointmentEmptyPopUp
            handleClose={handleDeleteModal}
            breakTimeData={breakTimeData ? breakTimeData : undefined}
          />
        )}
      </CustomDialog>
    </>
  );
};

export default ScheduleBody;
