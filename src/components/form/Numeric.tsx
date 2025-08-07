import type { NumericUnit } from "../../utils/numeric";

function Numeric({
  value,
  placeholder,
  unit,
}: {
  value: number;
  placeholder: number;
  unit: NumericUnit;
}) {
  return (
    <span className="text-neutral-100 font-light">
      {unit.formatText(value ? value : placeholder)}
    </span>
  );
}

export default Numeric;
