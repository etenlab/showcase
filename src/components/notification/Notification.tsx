import { useState } from 'react';

import { Popover } from '@mui/material'

import { NotifiButton } from './NotificationButton';
import { NotifiList } from './NotificationList';
import { mockNotifications } from './utils/contants';

export function Notification() {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleSetAnchorEl = (elem: HTMLButtonElement) => {
    setAnchorEl(elem);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <NotifiButton unreadNotifis={5} setAnchorEl={handleSetAnchorEl} />
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
        <NotifiList notifications={mockNotifications} />
      </Popover>
    </>
  )
}