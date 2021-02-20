import React from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "../utils/HighChartBase";
import merge from "lodash-es/merge";
import { arraySum } from "../utils";
import colors from "../styles/colors.module.scss";



/**
 * Converts our incoming prop data structure to the way that Highcharts needs it
 * `[{ value: 55, name: "" },...]` ---> `[ { data: [55], name: "" },... ]`
 * @param {object[]} arr
 */
function toSeriesData(
  arr = []
) {
  return arr.map((e) => {
    return {
      data: [e.value],
      name: e.name || "",
      label: e.label,
    };
  });
}

/**
 * extract all values from incoming data prop into a flat array of just the values
 * `[{ value: 55, name: "" },...]` ---> `[55, 40, 4, ...]`
 */
function fromSeries(data){
  return data.map((e) => e.value);
}

/**
 * Creates a TickPositioner function that uses the data. This created the tick
 * positions on the x axis (really our y axis but rotated 90 degrees for this chart)
 */
function createTickPositioner(data) {
  return function () {
    const total = arraySum(data);
    // get perecent of each segment
    const percents = data
      .map((e) => {
        return (e * 100) / total;
      })
      .reverse();
    // added up each percent to previous one and create new array
    const positions = percents.map((e, i) => {
      if (i < 1) {
        return e;
      }
      const last = percents.slice(0, i).reduce((acc, val) => {
        return acc + val;
      }, 0);
      return e + last;
    });
    positions.unshift(0);
    return positions;
  };
}

function createFormatter(data) {
  let i = 0;
  const reversed = [...data].reverse();
  return function () {
    const val = reversed[i];
    i = i + 1;
    if (i >= 4) {
      i = 0;
    }
    return val.label;
  };
}

const defaultOptions = {
  title: undefined,

  chart: {
    type: "bar",
    height: 220,
  },
  colors: [
    colors.primaryDarkBlue,
    colors.primaryBlue,
    colors.primaryTeal,
    colors.secondaryTeal,
  ],
  xAxis: {
    visible: false,
    top: 0,
  },
  yAxis: {
    min: 0,
    useHTML: true,
    title: "",
    labels: {
      formatter: function () {
        return this.value.toFixed(0) + "%";
      },
      y: 0,
      x: 10,
      align: "left",
      style: {
        fontSize: "1rem",
      },
    },
  },
  legend: {
    enabled: false,
  },
  plotOptions: {
    series: {
      // this affects the spacing between the stacks but it also adds
      // padding at the very beginning and end of the chart
      borderWidth: 10,
      gapSize: 10,
      pointPadding: 0,
      groupPadding: 0.1,
      grouping: false,
      stacking: "percent",
      dataLabels: {
        enabled: true,
        align: "start",
        useHTML: true,
        formatter: function () {
          return Math.floor(this.y || 0);
        },
        x: 5,
        style: {
          fontSize: "20px",
          fontWeight: "bold",
        },
      },
    },
  },
  tooltip: {
    headerFormat: "",
    useHTML: true,
    followPointer: true,
    style: {
      fontSize: "16px",
      background: "#fff",
      backgroundColor: "#fff",
      opacity: 1,
    },
    pointFormatter: function () {
      const percent = this.percentage?.toFixed(1);
      const xLabel = this.series.userOptions.label;
      return `
      <div style="padding: 15px; background: #fff;">
        <span style="color:${this.color}">●</span>
        <b>${Math.floor(
        this.y || 0
      ).toLocaleString()}</b> (${percent}%) of total donors (${Math.floor(
        this.total || 0
      ).toLocaleString()})<br />
        donated <b>${xLabel}</b> of their cashback
      </div>
      `;
    },
  },
};

const SingleStackedBar = ({
  data,
  options,
  exporting = false,
  padding = 10,
  ...other
}) => {

  const propOptions = {
    series: toSeriesData(data.reverse()),
    exporting: {
      enabled: exporting,
    },
    yAxis: {
      tickPositioner: createTickPositioner(fromSeries(data)),
      labels: {
        formatter: createFormatter(data),
      },
    },
    plotOptions: {
      series: {
        borderWidth: padding !== undefined && padding >= 0 ? padding : 0,
        dataLabels: {
          x: padding !== undefined && padding <= 5 ? 5 : padding,
        },
      },
    },
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

export default SingleStackedBar;
