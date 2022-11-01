import { useState, KeyboardEvent, useEffect } from "react";
import { useParams } from "react-router";

import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { IonContent } from "@ionic/react";

import Stack from "@mui/material/Stack";

import {
  QuillContainer,
  DiscussionHeader,
  DiscussionContainer,
} from "./styled";

import { DefaultDiscussion, UESERID } from "./utils/constants";

import {
  getDiscussionsByTableNameAndRow,
  getPostsByDiscussionId,
  getReactionsByPostId,
  createDiscusion,
  createPost,
  createReaction,
  deletePost,
  deleteReaction,
} from "src/components/discussion/utils/apiService";

import type {
  IPost,
  IDiscussion,
  IReaction,
  IDiscussionDB,
} from "./utils/types";

import Post from "./Post";

type DiscussionRouteQuizParams = {
  table_name?: string;
  row?: string;
};

/**
 * Fetch or Create a Discussion by 'table_name' and 'row', then transform it to 'IDiscussion' type.
 */
async function loadDiscussion(
  table_name: string | undefined,
  row: string | undefined
): Promise<IDiscussion | null> {
  if (table_name === undefined || row === undefined) {
    return null;
  }

  const dbDiscussions = await getDiscussionsByTableNameAndRow(table_name, +row);
  let updatedDiscussion: IDiscussionDB;

  if (dbDiscussions.success) {
    if (dbDiscussions.data && dbDiscussions.data?.length > 0) {
      updatedDiscussion = dbDiscussions.data[0];
    } else {
      return null;
    }
  } else {
    const newDiscussion = await createDiscusion(table_name, +row);

    if (newDiscussion.success && newDiscussion.data) {
      updatedDiscussion = newDiscussion.data;
    } else {
      return null;
    }
  }

  let posts: Array<IPost> = [];
  const dbPosts = await getPostsByDiscussionId(updatedDiscussion.id);

  if (dbPosts.success === false) {
    return null;
  }

  if (dbPosts.data) {
    for (let post of dbPosts.data) {
      let reactions: Array<IReaction>;
      const dbReactions = await getReactionsByPostId(post.id);

      if (dbReactions.success) {
        if (dbReactions.data) {
          reactions = dbReactions.data;
        } else {
          return null;
        }
      } else {
        return null;
      }

      posts.push({
        ...post,
        reactions,
      });
    }
  } else {
    return null;
  }

  return { ...updatedDiscussion, posts } as IDiscussion;
}

/**
 * This component will mounted once users route to '/tab1/discussion/:table_name/:row'.
 * The responsibility is to control Discussion Page and interact with server such as fetching, saving, deleting discussion data.
 */
export default function Discussion() {
  const { table_name, row } = useParams<DiscussionRouteQuizParams>();
  const [quillText, setQuillText] = useState<string>("");
  const [discussion, setDiscussion] = useState<IDiscussion>(DefaultDiscussion);

  const reloadDiscussion = async (
    table_name: string | undefined,
    row: string | undefined
  ) => {
    const reloadedDiscussion = await loadDiscussion(table_name, row);

    if (reloadedDiscussion === null) {
      return;
    }

    setDiscussion(reloadedDiscussion);
  };

  useEffect(() => {
    reloadDiscussion(table_name, row);
  }, [table_name, row]);

  const handleQuillChange = (text: string) => {
    setQuillText(text);
  };

  const handleKeyEvent = async (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();

      const currentQuillText = quillText.slice(0, -11);
      const result = await createPost(discussion.id, UESERID, currentQuillText);

      if (result.success) {
        alert("creating post is successful")
        reloadDiscussion(table_name, row);
        setQuillText("");
      }
    }
  };

  const handleAddReaction = async (
    post_id: number,
    user_id: string,
    content: string
  ): Promise<void> => {
    const result = await createReaction(post_id, user_id, content);

    if (result.success) {
      reloadDiscussion(table_name, row);
    }
  };

  const handleDeletePost = async (post_id: number): Promise<void> => {
    const result = await deletePost(post_id);

    if (result.success) {
      reloadDiscussion(table_name, row);
    }
  };

  const handleDeleteReaction = async (reaction_id: number): Promise<void> => {
    const result = await deleteReaction(reaction_id);

    if (result.success) {
      reloadDiscussion(table_name, row);
    }
  };

  return (
    <IonContent>
      <Stack
        justifyContent="space-between"
        sx={{ height: "calc(100vh - 75px)", padding: "60px 20px 0px" }}
      >
        <DiscussionHeader>Discussion</DiscussionHeader>

        <DiscussionContainer>
          {discussion?.posts?.map((post: IPost) => (
            <Post
              key={post.id}
              {...post}
              addReaction={handleAddReaction}
              deleteReaction={handleDeleteReaction}
              deletePost={handleDeletePost}
            />
          ))}
        </DiscussionContainer>

        <QuillContainer>
          <ReactQuill
            theme="snow"
            value={quillText}
            onKeyUp={handleKeyEvent}
            onChange={handleQuillChange}
          />
        </QuillContainer>
      </Stack>
    </IonContent>
  );
}
