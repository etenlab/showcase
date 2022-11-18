import { gql } from "@apollo/client";

export const GET_NOTIFICATIONS = gql`
  query GetNotifications($userId: Int!) {
    notifications(userId: $userId) {
      id
      user_id
      table_name
      row
      acknowledged
      content
      created_at
    }
  }
`;

export const SET_ACKNOWLEDGED_NOTIFICATION = gql`
  mutation SetAcknowledgedNotification($id: Int!) {
    acknowledgedNotification(id: $id) {
      id
      user_id
      table_name
      row
      acknowledged
      content
      created_at
    }
  }
`;

export const DELETE_NOTIFICATION = gql`
  mutation DeleteNotification($id: Int!) {
    deleteNotification(id: $id)
  }
`;

export const DELETE_NOTIFICATION_BY_USERID = gql`
  mutation DeleteNotificationsByUserId($userId: Int!) {
    deleteNotificationsByUserId(userId: $userId)
  }
`;
