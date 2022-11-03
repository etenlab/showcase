import React, {
  useState,
  KeyboardEvent,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { useParams } from "react-router";
import { useSubscription } from "@apollo/client";
import { EmojiClickData } from "emoji-picker-react";

import { IonContent } from "@ionic/react";

import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Popover from "@mui/material/Popover";

import {
  QuillContainer,
  DiscussionHeader,
  DiscussionContainer,
} from "./styled";

import { ReactQuill } from "src/common/ReactQuill";
import { EmojiPicker } from "src/common/EmojiPicker";

import { DefaultDiscussion, UESERID } from "./utils/constants";

import {
  getDiscussionsByTableNameAndRow,
  createDiscusion,
  createPost,
  createReaction,
  deletePost,
  deleteReaction,
} from "src/components/discussion/utils/apiService";

import { client } from "src/common/discussionGraphql";
import {
  POST_CREATED_SUBSCRIPTION,
  POST_DELETED_SUBSCRIPTION,
  REACTION_CREATED_SUBSCRIPTION,
  REACTION_DELETED_SUBSCRIPTION,
} from "src/common/discussionQuery";

import type {
  IPost,
  IDiscussion,
  DiscussionRouteQuizParams,
  EmojiPopoverState,
  SnackbarState,
  PostCreatedData,
  PostDeletedData,
  ReactionCreatedData,
  ReactionDeletedData,
} from "./utils/types";

import Post from "./Post";

/**
 * This component will mount once users route to '/tab1/discussion/:table_name/:row'.
 * The responsibility is to control Discussion Page and interact with server such as fetching, saving, deleting discussion data.
 */
export default function Discussion() {
  const { table_name, row } = useParams<DiscussionRouteQuizParams>();
  const [quillText, setQuillText] = useState<string>("");
  const [discussion, setDiscussion] = useState<IDiscussion>(DefaultDiscussion);
  const [emojiPopoverState, setEmojiPopoverState] = useState<EmojiPopoverState>(
    {
      anchorEl: null,
      postId: 0,
    }
  );
  const [snackbarState, setSnackbarState] = useState<SnackbarState>({
    open: false,
    message: "This is a success message!",
    severity: "success",
  });
  const discussionRef = useRef<HTMLDivElement>(null);
  const { data: postCreatedData } = useSubscription<PostCreatedData>(
    POST_CREATED_SUBSCRIPTION,
    {
      client,
    }
  );
  const { data: postDeletedData } = useSubscription<PostDeletedData>(
    POST_DELETED_SUBSCRIPTION,
    {
      client,
    }
  );
  const { data: reactionCreatedData } = useSubscription<ReactionCreatedData>(
    REACTION_CREATED_SUBSCRIPTION,
    {
      client,
    }
  );
  const { data: reactionDeletedData } = useSubscription<ReactionDeletedData>(
    REACTION_DELETED_SUBSCRIPTION,
    {
      client,
    }
  );

  // This function will reload discussion from server.
  const reloadDiscussion = useCallback(
    async (table_name: string | undefined, row: string | undefined) => {
      if (table_name === undefined || row === undefined) {
        setSnackbarState((state) => ({
          open: true,
          message: "#Table Name, and #Row is undefined!",
          severity: "warning",
        }));
        return null;
      }

      const dbDiscussions = await getDiscussionsByTableNameAndRow(
        table_name,
        +row
      );
      let updatedDiscussion: IDiscussion;

      if (dbDiscussions.success) {
        if (dbDiscussions.data && dbDiscussions.data?.length > 0) {
          updatedDiscussion = dbDiscussions.data[0];
        } else {
          setSnackbarState({
            open: true,
            message: "Oops, something went to wrong, please try again!",
            severity: "error",
          });
          return null;
        }
      } else {
        const newDiscussion = await createDiscusion(table_name, +row);

        if (newDiscussion.success && newDiscussion.data) {
          updatedDiscussion = newDiscussion.data;
        } else {
          setSnackbarState({
            open: true,
            message: newDiscussion.message,
            severity: "error",
          });
          return null;
        }
      }

      setDiscussion(updatedDiscussion);
    },
    []
  );

  useEffect(() => {
    reloadDiscussion(table_name, row);
  }, [table_name, row, reloadDiscussion]);

  useEffect(() => {
    if (postCreatedData) {
      setDiscussion((discussion) => {
        if (discussion.posts.find((post) => post.id === postCreatedData.postCreated.id)) {
          return discussion;
        } else {
          return {
            ...discussion,
            posts: [...discussion.posts, postCreatedData.postCreated],
          }
        }
      });
    }
  }, [postCreatedData]);

  useEffect(() => {
    if (postDeletedData) {
      setDiscussion((discussion) => ({
        ...discussion,
        posts: discussion.posts.filter(
          (post) => post.id !== postDeletedData.postDeleted
        ),
      }));
    }
  }, [postDeletedData]);

  useEffect(() => {
    if (reactionCreatedData) {
      const discussion_id = reactionCreatedData.reactionCreated.post.discussion.id;
      const post_id = reactionCreatedData.reactionCreated.post.id;
      const reaction_id = reactionCreatedData.reactionCreated.id;

      setDiscussion((discussion) => {
        if (discussion.id === discussion_id) {
          return {
            ...discussion,
            posts: discussion.posts.map((post) => {
              if (post.id === post_id) {
                if (post.reactions.find((reaction) => reaction.id === reaction_id)) {
                  return post;
                } else {
                  return {
                    ...post,
                    reactions: [
                      ...post.reactions,
                      reactionCreatedData.reactionCreated,
                    ],
                  };
                }
              } else {
                return post;
              }
            }),
          }
        } else {
          return discussion;
        }
      });
    }
  }, [reactionCreatedData]);

  useEffect(() => {
    if (reactionDeletedData) {
      setDiscussion((discussion) => ({
        ...discussion,
        posts: discussion.posts.map((post) => ({
          ...post,
          reactions: post.reactions.filter(
            (reaction) => reaction.id !== reactionDeletedData.reactionDeleted
          ),
        })),
      }));
    }
  }, [reactionDeletedData]);

  const handleQuillChange = (text: string) => {
    setQuillText(text);
  };

  const handleKeyEvent = async (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();

      const currentQuillText = quillText.slice(0, -11);
      setQuillText("");
      const result = await createPost(discussion.id, UESERID, currentQuillText);

      if (result.success) {
      } else {
        setQuillText(currentQuillText);
        setSnackbarState({
          open: true,
          message: result.message,
          severity: "error",
        });
      }
    }
  };

  const handleAddReaction = useCallback(
    async (
      post_id: number,
      user_id: string,
      content: string
    ): Promise<void> => {
      const result = await createReaction(post_id, user_id, content);

      if (result.success === false) {
        setSnackbarState({
          open: true,
          message: "Unable to create a new Reaction!",
          severity: "error",
        });
      }
    },
    []
  );

  const handleDeletePost = async (post_id: number): Promise<void> => {
    const result = await deletePost(post_id);

    if (result.success === false) {
      setSnackbarState({
        open: true,
        message: result.message,
        severity: "error",
      });
    }
  };

  const handleDeleteReaction = async (reaction_id: number): Promise<void> => {
    const result = await deleteReaction(reaction_id);

    if (result.success) {
      reloadDiscussion(table_name, row);
    } else {
      setSnackbarState({
        open: true,
        message: result.message,
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarState((state) => ({ ...state, open: false }));
  };

  const handleOpenEmojiPicker = (
    anchorEl: HTMLButtonElement,
    postId: number
  ) => {
    setEmojiPopoverState({
      anchorEl,
      postId,
    });
  };

  const handleCloseEmojiPicker = useCallback(() => {
    setEmojiPopoverState({
      anchorEl: null,
      postId: 0,
    });
  }, []);

  const handleEmojiClick = useCallback(
    (emojiData: EmojiClickData) => {
      if (emojiPopoverState) {
        handleCloseEmojiPicker();
        handleAddReaction(emojiPopoverState.postId, UESERID, emojiData.unified);
      }
    },
    [emojiPopoverState, handleCloseEmojiPicker, handleAddReaction]
  );

  const openEmojiPicker = Boolean(emojiPopoverState?.anchorEl);

  return (
    <IonContent>
      <Stack
        justifyContent="space-between"
        sx={{ height: "calc(100vh - 75px)", padding: "60px 20px 0px" }}
      >
        <DiscussionHeader>Discussion</DiscussionHeader>

        <DiscussionContainer ref={discussionRef}>
          {discussion?.posts?.map((post: IPost) => (
            <Post
              key={post.id}
              {...post}
              deleteReaction={handleDeleteReaction}
              deletePost={handleDeletePost}
              openEmojiPicker={handleOpenEmojiPicker}
            />
          ))}
        </DiscussionContainer>

        <QuillContainer>
          <ReactQuill
            value={quillText}
            onKeyUp={handleKeyEvent}
            onChange={handleQuillChange}
          />
        </QuillContainer>
      </Stack>

      <Popover
        open={discussionRef.current !== null}
        anchorEl={
          emojiPopoverState.anchorEl === null
            ? discussionRef.current
            : emojiPopoverState.anchorEl
        }
        onClose={handleCloseEmojiPicker}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{
          display: openEmojiPicker ? "inherit" : "none",
        }}
      >
        <EmojiPicker onEmojiClick={handleEmojiClick} />
      </Popover>

      <Snackbar
        open={snackbarState.open}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        key="bottom-right"
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarState.severity}
          sx={{ width: "100%" }}
        >
          {snackbarState.message}
        </Alert>
      </Snackbar>
    </IonContent>
  );
}
