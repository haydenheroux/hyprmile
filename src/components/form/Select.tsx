import { useEffect } from "react";

interface SelectProps {
  selection: string;
  options: string[];
  onChange: (value: string) => void;
  allowEmpty?: boolean;
  standalone?: boolean;
}

function Select({ selection, options, onChange, allowEmpty = true, standalone = true }: SelectProps) {
  const allOptions = allowEmpty ? ["", ...options] : options;

  // NOTE(hayden): Whenever the component is changed, default to selecting the first option
  useEffect(() => {
    if (standalone) {
      onChange(options[0]);
    }
  }, [onChange, options, standalone]);

  return (
    <select value={selection} onChange={(e) => onChange(e.target.value)}>
      {allOptions.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

export default Select;
