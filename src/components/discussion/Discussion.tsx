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
  getDiscussions,
  createDiscusion,
  getPosts,
  createPost,
  deletePost,
  getReactions,
  createReaction,
  deleteReaction,
} from "./utils/mockApis";

import type {
  IPost,
  IDiscussion,
  IReaction,
  IPostDB,
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
function calcDiscussion(table_name: string, row: number): IDiscussion {
  const dbDiscussions = getDiscussions(table_name, row);
  let updatedDiscussion: IDiscussionDB;

  if (dbDiscussions?.length === 0) {
    updatedDiscussion = createDiscusion(table_name, row);
  } else {
    updatedDiscussion = dbDiscussions[0];
  }

  let posts: Array<IPostDB>;
  posts = getPosts(updatedDiscussion.id || 0);

  posts = posts.map((post: IPostDB): IPost => {
    let reactions: Array<IReaction> = getReactions(post.id);

    return {
      ...post,
      reactions,
    };
  });

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

  useEffect(() => {
    if (table_name && row) {
      setDiscussion(calcDiscussion(table_name, +row));
    }
  }, [table_name, row]);

  const handleQuillChange = (text: string) => {
    setQuillText(text);
  };

  const handleKeyEvent = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();

      const currentQuillText = quillText.slice(0, -11);
      createPost(discussion.id, UESERID, currentQuillText);

      if (table_name && row) {
        setDiscussion(calcDiscussion(table_name, +row));
        setQuillText("");
      }
    }
  };

  const handleAddReaction = (
    post_id: number,
    user_id: string,
    content: string
  ): void => {
    createReaction(post_id, user_id, content);

    if (table_name && row) {
      setDiscussion(calcDiscussion(table_name, +row));
    }
  };

  const handleDeletePost = (post_id: number): void => {
    deletePost(post_id);

    if (table_name && row) {
      setDiscussion(calcDiscussion(table_name, +row));
    }
  };

  const handleDeleteReaction = (reaction_id: number): void => {
    deleteReaction(reaction_id);

    if (table_name && row) {
      setDiscussion(calcDiscussion(table_name, +row));
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
