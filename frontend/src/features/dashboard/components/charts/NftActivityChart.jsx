import Chart from "react-apexcharts";
import { chartColors } from "@/features/dashboard/components/charts/chartTheme";

const labels = ["Minted", "Listed", "Purchased", "Sold"];

export function NftActivityChart({ counts }) {
  const options = {
    chart: { background: "transparent", foreColor: "rgba(255,255,255,0.5)" },
    labels,
    colors: [chartColors.violet, chartColors.cyan, chartColors.fuchsia, "#34D399"],
    legend: { position: "bottom", labels: { colors: "rgba(255,255,255,0.6)" } },
    dataLabels: { enabled: false },
    stroke: { colors: ["#050505"], width: 2 },
    tooltip: { theme: "dark" },
    plotOptions: { pie: { donut: { size: "68%" } } },
  };

  const total = counts.reduce((a, b) => a + b, 0);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-white">NFT Activity</p>
        <span className="text-xs text-white/40">{total} events</span>
      </div>
      <div className="mt-4">
        {total === 0 ? (
          <div className="flex h-[260px] items-center justify-center text-sm text-white/30">No activity yet</div>
        ) : (
          <Chart options={options} series={counts} type="donut" height={260} />
        )}
      </div>
    </div>
  );
}
