import { motion } from "framer-motion";
import { Check, ImageIcon, DollarSign, Tag } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  { label: "Select NFT", icon: ImageIcon },
  { label: "Set Price", icon: DollarSign },
  { label: "Approve & List", icon: Tag },
];

export function ListingStepper({ currentStep }) {
  return (
    <div className="flex items-center justify-between">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isComplete = stepNumber < currentStep;
        const isActive = stepNumber === currentStep;
        const Icon = step.icon;

        return (
          <div key={step.label} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-2">
              <motion.div
                animate={{
                  scale: isActive ? 1.1 : 1,
                  backgroundColor: isComplete || isActive ? "rgba(168,85,247,1)" : "rgba(255,255,255,0.06)",
                }}
                transition={{ duration: 0.3 }}
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border",
                  isComplete || isActive ? "border-purple-400" : "border-white/10",
                )}
              >
                {isComplete ? (
                  <Check className="h-4 w-4 text-white" />
                ) : (
                  <Icon className={cn("h-4 w-4", isActive ? "text-white" : "text-white/40")} />
                )}
              </motion.div>
              <span className={cn("hidden text-xs font-medium sm:block", isActive ? "text-white" : "text-white/40")}>
                {step.label}
              </span>
            </div>

            {index < steps.length - 1 && (
              <div className="mx-2 h-px flex-1 bg-white/10">
                <motion.div
                  className="h-px bg-gradient-to-r from-purple-500 to-blue-500"
                  animate={{ width: isComplete ? "100%" : "0%" }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
