import React, { useState, Fragment } from "react";
import Notifications from "./index";
import Button from "react-bootstrap/Button";
import { v4 as uuid } from "uuid";

export default {
  component: Notifications,
  title: "Notifications",
};

export const Examples = () => {
  const [msgs, setMsgs] = useState(
    []
  );

  function setNotification(msg, type) {
    const id = uuid();
    setMsgs((e) => [...e, { msg: msg + ` ${id}`, type, id }]);
    setTimeout(() => {
      removeNotification(id);
    }, 5000);
  }

  function removeNotification(id) {
    setMsgs((e) => e.filter((msg) => msg.id !== id));
  }

  return (
    <Fragment>
      <Notifications
        notifications={msgs}
        removeNotification={removeNotification}
      />
      <Button
        onClick={() => setNotification("success msg!", "success")}
        variant="success"
      >
        Success
      </Button>
      <br />
      <br />
      <Button
        onClick={() => setNotification("Error msg!", "error")}
        variant="danger"
      >
        Error
      </Button>
      <br />
      <br />
      <Button
        onClick={() => setNotification("Warning msg!", "warning")}
        variant="warning"
      >
        Warning
      </Button>
      <br />
      <br />
      <Button
        onClick={() => setNotification("Info msg!", "info")}
        variant="info"
      >
        Info
      </Button>
    </Fragment>
  );
};

export const TryIt = (args) => {
  const [msgs, setMsgs] = useState(
    []
  );

  function setNotification(msg, type) {
    const id = uuid();
    setMsgs((e) => [...e, { msg: msg, type, id }]);
    setTimeout(() => {
      removeNotification(id);
    }, args.timeout);
  }

  function removeNotification(id) {
    setMsgs((e) => e.filter((msg) => msg.id !== id));
  }

  return (
    <Fragment>
      <Notifications
        notifications={msgs}
        removeNotification={removeNotification}
      />
      <Button
        onClick={() => setNotification(args.message, args.type)}
        variant={args.type === "error" ? "danger" : args.type}
      >
        {args.type}
      </Button>
      <p className="mt-4 h5">
        Use the "Controls" panel below to change options
      </p>
    </Fragment>
  );
};

const NotificationTypes = ["success", "error", "warning", "info"];

TryIt.args = {
  type: "success",
  message: "Success updating that thing!",
  timeout: 5000,
};

TryIt.argTypes = {
  type: {
    control: { type: "select", options: NotificationTypes },
    description: `choose one: ${NotificationTypes.join(" | ")}`,
  },
  message: {
    description: "Set the message of the notification",
  },
  timeout: {
    description: "Set how long it remains on screen (in milliseconds)",
  },
  notifications: {
    control: {
      type: null,
    },
  },
};
