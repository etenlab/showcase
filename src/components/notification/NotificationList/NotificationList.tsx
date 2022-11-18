import { List } from "@mui/material";

import { INotification } from "../utils/types";
import { NotifiRow } from "../NotificationRow";

type NotifiListProps = {
  notifications: INotification[];
  setAcknowledged(id: number): void;
  deleteNotification(id: number): void;
};

export function NotifiList({
  notifications,
  setAcknowledged,
  deleteNotification,
}: NotifiListProps) {
  return (
    <List
      sx={{
        width: "360px",
        maxHeight: "calc(100vh - 150px)",
        bgcolor: "background.paper",
      }}
    >
      {notifications.map((notifi) => (
        <NotifiRow
          key={notifi.id}
          notification={notifi}
          setAcknowledged={() => {
            setAcknowledged(notifi.id);
          }}
          deleteNotification={() => {
            deleteNotification(notifi.id);
          }}
        />
      ))}
    </List>
  );
}
