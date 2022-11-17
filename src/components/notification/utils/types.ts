export interface INotification {
  id: number;
  user_id: number;
  table_name: string;
  row: number;
  acknowledged: boolean;
  content: string;
  created_at: Date;
}
