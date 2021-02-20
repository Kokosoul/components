import React from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "../utils/HighChartBase";
import highchartsMore from "highcharts/highcharts-more.js";
import solidGauge from "highcharts/modules/solid-gauge.js";
import colors from "../styles/colors.module.scss";
import merge from "lodash-es/merge";

highchartsMore(Highcharts);
solidGauge(Highcharts);

const defaultOptions = {
  title: undefined,

  chart: {
    type: "solidgauge",
    margin: 0,
    spacing: [0, 0, 0, 0],
  },
  pane: {
    center: ["50%", "50%"],
    size: "100%",
    startAngle: -90,
    endAngle: 90,
    background: [
      {
        backgroundColor:
          Highcharts.defaultOptions.legend?.backgroundColor || "#EEE",
        innerRadius: "60%",
        outerRadius: "100%",
        shape: "arc",
      },
    ],
  },

  exporting: {
    enabled: false,
  },

  tooltip: {
    enabled: false,
  },

  // the value axis
  yAxis: {
    min: 0,
    max: 100,
    stops: [
      [0.33, colors.primaryTeal],
      [0.66, colors.primaryBlue],
      [1, colors.primaryDarkBlue],
    ],
    //lineWidth: null,
    tickPositions: [0, 100],
    tickWidth: 0,
    minorTickInterval: null,
    tickAmount: 2,
    labels: {
      y: 16,
    },
  },

  plotOptions: {
    solidgauge: {
      dataLabels: {
        y: -10,
        borderWidth: 0,
        useHTML: true,
      },
    },
  },
};



const Gauge = ({
  data,
  exporting,
  unit,
  options,
  min,
  max,
  ...other
}) => {
  const propOptions = {
    exporting: {
      enabled: exporting,
    },
    yAxis: {
      min,
      max,
    },
    series: [
      {
        data: [data],
        dataLabels: {
          format: `<div style="text-align:center">
            <span style="font-size:2rem">{y}</span><br/>
            <span style="font-size:0.8rem;opacity:0.4">${unit}</span>
            </div>`,
        },
      },
    ],
  };

  /**
   * - defaultOptions defined within this component
   * - options can override anything from the default
   * - propOptions is how we pass this component's props values into the options which includes data
   */
  const mergedOptions = merge({}, defaultOptions, options, propOptions);
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={mergedOptions}
      {...other}
    />
  );
};

Gauge.defaultProps = {
  exporting: false,
  options: {},
  unit: "% Good Deeds Spend Among Offered Brands",
  min: 0,
  max: 100,
};
export default Gauge;
