import React, { useState, useMemo } from 'react'

import { LogData } from './results-table.type'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Grid, Button, MenuItem, Select, FormControl, InputLabel, TextField } from '@mui/material'

import styles from './results-table.module.scss'
import EnhancedTableHead from '@organisms/Tables/SortableTableHead/sortable-table-head.component';
import ResponseCode from '@atoms/ResponseCodes/response-codes.component';

/** 
 * The Extensive Results Table. It features a lot of logic, including sorting, filtering and pagination.
 * Best case: Break down into smaller components, however more logic needs to be triple-checked to make it work. 
 * Don't hardcode, instead map into chunks for reusability
 * 
 * @param {LogData} logData - The log data
 * @returns {React.ReactElement} - The component
 */
const ResultsTable = ({ logData }: LogData) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortColumn, setSortColumn] = useState('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [filterStatus, setFilterStatus] = useState<number>();
  const [filterIssueType, setFilterIssueType] = useState<number>();
  const [filterURL, setFilterURL] = useState('');
  const [filterResponseTimeMin, setFilterResponseTimeMin] = useState<number>(0);
  const [filterResponseTimeMax, setFilterResponseTimeMax] = useState<number>(0);

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
   */
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  /** 
   * Handle the sorting of the table
   * 
   * @param {string} column - The column to sort by
   * @returns {void}
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
   */
  const sortedData = useMemo(() => {
    let sortedArray = [...logData];

    if (sortColumn) {
      sortedArray.sort((a : any, b : any) => {
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

  const getUniqueValues = (attribute: keyof LogData['logData'][number]) => {
    const uniqueValues = Array.from(new Set(logData.map((log) => log[attribute])));
    return uniqueValues.filter((value) => value !== null && value !== undefined);
  };

  /**
   * Get unique URLs without query parameters from the log data
   * 
   * @returns {string[]} - The unique URLs
   */
  const getUniqueURLs = () => {
    const uniqueURLsMap: { [url: string]: boolean } = {}; // Use an object as a map to store unique URLs
    const sortedUniqueURLs: string[] = [];

    // Iterate through logData and extract unique URLs
    logData.forEach((log) => {
      const urlWithoutParams = log.url.split('?')[0];
      if (!uniqueURLsMap[urlWithoutParams]) {
        uniqueURLsMap[urlWithoutParams] = true; // Mark URL as encountered
        sortedUniqueURLs.push(urlWithoutParams);
      }
    });

    // Sort the unique URLs
    sortedUniqueURLs.sort((a, b) => {
      const urlA = parseInt(a.match(/\d+/)?.[0] ?? '') || 0; // Extract numerical part, default to 0 if not found
      const urlB = parseInt(b.match(/\d+/)?.[0] ?? '') || 0; // Extract numerical part, default to 0 if not found
      return urlA - urlB;
    });

    return sortedUniqueURLs;
  };

  /**
   * The head cells for the table
   * 
   * @type {any}
   * @property {string} id - The id of the cell
   * @property {string} label - The label of the cell
   * @returns {void}
   */
  const headCells : any = [
    { id: 'timestamp', label: 'Date/Time' },
    { id: 'url', label: 'URL' },
    { id: 'issue_type', label: 'Issue Type' },
    { id: 'issue_description', label: 'Issue Description' },
    { id: 'status', label: 'Status' },
    { id: 'response_time', label: 'Response Time' },
  ];

  /**
   * Apply the selected filters to the data
   * 
   * @returns {LogData[]} - The filtered data
   */
  const filteredData = useMemo(() => {
    let filteredArray = [...sortedData];

    if (filterStatus || filterStatus === 0) {
      filteredArray = filteredArray.filter((log) => log.status === filterStatus);
    }

    if (filterIssueType || filterIssueType === 0) {
      filteredArray = filteredArray.filter((log) => log.issue_type === filterIssueType);
    }

    if (filterURL) {
      filteredArray = filteredArray.filter((log) => log.url.includes(filterURL));
    }

    if (filterResponseTimeMin || filterResponseTimeMax) {
      filteredArray = filteredArray.filter((log) => log.response_time >= filterResponseTimeMin && log.response_time <= filterResponseTimeMax);
    }

    return filteredArray;
  }, [sortedData, filterStatus, filterIssueType, filterURL, filterResponseTimeMin, filterResponseTimeMax]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <div className={styles.filterContainer}>
          <FormControl variant="outlined" className={styles.filterControl}>
            <InputLabel>Status</InputLabel>
            <Select
              value={filterStatus}
              onChange={(event) => setFilterStatus(event.target.value as number)}
              label="Status"
            >
              <MenuItem value="">All</MenuItem>
              {getUniqueValues('status').map((status) => (
                <MenuItem key={status} value={status}>{status === 0 ? 'OK' : status === 1 ? 'Warning' : status === 2 ? 'Error' : ''}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="outlined" className={styles.filterControl}>
            <InputLabel>Issue Type</InputLabel>
            <Select
              value={filterIssueType}
              onChange={(event) => setFilterIssueType(event.target.value as number)}
              label="Issue Type"
            >
              <MenuItem value="">All</MenuItem>
              {getUniqueValues('issue_type').map((issueType) => (
                <MenuItem key={issueType} value={issueType}>{<ResponseCode respCode={Number(issueType)} />}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="outlined" className={styles.filterControl}>
            <InputLabel>URL</InputLabel>
              <Select
                value={filterURL}
                onChange={(event) => setFilterURL(event.target.value as string)}
                label="URL"
              >
                <MenuItem value="">All</MenuItem>
                {getUniqueURLs().map((url) => (
                  <MenuItem key={url} value={url}>
                    {url}
                  </MenuItem>
                ))}
              </Select>
          </FormControl>
          <FormControl variant="outlined" className={styles.filterControl}>
            <TextField
              value={filterResponseTimeMin}
              onChange={(event) => setFilterResponseTimeMin(Number(event.target.value))}
              label="Response Time (min)"
            />
          </FormControl>
          <FormControl variant="outlined" className={styles.filterControl}>
            
            <TextField
              value={filterResponseTimeMax}
              onChange={(event) => setFilterResponseTimeMax(Number(event.target.value))}
              label="Response Time (max)"
            />
          </FormControl>
        </div>
      </Grid>
      <Grid item xs={12}>
        <TableContainer component={Paper} className={styles.resultsTable}>
          <Table>
            <EnhancedTableHead
              cells={headCells}
              order={sortDirection}
              orderBy={sortColumn}
              onRequestSort={(event, column) => handleSort(column)}
              numSelected={0} // Add the missing numSelected prop
              rowCount={filteredData.length} // Add the missing rowCount prop
            />
            <TableBody>
              {filteredData.slice(startIndex, endIndex).map((log, index) => (
                <TableRow key={index}>
                  <TableCell>{new Date(log.timestamp * 1000).toLocaleString('en-GB', { hour12: true })}</TableCell>
                  <TableCell>{log.url.slice(19)}</TableCell>
                  <TableCell>{log.issue_type != null && <div className='issue-desc'><ResponseCode respCode={log.issue_type} /></div>}</TableCell>
                  <TableCell >{log.issue_description && <div className='issue-desc'>{log.issue_description}</div>}</TableCell>
                  <TableCell>
                    <span
                      className={`${styles.box} ${styles.status} ${
                        log.status === 0 ? styles.statusNone :
                        log.status === 1 ? styles.statusWarning :
                        log.status === 2 ? styles.statusError :
                        styles.statusNone
                      }`}
                    >
                      {log.status === 1 ? 'Warning' : log.status === 2 ? 'Error' : 'OK'}
                    </span>
                  </TableCell>
                  <TableCell>{log.response_time}ms</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={filteredData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default ResultsTable;