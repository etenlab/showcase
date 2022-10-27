import type { IDiscussionDB, IPostDB, IReactionDB } from "./types";

let MockDiscussionTable: Array<IDiscussionDB> = [];
let MockPostTable: Array<IPostDB> = [];
let MockReactionTable: Array<IReactionDB> = [];
let uniqueId = 0;

export function getUniqueId(): number {
  return ++uniqueId;
}

export function getDiscussions(
  tableName: string,
  rowId: number
): Array<IDiscussionDB> {
  return MockDiscussionTable.filter(
    ({ table_name, row }: IDiscussionDB): boolean =>
      table_name === tableName && row === rowId
  );
}

export function createDiscusion(
  tableName: string,
  rowId: number
): IDiscussionDB {
  const discussion: IDiscussionDB = {
    id: getUniqueId(),
    app: getUniqueId(),
    org: getUniqueId(),
    table_name: tableName,
    row: rowId,
  };
  MockDiscussionTable.push(discussion);

  return discussion;
}

export function getPosts(discussionId: number = 0): Array<IPostDB> {
  return MockPostTable.filter(
    ({ discussion_id }: IPostDB): boolean => discussion_id === discussionId
  );
}

export function createPost(
  discussionId: number,
  userId: string,
  quillText: string
): IPostDB {
  const post: IPostDB = {
    id: getUniqueId(),
    discussion_id: discussionId,
    user_id: userId,
    quill_text: quillText,
    plain_text: "",
    postgres_language: "",
    created_at: new Date(),
  };
  MockPostTable.push(post);

  return post;
}

export function deletePost(post_id: number) {
  MockPostTable = MockPostTable.filter(
    (post: IPostDB): boolean => post.id !== post_id
  );
}

export function getReactions(postId: number): Array<IReactionDB> {
  return MockReactionTable.filter(
    ({ post_id }: IReactionDB): boolean => post_id === postId
  );
}

export function createReaction(
  post_id: number,
  user_id: string,
  content: string
): IReactionDB {
  const reaction: IReactionDB = {
    id: getUniqueId(),
    post_id,
    user_id,
    content,
  };
  MockReactionTable.push(reaction);

  return reaction;
}

export function deleteReaction(reaction_id: number): void {
  MockReactionTable = MockReactionTable.filter(
    (reaction: IReactionDB): boolean => reaction.id !== reaction_id
  );
}
