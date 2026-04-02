import { Separator } from "@/components/ui/separator";
import { Check } from "lucide-react";

interface Stepper {
  steps: { id: string; label: string }[];
  currentStep: string;
}

export function Stepper(props: Stepper) {
  const { steps, currentStep } = props;

  const activeStyles = "bg-primary text-primary-foreground";

  return (
    <div className="flex w-full justify-center">
      <div className="flex w-full max-w-64 items-center gap-2">
        {steps.map((step, index, arr) => {
          const { id, label } = step;
          const activeIndex = arr.findIndex((item) => item.id === currentStep);

          return (
            <>
              <div
                key={id}
                className={`flex aspect-square w-8 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold ${currentStep === id && activeStyles}`}
              >
                {activeIndex > index ? <Check /> : label}
              </div>

              {arr.at(-1) != step && <Separator className="flex-1" />}
            </>
          );
        })}
      </div>
    </div>
  );
}
