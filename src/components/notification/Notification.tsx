import { useState } from 'react';

import { Popover } from '@mui/material';

import { NotifiButton } from './NotificationButton';
import { NotifiList } from './NotificationList';
import { useGraphQLForNotification } from './utils/useGraphQLForNotification';

type NotificationProps = {
  userId: number;
};

export function Notification({ userId }: NotificationProps) {
  const {
    notifications,
    graphQLAPIs: {
      deleteNotification,
      setAcknowledged,
      deleteNotificationsAll,
      setAcknowledgedsAll,
    },
  } = useGraphQLForNotification(userId);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleSetAnchorEl = (elem: HTMLButtonElement) => {
    setAnchorEl(elem);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSetAcknowledged = (id: number) => {
    setAcknowledged({
      variables: {
        id,
      },
    });
  };

  const handleDeleteNotification = (id: number) => {
    deleteNotification({
      variables: {
        id,
      },
    });
  };

  const handleSetAcknowledgedAll = () => {
    if (!userId) {
      return;
    }

    setAcknowledgedsAll({
      variables: {
        userId,
      },
    });
  };

  const handleDeleteNotificationsAll = () => {
    if (!userId) {
      return;
    }

    deleteNotificationsAll({
      variables: {
        userId,
      },
    });
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const unreadedNotifis = notifications.filter(
    (notifi) => !notifi.acknowledged
  ).length;

  return (
    <>
      <NotifiButton
        unreadNotifis={unreadedNotifis}
        setAnchorEl={handleSetAnchorEl}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <NotifiList
          notifications={notifications}
          setAcknowledged={handleSetAcknowledged}
          deleteNotification={handleDeleteNotification}
          setAcknowledgedsAll={handleSetAcknowledgedAll}
          deleteNotificationsAll={handleDeleteNotificationsAll}
        />
      </Popover>
    </>
  );
}
