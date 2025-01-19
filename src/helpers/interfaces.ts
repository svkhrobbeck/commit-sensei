export interface IDeadline {
  id: number;
  passed?: boolean;
  date: string;
  done: number;
  limit: number;
  penalty: number;
  total: number;
  penaltyForNextWeek: number;
}

export interface ISetting {
  forWeek: number;
  penalty: boolean;
  penaltyFromLastWeek: number;
  penaltyForNextWeek: number;
  total: number;
  completed: number;
  summaryDate: string;
  avarageDailyCommitCount: number;
}
