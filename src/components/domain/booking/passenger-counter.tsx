import { Stepper } from '../../ui/stepper';

export interface PassengerCounterProps {
  adultes: number;
  enfants: number;
  onChange: (valeurs: { adultes: number; enfants: number }) => void;
}

export function PassengerCounter({ adultes, enfants, onChange }: PassengerCounterProps) {
  return (
    <div className="flex flex-col gap-3">
      <Stepper
        label="Adultes (12 ans et +)"
        valeur={adultes}
        min={adultes + enfants <= 1 ? 1 : 0}
        onDecrement={() => onChange({ adultes: adultes - 1, enfants })}
        onIncrement={() => onChange({ adultes: adultes + 1, enfants })}
      />
      <Stepper
        label="Enfants (4-11 ans)"
        valeur={enfants}
        min={0}
        onDecrement={() => onChange({ adultes, enfants: enfants - 1 })}
        onIncrement={() => onChange({ adultes, enfants: enfants + 1 })}
      />
    </div>
  );
}
