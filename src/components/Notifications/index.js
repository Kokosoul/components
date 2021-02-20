import React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { cn } from "../utils";
import styles from "./index.module.scss";

const NotificationTransition = (props) => (
  <CSSTransition
    {...props}
    classNames="notification"
    timeout={{ enter: 500, exit: 300 }}
  />
);



const Notifications = ({ notifications = [], removeNotification }) => {
  return (
    notifications && (
      <TransitionGroup className={styles.notifications}>
        {notifications !== null &&
          notifications.length > 0 &&
          notifications.map((notification) => (
            <NotificationTransition
              key={notification.id}
              className={cn(styles.notification, styles[notification.type])}
            >
              <div>
                <div className="flex-grow-1">{notification.msg}</div>
                <span
                  className={cn("mr-3", styles.close)}
                  onClick={() => {
                    removeNotification(notification.id);
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 12L12 4"
                      stroke="#536567"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M4 4L12 12"
                      stroke="#536567"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </div>
            </NotificationTransition>
          ))}
      </TransitionGroup>
    )
  );
};

export default Notifications;
