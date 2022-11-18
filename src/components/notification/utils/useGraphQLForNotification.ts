import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";

import { client } from "src/common/notificationGrapql";
import {
  GET_NOTIFICATIONS,
  SET_ACKNOWLEDGED_NOTIFICATION,
  DELETE_NOTIFICATION,
  DELETE_NOTIFICATION_BY_USERID,
} from "src/common/notificationQuery";

import type { INotification } from "./types";

// import {
//   recalcDiscusionWithNewPost,
//   recalcDiscussionWithDeletedPostId,
//   recalcDiscussionWithNewReation,
//   recalcDiscusionWithDeletedReactionId,
// } from "./helpers";

interface UseGraphQLForDiscussion {
  notifications: INotification[] | [];
  graphQLAPIs: {
    setAcknowledged: any;
    deleteNotification: any;
    deleteNotificationByUserId: any;
  };
}

export function useGraphQLForNotification(
  userId: number
): UseGraphQLForDiscussion {
  const [notifications, setNotifications] = useState<INotification[]>([]);

  // const { data: discussionCreatedData, error: discussionCreatedError } =
  //   useSubscription<DiscussionCreatedData>(DISCUSSION_CREAETD_SUBSCRIPTION, {
  //     client,
  //   });
  const [deleteNotificationByUserId] = useMutation(
    DELETE_NOTIFICATION_BY_USERID,
    { client }
  );
  const [deleteNotification] = useMutation(DELETE_NOTIFICATION, { client });
  const [setAcknowledged] = useMutation(SET_ACKNOWLEDGED_NOTIFICATION, {
    client,
  });
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

  return {
    notifications,
    graphQLAPIs: {
      deleteNotification,
      deleteNotificationByUserId,
      setAcknowledged,
    },
  };
}
