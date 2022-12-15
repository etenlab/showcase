import { MouseEventHandler } from 'react';
import { IconButton, Badge } from '@mui/material';

import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';

type NotificationButtonProps = {
  unreadNotifis: number;
  setAnchorEl(elem: HTMLButtonElement): void;
};

export function NotifiButton({
  unreadNotifis,
  setAnchorEl,
}: NotificationButtonProps) {
  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <IconButton onClick={handleClick} color="primary">
      <Badge badgeContent={unreadNotifis} color="secondary" overlap="circular">
        <NotificationsActiveOutlinedIcon />
      </Badge>
    </IconButton>
  );
}
