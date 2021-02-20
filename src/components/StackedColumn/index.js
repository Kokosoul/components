import React from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "../utils/HighChartBase";
import merge from "lodash-es/merge";

/**
 * @type {import('highcharts').Options}
 */
const defaultOptions = {
  title: undefined,
  chart: {
    zoomType: "xy",
  },
  accessibility: {
    announceNewData: {
      enabled: true,
    },
  },
  xAxis: {
    type: "category",
    labels: {
      rotation: -45,
    },
  },
  yAxis: [
    {
      // this will remove the label if none is given
      title: {
        text: "",
      },
    },
    {
      // if there's a 2nd yAxis, move it to the right side of the chart
      opposite: true,
      // this will remove the label if none is given
      title: {
        text: "",
      },
    },
  ],
  /**
   * This handles the data on the columns/bar/lines
   */
  plotOptions: {
    column: {
      stacking: "normal",
    },
  },
};




const StackedColumns= ({
  data,
  xLabels,
  options,
  exporting,
  ...other
}) => {
  const propOptions = {
    xAxis: {
      categories: xLabels,
    },
    series: data,
    exporting: {
      enabled: exporting,
    },
  };

  const mergedOptions = merge({}, defaultOptions, options, propOptions);
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={mergedOptions}
      {...other}
    />
  );
};

StackedColumns.defaultProps = {
  exporting: false,
  options: {},
};

export default StackedColumns;
