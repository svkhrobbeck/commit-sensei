export interface IDeadlineCore {
  date: string;
  passed: boolean;
  done: number;
}

export interface IDeadline extends IDeadlineCore {
  limit: number;
  penaltyForNextWeek: number;
  penalty: number;
  total: number;
  id: number;
}

export interface IHistory extends IDeadline {
  userId: number;
}

export interface ISetting {
  userId: number;
  forWeek: number;
  penalty: boolean;
  penaltyFromLastWeek: number;
  penaltyForNextWeek: number;
  total: number;
  completed: number;
  summaryDate: string;
  averageDailyCommitCount: number;
}

export type UserMessageMode = "channel" | "chat";

export interface IUser {
  id: number;
  name: string;
  github: string;
  githubToken: string;
  telegramId: number;
  channelId: number;
  mode: UserMessageMode;
  deadlineStartCol: string;
  deadlineRange: string;
  status: boolean;
  channelMessageInlineButtons: boolean;
}
