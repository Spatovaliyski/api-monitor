import * as React from 'react';
import { Box, TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';
import { EnhancedTableProps, HeadCell, Data } from './sortable-table-head.type';
import { visuallyHidden } from '@mui/utils';

/** 
 * MUI Table Head component, resuses part of MUI's EnchancedTableHead, however its slightly modified.
 * 
 * @param {EnhancedTableProps} props - The props of the component
 * @returns {React.ReactElement} - The component
*/
const EnhancedTableHead = (props: EnhancedTableProps) => {
  const {
    cells,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort
  } = props;

  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {cells.map((headCell : any) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default EnhancedTableHead;