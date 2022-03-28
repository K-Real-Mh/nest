export interface Comment {
  id: string;
  comment: string;
  reply?: Comment[];
}
