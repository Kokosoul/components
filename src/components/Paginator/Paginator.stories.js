import React from "react";
import Paginator from "./index";

export default {
  component: Paginator,
  title: "Paginator",
};

export const Usage = (args) => {
  return (
    <Paginator
      {...args}
      onPage={(newOffset) => {
        console.log(newOffset);
      }}
    />
  );
};

Usage.args = {
  limit: 10,
  offset: 0,
  total: 200,
  groupLimit: 5,
};

Usage.argTypes = {
  limit: {
    control: { type: "number", min: 1 },
  },
  offset: {
    control: { type: "number", min: 0 },
  },
  total: {
    control: { type: "number", min: 1 },
  },
};
