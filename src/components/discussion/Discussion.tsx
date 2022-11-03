import React, {
  useState,
  KeyboardEvent,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { useParams, useHistory } from "react-router";
import { useSubscription, useMutation, useLazyQuery } from "@apollo/client";
import { EmojiClickData } from "emoji-picker-react";

import { IonContent } from "@ionic/react";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Popover from "@mui/material/Popover";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

import {
  QuillContainer,
  DiscussionHeader,
  DiscussionContainer,
} from "./styled";

import { ReactQuill } from "src/common/ReactQuill";
import { EmojiPicker } from "src/common/EmojiPicker";

import { DefaultDiscussion, UESERID } from "./utils/constants";

import { client } from "src/common/discussionGraphql";
import {
  POST_CREATED_SUBSCRIPTION,
  POST_DELETED_SUBSCRIPTION,
  REACTION_CREATED_SUBSCRIPTION,
  REACTION_DELETED_SUBSCRIPTION,
  DISCUSSION_CREAETD_SUBSCRIPTION,
  CREATE_DISCUSSION,
  CREATE_POST,
  DELETE_POST,
  CREATE_REACTION,
  DELETE_REACTION,
  GET_DISCUSSIONS_BY_TABLE_NAME_AND_ROW,
} from "src/common/discussionQuery";

import type {
  IPost,
  IDiscussion,
  DiscussionRouteQuizParams,
  EmojiPopoverState,
  SnackbarState,
  DiscussionCreatedData,
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
  const history = useHistory();
  const { table_name, row } = useParams<DiscussionRouteQuizParams>();
  const [quillText, setQuillText] = useState<string>("");
  const [prevQuillText, setPrevQuillText] = useState<string | null>(null);
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
  const { data: discussionCreatedData, error: discussionCreatedError } =
    useSubscription<DiscussionCreatedData>(DISCUSSION_CREAETD_SUBSCRIPTION, {
      client,
    });
  const { data: postCreatedData, error: postCreatedError } =
    useSubscription<PostCreatedData>(POST_CREATED_SUBSCRIPTION, {
      client,
    });
  const { data: postDeletedData, error: postDeletedError } =
    useSubscription<PostDeletedData>(POST_DELETED_SUBSCRIPTION, {
      client,
    });
  const { data: reactionCreatedData, error: reactionCreatedError } =
    useSubscription<ReactionCreatedData>(REACTION_CREATED_SUBSCRIPTION, {
      client,
    });
  const { data: reactionDeletedData, error: reactionDeletedError } =
    useSubscription<ReactionDeletedData>(REACTION_DELETED_SUBSCRIPTION, {
      client,
    });
  const [createDiscussion, { error: createDiscussionError }] = useMutation(
    CREATE_DISCUSSION,
    { client }
  );
  const [createPost, { error: createPostError, loading: createPostLoading }] =
    useMutation(CREATE_POST, {
      client,
    });
  const [deletePost, { error: deletePostError }] = useMutation(DELETE_POST, {
    client,
  });
  const [createReaction, { error: createReactionError }] = useMutation(
    CREATE_REACTION,
    { client }
  );
  const [deleteReaction, { error: deleteReactionError }] = useMutation(
    DELETE_REACTION,
    { client }
  );
  // const {
  //   loading: discussionLoading,
  //   error: discussionError,
  //   data: discussionData,
  //   refetch: discussionRefetch,
  // } = useQuery(GET_DISCUSSIONS_BY_TABLE_NAME_AND_ROW, {
  //   fetchPolicy: "no-cache",
  //   client,
  // });

  const [
    getDiscussionsByTableNameAndRow,
    {
      called: discussionCalled,
      loading: discussionLoading,
      error: discussionError,
      data: discussionData,
    },
  ] = useLazyQuery(GET_DISCUSSIONS_BY_TABLE_NAME_AND_ROW, {
    fetchPolicy: "no-cache",
    client,
  });

  console.log({ discussionLoading, discussionError, discussionData });

  useEffect(() => {
    if (table_name === undefined || row === undefined) {
      setSnackbarState((state) => ({
        open: true,
        message: "#Table Name, and #Row is undefined!",
        severity: "warning",
      }));
    } else {
      getDiscussionsByTableNameAndRow({
        variables: {
          table_name,
          row: +row,
        },
      });
    }
  }, [table_name, row, getDiscussionsByTableNameAndRow]);

  useEffect(() => {
    if (
      discussionError === undefined &&
      discussionLoading === false &&
      discussionCalled === true &&
      discussionData
    ) {
      if (discussionData.discussions.length > 0) {
        setDiscussion(discussionData.discussions[0]);
      } else {
        if (table_name && row) {
          createDiscussion({
            variables: {
              discussion: {
                app: 0,
                org: 0,
                row: +row,
                table_name,
              },
            },
          });
        }
      }
    }
  }, [
    discussionError,
    discussionLoading,
    discussionCalled,
    discussionData,
    createDiscussion,
    table_name,
    row,
  ]);

  useEffect(() => {
    if (table_name && row) {
      if (discussionCreatedData && discussionCreatedError === undefined) {
        const newDiscussion = discussionCreatedData.discussionCreated;
        if (
          newDiscussion.table_name === table_name &&
          newDiscussion.row === +row
        ) {
          setDiscussion(newDiscussion);
        }
      }
    }
  }, [discussionCreatedData, discussionCreatedError, table_name, row]);

  useEffect(() => {
    if (postCreatedData && postCreatedError === undefined) {
      setDiscussion((discussion) => {
        if (
          discussion.posts.find(
            (post) => post.id === postCreatedData.postCreated.id
          )
        ) {
          return discussion;
        } else {
          return {
            ...discussion,
            posts: [...discussion.posts, postCreatedData.postCreated],
          };
        }
      });
    }
  }, [postCreatedData, postCreatedError]);

  useEffect(() => {
    if (postDeletedData && postDeletedError === undefined) {
      setDiscussion((discussion) => ({
        ...discussion,
        posts: discussion.posts.filter(
          (post) => post.id !== postDeletedData.postDeleted
        ),
      }));
    }
  }, [postDeletedData, postDeletedError]);

  useEffect(() => {
    if (reactionCreatedData && reactionCreatedError === undefined) {
      const discussion_id =
        reactionCreatedData.reactionCreated.post.discussion.id;
      const post_id = reactionCreatedData.reactionCreated.post.id;
      const reaction_id = reactionCreatedData.reactionCreated.id;

      setDiscussion((discussion) => {
        if (discussion.id === discussion_id) {
          return {
            ...discussion,
            posts: discussion.posts.map((post) => {
              if (post.id === post_id) {
                if (
                  post.reactions.find((reaction) => reaction.id === reaction_id)
                ) {
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
          };
        } else {
          return discussion;
        }
      });
    }
  }, [reactionCreatedData, reactionCreatedError]);

  useEffect(() => {
    if (reactionDeletedData && reactionDeletedError === undefined) {
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
  }, [reactionDeletedData, reactionDeletedError]);

  useEffect(() => {
    if (!!createPostError && createPostLoading === false && !!prevQuillText) {
      setQuillText(prevQuillText);
      setPrevQuillText(null);
    }
  }, [createPostError, createPostLoading, prevQuillText]);

  useEffect(() => {
    const errors = [
      postCreatedError,
      postDeletedError,
      reactionCreatedError,
      reactionDeletedError,
      deletePostError,
      deleteReactionError,
      createPostError,
      createReactionError,
      createDiscussionError,
      discussionError,
    ];
    const isError = errors.reduce(
      (isExistError, error) => !!error || isExistError,
      false
    );
    if (isError) {
      setSnackbarState({
        open: true,
        message: `Oops, Something went to wrong, Check your network connection`,
        severity: "error",
      });
    }
  }, [
    postCreatedError,
    postDeletedError,
    reactionCreatedError,
    reactionDeletedError,
    deletePostError,
    deleteReactionError,
    createPostError,
    createReactionError,
    createDiscussionError,
    discussionError,
  ]);

  const handleQuillChange = (text: string) => {
    setQuillText(text);
  };

  const handleKeyEvent = async (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      createPost({
        variables: {
          post: {
            discussion_id: discussion.id,
            plain_text: "",
            postgres_language: "simple",
            quill_text: quillText,
            user_id: UESERID,
          },
        },
      });
      setPrevQuillText(quillText);
      setQuillText("");
    }
  };

  const handleDeletePost = async (post_id: number): Promise<void> => {
    deletePost({
      variables: {
        id: post_id,
      },
    });
  };

  const handleAddReaction = useCallback(
    async (
      post_id: number,
      user_id: string,
      content: string
    ): Promise<void> => {
      createReaction({
        variables: {
          reaction: {
            post_id,
            content,
            user_id,
          },
        },
      });
    },
    [createReaction]
  );

  const handleDeleteReaction = async (reaction_id: number): Promise<void> => {
    deleteReaction({
      variables: {
        id: reaction_id,
      },
    });
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
        <DiscussionHeader>
          <Stack direction="row" justifyContent="space-between">
            <span>Discussion</span>
            <Button
              onClick={() => {
                history.goBack();
              }}
            >
              Go Back
            </Button>
          </Stack>
        </DiscussionHeader>

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

      <Backdrop
        sx={{ color: "#fff", zIndex: 1000 }}
        open={discussionLoading && discussionCalled}
      >
        <Stack justifyContent="center">
          <div style={{ margin: "auto" }}>
            <CircularProgress color="inherit" />
          </div>
          <div>LOADING</div>
        </Stack>
      </Backdrop>
    </IonContent>
  );
}
