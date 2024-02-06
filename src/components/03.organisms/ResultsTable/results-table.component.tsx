import React, { useState, useMemo } from 'react'

import { LogData } from './results-table.type'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Grid } from '@mui/material'

import styles from './results-table.module.scss'
import EnhancedTableHead from '@organisms/Tables/SortableTableHead/sortable-table-head.component';
import ResponseCode from '@atoms/ResponseCodes/response-codes.component';

const ResultsTable = ({ logData }: LogData) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortColumn, setSortColumn] = useState('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

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

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TableContainer component={Paper} className={styles.resultsTable}>
          <Table>
            <EnhancedTableHead
              cells={headCells}
              order={sortDirection}
              orderBy={sortColumn}
              onRequestSort={(event, column) => handleSort(column)}
              numSelected={0} // Add the missing numSelected prop
              rowCount={sortedData.length} // Add the missing rowCount prop
            />
            <TableBody>
              {sortedData.slice(startIndex, endIndex).map((log, index) => (
                <TableRow key={index}>
                  <TableCell>{new Date(log.timestamp * 1000).toLocaleString('en-GB', { hour12: true })}</TableCell>
                  <TableCell>{log.url.slice(19)}</TableCell>
                  <TableCell>{log.issue_type != null && <div className='issue-desc'><ResponseCode respCode={log.issue_type} /></div>}</TableCell>
                  <TableCell>{log.issue_description && <div className='issue-desc'>{log.issue_description}</div>}</TableCell>
                  <TableCell>
                    <span
                      className={`${styles.box} ${styles.status} ${
                        log.status === 1 ? styles.statusWarning : log.status === 2 ? styles.statusError : '' ? log.status : styles.statusNone
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
            count={logData.length}
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

export default ResultsTable