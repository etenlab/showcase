import { List } from "@mui/material";

import { INotification } from "../utils/types";
import { NotifiRow } from "../NotificationRow";

type NotifiListProps = {
  notifications: INotification[];
};

export function NotifiList({ notifications }: NotifiListProps) {
  return (
    <List
      sx={{
        width: "360px",
        maxHeight: "calc(100vh - 150px)",
        bgcolor: "background.paper",
      }}
    >
      {notifications.map((notifi) => (
        <NotifiRow key={notifi.id} notification={notifi} />
      ))}
    </List>
  );
}
