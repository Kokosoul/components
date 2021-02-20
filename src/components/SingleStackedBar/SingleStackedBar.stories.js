import React from "react";
import SingleStackedBar from "./index";

export default {
  component: SingleStackedBar,
  title: "Charts/Single Stacked Bar",
};

const testData = [
  { label: "25%", value: 5879 },
  { label: "50%", value: 1583 },
  { label: "75%", value: 921 },
  { label: "100%", value: 604 },
];

export const Chart = (args) => {
  return (
    <div style={{ maxWidth: args.maxWidth }}>
      <SingleStackedBar {...args} />
    </div>
  );
};

Chart.args = {
  maxWidth: "80%",
  exporting: false,
  padding: 10,
  data: testData,
  options: {},
};
