import { useRef, useLayoutEffect, useState, MouseEvent } from "react";
import Reaction from "../Reaction";
import EmojiPicker, { Theme, EmojiClickData } from "emoji-picker-react";

import {
  EmojiController,
  PostContainer,
  DateViewer,
  AddReactionIconButton,
} from "./styled";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import IconButton from "@mui/material/IconButton";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddReactionOutlinedIcon from "@mui/icons-material/AddReactionOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { IPost } from "../utils/types";

interface PostProps extends IPost {
  addReaction(post_id: number, user_id: string, content: string): void;
  deleteReaction(reaction_id: number): void;
  deletePost(post_id: number): void;
}

export default function Post({
  id,
  user_id,
  quill_text,
  created_at,
  reactions,
  addReaction,
  deleteReaction,
  deletePost,
}: PostProps) {
  const postElement = useRef<HTMLParagraphElement>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  useLayoutEffect(() => {
    if (postElement.current) {
      postElement.current.innerHTML = quill_text;
    }
  }, [quill_text]);

  const handleOpenEmojiPicker = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseEmojiPicker = () => {
    setAnchorEl(null);
  };

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    handleCloseEmojiPicker();
    addReaction(id, user_id, emojiData.unified);
  };

  const handleDeletePostClick = () => {
    deletePost(id);
  };

  const openEmojiPicker = Boolean(anchorEl);

  return (
    <PostContainer>
      <h3>
        {user_id}
        <DateViewer>{created_at.toDateString()}</DateViewer>
      </h3>
      <p ref={postElement}></p>
      {reactions?.length > 0 ? (
        <Stack direction="row" sx={{ flexWrap: "wrap" }}>
          {reactions?.map((reaction) => (
            <Reaction key={reaction.id} {...reaction} deleteReaction={deleteReaction} />
          ))}
          <AddReactionIconButton onClick={handleOpenEmojiPicker}>
            <AddReactionOutlinedIcon />
          </AddReactionIconButton>
        </Stack>
      ) : null}
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
      <Popover
        open={openEmojiPicker}
        anchorEl={anchorEl}
        onClose={handleCloseEmojiPicker}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <EmojiPicker
          onEmojiClick={handleEmojiClick}
          autoFocusSearch={true}
          lazyLoadEmojis={true}
          theme={Theme.AUTO}
        />
      </Popover>
    </PostContainer>
  );
}
