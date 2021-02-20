import React from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "../utils/HighChartBase";
import HighchartsSankey from "highcharts/modules/sankey";
import merge from "lodash-es/merge";

HighchartsSankey(Highcharts);

/**
 * @type {import('highcharts').Options}
 */
const defaultOptions = {
  title: undefined,

  exporting: {
    enabled: false,
  },
  series: [],
};


const SankeyChart = ({
  data,
  options,
  exporting,
  tooltipLabel,
  ...other
}) => {
  const propOptions = {
    chart: {
      // need to move the chart down a bit when exporting is on so that the
      // menu button isn't over the chart
      marginTop: exporting ? 30 : 0,
    },
    exporting: {
      enabled: exporting,
    },
    series: [
      {
        type: "sankey",
        name: tooltipLabel,
        keys: ["from", "to", "weight"],
        data,
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
}

SankeyChart.defaultProps = {
  exporting: false,
  options: {},
};

export default SankeyChart;
