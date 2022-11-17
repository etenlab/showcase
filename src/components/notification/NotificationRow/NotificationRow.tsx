import {
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Typography,
} from "@mui/material";

import { INotification } from "../utils/types";

type NotifiRowProps = {
  notification: INotification;
};

function transformOperation(operation: string): string {
  const mapOp: { [key: string]: string } = {
    INSERT: "Created",
    DELETE: "Deleted",
    UPDATE: "Updated",
  };
  return mapOp[operation];
}

function transformType(notifyType: string): string {
  const mapTy: { [key: string]: string } = {
    POST: "Post",
    REACTION: "Reaction",
    DISCUSSION: "Discussion",
  };
  return mapTy[notifyType];
}

export function NotifiRow({ notification }: NotifiRowProps) {
  const { user_id, content } =
    notification;
  const { type: notifyType, operation, summary } = JSON.parse(content);

  return (
    <>
      <ListItem alignItems="flex-start" disablePadding>
        <ListItemButton>
          <ListItemText
            primary={`${transformType(notifyType)} ${transformOperation(
              operation
            )}`}
            secondary={
              <>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {user_id}
                </Typography>
                {`- ${summary}`}
              </>
            }
          />
        </ListItemButton>
      </ListItem>
      <Divider />
    </>
  );
}
