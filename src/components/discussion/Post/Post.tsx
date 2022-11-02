import { useRef, useLayoutEffect, MouseEvent } from "react";

import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddReactionOutlinedIcon from "@mui/icons-material/AddReactionOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";

import { EmojiController, PostContainer, DateViewer } from "./styled";
import { ReactionList } from "../Reaction";
import { IPost } from "../utils/types";

interface PostProps extends IPost {
  openEmojiPicker(anchorEl: HTMLButtonElement, postId: number): void;
  deleteReaction(reaction_id: number): void;
  deletePost(post_id: number): void;
}

/**
 * This component basically renders Post, ReactionList.
 */
export default function Post({
  id,
  user_id,
  quill_text,
  created_at,
  reactions,
  deleteReaction,
  deletePost,
  openEmojiPicker,
}: PostProps) {
  const postElement = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    if (postElement.current) {
      postElement.current.innerHTML = quill_text;
    }
  }, [quill_text]);

  const handleDeletePostClick = () => {
    deletePost(id);
  };

  const handleOpenEmojiPicker = (event: MouseEvent<HTMLButtonElement>) => {
    openEmojiPicker(event.currentTarget, id);
  };

  const created_at_date =
    typeof created_at === "string" ? new Date(created_at) : created_at;

  return (
    <PostContainer>
      <h3>
        {user_id}
        <DateViewer>{created_at_date.toDateString()}</DateViewer>
      </h3>

      <p ref={postElement}></p>

      <ReactionList
        reactions={reactions}
        openEmojiPicker={handleOpenEmojiPicker}
        deleteReaction={deleteReaction}
      />

      <EmojiController className="emoji-controller">
        <Button
          onClick={handleOpenEmojiPicker}
          startIcon={<AddReactionOutlinedIcon />}
        >
          React
        </Button>
        <Button
          onClick={handleDeletePostClick}
          startIcon={<DeleteOutlineIcon />}
        >
          Delete
        </Button>
        <IconButton>
          <MoreVertOutlinedIcon />
        </IconButton>
      </EmojiController>
    </PostContainer>
  );
}
