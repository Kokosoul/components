import React from "react";
import SankeyChart from "./index";

export default {
  component: SankeyChart,
  title: "Charts/SankeyChart",
};

const options = {
  accessibility: {
    point: {
      valueDescriptionFormat:
        "{index}. {point.from} to {point.to}, {point.weight}.",
    },
  },
};

const data = [
  ["Target", "BrandX", 5],
  ["Target", "Nike", 1],
  ["Target", "Stuff", 1],
  ["Target", "Allbirds", 1],
  ["Tom's", "BrandX", 1],
  ["Tom's", "Nike", 5],
  ["Tom's", "Allbirds", 1],
  ["Apple", "BrandX", 1],
  ["Apple", "Nike", 1],
  ["Apple", "Stuff", 5],
  ["Apple", "Allbirds", 1],
  ["Macys", "BrandX", 1],
  ["Macys", "Nike", 1],
  ["Macys", "Stuff", 1],
  ["Macys", "Allbirds", 5],
  ["BrandX", "Y-brand", 2],
  ["BrandX", "Gen-Z-Brand", 1],
  ["BrandX", "Asos", 1],
  ["BrandX", "Starbucks", 3],
  ["Nike", "Y-brand", 1],
  ["Nike", "Gen-Z-Brand", 3],
  ["Nike", "Disney", 3],
  ["Nike", "Asos", 3],
  ["Nike", "Starbucks", 1],
  ["Stuff", "Gen-Z-Brand", 1],
  ["Stuff", "Asos", 3],
  ["Stuff", "Starbucks", 1],
  ["Allbirds", "Y-brand", 1],
  ["Allbirds", "Gen-Z-Brand", 1],
  ["Allbirds", "Asos", 2],
  ["Allbirds", "Starbucks", 7],
];

export const Chart = (args) => {
  return <SankeyChart {...args} />;
};

Chart.args = {
  exporting: false,
  tooltipLabel: "Number of shoppers",
  data: data,
  options,
};
