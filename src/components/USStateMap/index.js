import React, {  useEffect, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "../utils/HighChartBase";
import merge from "lodash-es/merge";
import geoJson from "./us-all.geo.json";


const defaultOptions = {
  title: undefined,

  chart: {
    type: "map",
    map: geoJson,
    borderWidth: 0,
  },

  exporting: {
    sourceWidth: 600,
    sourceHeight: 500,
  },

  legend: {
    layout: "vertical",
    borderWidth: 0,
    backgroundColor: "rgba(255,255,255,0.85)",
    floating: true,
    verticalAlign: "middle",
    align: "right",
    x: 0,
  },

  mapNavigation: {
    enabled: true,
  },

  colorAxis: {
    min: 1,
    type: "logarithmic",
    minColor: "#EEEEFF",
    maxColor: "#000022",
    stops: [
      [0, "#F2F2F2"],
      [1, "rgba(43, 194, 189, 0.6)"],
    ],
  },

  series: {
    type: "map",
    animation: {
      duration: 1000,
    },
    data: [],
    joinBy: ["postal-code", "code"],
    dataLabels: {
      enabled: true,
      color: "#FFFFFF",
      format: "{point.code}",
    },
    name: "",
    tooltip: {
      pointFormat: "{point.code}: {point.value:.0f}",
    },
  },
};



const StateMap= ({
  data,
  options,
  exporting,
  label,
  ...containerProps
}) => {
  const [opts, setOpts] = useState(merge({}, defaultOptions, options));

  useEffect(() => {
    setOpts((o) => {
      const newOpts = {
        exporting: {
          enabled: exporting,
        },
        series: {
          name: label,
          data,
        },
      };
      return merge({}, o, newOpts);
    });
  }, [data, label, exporting]);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      constructorType="mapChart"
      options={opts}
      containerProps={containerProps}
    />
  );
};

StateMap.defaultProps = {
  exporting: false,
  options: {},
};

export default StateMap;
