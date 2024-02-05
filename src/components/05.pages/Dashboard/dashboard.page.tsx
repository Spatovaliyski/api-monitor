import React, { useState, useEffect, useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { LogData, GroupedData } from './dashboard.type';
import Chart, { CategoryScale, Title } from 'chart.js/auto';
import dayjs, { Dayjs } from 'dayjs';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Box, Grid, Container } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import service from '@lib/services/service';
import styles from './dashboard.module.scss';
import StartEndDatepicker from '@molecules/StartEndDatepicker/start-end-datepicker.component';
import Heading from '@organisms/Heading/heading.component';
import ResultsTable from '@organisms/ResultsTable/results-table.component';
import ResultsSummarized from '@organisms/ResultsSummarized/results-summarized.component';

// Register the category scale
Chart.register(CategoryScale);

const StackedBarGraphComponent = () => {
  const [logData, setLogData] = useState<LogData[]>([]);
  const [firstEntryDate, setFirstEntryDate] = useState<Dayjs>(dayjs('1969-01-01'));
  const [lastEntryDate, setLastEntryDate] = useState<Dayjs>(dayjs('2100-01-01'));
  const [startDate, setStartDate] = useState<Dayjs>(dayjs('2024-01-01'));
  const [endDate, setEndDate] = useState<Dayjs>(dayjs('2024-01-31').endOf('day')); // endOf = 23:59:59
  const [summarizedData, setSummarizedData] = useState<{ success: number; warning: number; error: number }>({
    success: 0,
    warning: 0,
    error: 0,
  });

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

      setFirstEntryDate(dayjs(res.data[0].timestamp * 1000));
      setLastEntryDate(dayjs(res.data[res.data.length - 1].timestamp * 1000));

      setLogData(filteredData);
    });
  }, [startDate, endDate]);

  /**
   * Transform the data to be used in the stacked bar graph
   * 
   * @returns {Object} - The transformed data
   */
  const transformData = (): { labels: string[]; datasets: any[] } => {
    const groupedData: GroupedData = logData.reduce((group: GroupedData, log: LogData) => {
      const period = new Date(log.timestamp * 1000).toLocaleDateString();

      if (!group[period]) {
        group[period] = { success: 0, warning: 0, error: 0 };
      }

      if (log.status === 0) {
        group[period].success++;
      } else if (log.status === 1) {
        group[period].warning++;
      } else if (log.status === 2) {
        group[period].error++;
      }

      return group;
    }, {});

    const labels = Object.keys(groupedData);
    const datasets = [
      {
        label: 'Success',
        backgroundColor: '#4aa726',
        data: labels.map((period) => groupedData[period].success),
      },
      {
        label: 'Warning',
        backgroundColor: '#ffd000',
        data: labels.map((period) => groupedData[period].warning),
      },
      {
        label: 'Error',
        backgroundColor: '#ff0000',
        data: labels.map((period) => groupedData[period].error),
      },
    ];

    return { labels, datasets};
  };

  useEffect(() => {
    const successCount = logData.reduce((count: number, log: LogData) => {
      if (log.status === 0) {
        return count + 1;
      }
      return count;
    }, 0);

    const warningCount = logData.reduce((count: number, log: LogData) => {
      if (log.status === 1) {
        return count + 1;
      }
      return count;
    }, 0);

    const errorCount = logData.reduce((count: number, log: LogData) => {
      if (log.status === 2) {
        return count + 1;
      }
      return count;
    }, 0);

    setSummarizedData({ success: successCount, warning: warningCount, error: errorCount });
  }, [logData]);

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} lg={12}>
          <Heading
            type={'h1'}
            text={'Dashboard'}
            className={styles.heading}
          />
        </Grid>

        <Grid item xs={12} lg={12} mb={4}>
          <Heading type={'h4'} text={'Select by date'} />
          <StartEndDatepicker
            startDate={startDate}
            endDate={endDate}
            firstEntryDate={firstEntryDate}
            lastEntryDate={lastEntryDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />
        </Grid>

        <Grid item xs={12} md={12} lg={8} mb={4}>
          <Heading type={'h4'} text={'Results by date'} />
          <Bar
            className={styles.barGraph}
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
        </Grid>

        <Grid item xs={12} md={12} lg={4} alignSelf={'stretch'} mb={4}>
          <Heading type={'h4'} text={'Results Summary'} />
          <ResultsSummarized data={summarizedData} />
        </Grid>

        <Grid item xs={12} md={12} lg={12}>
          <Heading type={'h4'} text={'Table of contents'} />
          <ResultsTable logData={logData} />
        </Grid>
      </Grid>
    </div>
  );
};

export default StackedBarGraphComponent;
