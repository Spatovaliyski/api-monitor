export interface LogData {
  logData: {
    timestamp: number;
    url: string;
    status: number;
    issue_type?: number;
    issue_description?: string;
    response_time: number;
  }[]
}