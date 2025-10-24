import type { NumericUnit } from "../../utils/numeric";
import NumericInput from "./NumericInput";

interface NumericInputGroupProps {
  value: string[];
  setValue: (value: string[]) => void;
  unit: NumericUnit;
  placeholder: number;
}

function NumericInputGroup({
  value: values,
  setValue: setValues,
  unit,
  placeholder,
}: NumericInputGroupProps) {
  const setValue = (index: number | null) => {
    return (value: string) => {
      if (index == null) {
        values.push("");
      } else {
        values[index] = value;
      }
      setValues(values);
    };
  };

  const showEmpty = values.every(value => value.length > 0);

  return (
    <>
      {values.map((value, index) => (
        <NumericInput
          key={index}
          value={value}
          setValue={setValue(index)}
          unit={unit}
          placeholder={placeholder}
        />
      ))}
      {showEmpty && (
        <NumericInput
          value={""}
          setValue={setValue(null)}
          unit={unit}
          placeholder={placeholder}
        />
      )}
    </>
  );
}

export default NumericInputGroup;
