export type MeetDatabase = {
  id: string;
  start_at: Date;
  finished_at: Date;
  location: string;
  avalible: boolean;
  char_id: string;
  event_id: string;
};

export type CreateMeetDatabase = {
  start_at: Date;
  location?: string;
  char_id: string;
  event_id: string;
};

export type CreateFornmMeetDatabase = {
  start_at: Date;
  location?: string;
};
