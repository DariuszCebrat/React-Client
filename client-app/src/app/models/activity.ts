import { Profile } from "./profile";

export interface Activity {
  id: string;
  title: string;
  date: Date|null;
  dateShort:string;
  description: string;
  category: string;
  city: string;
  venue: string;
  hostUserName?:string;
  IsCancelled?:boolean;
  profiles?:Profile[];
  isGoing?:boolean;
  isHost?:boolean;
  host?:Profile;
  }