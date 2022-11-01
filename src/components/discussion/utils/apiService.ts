import { client } from "src/common/discussionGraphql";
import {
  CREATE_DISCUSSION,
  CREATE_POST,
  CREATE_REACTION,
  GET_DISCUSSIONS_BY_TABLE_NAME_AND_ROW,
  GET_POSTS_BY_DISCUSSION_ID,
  GET_REACTION_BY_POST_ID,
  DELETE_DISCUSSION,
  DELETE_POST,
  DELETE_REACTION,
} from "src/common/discussionQuery";
import type {
  IDiscussionDB,
  IPostDB,
  IReactionDB,
  APIReturnType,
} from "./types";

/**
 * Get Discussions with the same 'table_name' and 'row' attributes as the inputed data from the discussion table in the DB.
 */
export async function getDiscussionsByTableNameAndRow(
  table_name: string,
  row: number
): Promise<APIReturnType<Array<IDiscussionDB>>> {
  try {
    const { data } = await client.query({
      query: GET_DISCUSSIONS_BY_TABLE_NAME_AND_ROW,
      variables: {
        table_name,
        row,
      },
      fetchPolicy: "no-cache",
    });

    if (data.discussions.length === 0) {
      return {
        success: false,
      };
    }

    return {
      success: true,
      data: data.discussions as Array<IDiscussionDB>,
    };
  } catch (err) {
    console.error("get discussions", err);

    return {
      success: false,
    };
  }
}

/**
 * Create a new Discussion with 'table_name' and row' in Discussion Table and return it.
 */
export async function createDiscusion(
  table_name: string,
  row: number
): Promise<APIReturnType<IDiscussionDB>> {
  try {
    const { data } = await client.mutate({
      mutation: CREATE_DISCUSSION,
      variables: {
        discussion: {
          app: 0,
          org: 0,
          row,
          table_name,
        },
      },
    });

    return {
      success: true,
      data: data.createDiscussion as IDiscussionDB,
    };
  } catch (err) {
    console.error("create discussion", err);

    return {
      success: false,
    };
  }
}

/**
 * Delete a Discussion with the same 'id' as inputed data from the Discussion Table in the DB.
 */
export async function deleteDiscussion(id: number): Promise<APIReturnType> {
  try {
    await client.mutate({
      mutation: DELETE_DISCUSSION,
      variables: {
        id,
      },
    });

    return {
      success: true,
    };
  } catch (err) {
    console.error("delete discussions", err);

    return {
      success: false,
    };
  }
}

/**
 * Get a matched Post with the same 'discussion_id' as the inputed value from the Post Table in the DB.
 */
export async function getPostsByDiscussionId(
  discussionId: number = 0
): Promise<APIReturnType<Array<IPostDB>>> {
  try {
    const { data } = await client.query({
      query: GET_POSTS_BY_DISCUSSION_ID,
      variables: {
        discussionId,
      },
      fetchPolicy: "no-cache",
    });

    return {
      success: true,
      data: data.postsByDiscussionId.map(
        (post: IPostDB): IPostDB => ({
          ...post,
          created_at: new Date(post.created_at),
        })
      ),
    };
  } catch (err) {
    console.error("get posts", err);

    return {
      success: false,
    };
  }
}

/**
 * Create a new Post with 'discussion_id', 'user_id', 'quill_text' in the Post Table in the DB and return it.
 */
export async function createPost(
  discussion_id: number,
  user_id: string,
  quill_text: string
): Promise<APIReturnType<IPostDB>> {
  try {
    const { data } = await client.mutate({
      mutation: CREATE_POST,
      variables: {
        post: {
          discussion_id,
          plain_text: "",
          postgres_language: "simple",
          quill_text,
          user_id,
        },
      },
    });

    return {
      success: true,
      data: {
        ...data.createPost,
        created_at: new Date(data.createPost.created_at),
      } as IPostDB,
    };
  } catch (err) {
    console.error("create post", err);

    return {
      success: false,
    };
  }
}

/**
 * Delete a Post with the same 'id' as inputed data from the Post Table in the DB.
 */
export async function deletePost(id: number): Promise<APIReturnType> {
  try {
    await client.mutate({
      mutation: DELETE_POST,
      variables: {
        id,
      },
    });

    return {
      success: true,
    };
  } catch (err) {
    console.error("delete post", err);

    return {
      success: false,
    };
  }
}

/**
 * Get Reactions with the same 'post_id' as the inputed data from the Reaction Table in the DB.
 */
export async function getReactionsByPostId(
  postId: number
): Promise<APIReturnType<Array<IReactionDB>>> {
  try {
    const { data } = await client.query({
      query: GET_REACTION_BY_POST_ID,
      variables: {
        postId,
      },
      fetchPolicy: "no-cache",
    });

    return {
      success: true,
      data: data.reactionsByPostId as Array<IReactionDB>,
    };
  } catch (err) {
    console.error("get reactions", err);

    return {
      success: false,
    };
  }
}

/**
 * Create a new Reaction with 'post_id', 'user_id', 'content' in the Reaction Table and return it.
 */
export async function createReaction(
  post_id: number,
  user_id: string,
  content: string
): Promise<APIReturnType<IReactionDB>> {
  try {
    const { data } = await client.mutate({
      mutation: CREATE_REACTION,
      variables: {
        reaction: {
          post_id,
          content,
          user_id,
        },
      },
    });

    return {
      success: true,
      data: data.createReaction as IReactionDB,
    };
  } catch (err) {
    console.error("create reaction", err);

    return {
      success: false,
    };
  }
}

/**
 * Delete a Reaction with the same 'id' as the inputed data from the Reaction Table in the DB.
 */
export async function deleteReaction(id: number): Promise<APIReturnType> {
  try {
    await client.mutate({
      mutation: DELETE_REACTION,
      variables: {
        id,
      },
    });

    return {
      success: true,
    };
  } catch (err) {
    console.error("delete reaction", err);

    return {
      success: false,
    };
  }
}
