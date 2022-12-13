import { List, ListSubheader, Stack, Button } from '@mui/material';

import CheckIcon from '@mui/icons-material/Check';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

import { INotification } from '../utils/types';
import { NotifiRow } from '../NotificationRow';

type NotifiListProps = {
  notifications: INotification[];
  setAcknowledged(id: number): void;
  deleteNotification(id: number): void;
  setAcknowledgedsAll(): void;
  deleteNotificationsAll(): void;
};

export function NotifiList({
  notifications,
  setAcknowledged,
  deleteNotification,
  setAcknowledgedsAll,
  deleteNotificationsAll,
}: NotifiListProps) {
  return (
    <List
      sx={{
        width: '360px',
        maxHeight: 'calc(100vh - 150px)',
        bgcolor: 'background.paper',
      }}
    >
      <ListSubheader sx={{ background: '#e2e2e2' }}>
        <Stack direction="row" justifyContent="space-between">
          <Button startIcon={<CheckIcon />} onClick={setAcknowledgedsAll}>
            Check All
          </Button>
          <Button
            startIcon={<ClearOutlinedIcon />}
            onClick={deleteNotificationsAll}
          >
            Remove All
          </Button>
        </Stack>
      </ListSubheader>
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
