import React from "react";
import Table from "./index";
import { ranB } from "../utils";

export default {
  component: Table,
  title: "Tables/Responsive Table",
};

const Thead = () => {
  return (
    <thead>
      <tr>
        <th>#</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>email</th>
        <th>totals</th>
      </tr>
    </thead>
  );
};

export const Usage = (args) => {
  return <Table header={Thead} {...args} />;
};

Usage.args = {
  data: Array(20)
    .fill(0)
    .map((_, i) => {
      return {
        id: i,
        firstName: "Luther",
        lastName: "Vandross",
        email: "email@email.com",
        totals: ranB(1000, 50000),
      };
    }),
  bp: "md",
  labelMap: {
    firstName: "Firt Name",
    lastName: "Last Name",
  },
};

Usage.argTypes = {
  bp: {
    control: { type: "select", options: ["xs", "sm", "md", "lg", "xl"] },
  },
};
