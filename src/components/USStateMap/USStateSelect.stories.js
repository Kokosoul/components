import React from "react";
import USMap from "./index";
import data from "../../local/mock-us-map-data";

export default {
  component: USMap,
  title: "Charts/US State Map",
};

const mapData = data.map((p) => {
  p.code = p.code.toUpperCase();
  return p;
});

export const Map = (args) => {
  return (
    <USMap
      style={{
        width: "100%",
        minHeight: "600px",
        height: "100%",
        margin: "0 auto",
      }}
      {...args}
    />
  );
};

Map.args = {
  data: mapData,
  exporting: false,
  label: "Population density",
  options: {},
};
