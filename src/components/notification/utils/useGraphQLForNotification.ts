import { useEffect, useState } from "react";
import { useSubscription, useMutation, useQuery } from "@apollo/client";

import { client } from "src/common/notificationGrapql";
import {
  GET_NOTIFICATIONS,
  SET_ACKNOWLEDGED_NOTIFICATION,
  DELETE_NOTIFICATION,
  NOTIFICATION_ADDED_SUBSCRIPTION,
} from "src/common/notificationQuery";

import type { INotification } from "./types";

interface UseGraphQLForDiscussion {
  notifications: INotification[] | [];
  graphQLAPIs: {
    setAcknowledged: any;
    deleteNotification: any;
  };
}

export function useGraphQLForNotification(
  userId: number
): UseGraphQLForDiscussion {
  const [notifications, setNotifications] = useState<INotification[]>([]);

  const { data: notificationAdded } = useSubscription(
    NOTIFICATION_ADDED_SUBSCRIPTION,
    {
      variables: {
        userId,
      },
      client,
    }
  );
  const [deleteNotification, { data: deletedNotification }] = useMutation(
    DELETE_NOTIFICATION,
    { client }
  );
  const [setAcknowledged, { data: acknowledgedNotification }] = useMutation(
    SET_ACKNOWLEDGED_NOTIFICATION,
    {
      client,
    }
  );
  const { data: notificationsData } = useQuery(GET_NOTIFICATIONS, {
    variables: {
      userId,
    },
    fetchPolicy: "no-cache",
    client,
  });

  useEffect(() => {
    if (notificationsData) {
      setNotifications(notificationsData.notifications);
    }
  }, [notificationsData]);

  useEffect(() => {
    if (notificationAdded) {
      setNotifications((notifications) => [
        ...notifications,
        notificationAdded.notificationAdded,
      ]);
    }
  }, [notificationAdded]);

  useEffect(() => {
    if (deletedNotification) {
      const notifyId = deletedNotification.deleteNotification;
      setNotifications((notifications) =>
        notifications.filter((notify) => notify.id !== notifyId)
      );
    }
  }, [deletedNotification]);

  useEffect(() => {
    if (acknowledgedNotification) {
      const notifyId = acknowledgedNotification.acknowledgedNotification;
      setNotifications((notifications) =>
        notifications.map((notify) => ({
          ...notify,
          acknowledged:
          notifyId === notify.id ? true : notify.acknowledged,
        }))
      );
    }
  }, [acknowledgedNotification]);

  return {
    notifications,
    graphQLAPIs: {
      deleteNotification,
      setAcknowledged,
    },
  };
}
