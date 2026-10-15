import Chart from "react-apexcharts";
import { baseChartOptions, chartColors } from "@/features/dashboard/components/charts/chartTheme";

export function SalesOverviewChart({ series }) {
  const options = baseChartOptions({
    chart: { type: "area", sparkline: { enabled: false } },
    colors: [chartColors.violet],
    stroke: { curve: "smooth", width: 2.5 },
    fill: {
      type: "gradient",
      gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0, stops: [0, 100] },
    },
    xaxis: { type: "datetime", labels: { style: { colors: "rgba(255,255,255,0.4)" } } },
    tooltip: { theme: "dark", x: { format: "dd MMM yyyy" } },
  });

  const data = series.map((s) => ({ x: s.date?.getTime() ?? Date.now(), y: s.price }));

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-white">Sales Overview</p>
        <span className="text-xs text-white/40">USDT / sale</span>
      </div>
      <div className="mt-4">
        <Chart options={options} series={[{ name: "Sale price", data }]} type="area" height={260} />
      </div>
    </div>
  );
}
