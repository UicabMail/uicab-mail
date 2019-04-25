export interface User {
  id: number;
  isAdmin: boolean;
  username: string;
  password: string;
  mail: string;
  status: number;
  dept?: number;
  mobile?: string;
}
