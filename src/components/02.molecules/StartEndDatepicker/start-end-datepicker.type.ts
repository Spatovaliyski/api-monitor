import dayjs, { Dayjs } from 'dayjs';

export interface StartEndDatepickerProps {
  startDate: any;
  endDate: any;
  firstEntryDate: Dayjs;
  lastEntryDate: Dayjs;
  setStartDate: (param: Dayjs) => void;
  setEndDate: (date: Dayjs) => void;
}
