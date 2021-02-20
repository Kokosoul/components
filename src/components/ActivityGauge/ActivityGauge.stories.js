import React from "react";
import ActivityGauge from "./index";

export default {
  component: ActivityGauge,
  title: "Charts/ActivityGauge",
};

export const Chart = (args) => {
  const data = [
    {
      name: args.outerName,
      data: args.outerVal,
    },
    {
      name: args.midName,
      data: args.midVal,
    },
    {
      name: args.innerName,
      data: args.innerVal,
    },
  ];
  return <ActivityGauge data={data} exporting={args.exporting} />;
};

Chart.args = {
  exporting: false,
  innerName: "Good Deeds",
  innerVal: 12,
  midName: "Something",
  midVal: 30,
  outerName: "",
  outerVal: 100,
  options: {},
};

Chart.argTypes = {
  data: { control: { disable: true } },
};
