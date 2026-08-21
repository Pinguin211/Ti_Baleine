import { Button } from './button';

export interface StepperProps {
  label: string;
  valeur: number;
  min: number;
  onDecrement: () => void;
  onIncrement: () => void;
}

export function Stepper({ label, valeur, min, onDecrement, onIncrement }: StepperProps) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-marine-800">{label}</span>
      <div className="flex items-center gap-3">
        <Button
          type="button"
          variante="secondaire"
          className="h-8 w-8 rounded-full p-0"
          disabled={valeur <= min}
          onClick={onDecrement}
        >
          −
        </Button>
        <span className="w-4 text-center font-semibold text-marine-900">{valeur}</span>
        <Button type="button" variante="secondaire" className="h-8 w-8 rounded-full p-0" onClick={onIncrement}>
          +
        </Button>
      </div>
    </div>
  );
}
