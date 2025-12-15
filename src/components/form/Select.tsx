interface SelectProps {
  selection: string;
  options: string[];
  onChange: (value: string) => void;
  allowEmpty?: boolean;
}

function Select({ selection, options, onChange, allowEmpty = true }: SelectProps) {
  const allOptions = allowEmpty ? ["", ...options] : options;

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
