export type APIReturnType<T = any> = {
  success: boolean;
  message: string;
  data?: T;
};

export interface IDiscussionDB {
  id: number;
  app?: number;
  org?: number;
  table_name: string;
  row: number;
}

export interface IPostDB {
  id: number;
  discussion: IDiscussionDB;
  user_id: string;
  quill_text: string;
  plain_text: string;
  postgres_language: string;
  created_at: Date;
}

export interface IReactionDB {
  id: number;
  post: IPostDB;
  user_id: string;
  content: string;
}

export interface IReaction extends IReactionDB {}

export interface IPost extends IPostDB {
  reactions: Array<IReaction> | [];
}

export interface IDiscussion extends IDiscussionDB {
  posts: Array<IPost> | [];
}
