import React from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "../utils/HighChartBase";
import merge from "lodash-es/merge";


const defaultOptions = {
  title: undefined,

  chart: {
    type: "area",
  },
  exporting: {
    enabled: false,
  },
  xAxis: {
    tickmarkPlacement: "on",
  },
  yAxis: {
    title: {},
  },
  tooltip: {
    split: true,
  },
  plotOptions: {
    area: {
      stacking: "normal",
      lineColor: "#666666",
      lineWidth: 1,
      marker: {
        lineWidth: 1,
        lineColor: "#666666",
      },
    },
  },
  series: [],
};


/**
 * Highchart Stacked Area Chart
 */
const StackedArea = ({
  data,
  xLabels,
  yAxisTitle,
  options,
  exporting,
  tooltipStyle,
  ...other
}) => {
  const tooltip = { split: false, shared: false };

  if (tooltipStyle === "split") {
    tooltip.split = true;
  } else if (tooltipStyle === "shared") {
    tooltip.shared = true;
  }

  const propOptions = {
    tooltip,
    exporting: {
      enabled: exporting,
    },
    xAxis: {
      categories: xLabels,
    },
    yAxis: {
      title: {
        text: yAxisTitle,
      },
    },
    series: data.map((data) => ({ ...data, type: "area" })),
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

StackedArea.defaultProps = {
  exporting: false,
  options: {},
  tooltipStyle: "split",
};

export default StackedArea;
