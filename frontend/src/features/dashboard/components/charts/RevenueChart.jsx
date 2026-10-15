import Chart from "react-apexcharts";
import { baseChartOptions, chartColors } from "@/features/dashboard/components/charts/chartTheme";

export function RevenueChart({ series }) {
  const options = baseChartOptions({
    chart: { type: "bar" },
    colors: [chartColors.cyan],
    plotOptions: { bar: { borderRadius: 6, columnWidth: "45%" } },
    xaxis: { type: "datetime", labels: { style: { colors: "rgba(255,255,255,0.4)" } } },
    tooltip: { theme: "dark", x: { format: "dd MMM yyyy" } },
    fill: {
      type: "gradient",
      gradient: { shade: "dark", type: "vertical", shadeIntensity: 0.5, gradientToColors: [chartColors.violet], opacityFrom: 0.9, opacityTo: 0.6 },
    },
  });

  const data = series.map((s) => ({ x: s.date?.getTime() ?? Date.now(), y: s.amount }));

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-white">Revenue Analytics</p>
        <span className="text-xs text-white/40">Your earnings (USDT)</span>
      </div>
      <div className="mt-4">
        <Chart options={options} series={[{ name: "Revenue", data }]} type="bar" height={260} />
      </div>
    </div>
  );
}
