function setChartColors() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var charts = sheet.getCharts();

// 9 Colors by Default, since more than 9 series on a chart is weird, but feel free to experiment with more
// The default list is basic color-deficiency friendly colors, but set them to any colors you like
  var colors = ['#E69F00', '#56B4E9', '#009E73', '#F0E442', '#0072B2', '#D55E00', '#CC79A7', '#999999', '#000000'];

  charts.forEach(function (chart, chartIndex) {
    var chartBuilder = chart.modify();
    var chartSeries = chart.getOptions().get('series');
    if (!chartSeries) {
      chartSeries = {};
      for (var i = 0; i < colors.length; i++) {
        chartSeries[i] = { color: colors[i % colors.length] };
      }
    } else {
      for (var i = 0; i < Object.keys(chartSeries).length; i++) {
        if (chartSeries[i]) {
          chartSeries[i].color = colors[i % colors.length];
        }
      }
    }
    chartBuilder.setOption('series', chartSeries);
    sheet.updateChart(chartBuilder.build());
  });
}
