import { gql } from '@apollo/client';

interface Discussion {
  id?: number;
  app: number;
  org: number;
  table_name: string;
  row: string;
}

interface Post {
  id?: number;
  discussion: Discussion;
  user_id: string;
  quill_text: string;
  plain_text: string;
  postgres_language: string;
  created_at: Date;
}

interface Reaction {
  id?: number;
  post: Post;
  user_id: string;
  content: string;
}

export const GET_DISCUSSIONS = gql`
  query GetDiscussionByTableAndRow($limit: Int, $offset: Int, $tableName: String, $rowId: Int) {
    discussions_aggregate(where: {
      _and: [
          {table_name: $tableName},
          {row: $rowId}
      ]
    }) {
      aggregate {
        count
      }
    }
    discussions(limit: $limit, offset: $offset, where: {
      _and: [
          {table_name: $tableName},
          {row: $rowId}
      ]
    }) {
      id
      app
      org
      table_name
      row
    }
  }
`;

export const CREATE_DISCUSSION = gql`
  mutation CreateDiscussion($discussion: Discussion) {
    addDiscussion(discussion: $discussion) {
      id
      app
      org
      table_name
      row
    }
  }
`;

export const DELETE_DISCUSSION = gql`
  mutation DeleteDiscussion($id: Int!) {
    deleteDiscussion(id: $id)
  }
`;

export const GET_POSTS = gql`
  query GetPosts($limit: Int, $offset: Int, $discussion_id: Int) {
    posts_aggregate(discussion_id: $discussion_id) {
      aggregate {
        count
      }
    }
    posts(limit: $limit, offset: $offset, discussion_id: $discussion_id) {
      id
      discussion
      user_id
      quill_text
      plain_text
      postgres_language
      created_at
    }
  }
`;

export const CREATE_POST = gql`
  mutation CreatePost($post: Post) {
    addPost(post: $post) {
      id
      discussion
      user_id
      quill_text
      plain_text
      postgres_language
      created_at
    }
  }
`;

export const DELETE_POST = gql`
  mutation DeletePost($id: Int!) {
    deletePost(id: $id)
  }
`;

export const GET_REACTIONS = gql`
  query GetReactions($limit: Int, $offset: Int, $post_id: Int) {
    reactions_aggregate(post_id: $post_id) {
      aggregate {
        count
      }
    }
    reactions(limit: $limit, offset: $offset, post_id: $post_id) {
      id
      post
      user_id
      content
    }
  }
`;

export const CREATE_REACTION = gql`
  mutation CreateReaction($reaction: Reaction) {
    addReaction(reaction: $reaction) {
      id
      post
      user_id
      content
    }
  }
`;

export const DELETE_REACTION = gql`
  mutation DeleteReaction($id: Int!) {
    deleteReaction(id: $id)
  }
`;
