import { Emoji, EmojiStyle } from "emoji-picker-react";

import Tooltip from "@mui/material/Tooltip";
import { IReaction } from "../utils/types";

import { EmojiWrapper } from "./styled";

interface ReactionProps extends IReaction {
  deleteReaction(reaction_id: number): void;
}

export default function Reaction({ id, user_id, content, deleteReaction }: ReactionProps) {
  const handleDeleteReaction = () => {
    deleteReaction(id);
  }

  return (
    <Tooltip title={user_id}>
      <EmojiWrapper onClick={handleDeleteReaction}>
        <Emoji unified={content} emojiStyle={EmojiStyle.APPLE} size={17} />
      </EmojiWrapper>
    </Tooltip>
  );
}
