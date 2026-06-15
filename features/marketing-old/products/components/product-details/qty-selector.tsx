import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Minus, Plus } from "lucide-react";

export function QuantitySelector({
  value,
  onChange,
}: {
  value: number;
  onChange: (qty: number) => void;
}) {
  return (
    <ButtonGroup>
      <Button
        variant="secondary"
        onClick={() => onChange(value === 1 ? 1 : value - 1)}
      >
        <Minus />
      </Button>

      <Button variant="secondary">{value}</Button>

      <Button variant="secondary" onClick={() => onChange(value + 1)}>
        <Plus />
      </Button>
    </ButtonGroup>
  );
}
