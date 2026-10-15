export const chartColors = {
  violet: "#8B5CF6",
  cyan: "#06B6D4",
  fuchsia: "#D946EF",
};

export function baseChartOptions(overrides = {}) {
  return {
    chart: {
      background: "transparent",
      foreColor: "rgba(255,255,255,0.5)",
      toolbar: { show: false },
      fontFamily: "inherit",
      ...overrides.chart,
    },
    grid: {
      borderColor: "rgba(255,255,255,0.06)",
      strokeDashArray: 4,
      ...overrides.grid,
    },
    dataLabels: { enabled: false },
    tooltip: {
      theme: "dark",
      x: { show: true },
      ...overrides.tooltip,
    },
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { colors: "rgba(255,255,255,0.4)", fontSize: "11px" } },
      ...overrides.xaxis,
    },
    yaxis: {
      labels: { style: { colors: "rgba(255,255,255,0.4)", fontSize: "11px" } },
      ...overrides.yaxis,
    },
    legend: {
      labels: { colors: "rgba(255,255,255,0.6)" },
      ...overrides.legend,
    },
    ...overrides,
  };
}
