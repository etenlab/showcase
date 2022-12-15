import { Link } from 'react-router-dom';
import {
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  IconButton,
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';

import { Emoji, EmojiStyle } from 'emoji-picker-react';

import { DotDiv } from './styled';
import { INotification } from '../utils/types';

type NotifiRowProps = {
  notification: INotification;
  setAcknowledged(): void;
  deleteNotification(): void;
};

function transformOperation(operation: string): string {
  const mapOp: { [key: string]: string } = {
    INSERT: 'Created',
    DELETE: 'Deleted',
    UPDATE: 'Updated',
  };
  return mapOp[operation];
}

function transformType(notifyType: string): string {
  const mapTy: { [key: string]: string } = {
    POST: 'Post',
    REACTION: 'Reaction',
    DISCUSSION: 'Discussion',
  };
  return mapTy[notifyType];
}

export function NotifiRow({
  notification,
  setAcknowledged,
  deleteNotification,
}: NotifiRowProps) {
  const { content, created_at, acknowledged, table_name, row } = notification;
  const {
    type: notifyType,
    operation,
    summary,
    operator,
  } = JSON.parse(content);

  const notifiHeader = (
    <>
      {`${operator ? operator + ' ' : ''}${transformOperation(
        operation
      )} ${transformType(notifyType)} - `}
      <small>{new Date(created_at).toDateString()}</small>
    </>
  );

  const sxObj = acknowledged ? { p: 1, paddingLeft: '32px' } : {};
  const listItemText = (
    <ListItemText
      sx={sxObj}
      primary={notifiHeader}
      secondary={
        <>
          {notifyType !== 'REACTION' ? (
            summary.length > 60 ? (
              `${summary.substring(0, 60)}...`
            ) : (
              summary
            )
          ) : (
            <Emoji unified={summary} emojiStyle={EmojiStyle.APPLE} size={17} />
          )}
          <Link to={`/discussion/${table_name}/${row}`}>
            <small>Go to...</small>
          </Link>
        </>
      }
    />
  );

  return (
    <div
      style={{
        position: 'relative',
        background: acknowledged ? 'inherit' : 'rgb(198 255 221 / 25%)',
      }}
    >
      <ListItem alignItems="flex-start" disablePadding>
        {acknowledged ? (
          listItemText
        ) : (
          <ListItemButton
            sx={{ paddingLeft: '32px' }}
            onClick={setAcknowledged}
          >
            {listItemText}
          </ListItemButton>
        )}
      </ListItem>
      <IconButton
        sx={{ position: 'absolute', bottom: '16px', right: '16px' }}
        onClick={deleteNotification}
      >
        <CloseIcon sx={{ fontSize: '1rem' }} />
      </IconButton>
      {!acknowledged && <DotDiv />}
      <Divider />
    </div>
  );
}
