import type { IDiscussionDB, IPostDB, IReactionDB } from "./types";

let MockDiscussionTable: Array<IDiscussionDB> = [];
let MockPostTable: Array<IPostDB> = [];
let MockReactionTable: Array<IReactionDB> = [];

function getUniqueIdGenerator() {
  let uniqueId: number = 0;

  return (): number => {
    return ++uniqueId;
  };
}

export const getUniqueId = getUniqueIdGenerator();

/**
 * Get Discussions with the same 'table_name' and 'row' attributes as the inputed data from the discussion table in the DB.
 */
export function getDiscussions(
  table_name: string,
  row: number
): Array<IDiscussionDB> {
  return MockDiscussionTable.filter(
    (discussion: IDiscussionDB): boolean =>
    discussion.table_name === table_name && discussion.row === row
  );
}

/**
 * Create a new Discussion with 'table_name' and row' in Discussion Table and return it.
 */
export function createDiscusion(table_name: string, row: number): IDiscussionDB {
  const discussion: IDiscussionDB = {
    id: getUniqueId(),
    app: getUniqueId(),
    org: getUniqueId(),
    table_name,
    row,
  };
  MockDiscussionTable.push(discussion);

  return discussion;
}

/**
 * Get a matched Post with the same 'discussion_id' as the inputed value from the Post Table in the DB.
 */
export function getPosts(discussion_id: number = 0): Array<IPostDB> {
  return MockPostTable.filter(
    (post: IPostDB): boolean => post.discussion_id === discussion_id
  );
}

/**
 * Create a new Post with 'discussion_id', 'user_id', 'quill_text' in the Post Table in the DB and return it.
 */
export function createPost(
  discussion_id: number,
  user_id: string,
  quill_text: string
): IPostDB {
  const post: IPostDB = {
    id: getUniqueId(),
    discussion_id,
    user_id,
    quill_text,
    plain_text: "",
    postgres_language: "",
    created_at: new Date(),
  };
  MockPostTable.push(post);

  return post;
}

/**
 * Delete a Post with the same 'id' as inputed data from the Post Table in the DB.
 */
export function deletePost(id: number) {
  MockPostTable = MockPostTable.filter((post: IPostDB): boolean => post.id !== id);
}

/**
 * Get Reactions with the same 'post_id' as the inputed data from the Reaction Table in the DB.
 */
export function getReactions(post_id: number): Array<IReactionDB> {
  return MockReactionTable.filter(
    (reaction: IReactionDB): boolean => reaction.post_id === post_id
  );
}

/**
 * Create a new Reaction with 'post_id', 'user_id', 'content' in the Reaction Table and return it.
 */
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

/**
 * Delete a Reaction with the same 'id' as the inputed data from the Reaction Table in the DB.
 */
export function deleteReaction(id: number): void {
  MockReactionTable = MockReactionTable.filter((reaction: IReactionDB): boolean => reaction.id !== id);
}