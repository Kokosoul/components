import React from "react";
import StackedColumns from "./index";

export default {
  component: StackedColumns,
  title: "Charts/StackedColumns",
};

const json = {
  xLabels: [
    "2020-07-02",
    "2020-07-09",
    "2020-07-16",
    "2020-07-23",
    "2020-07-30",
    "2020-08-06",
    "2020-08-13",
    "2020-08-20",
    "2020-08-27",
    "2020-09-03",
    "2020-09-10",
    "2020-09-17",
    "2020-09-24",
    "2020-10-01",
  ],
  customersNew: [35, 43, 41, 29, 14, 18, 15, 7, 8, 6, 8, 9, 1, 0],
  customersRepeat: [1, 13, 20, 21, 41, 45, 49, 36, 52, 46, 44, 35, 46, 15],
  percNew: [
    97.1377907924514,
    74.99023161186935,
    64.79578417388645,
    56.358979969442544,
    23.88266667609843,
    32.7439629967507,
    24.782596300963547,
    18.267281320671184,
    11.541021245047475,
    12.546606080613369,
    14.873176310444446,
    20.924105670166316,
    1.945851138500116,
    0,
  ],
};
const data = [
  {
    // yAxis 1
    name: "New customers",
    data: json.customersNew,
    type: "column",
    tooltip: {
      headerFormat: "",
      pointFormat: "{series.name}: {point.y}<br/>",
    },
  },
  {
    // yAxis 1
    name: "Repeat customers",
    data: json.customersRepeat,
    type: "column",
    tooltip: {
      headerFormat: "",
      pointFormat:
        "{series.name}: {point.y}<br/>Total: {point.stackTotal:.0f}<br />",
    },
  },
  {
    // yAxis 2
    name: "% Revenue from New Shoppers",
    type: "spline",
    data: json.percNew,
    yAxis: 1,
    tooltip: {
      headerFormat: "",
      pointFormat: "{series.name}: {point.y:.0f}%",
    },
  },
];

const options = {
  yAxis: [
    {
      // new and repeat customers combined
      title: {
        text: "Shoppers",
      },
    },
    {
      gridLineWidth: 0,
      min: 0,
      max: 100,
      title: {
        text: "% Revenue from New Shoppers",
      },
      labels: {
        format: "{value}%",
      },
    },
  ],
  tooltip: {
    shared: true,
  },
};

export const Chart = (args) => {
  return <StackedColumns {...args} />;
};

Chart.args = {
  exporting: false,
  options,
  data,
  xLabels: json.xLabels,
};

Chart.argTypes = {
  type: { control: { type: "select", options: ["column", "bar"] } },
};
