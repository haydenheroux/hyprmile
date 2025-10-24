import { parseNumber, type NumericUnit } from "../../utils/numeric";

interface NumericInputProps {
  value: string;
  setValue: (value: string) => void;
  unit: NumericUnit;
  placeholder: number;
};

function NumericInput({
  value,
  setValue,
  unit,
  placeholder,
}: NumericInputProps) {
  return (
    <input
      type="text"
      className="numeric"
      value={value}
      placeholder={unit.formatText(placeholder)}
      onChange={(e) => setValue(e.target.value)}
      onFocus={() => setValue(unit.format(parseNumber(value)))}
      onBlur={() => setValue(unit.formatText(value))}
    />
  );
}

export default NumericInput;
