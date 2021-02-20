import React from "react";
import StackedArea from "./index";
import { ranB } from "../utils";
import { Info } from "luxon";

export default {
  component: StackedArea,
  title: "Charts/Stacked Area",
};

function randomData() {
  return Array(12)
    .fill(0)
    .map(() => ranB(10, 1000));
}

const seriesData = [
  {
    name: "Nike",
    data: randomData(),
  },
  {
    name: "Apple",
    data: randomData(),
  },
  {
    name: "Amazon",
    data: randomData(),
  },
  {
    name: "Subway",
    data: randomData(),
  },
  {
    name: "Nowhere",
    data: randomData(),
  },
];

// generates array of short month names
const defaultXLabels = Info.months("short");

export const Chart = (args) => {
  return <StackedArea {...args} />;
};

Chart.args = {
  data: seriesData,
  options: {},
  exporting: false,
  xLabels: defaultXLabels,
  yAxisTitle: "Y axis Title",
  tooltipStyle: "split",
};

Chart.argTypes = {
  tooltipStyle: {
    control: { type: "select", options: ["shared", "split", "single"] },
  },
};
