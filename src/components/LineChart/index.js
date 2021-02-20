import React from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "../utils/HighChartBase";
import merge from "lodash-es/merge";

const defaultOptions = {
  title: undefined,

  yAxis: {
    title: {
      text: "",
    },
  },

  xAxis: {
    categories: [],
  },

  series: [],

  responsive: {
    rules: [
      {
        condition: {
          maxWidth: 500,
        },
      },
    ],
  },
};



const LineChart = ({ data, exporting, options, xLabels, yLabel }) => {
  const propOptions = {
    yAxis: {
      title: {
        text: yLabel,
      },
    },
    exporting: {
      enabled: exporting,
    },
    xAxis: {
      categories: xLabels,
    },
    series: data,
    legend: { enabled: data.length > 1 },
  };

  /**
   * - defaultOptions defined within this component
   * - options can override anything from the default
   * - propOptions is how we pass this component's props values into the options which includes data
   */
  const mergedOptions = merge({}, defaultOptions, options, propOptions);
  return <HighchartsReact highcharts={Highcharts} options={mergedOptions} />;
};

LineChart.defaultProps = {
  options: {},
  exporting: false,
};

export default LineChart;
