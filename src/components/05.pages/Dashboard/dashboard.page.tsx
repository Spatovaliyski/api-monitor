import React, { useState, useEffect, useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { LogData, GroupedData } from './dashboard.type';
import Chart, { CategoryScale } from 'chart.js/auto';
import dayjs, { Dayjs } from 'dayjs';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import service from '@lib/services/service';
import styles from './dashboard.module.scss';

// Register the category scale
Chart.register(CategoryScale);

const StackedBarGraphComponent = () => {
  const [firstEntryTime, setFirstEntryTime] = useState<Dayjs | null>(null);
  const [lastEntryTime, setLastEntryTime] = useState<Dayjs | null>(null);
  const [logData, setLogData] = useState<LogData[]>([]);
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs('2024-01-01'));
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs('2024-01-31').endOf('day')); // endOf = 23:59:59
  const [sortColumn, setSortColumn] = useState<string | null>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  /** 
   * Fetch the data from the API and filter it based on the date range
   * 
   * @returns {void}
   */
  useEffect(() => {
    service.getItems().then((res) => {
      const filteredData = res.data.filter((log: LogData) => {
        const logDate = log.timestamp;
        const startTimestamp = startDate?.toDate().getTime() ?? 0;
        const endTimestamp = endDate?.toDate().getTime() ?? 0;

        return logDate >= startTimestamp / 1000 && logDate <= endTimestamp / 1000;
      });

      setFirstEntryTime(dayjs(res.data[0].timestamp * 1000));
      setLastEntryTime(dayjs(res.data[res.data.length - 1].timestamp * 1000));

      setLogData(filteredData);
    });
  }, [startDate, endDate]);

  /**
   * Transform the data to be used in the stacked bar graph
   * 
   * @returns {Object} - The transformed data
   * 
   */
  const transformData = (): { labels: string[]; datasets: any[] } => {
    const groupedData: GroupedData = logData.reduce((acc: GroupedData, log: LogData) => {
      const period = new Date(log.timestamp * 1000).toLocaleDateString();

      if (!acc[period]) {
        acc[period] = { success: 0, warning: 0, error: 0 };
      }

      if (log.status === 0) {
        acc[period].success++;
      } else if (log.status === 1) {
        acc[period].warning++;
      } else if (log.status === 2) {
        acc[period].error++;
      }

      return acc;
    }, {});

    const labels = Object.keys(groupedData);
    const datasets = [
      {
        label: 'Success',
        backgroundColor: 'green',
        data: labels.map((period) => groupedData[period].success),
      },
      {
        label: 'Warning',
        backgroundColor: 'yellow',
        data: labels.map((period) => groupedData[period].warning),
      },
      {
        label: 'Error',
        backgroundColor: 'red',
        data: labels.map((period) => groupedData[period].error),
      },
    ];

    return { labels, datasets};
  };

  /** 
   * Handle the change of page
   * 
   * @param {React.MouseEvent<HTMLButtonElement> | null} event - The event of the change
   * @param {number} newPage - The new page
   * @returns {void}
   */
  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  /** 
   * Handle the change of rows per page
   * 
   * @param {React.ChangeEvent<HTMLInputElement>} event - The event of the change
   * @returns {void}
   * 
   */
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  /** 
   * Show a table with results paginated and pre-sorted. Date pickers are individual
   */
  const showResultsTable = () => {
    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    /** 
     * Handle the sorting of the table
     * 
     * @param {string} column - The column to sort by
     * @returns {void}
     * 
     */
    const handleSort = (column: string) => {
      if (column === sortColumn) {
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
      } else {
        setSortColumn(column);
        setSortDirection('asc');
      }
    };

    /**
     * Sort the data based on the column and direction
     * 
     * @param {string} column - The column to sort by
     * @param {'asc' | 'desc'} direction - The direction to sort by
     * @returns {LogData[]} - The sorted data
     * 
     */
    const sortedData = useMemo(() => {
      let sortedArray = [...logData];

      if (sortColumn) {
        sortedArray.sort((a, b) => {
          const aValue = a[sortColumn];
          const bValue = b[sortColumn];

          if (aValue < bValue) {
            return sortDirection === 'asc' ? -1 : 1;
          }
          if (aValue > bValue) {
            return sortDirection === 'asc' ? 1 : -1;
          }
          return 0;
        });
      }

      return sortedArray;
    }, [logData, sortColumn, sortDirection]);

    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell onClick={() => handleSort('timestamp')}>Date/Time</TableCell>
              <TableCell onClick={() => handleSort('url')}>URL</TableCell>
              <TableCell onClick={() => handleSort('issue_description')}>Issue Description</TableCell>
              <TableCell onClick={() => handleSort('status')}>Status</TableCell>
              <TableCell onClick={() => handleSort('response_time')}>Response Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.slice(startIndex, endIndex).map((log: LogData, index: number) => (
              <TableRow key={index}>
                <TableCell>{new Date(log.timestamp * 1000).toLocaleString('en-GB', { hour12: true })}</TableCell>
                <TableCell>{log.url.slice(19)}</TableCell>
                <TableCell>{log.issue_description && <div className='issue-desc'>{log.issue_description}</div>}</TableCell>
                <TableCell>
                  <span
                    className={`${styles.box} ${styles.status} ${
                      log.status === 1 ? styles.statusWarning : log.status === 2 ? styles.statusError : '' ? log.status : styles.statusNone
                    }`}
                  ></span>
                </TableCell>
                <TableCell>{log.response_time}ms</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={logData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    );
  };

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Start Date"
          value={startDate}
          minDate={firstEntryTime}
          maxDate={lastEntryTime}
          onChange={(newValue) => setStartDate(newValue)}
        />
        <DatePicker
          label="End Date"
          value={endDate}
          minDate={firstEntryTime}
          maxDate={lastEntryTime}
          onChange={(newValue) => setEndDate(newValue)}
        />
      </LocalizationProvider>

      <Bar
        data={{
          labels: transformData().labels,
          datasets: transformData().datasets,
        }}
        width={'900px'}
        height={'100%'}
        options={{
          maintainAspectRatio: true,
          aspectRatio: 2,
          scales: {
            x: { stacked: true },
            y: { stacked: true },
          },
          plugins: {
            legend: { position: 'top' },
          },
        }}
      />

      {showResultsTable()}
    </div>
  );
};

export default StackedBarGraphComponent;
