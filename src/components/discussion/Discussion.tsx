import { useState, KeyboardEvent, useEffect } from "react";
import { useParams } from "react-router";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { IonContent } from "@ionic/react";
import Post from "./Post";
import {
  QuillContainer,
  DiscussionHeader,
  DiscussionContainer,
} from "./styled";
import Stack from "@mui/material/Stack";

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
import { DefaultDiscussion, UESERID } from "./utils/constants";
import type {
  IPost,
  IDiscussion,
  IReaction,
  IPostDB,
  IDiscussionDB,
} from "./utils/types";

type QuizParams = {
  table_name?: string;
  row?: string;
};

function calcDiscussion(table_name: string, row: number): IDiscussion {
  const temp = getDiscussions(table_name, +row);
  let updatedDiscussion: IDiscussionDB;

  if (temp?.length === 0) {
    updatedDiscussion = createDiscusion(table_name, +row);
  } else {
    updatedDiscussion = temp[0];
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

export default function DiscussionComponent() {
  const { table_name, row } = useParams<QuizParams>();
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
