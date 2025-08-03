import { parseNumber, type NumericUnit } from "../../utils/numeric";

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
      placeholder={unit.formatText(placeholder)}
      onChange={(e) => setValue(e.target.value)}
      onFocus={() => setValue(unit.format(parseNumber(value)))}
      onBlur={() => setValue(unit.formatText(value))}
    />
  );
}

export default NumericInput;
