import { CharDatabase } from "./Char";
import { EventDatabase } from "./Event";

export type MeetDatabase = {
  id: string;
  start_at: Date | string;
  finished_at: Date | string;
  location: string;
  avalible: boolean;
  char_id: string;
  event: EventDatabase;
  event_id: string;
  chars: Array<CharDatabase>;
};

export type CreateMeetDatabase = {
  start_at: Date;
  location?: string;
  char_id: string;
  event_id: string;
};

export type CreateFormMeetDatabase = {
  start_at: Date;
  location?: string;
};
