import React, { useContext, useRef, useState } from 'react';
import { ScheduleWeekWrapper } from './styles';
import moment from 'moment-timezone';
import {
  addDays,
  addWeeks,
  format,
  getWeek,
  isSameDay,
  isToday,
  lastDayOfWeek,
  startOfWeek,
  subWeeks,
  isBefore,
} from 'date-fns';
import { useSwipeable } from 'react-swipeable';
import { v4 as uuidv4 } from 'uuid';

import { ReactComponent as RightArrowIcon } from '../../../../assets/icons/rightArrow.svg';
import { ReactComponent as LeftArrowIcon } from '../../../../assets/icons/leftArrow.svg';
import { HomeContext } from '../../../../providers/context/HomeContext';
import { UTC_OFFSETS } from '../../../../constants/appConstants';
import { setLocalStorageItem } from '../../../../utils/helper-functions/user';

const ScheduleWeek: React.FC = () => {
  const {
    selectedDate,
    selectedLocation,
    updateSelectedDate,
    updateUtcOffsetValue,
  } = useContext(HomeContext);
  const [currentMonth, setCurrentMonth] = useState(new Date(selectedDate));
  const [, setCurrentWeek] = useState(getWeek(currentMonth));
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      changeWeekHandle('next');
    },
    onSwipedRight: () => {
      changeWeekHandle('prev');
    },
  });
  const calendarElem = useRef(null);
  const minDate = new Date('2022-11-30');

  const changeWeekHandle = (btnType: string) => {
    if (btnType === 'prev') {
      if (isBefore(selectedDate, minDate)) {
        return false;
      }
      setCurrentMonth(subWeeks(currentMonth, 1));
      setCurrentWeek(getWeek(subWeeks(currentMonth, 1)));
      let preDate = new Date(moment(selectedDate).subtract(7, 'days').format());
      if (preDate < minDate) {
        preDate = minDate;
      }
      onDateClickHandle(preDate);
    }
    if (btnType === 'next') {
      setCurrentMonth(addWeeks(currentMonth, 1));
      setCurrentWeek(getWeek(addWeeks(currentMonth, 1)));
      onDateClickHandle(new Date(moment(selectedDate).add(7, 'days').format()));
    }
  };

  const onDateClickHandle = (day: Date) => {
    setLocalStorageItem('selectedDate', day.toDateString());
    updateSelectedDate(day);

    const timeZone = selectedLocation?.tz.toLowerCase() || '';
    if (Object.hasOwnProperty.call(UTC_OFFSETS, timeZone)) {
      if (
        day < new Date(day.getFullYear + '-11-06') && // first sunday of Nov
        day > new Date(day.getFullYear + '-03-12')
      ) {
        // second sunday of march
        updateUtcOffsetValue(`-0${UTC_OFFSETS[timeZone]}:00`);
      } else {
        updateUtcOffsetValue(`-0${UTC_OFFSETS[timeZone] + 1}:00`);
      }
    } else {
      updateUtcOffsetValue('-04:00');
    }

    setCurrentMonth(day);
  };

  const renderDays = (): JSX.Element => {
    const { innerWidth: width } = window;
    const dateFormat = width <= 400 ? 'EEEEE' : 'E';
    const days = [];
    const startDate = startOfWeek(currentMonth, { weekStartsOn: 0 });
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className='col col-center' key={uuidv4()}>
          <span className='days-name'>
            {format(addDays(startDate, i), dateFormat)}
          </span>
        </div>
      );
    }
    return <div className='days row'>{days}</div>;
  };
  const renderCells = (): JSX.Element => {
    const startDate: number | Date = startOfWeek(currentMonth, {
      weekStartsOn: 0,
    });
    const endDate: number | Date = lastDayOfWeek(currentMonth, {
      weekStartsOn: 0,
    });
    const dateFormat = 'dd';
    const rows = [];
    let days = [];
    let day: Date = startDate;
    let formattedDate = '';
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <div
            className={`col cell ${
              isBefore(cloneDay, minDate) ? 'disabled' : ''
            }`}
            onClick={() => {
              onDateClickHandle(cloneDay);
            }}
            key={i}
          >
            <span
              className={`number ${isToday(cloneDay) ? 'today' : ''} ${
                isSameDay(day, selectedDate) ? 'selected' : ''
              }`}
            >
              {formattedDate}
            </span>
          </div>
        );
        day = addDays(day, 1);
      }

      rows.push(
        <div className='row' key={uuidv4()}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className='body'>{rows}</div>;
  };
  const renderFooter = (): JSX.Element => {
    return (
      <>
        <div className='header'>
          <div className='arrow-left'>
            <div className='icon' onClick={() => changeWeekHandle('prev')}>
              <LeftArrowIcon />
            </div>
          </div>
          <div className='arrow-right' onClick={() => changeWeekHandle('next')}>
            <div className='icon'>
              <RightArrowIcon />
            </div>
          </div>

          <div className='curser-type'>
            <div className='selected-date'>
              {format(selectedDate, 'EEEE, LLLL dd')}
            </div>
          </div>
        </div>
      </>
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const calRefPassthrough = (el: any) => {
    handlers.ref(el);
    calendarElem.current = el;
  };

  return (
    <>
      <ScheduleWeekWrapper>
        <div className='calendar-custom-height'>
          <div className='calendar'>
            {renderDays()}
            <div {...handlers} ref={calRefPassthrough} className='cell-view'>
              {renderCells()}
            </div>
            {renderFooter()}
          </div>
        </div>
      </ScheduleWeekWrapper>
    </>
  );
};

export default ScheduleWeek;
