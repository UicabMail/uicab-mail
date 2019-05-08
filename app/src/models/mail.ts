export interface Mail {
  from: string;
  fromName: string;
  to: string;
  subject: string;
  content: string;
  time: string;
  seen: boolean;
}
