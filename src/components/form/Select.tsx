import { useEffect, useState } from "react";

interface SelectProps {
  options: string[];
  onChange: (value: string) => void;
}

function Select({ options, onChange }: SelectProps) {
  const [selected, setSelected] = useState<string>(options[0]);

  useEffect(() => {
    const selected = options[0];
    onChange(selected);
    setSelected(selected);
  }, [onChange, options]);

  const selectedChanged: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const selected = e.target.value;
    onChange(selected);
    setSelected(selected);
  }

  return (
    <select value={selected} onChange={selectedChanged}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

export default Select;
