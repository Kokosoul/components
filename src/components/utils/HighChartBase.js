import colors from "../styles/colors.module.scss";

// Highmaps includes both Highcharts + maps so we only need this
import HighchartsWithMaps from "highcharts/highmaps";
import HighchartsStockModule from "highcharts/modules/stock";

/**
 * Highcharts recommends we always include these modules for every chart
 */
import Exporting from "highcharts/modules/exporting";
import OfflineExporting from "highcharts/modules/offline-exporting";
import Accessibility from "highcharts/modules/accessibility";
import DataModule from "highcharts/modules/data";
import ExportsData from "highcharts/modules/export-data";
// import SeriesLabel from 'highcharts/modules/series-label';

HighchartsStockModule(HighchartsWithMaps);

/**
 * https://www.highcharts.com/docs/export-module/export-module-overview
 *
 * The exporting module allows your users to download the chart as PDF, PNG, JPG
 * or SVG vector images.
 */
Exporting(HighchartsWithMaps);

/**
 * https://www.highcharts.com/docs/export-module/client-side-export
 *
 * this enables the creation of the download image
 */
OfflineExporting(HighchartsWithMaps);

/**
 * https://www.highcharts.com/docs/accessibility/accessibility-module
 *
 * Including this module will make your charts compatible with assistive
 * technologies used by people with disabilities, and also improve the usability
 * of your charts, helping you reach a broader audience. Including the
 * Accessibility module will also help with SEO by making your charts more
 * visible to web crawlers.
 */
Accessibility(HighchartsWithMaps);

/**
 * https://www.highcharts.com/docs/working-with-data/data-module
 *
 * The Data module provides options for loading data from external sources, like
 * CSV files, HTML tables or Google Spreadsheets,
 */
DataModule(HighchartsWithMaps);

// turns on Download CSV/Excel and "View data table"
ExportsData(HighchartsWithMaps);

// https://api.highcharts.com/highcharts/plotOptions.series.label
// SeriesLabel(HighchartsWithMaps);

HighchartsWithMaps.theme = {
  colors: [
    colors.primaryTeal,
    colors.primaryDarkBlue,
    colors.primaryBlue,
    colors.primaryRed,

    colors.secondaryTeal,
    colors.secondaryDarkBlue,
    colors.secondaryBlue,
    colors.secondaryRed,
  ],

  title: {
    style: {
      color: "#000",
      font: 'bold 14px "Circular Std", Verdana, sans-serif',
    },
  },
  subtitle: {
    style: {
      color: "#666666",
      font: 'bold 12px "Circular Std", Verdana, sans-serif',
    },
  },
  legend: {
    itemStyle: {
      font: '9px "Circular Std", Verdana, sans-serif',
      color: "black",
    },
    itemHoverStyle: {
      color: "gray",
    },
  },
};
// Apply the theme
HighchartsWithMaps.setOptions(HighchartsWithMaps.theme);

HighchartsWithMaps.setOptions({
  credits: {
    enabled: false,
  },
});

/**
 * @type import('highcharts/highcharts') & import('react').FunctionComponent<import('highcharts').Props>
 */
const Highcharts = HighchartsWithMaps;

export default Highcharts;
