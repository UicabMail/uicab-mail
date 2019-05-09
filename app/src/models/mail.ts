export interface Mail {
  from: string;
  fromName: string;
  to: string;
  subject: string;
  contentType: string;
  content: string;
  time: string;
  seen: boolean;
}
