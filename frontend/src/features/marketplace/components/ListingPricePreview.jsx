import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export function ListingPricePreview({ price, onPriceChange, feePercent }) {
  const numericPrice = Number(price) || 0;
  const feeAmount = (numericPrice * feePercent) / 100;
  const sellerReceives = numericPrice - feeAmount;

  return (
    <div className="space-y-5 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <div>
        <Label className="text-white/70">Listing Price (USDT)</Label>
        <Input
          type="number"
          min="0"
          step="0.01"
          value={price}
          onChange={(e) => onPriceChange(e.target.value)}
          placeholder="e.g. 100.00"
          className="mt-1.5 border-white/15 bg-white/5 text-lg text-white placeholder:text-white/30"
        />
      </div>

      <Separator className="bg-white/10" />

      <div className="space-y-2 text-sm">
        <div className="flex justify-between text-white/50">
          <span>Marketplace Fee</span>
          <span>{feePercent}%</span>
        </div>
        <div className="flex justify-between text-white/50">
          <span>Platform Fee Amount</span>
          <span>{feeAmount.toFixed(2)} USDT</span>
        </div>
        <Separator className="bg-white/10" />
        <div className="flex justify-between text-base font-semibold text-white">
          <span>You Receive</span>
          <span className="text-purple-300">{sellerReceives.toFixed(2)} USDT</span>
        </div>
      </div>
    </div>
  );
}
