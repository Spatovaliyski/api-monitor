export interface LogData {
  timestamp: number;
  url: string;
  status: number;
  issue_type?: number;
  issue_description?: string;
  response_time: number;
}

export interface GroupedData {
  [key: string]: {
    success: number;
    warning: number;
    error: number;
  };
}