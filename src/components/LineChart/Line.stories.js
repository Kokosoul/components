import React from "react";
import LineChart from "./index";

export default {
  component: LineChart,
  title: "Charts/LineChart",
};

const data = [
  {
    name: "Users",
    data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175],
  },
  {
    name: "Non-users",
    data: [33000, 40503, 40134, 67658, 87031, 108931, 117133, 154175],
  },
];

export const Chart = (args) => <LineChart {...args} />;

Chart.args = {
  exporting: false,
  data,
  xLabels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  yLabel: "Donations",
};
