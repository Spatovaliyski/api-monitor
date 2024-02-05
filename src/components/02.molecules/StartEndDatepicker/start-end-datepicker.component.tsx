import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import React, { useEffect, useState } from 'react';
import { StartEndDatepickerProps } from './start-end-datepicker.type';

import styles from './start-end-datepicker.module.scss'

const StartEndDatepicker = ({ startDate,  endDate, firstEntryDate, lastEntryDate, setStartDate, setEndDate }: StartEndDatepickerProps) => {
  const [selectedMinDate, setSelectedMinDate] = useState(firstEntryDate);
  const [selectedMaxDate, setSelectedMaxDate] = useState(lastEntryDate);

  /**
   * Handle the start date change
   * 
   * @param {Dayjs} newValue - The new start date
   * 
   * @returns {void}
   */
  const handleStartDate = (newValue: Dayjs) => {
    setStartDate(newValue);
    setSelectedMinDate(newValue); // Validation | Set min date to the new start date
  }


  /** 
   * Handle the end date change
   * 
   * @param {Dayjs} newValue - The new end date
   * 
   * @returns {void}
   */
  const handleEndDate = (newValue: Dayjs) => {
    setEndDate(newValue);
    setSelectedMaxDate(newValue); // Validation | Set max date to the new end date
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className={styles.group}>
        <DatePicker
          className={styles.datePicker}
          label="Start Date"
          value={startDate}
          minDate={firstEntryDate}
          maxDate={selectedMaxDate}
          onChange={(newValue) => handleStartDate(newValue)}
        />
        <DatePicker
          className={styles.datePicker}
          label="End Date"
          value={endDate}
          minDate={selectedMinDate}
          maxDate={lastEntryDate}
          onChange={(newValue) => handleEndDate(newValue)}
        />
      </div>

    </LocalizationProvider>
  )
}

export default StartEndDatepicker