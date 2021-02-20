import React from "react";
import Gauge from "./index";

export default {
  component: Gauge,
  title: "Charts/Gauge",
};

export const Chart = (args) => <Gauge {...args} />;
Chart.args = {
  exporting: false,
  data: 23,
  unit: "% Good Deeds Spend Among Offered Brands",
  options: {},
  min: 0,
  max: 100,
};
