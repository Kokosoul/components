import React from "react";
import Spinner from "./index";

export default {
  component: Spinner,
  title: "Spinner",
};

export const Usage = (args) => <Spinner {...args} />;

Usage.args = {
  type: "dot",
};

Usage.argTypes = {
  type: {
    control: { type: "select", options: ["cube", "bouncer", "loader", "dot"] },
  },
};
