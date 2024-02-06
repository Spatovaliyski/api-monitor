export interface Data {
  id: number;
  datetime: number;
  url: string;
  status: number;
  issue_type: number;
  issue_description: string;
  response_time: number;
}

export interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

export interface EnhancedTableProps {
  cells: {
    id: string;
    numeric: boolean;
    disablePadding: boolean;
    label: string;
  }[];
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  order: 'asc' | 'desc' | undefined;
  orderBy: string;
  rowCount: number;
}