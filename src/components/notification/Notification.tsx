import { useState } from "react";

import { Popover } from "@mui/material";

import { NotifiButton } from "./NotificationButton";
import { NotifiList } from "./NotificationList";
import { mockNotifications } from "./utils/contants";
import { INotification } from "./utils/types";

export function Notification() {
  const [notifications, setNotifications] =
    useState<INotification[]>(mockNotifications);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleSetAnchorEl = (elem: HTMLButtonElement) => {
    setAnchorEl(elem);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSetAcknowledged = (id: number) => {
    setNotifications((notifications) =>
      notifications.map((notifi) => ({
        ...notifi,
        acknowledged: notifi.id === id ? true : notifi.acknowledged,
      }))
    );
  };

  const handleDeleteNotification = (id: number) => {
    setNotifications((notifications) =>
      notifications.filter((notifi) => notifi.id !== id)
    );
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <NotifiButton unreadNotifis={5} setAnchorEl={handleSetAnchorEl} />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <NotifiList
          notifications={notifications}
          setAcknowledged={handleSetAcknowledged}
          deleteNotification={handleDeleteNotification}
        />
      </Popover>
    </>
  );
}
