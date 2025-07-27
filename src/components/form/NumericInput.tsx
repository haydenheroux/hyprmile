import type { NumericUnit } from "../../utils/numeric";

function NumericInput({
  value,
  setValue,
  unit,
  placeholder,
}: {
  value: string;
  setValue: (value: string) => void;
  unit: NumericUnit;
  placeholder: number;
}) {
  return (
    <input
      type="text"
      value={value}
      placeholder={unit.format(placeholder)}
      onChange={(e) => setValue(e.target.value)}
      onBlur={() => setValue(unit.format(value))}
    />
  );
}

export default NumericInput;
