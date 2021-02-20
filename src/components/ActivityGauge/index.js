import React from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "../utils/HighChartBase";
import highchartsMore from "highcharts/highcharts-more.js";
import solidGauge from "highcharts/modules/solid-gauge.js";
import merge from "lodash-es/merge";

highchartsMore(Highcharts);
solidGauge(Highcharts);

function renderIcons() {
  // Move icon
  if (!this.series[0].icon) {
    this.series[0].icon = this.renderer
      .path(["M", -8, 0, "L", 8, 0, "M", 0, -8, "L", 8, 0, 0, 8])
      .attr({
        stroke: "#303030",
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        "stroke-width": 2,
        zIndex: 10,
      })
      .add(this.series[2].group);
  }
  this.series[0].icon.translate(
    this.chartWidth / 2 - 10,
    this.plotHeight / 2 -
    this.series[0].points[0].shapeArgs.innerR -
    (this.series[0].points[0].shapeArgs.r -
      this.series[0].points[0].shapeArgs.innerR) /
    2
  );

  // Exercise icon
  if (!this.series[1].icon) {
    this.series[1].icon = this.renderer
      .path(["M", -8, 0, "L", 8, 0, "M", 0, -8, "L", 8, 0, 0, 8])
      .attr({
        stroke: "#ffffff",
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        "stroke-width": 2,
        zIndex: 10,
      })
      .add(this.series[2].group);
  }
  this.series[1].icon.translate(
    this.chartWidth / 2 - 10,
    this.plotHeight / 2 -
    this.series[1].points[0].shapeArgs.innerR -
    (this.series[1].points[0].shapeArgs.r -
      this.series[1].points[0].shapeArgs.innerR) /
    2
  );

  // Stand icon
  if (!this.series[2].icon) {
    this.series[2].icon = this.renderer
      .path(["M", -8, 0, "L", 8, 0, "M", 0, -8, "L", 8, 0, 0, 8])
      .attr({
        stroke: "#303030",
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        "stroke-width": 2,
        zIndex: 10,
      })
      .add(this.series[2].group);
  }

  this.series[2].icon.translate(
    this.chartWidth / 2 - 10,
    this.plotHeight / 2 -
    this.series[2].points[0].shapeArgs.innerR -
    (this.series[2].points[0].shapeArgs.r -
      this.series[2].points[0].shapeArgs.innerR) /
    2
  );
}

function gaugeSize(gaugeWidth, padding = 1, outerMax = 100) {
  const outerMin = outerMax - gaugeWidth;
  const midMax = outerMin - padding;
  const midMin = midMax - gaugeWidth;
  const innerMax = midMin - padding;
  const innerMin = innerMax - gaugeWidth;
  return {
    outerMax,
    outerMin,
    midMax,
    midMin,
    innerMax,
    innerMin,
  };
}

const initSize = gaugeSize(20);

/**
 * @type {import('highcharts').Options}
 */
const defaultOptions = {
  title: undefined,

  chart: {
    type: "solidgauge",
    // height: "100%",
    events: {
      render: renderIcons,
    },
  },

  tooltip: {
    borderWidth: 0,
    backgroundColor: "none",
    shadow: false,
    style: {
      fontSize: "1rem",
      textAlign: "center",
    },
    useHTML: true,
    pointFormatter: function () {
      return `${this.series.name || "&nbsp;"}<br>
      <span style="font-size: 2em; color:${this.color}; font-weight: bold">${this.y
        }%</span>`;
    },
    positioner: function (labelWidth, labelHeight) {
      return {
        x: (this.chart.chartWidth - labelWidth) / 2,
        y: (this.chart.plotHeight - labelHeight) / 2,
      };
    },
  },

  pane: {
    size: "100%",
    startAngle: 0,
    endAngle: 360,
    background: [
      {
        // Track for Move
        outerRadius: initSize.outerMax + "%",
        innerRadius: initSize.outerMin + "%",
        backgroundColor: Highcharts.color(Highcharts.getOptions().colors[0])
          .setOpacity(0.3)
          .get(),
        borderWidth: 0,
      },
      {
        // Track for Exercise
        outerRadius: initSize.midMax + "%",
        innerRadius: initSize.midMin + "%",
        backgroundColor: Highcharts.color(Highcharts.getOptions().colors[1])
          .setOpacity(0.3)
          .get(),
        borderWidth: 0,
      },
      {
        // Track for Stand
        outerRadius: initSize.innerMax + "%",
        innerRadius: initSize.innerMin + "%",
        backgroundColor: Highcharts.color(Highcharts.getOptions().colors[2])
          .setOpacity(0.3)
          .get(),
        borderWidth: 0,
      },
    ],
  },

  yAxis: {
    min: 0,
    max: 100,
    lineWidth: 0,
    tickPositions: [],
  },

  plotOptions: {
    solidgauge: {
      dataLabels: {
        enabled: false,
      },
      linecap: "round",
      stickyTracking: false,
      rounded: true,
    },
  },
  series: [
    {
      type: "solidgauge",
      name: "",
      data: [
        {
          // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
          color: Highcharts.getOptions().colors[0],
          radius: initSize.outerMax + "%",
          innerRadius: initSize.outerMin + "%",
          y: 80,
        },
      ],
    },
    {
      type: "solidgauge",
      name: "",
      data: [
        {
          color: Highcharts.getOptions().colors[1],
          radius: initSize.midMax + "%",
          innerRadius: initSize.midMin + "%",
          y: 65,
        },
      ],
    },
    {
      type: "solidgauge",
      name: "",
      data: [
        {
          color: Highcharts.getOptions().colors[2],
          radius: initSize.innerMax + "%",
          innerRadius: initSize.innerMin + "%",
          y: 50,
        },
      ],
    },
  ],
};

const ActivityGauge = ({
  data,
  options = {},
  exporting = false,
  ...other
}) => {
  const propOptions = {
    series: [
      {
        name: data[0].name,
        data: [
          {
            y: data[0].data,
          },
        ],
      },
      {
        name: data[1].name,
        data: [
          {
            y: data[1].data,
          },
        ],
      },
      {
        name: data[2].name,
        data: [
          {
            y: data[2].data,
          },
        ],
      },
    ],
    exporting: {
      enabled: exporting,
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

export default ActivityGauge;
